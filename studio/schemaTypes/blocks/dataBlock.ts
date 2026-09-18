import {defineField, defineType} from 'sanity'

/**
 * A figure inside a piece. `result` is the FROZEN table (JSON: {takenAt, columns, rows}) as taken from
 * the record at publish time. Internal fields (queryId, params, artifact) never reach the public site.
 */
export const dataBlock = defineType({
  name: 'dataBlock',
  title: 'Data block',
  type: 'object',
  groups: [{name: 'spec', title: 'Presentation', default: true}, {name: 'data', title: 'Data'}, {name: 'internal', title: 'Internal'}],
  fields: [
    defineField({name: 'presentation', type: 'string', options: {list: ['chart', 'ledger', 'figures'], layout: 'radio'}, initialValue: 'chart', validation: (r) => r.required(), group: 'spec'}),
    defineField({name: 'form', title: 'Chart form', type: 'string', options: {list: ['ranked', 'change', 'timeline', 'dumbbell']}, hidden: ({parent}) => parent?.presentation !== 'chart', group: 'spec'}),
    defineField({name: 'heading', type: 'string', description: 'Mono kicker above the figure', group: 'spec'}),
    defineField({name: 'label', title: 'Label column', type: 'string', group: 'spec'}),
    defineField({name: 'value', title: 'Value column', type: 'string', group: 'spec'}),
    defineField({name: 'valueFormat', type: 'string', options: {list: ['money', 'count', 'hourly', 'date']}, initialValue: 'money', group: 'spec'}),
    defineField({name: 'sub', title: 'Sub-label column', type: 'string', group: 'spec'}),
    defineField({name: 'delta', title: 'Delta column (ledger)', type: 'string', group: 'spec'}),
    defineField({name: 'date', title: 'Date column (timeline)', type: 'string', group: 'spec'}),
    defineField({name: 'a', title: 'Start column (dumbbell)', type: 'string', group: 'spec'}),
    defineField({name: 'b', title: 'End column (dumbbell)', type: 'string', group: 'spec'}),
    defineField({name: 'aName', type: 'string', group: 'spec'}),
    defineField({name: 'bName', type: 'string', group: 'spec'}),
    defineField({name: 'figures', type: 'array', of: [{type: 'object', fields: [{name: 'label', type: 'string'}, {name: 'value', type: 'string'}, {name: 'sub', type: 'string'}]}], hidden: ({parent}) => parent?.presentation !== 'figures', group: 'spec'}),
    defineField({name: 'source', title: 'Public source line', type: 'string', description: 'e.g. Source: USAspending, FPDS contract actions', group: 'spec'}),
    defineField({name: 'result', title: 'Frozen result (JSON)', type: 'text', rows: 10, description: '{"takenAt","columns","rows"}', group: 'data'}),
    defineField({name: 'takenAt', type: 'date', group: 'data'}),
    defineField({name: 'queryId', title: 'Query id (internal)', type: 'string', group: 'internal'}),
    defineField({name: 'params', title: 'Query parameters (internal)', type: 'text', rows: 2, group: 'internal'}),
    defineField({name: 'artifact', title: 'Artifact stamp (internal)', type: 'string', group: 'internal'}),
  ],
  preview: {
    select: {heading: 'heading', presentation: 'presentation', form: 'form', takenAt: 'takenAt'},
    prepare: ({heading, presentation, form, takenAt}) => ({title: heading || presentation, subtitle: `${presentation}${form ? ' · ' + form : ''} · as of ${takenAt ?? '—'}`}),
  },
})
