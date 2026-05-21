import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { fileURLToPath } from 'url'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: 'users',
  },

  localization: {
    locales: [
      { label: 'English', code: 'en' },
      { label: 'ქართული', code: 'ka' },
    ],
    defaultLocale: 'en',
    fallback: true,
  },

  collections: [
    {
      slug: 'users',
      auth: true,
      fields: [],
    },

    {
      slug: 'posts',
      admin: {
        useAsTitle: 'title',
      },
      hooks: {
        beforeValidate: [
          ({ data }) => {
            if (!data) return data

            const enTitle = typeof data.title === 'object' ? data.title.en : data.title

            if (enTitle) {
              data.slug = enTitle
                .toLowerCase()
                .trim()
                .replace(/[^\w\s-]/g, '')
                .replace(/\s+/g, '-')
                .replace(/-+/g, '-')
            }

            return data
          },
        ],
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          localized: true,
        },
        {
          name: 'slug',
          type: 'text',
          unique: true,
          admin: {
            readOnly: true,
            description: 'ავტომატურად გენერირდება ინგლისური სათაურიდან',
          },
        },
        {
          name: 'excerpt',
          type: 'textarea',
          localized: true,
        },
        {
          name: 'content',
          type: 'richText',
          localized: true,
        },
        {
          name: 'coverImage',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'publishedAt',
          type: 'date',
        },
        {
          name: 'status',
          type: 'select',
          options: ['draft', 'published'],
          defaultValue: 'draft',
        },
      ],
    },

    {
      slug: 'media',
      upload: true,
      fields: [
        {
          name: 'alt',
          type: 'text',
          localized: true,
        },
      ],
    },

    {
      slug: 'contact-info',
      admin: {
        useAsTitle: 'label',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          admin: {
            description: 'მხოლოდ ადმინისთვის (მაგ: "მთავარი საკონტაქტო")',
          },
        },
        {
          name: 'phone',
          type: 'text',
        },
        {
          name: 'email',
          type: 'text',
        },
        {
          name: 'address',
          type: 'text',
          localized: true,
        },
        {
          name: 'mapEmbed',
          type: 'textarea',
          admin: {
            description: 'Google Maps embed URL',
          },
        },
        {
          name: 'tagline',
          type: 'text',
          localized: true,
          admin: {
            description: 'მაგ: "არ დაელოდო დაგვიკავშირდი დღესვე"',
          },
        },
        {
          name: 'title',
          type: 'text',
          localized: true,
          admin: {
            description: 'მაგ: "საკონტაქტო ინფორმაცია"',
          },
        },
      ],
    },
  ],

  editor: lexicalEditor({}),

  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI,
    },
  }),

  secret: process.env.PAYLOAD_SECRET || '',

  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
})
