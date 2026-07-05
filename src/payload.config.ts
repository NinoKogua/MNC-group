import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { s3Storage } from '@payloadcms/storage-s3'
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

  plugins: [
    s3Storage({
      collections: {
        media: {
          prefix: 'media',
          generateFileURL: ({ filename }: { filename: string }) => {
            return `${process.env.NEXT_PUBLIC_S3_PUBLIC_URL}/media/${filename}`
          },
        },
      },
      bucket: process.env.S3_BUCKET || '',
      config: {
        endpoint: process.env.S3_ENDPOINT,
        region: 'us-east-1',
        forcePathStyle: true,
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
        },
      },
    }),
  ],

  collections: [
    {
      slug: 'users',
      auth: true,
      fields: [],
    },

    {
      slug: 'hero-slides',
      access: {
        read: () => true,
      },
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
      access: {
        read: () => true,
      },
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
      slug: 'projects-featured',
      access: {
        read: () => true,
      },
      admin: {
        useAsTitle: 'order',
        defaultColumns: ['order', 'isLarge', 'image', 'updatedAt'],
        description: 'Homepage-ის featured projects grid-ის სურათები.',
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'isLarge',
          type: 'checkbox',
          label: 'Large Card (full width)',
          defaultValue: false,
          admin: {
            description: 'მონიშნე თუ ეს ბარათი სრულ სიგანეზე უნდა გამოჩნდეს. მხოლოდ ერთი.',
          },
        },
        {
          name: 'order',
          type: 'number',
          defaultValue: 0,
          admin: {
            description: 'თანმიმდევრობა — large card უნდა იყოს 0.',
            position: 'sidebar',
          },
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
      slug: 'project-categories',
      admin: {
        useAsTitle: 'name',
        description: 'მშობელი მიმართულებები / კატეგორიები (მაგ: ფიჭვები, რესტორანი)',
      },
      access: {
        read: () => true,
      },
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
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
      slug: 'projects',
      admin: {
        useAsTitle: 'title',
      },
      fields: [
        {
          name: 'parentCategory',
          type: 'relationship',
          relationTo: 'project-categories',
          required: true,
          label: 'მშობელი კატეგორია (ფიჭვები, რესტორანი...)',
          admin: {
            position: 'sidebar',
          },
        },
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
            description:
              'ავტომატურად გენერირდება ინგლისური სათაურიდან პირველად შენახვისას. თუ გინდა, შეგიძლია ხელით შეცვალო — მას შემდეგ აღარ გადაიწერება ავტომატურად.',
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
          async ({ data, req, operation, originalDoc }) => {
            if (!data) return data

            const existingSlug = data.slug ?? originalDoc?.slug
            if (existingSlug) {
              data.slug = existingSlug
              return data
            }

            let enTitle: string | undefined

            if (typeof data.title === 'object' && data.title !== null) {
              enTitle = data.title.en
            } else if (req.locale === 'en') {
              enTitle = data.title
            } else if (operation === 'update' && originalDoc?.id) {
              try {
                const enDoc = await req.payload.findByID({
                  collection: 'projects',
                  id: originalDoc.id,
                  locale: 'en',
                  depth: 0,
                })
                enTitle = enDoc?.title as string | undefined
              } catch {
                enTitle = undefined
              }
            } else {
              enTitle = data.title
            }

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
      slug: 'apartments',
      admin: {
        useAsTitle: 'apartmentNumber',
        defaultColumns: ['apartmentNumber', 'project', 'area', 'status'],
        description: 'პროექტების ბინები და აპარტამენტები',
      },
      access: {
        read: () => true,
      },
      fields: [
        {
          name: 'project',
          type: 'relationship',
          relationTo: 'projects',
          required: true,
          label: 'აირჩიეთ პროექტი (მაგ: ფიჭვები)',
        },
        {
          name: 'apartmentNumber',
          type: 'text',
          required: true,
          label: 'ბინის ნომერი / დასახელება',
        },
        {
          name: 'floor',
          type: 'number',
          label: 'სართული',
        },
        {
          name: 'area',
          type: 'number',
          label: 'საერთო ფართობი (კვ.მ)',
          required: true,
        },
        {
          name: 'bedrooms',
          type: 'number',
          label: 'საძინებლები',
        },
        {
          name: 'price',
          type: 'number',
          label: 'ფასი',
        },
        {
          name: 'status',
          type: 'select',
          label: 'სტატუსი',
          options: [
            { label: 'თავისუფალი', value: 'available' },
            { label: 'დაჯავშნილი', value: 'booked' },
            { label: 'გაყიდული', value: 'sold' },
          ],
          defaultValue: 'available',
        },
        {
          name: 'planImage',
          type: 'upload',
          relationTo: 'media',
          label: 'ბინის გეგმარების ფოტო',
        },
        {
          name: 'features',
          type: 'array',
          label: 'მახასიათებლები / სერვისები',
          fields: [
            {
              name: 'feature',
              type: 'text',
              localized: true,
            },
          ],
        },
        /* ==========================================================================
           ახალი ველი 1: ოთახების დეტალური ფართობები (ექსელის ცხრილისთვის)
           ========================================================================== */
        {
          name: 'roomsDetails',
          type: 'array',
          label: 'ოთახების დეტალური ფართობები',
          admin: {
            description: 'მაგალითად: საძინებელი 1 — 12.26, აბაზანა — 3.91',
          },
          fields: [
            {
              name: 'roomName',
              type: 'text',
              label: 'ოთახის დასახელება',
              required: true,
              localized: true,
            },
            {
              name: 'roomArea',
              type: 'number',
              label: 'ფართობი (კვ.მ)',
              required: true,
            },
          ],
        },
        /* ==========================================================================
           ახალი ველი 2: ბინის ინდივიდუალური გალერეა
           ========================================================================== */
        {
          name: 'gallery',
          type: 'array',
          label: 'ბინის ფოტოგალერეა (რენდერები / ხედები)',
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
