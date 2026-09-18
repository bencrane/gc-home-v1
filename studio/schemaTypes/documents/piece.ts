import {defineField, defineType} from 'sanity'

export const piece = defineType({
  name: 'piece',
  title: 'Piece',
  type: 'document',
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'meta', title: 'Metadata'},
  ],
  fields: [
    defineField({name: 'title', type: 'string', validation: (r) => r.required(), group: 'content'}),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {source: 'title', maxLength: 96},
      validation: (r) => r.required(),
      group: 'meta',
    }),
    defineField({
      name: 'dek',
      title: 'Dek',
      description: 'One-sentence standfirst under the title.',
      type: 'text',
      rows: 2,
      group: 'content',
    }),
    defineField({
      name: 'section',
      type: 'string',
      options: {list: [{title: 'Markets', value: 'markets'}, {title: 'Briefings', value: 'briefings'}], layout: 'radio'},
      validation: (r) => r.required(),
      group: 'meta',
    }),
    defineField({name: 'series', type: 'reference', to: [{type: 'series'}], group: 'meta'}),
    defineField({name: 'byline', type: 'reference', to: [{type: 'author'}], group: 'meta'}),
    defineField({
      name: 'status',
      type: 'string',
      options: {list: ['draft', 'review', 'published', 'corrected'], layout: 'radio'},
      initialValue: 'draft',
      validation: (r) => r.required(),
      group: 'meta',
    }),
    defineField({name: 'publishedAt', type: 'datetime', group: 'meta'}),
    defineField({
      name: 'correction',
      description: 'Dated note shown when status is corrected.',
      type: 'text',
      rows: 3,
      group: 'meta',
      hidden: ({document}) => document?.status !== 'corrected',
    }),
    defineField({
      name: 'body',
      type: 'array',
      group: 'content',
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Body', value: 'normal'},
            {title: 'H2', value: 'h2'},
            {title: 'H3', value: 'h3'},
          ],
          lists: [{title: 'Bullet', value: 'bullet'}, {title: 'Numbered', value: 'number'}],
          marks: {
            decorators: [{title: 'Emphasis', value: 'em'}, {title: 'Strong', value: 'strong'}, {title: 'Code', value: 'code'}],
            annotations: [
              {name: 'link', type: 'object', fields: [{name: 'href', type: 'url', validation: (r: any) => r.required()}]},
            ],
          },
        },
        {type: 'dataBlock'},
        {type: 'awardRef'},
        {type: 'pullQuote'},
      ],
    }),
  ],
  orderings: [
    {title: 'Published, newest', name: 'publishedDesc', by: [{field: 'publishedAt', direction: 'desc'}]},
  ],
  preview: {
    select: {title: 'title', section: 'section', status: 'status', date: 'publishedAt'},
    prepare: ({title, section, status, date}) => ({
      title,
      subtitle: [section?.toUpperCase(), status, date?.slice(0, 10)].filter(Boolean).join(' · '),
    }),
  },
})
