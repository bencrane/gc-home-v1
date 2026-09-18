import {defineField, defineType} from 'sanity'

/**
 * A figure inside a piece. The numbers are FROZEN at the moment they were taken
 * from the core-x query sidecar; refreshing is a deliberate editorial act that
 * rewrites `result` and `takenAt`. The reader's browser never calls the sidecar.
 */
export const dataBlock = defineType({
  name: 'dataBlock',
  title: 'Data block',
  type: 'object',
  fields: [
    defineField({name: 'heading', type: 'string', description: 'Mono eyebrow above the figure, e.g. OBLIGATIONS BY AWARDING AGENCY · FY25'}),
    defineField({
      name: 'presentation',
      type: 'string',
      options: {list: ['ledger', 'figures', 'chart'], layout: 'radio'},
      initialValue: 'ledger',
      validation: (r) => r.required(),
    }),
    defineField({name: 'queryId', title: 'Sidecar query id', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'params', title: 'Query parameters (JSON)', type: 'text', rows: 3}),
    defineField({name: 'result', title: 'Frozen result (JSON)', type: 'text', rows: 8, validation: (r) => r.required()}),
    defineField({name: 'takenAt', title: 'Taken at', type: 'datetime', validation: (r) => r.required()}),
    defineField({name: 'source', type: 'string', description: 'Provenance line under the figure, e.g. USASpending via core-x, FY25 obligations.'}),
  ],
  preview: {
    select: {heading: 'heading', presentation: 'presentation', takenAt: 'takenAt', queryId: 'queryId'},
    prepare: ({heading, presentation, takenAt, queryId}) => ({
      title: heading || queryId,
      subtitle: `${presentation} · as of ${takenAt?.slice(0, 10) ?? 'never'}`,
    }),
  },
})
