import {defineField, defineType} from 'sanity'

/** An inline reference to a single award or recipient, with a frozen summary. */
export const awardRef = defineType({
  name: 'awardRef',
  title: 'Award reference',
  type: 'object',
  fields: [
    defineField({
      name: 'kind',
      type: 'string',
      options: {list: [{title: 'Award (PIID)', value: 'piid'}, {title: 'Recipient (UEI)', value: 'uei'}], layout: 'radio'},
      validation: (r) => r.required(),
    }),
    defineField({name: 'id', title: 'PIID or UEI', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'summary', title: 'Frozen summary (JSON)', type: 'text', rows: 6}),
    defineField({name: 'takenAt', type: 'datetime'}),
  ],
  preview: {
    select: {kind: 'kind', id: 'id'},
    prepare: ({kind, id}) => ({title: id, subtitle: kind?.toUpperCase()}),
  },
})
