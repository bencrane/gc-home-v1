-- Government Contracted format queries. ONE statement each. Parameters in {braces}.
-- Validated 2026-09-17 against artifact query_sidecar_20260802T120425Z (137 tables). Timings in FORMATS.md.

-- 1 · record.agency_fy  {fy}  — 3.1 s
WITH cur AS (SELECT awarding_agency_code AS code, sum(obligation) AS obl, count(DISTINCT uei) AS recipients, count(*) AS actions FROM txn_events_combo WHERE fy = {fy} GROUP BY 1),
prev AS (SELECT awarding_agency_code AS code, sum(obligation) AS obl FROM txn_events_combo WHERE fy = {fy} - 1 GROUP BY 1)
SELECT v.name AS agency, cur.obl, cur.obl - coalesce(prev.obl,0) AS delta, round(100.0*(cur.obl - coalesce(prev.obl,0))/nullif(prev.obl,0),1) AS pct, cur.recipients, cur.actions
FROM cur LEFT JOIN prev USING (code) LEFT JOIN agency_vocab v ON v.code = cur.code ORDER BY cur.obl DESC LIMIT 25;

-- 2 · expiring.sector_180d  {naics3}  — 0.3 s
SELECT e.legal_business_name AS recipient, a.uei, v.name AS agency, a.naics_code, a.psc_code, a.obligated, a.current_value, a.remaining_ceiling_headroom, a.current_end_date, a.days_to_expiry, a.pop_state, a.type_of_set_aside_code
FROM award_geo_active a LEFT JOIN gtm_sam_entities e USING (uei) LEFT JOIN agency_vocab v ON v.code = a.awarding_agency_code
WHERE substr(a.naics_code,1,3) = '{naics3}' AND a.days_to_expiry BETWEEN 1 AND 180 ORDER BY a.current_value DESC LIMIT 50;

-- 3 · flows.agency_naics_delta  {fy}  — 0.7 s
WITH x AS (SELECT awarding_agency_code AS agency, substr(naics_code,1,3) AS naics3, fy, sum(obligation) AS obl FROM txn_events_combo WHERE fy IN ({fy}-1, {fy}) AND naics_code IS NOT NULL GROUP BY 1,2,3),
a AS (SELECT DISTINCT agency, naics3 FROM x)
SELECT v.name AS agency, a.naics3, coalesce(c.obl,0) AS obl_cur, coalesce(p.obl,0) AS obl_prev, coalesce(c.obl,0) - coalesce(p.obl,0) AS delta
FROM a LEFT JOIN x c ON c.agency=a.agency AND c.naics3=a.naics3 AND c.fy={fy} LEFT JOIN x p ON p.agency=a.agency AND p.naics3=a.naics3 AND p.fy={fy}-1 LEFT JOIN agency_vocab v ON v.code=a.agency
ORDER BY abs(coalesce(c.obl,0) - coalesce(p.obl,0)) DESC LIMIT 40;

-- 4 · subunder.prime_lane  {naics3} {since_date}  — 0.1 s
SELECT prime_awardee_uei, any_value(prime_awardee_name) AS prime, count(*) AS sub_ct, count(DISTINCT subawardee_uei) AS distinct_subs, sum(subaward_amount_num) AS sub_amount, max(subaward_action_date) AS last_sub
FROM subaward_canonical_slim WHERE substr(prime_award_naics_code,1,3) = '{naics3}' AND subaward_action_date >= DATE '{since_date}'
GROUP BY 1 ORDER BY sum(subaward_amount_num) DESC LIMIT 30;

-- 5 · wage.floor_vs_market_county  {classification} {state}  — 0.03 s
SELECT r.county_name, r.county_fips, r.classification_title, r.wage_rate AS floor_hourly, w.h_median AS market_median, w.h_pct25, w.h_pct75, w.h_median - r.wage_rate AS market_minus_floor, x.soc_code
FROM v_wd_county_rates r JOIN sca_soc_crosswalk x ON x.occupation_code = r.occupation_code JOIN soc_state_wage w ON w.soc_code = x.soc_code AND w.prim_state = r.state_code
WHERE r.classification_title ILIKE '{classification}%' AND r.state_code = '{state}' AND r.wd_type ILIKE '%SCA%' ORDER BY market_minus_floor DESC LIMIT 60;

-- 6 · whowon.largest_new_awards  {month_start} {month_end}  — 4.4 s  (gorillas: largest base awards in the month)
SELECT e.legal_business_name AS recipient, t.uei, v.name AS agency, t.naics_code, t.psc_code, t.action_date, t.obligation, t.award_key, t.pop_state, t.type_of_set_aside_code
FROM txn_events_combo t LEFT JOIN gtm_sam_entities e USING (uei) LEFT JOIN agency_vocab v ON v.code = t.awarding_agency_code
WHERE t.action_type_code IS NULL AND t.action_date >= DATE '{month_start}' AND t.action_date < DATE '{month_end}' ORDER BY t.obligation DESC LIMIT 25;
