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
      slug: 'hero-slides',
      admin: {
        useAsTitle: 'title',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          localized: true,
        },
        {
          name: 'highlight',
          type: 'text',
          localized: true,
        },
        {
          name: 'description',
          type: 'textarea',
          localized: true,
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'order',
          type: 'number',
          defaultValue: 0,
          admin: {
            description: 'სლაიდების თანმიმდევრობა (0, 1, 2...)',
          },
        },
        {
          name: 'primaryButtonText',
          type: 'text',
          localized: true,
        },
        {
          name: 'secondaryButtonText',
          type: 'text',
          localized: true,
        },
      ],
    },

    {
      slug: 'why-us',
      admin: {
        useAsTitle: 'sectionTitle',
      },
      fields: [
        {
          name: 'sectionTitle',
          type: 'text',
          localized: true,
        },
        {
          name: 'sectionSubtitle',
          type: 'text',
          localized: true,
        },
        {
          name: 'features',
          type: 'array',
          fields: [
            {
              name: 'icon',
              type: 'select',
              options: [
                { label: 'Home', value: 'home' },
                { label: 'Shield', value: 'shield' },
                { label: 'Cube', value: 'cube' },
                { label: 'Stars', value: 'stars' },
              ],
            },
            {
              name: 'title',
              type: 'text',
              localized: true,
            },
            {
              name: 'description',
              type: 'textarea',
              localized: true,
            },
          ],
        },
        {
          name: 'ctaTitle',
          type: 'text',
          localized: true,
        },
        {
          name: 'ctaDescription',
          type: 'textarea',
          localized: true,
        },
        {
          name: 'ctaBadges',
          type: 'array',
          fields: [
            {
              name: 'text',
              type: 'text',
              localized: true,
            },
          ],
        },
      ],
    },

    {
      slug: 'blog-page',
      admin: {
        useAsTitle: 'heroTitle',
      },
      fields: [
        {
          name: 'heroBadge',
          type: 'text',
          localized: true,
        },
        {
          name: 'heroTitle',
          type: 'text',
          localized: true,
        },
      ],
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
      slug: 'projects',
      admin: {
        useAsTitle: 'title',
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
          name: 'description',
          type: 'richText',
          localized: true,
        },
        {
          name: 'status',
          type: 'select',
          localized: true,
          options: [
            { label: 'მიმდინარე / Ongoing', value: 'ongoing' },
            { label: 'დასრულებული / Completed', value: 'completed' },
          ],
          defaultValue: 'ongoing',
        },
        {
          name: 'location',
          type: 'text',
          localized: true,
        },
        {
          name: 'category',
          type: 'text',
          localized: true,
        },
        {
          name: 'coverImage',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'gallery',
          type: 'array',
          fields: [
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
          ],
        },
      ],
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
    },

    {
      slug: 'restaurant-page',
      admin: {
        useAsTitle: 'heroTitle',
      },
      fields: [
        {
          name: 'heroTitle',
          type: 'text',
          localized: true,
        },
        {
          name: 'heroDescription',
          type: 'textarea',
          localized: true,
        },
        {
          name: 'menuTitle',
          type: 'text',
          localized: true,
        },
        {
          name: 'reservationTitle',
          type: 'text',
          localized: true,
        },
        {
          name: 'reservationDescription',
          type: 'textarea',
          localized: true,
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
          name: 'heroBadge',
          type: 'text',
          localized: true,
          admin: {
            description: 'მაგ: "ნებისმიერ დროს"',
          },
        },
        {
          name: 'heroTitle',
          type: 'text',
          localized: true,
          admin: {
            description: 'მაგ: "დაგვიკავშირდით"',
          },
        },
        {
          name: 'heroDescription',
          type: 'textarea',
          localized: true,
          admin: {
            description: 'მაგ: "ჩვენი გუნდი მზად არის დაგეხმაროთ ნებისმიერ საკითხში"',
          },
        },
        {
          name: 'formBadge',
          type: 'text',
          localized: true,
        },

        {
          name: 'formTitle',
          type: 'text',
          localized: true,
        },

        {
          name: 'formDescription',
          type: 'textarea',
          localized: true,
        },

        {
          name: 'namePlaceholder',
          type: 'text',
          localized: true,
        },

        {
          name: 'emailPlaceholder',
          type: 'text',
          localized: true,
        },

        {
          name: 'phonePlaceholder',
          type: 'text',
          localized: true,
        },

        {
          name: 'messagePlaceholder',
          type: 'text',
          localized: true,
        },

        {
          name: 'submitButtonText',
          type: 'text',
          localized: true,
        },

        {
          name: 'loadingButtonText',
          type: 'text',
          localized: true,
        },

        {
          name: 'successMessage',
          type: 'text',
          localized: true,
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
