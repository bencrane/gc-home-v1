import {defineField, defineType} from 'sanity'

export const series = defineType({
  name: 'series',
  title: 'Series',
  type: 'document',
  fields: [
    defineField({name: 'title', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'slug', type: 'slug', options: {source: 'title'}, validation: (r) => r.required()}),
    defineField({name: 'description', type: 'text', rows: 2}),
  ],
})
