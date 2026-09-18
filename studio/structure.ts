import type {StructureResolver} from 'sanity/structure'

const SECTIONS = [
  {id: 'markets', title: 'Markets'},
  {id: 'briefings', title: 'Briefings'},
]
const STATUSES = ['draft', 'review', 'published', 'corrected']

/** Bird's-eye desk: every piece by section, then by status; plus authors and series. */
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Government Contracted')
    .items([
      S.listItem()
        .title('All pieces')
        .child(S.documentTypeList('piece').title('All pieces').defaultOrdering([{field: 'publishedAt', direction: 'desc'}])),
      ...SECTIONS.map((section) =>
        S.listItem()
          .title(section.title)
          .child(
            S.list()
              .title(section.title)
              .items(
                STATUSES.map((status) =>
                  S.listItem()
                    .title(status[0].toUpperCase() + status.slice(1))
                    .child(
                      S.documentList()
                        .title(`${section.title} · ${status}`)
                        .filter('_type == "piece" && section == $section && status == $status')
                        .params({section: section.id, status})
                        .defaultOrdering([{field: 'publishedAt', direction: 'desc'}]),
                    ),
                ),
              ),
          ),
      ),
      S.divider(),
      S.documentTypeListItem('series').title('Series'),
      S.documentTypeListItem('author').title('Authors'),
    ])
