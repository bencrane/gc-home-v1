-- Government Contracted format queries. ONE statement each. Parameters in {braces}.
-- Sort-key discipline per QUERY_SIDECAR_AGENT_GUIDE.md: prune on each table's sort key.

-- 1 · record.agency_fy  {fy}
-- Obligations by awarding agency for one FY, with prior-FY delta. Portrait fact, fy precomputed.
WITH cur AS (
  SELECT awarding_agency_code AS code, sum(obligation) AS obl, count(DISTINCT uei) AS recipients, count(*) AS actions
  FROM txn_events_combo WHERE fy = {fy} GROUP BY 1),
prev AS (
  SELECT awarding_agency_code AS code, sum(obligation) AS obl FROM txn_events_combo WHERE fy = {fy} - 1 GROUP BY 1)
SELECT v.name AS agency, cur.obl, cur.obl - coalesce(prev.obl, 0) AS delta, cur.recipients, cur.actions
FROM cur LEFT JOIN prev USING (code) LEFT JOIN agency_vocab v ON v.code = cur.code
ORDER BY cur.obl DESC LIMIT 25;

-- 2 · expiring.sector_180d  {naics3}
-- Active awards in a NAICS3 sector ending within 180 days. Live book, place-sorted, ms-class.
SELECT recipient_name, recipient_uei, awarding_agency_code, naics_code, psc_code,
       obligated, current_value, remaining_ceiling_headroom, current_end_date, days_to_expiry, pop_state
FROM award_geo_active
WHERE substr(naics_code, 1, 3) = '{naics3}' AND days_to_expiry BETWEEN 1 AND 180
ORDER BY current_value DESC LIMIT 50;

-- 3 · flows.agency_naics_delta  {fy}
-- Net obligation change by agency × NAICS3 between {fy}-1 and {fy}. Chart input (top movers both directions).
WITH x AS (
  SELECT awarding_agency_code AS agency, substr(naics_code, 1, 3) AS naics3, fy, sum(obligation) AS obl
  FROM txn_events_combo WHERE fy IN ({fy} - 1, {fy}) GROUP BY 1, 2, 3)
SELECT a.agency, a.naics3, coalesce(c.obl, 0) AS obl_cur, coalesce(p.obl, 0) AS obl_prev,
       coalesce(c.obl, 0) - coalesce(p.obl, 0) AS delta
FROM (SELECT DISTINCT agency, naics3 FROM x) a
LEFT JOIN x c ON c.agency = a.agency AND c.naics3 = a.naics3 AND c.fy = {fy}
LEFT JOIN x p ON p.agency = a.agency AND p.naics3 = a.naics3 AND p.fy = {fy} - 1
ORDER BY abs(delta) DESC LIMIT 40;

-- 4 · subunder.prime_lane  {naics3}
-- Sub-award volume under the largest primes in a sector: who is buying capacity.
SELECT prime_awardee_uei, any_value(prime_awardee_name) AS prime_name,
       count(*) AS sub_ct, count(DISTINCT subawardee_uei) AS distinct_subs, sum(subaward_amount_num) AS sub_amount
FROM subaward_canonical_slim
WHERE substr(prime_award_naics_code, 1, 3) = '{naics3}' AND subaward_action_date >= current_date - INTERVAL 24 MONTH
GROUP BY 1 ORDER BY sub_amount DESC LIMIT 30;

-- 5 · wtb.lender_class_after_award  {months}
-- UCC financing filed within 180 days after a recipient's first federal action, by lender class (CA/CO only).
WITH first_win AS (
  SELECT uei, min(action_date) AS first_action FROM gtm_txn_events_slim GROUP BY 1),
borrow AS (
  SELECT f.uei, f.first_filing_date, f.secured_parties, f.is_lease
  FROM sam_ucc_filings f JOIN first_win w USING (uei)
  WHERE f.filing_class = 'financing'
    AND f.first_filing_date BETWEEN w.first_action AND w.first_action + INTERVAL 180 DAY
    AND w.first_action >= current_date - INTERVAL {months} MONTH)
SELECT l.lender_class, count(DISTINCT b.uei) AS firms, count(*) AS filings, sum(CASE WHEN b.is_lease THEN 1 ELSE 0 END) AS leases
FROM borrow b JOIN ucc_lender_filings lf ON lf.uei = b.uei AND lf.first_filing_date = b.first_filing_date
JOIN ucc_lenders_all l ON l.lender_key = lf.lender_key
GROUP BY 1 ORDER BY firms DESC;

-- 6 · wage.floor_vs_market_county  {occupation_code} {state}
-- SCA floor (WD rate) vs OEWS market median by county for one occupation in one state.
SELECT r.county_name, r.county_fips, r.classification_title, r.wage_rate AS floor_hourly,
       w.h_median AS market_hourly_median, w.h_pct25, w.h_pct75, w.h_median - r.wage_rate AS market_minus_floor
FROM v_wd_county_rates r
JOIN sca_soc_crosswalk x ON x.occupation_code = r.occupation_code
JOIN soc_state_wage w ON w.soc_code = x.soc_code AND w.prim_state = r.state_code
WHERE r.occupation_code = '{occupation_code}' AND r.state_code = '{state}'
ORDER BY market_minus_floor DESC LIMIT 60;

-- 7 · whowon.structural_change_30d
-- Recipients whose CAGE first transacted in the last 30 days (demonstrated net-new entrants), with obligations.
SELECT e.uei, s.legal_business_name, s.physical_state, s.primary_naics,
       e.signal_value AS cage, e.first_action_date, e.action_ct, e.obl_sum
FROM gtm_fpds_entity_signal_events e
JOIN gtm_sam_entities s USING (uei)
WHERE e.signal_type = 'cage_txn' AND e.first_action_date >= current_date - INTERVAL 30 DAY
ORDER BY e.obl_sum DESC LIMIT 50;
