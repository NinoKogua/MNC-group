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
          name: 'primaryButtonLink',
          type: 'text',
          admin: {
            description: 'ბმული სადაც გადავა "გაიგე მეტი" ღილაკზე დაჭერისას (მაგ. /projects)',
          },
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
            description: 'თანმიმდევრობა (large card უნდა იყოს 0).',
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
              'ავტომატურად გენერირდება ინგლისური სათაურიდან პირველად შენახვისას. თუ გინდა, ხელით შეცვალე და მერე ავტომატურად აღარ გადაიწერება.',
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
          admin: {
            description:
              'მთავარ გვერდზე ბარათის 4 პატარა ფოტო აქედან იღება (პირველი ოთხი). თუ ცარიელს დატოვებ, ავტომატურად ჩაისმევა ბინების რენდერები.',
          },
          fields: [
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
          ],
        },
        {
          name: 'price',
          type: 'number',
          label: 'ფასი (დან)',
          admin: {
            description:
              'მთავარ გვერდზე ბარათზე გამოსახული ფასი. თუ ცარიელს დატოვებ, აიღება ბინების ყველაზე დაბალი ფასი.',
          },
        },
        {
          name: 'highlights',
          type: 'array',
          label: 'მოკლე მახასიათებლები (მთავარი გვერდის ბარათი)',
          maxRows: 5,
          admin: {
            description:
              'თუ ცარიელს დატოვებ, ავტომატურად დაითვლება პროექტის ბინებიდან. მაგალითად: საძინებელი 4, კვადრატულობა 1024 M²',
          },
          fields: [
            {
              name: 'icon',
              type: 'select',
              label: 'იკონი',
              defaultValue: 'bed',
              options: [
                { label: 'საძინებელი / Bed', value: 'bed' },
                { label: 'აშენდა / Calendar', value: 'calendar' },
                { label: 'სართულები / Layers', value: 'layers' },
                { label: 'სააბაზანო / Bath', value: 'bath' },
                { label: 'კვადრატულობა / Area', value: 'area' },
                { label: 'ბინები / Building', value: 'building' },
                { label: 'თავისუფალი / Key', value: 'key' },
              ],
            },
            {
              name: 'label',
              type: 'text',
              required: true,
              localized: true,
            },
            {
              name: 'value',
              type: 'text',
              required: true,
              localized: true,
            },
            {
              name: 'unit',
              type: 'text',
              localized: true,
            },
          ],
        },
        {
          name: 'showOnHomepage',
          type: 'checkbox',
          label: 'გამოჩნდეს მთავარ გვერდზე ("ჩვენი პროექტები")',
          defaultValue: false,
          admin: {
            position: 'sidebar',
            description:
              'მთავარ გვერდზე ერთი პროექტი ჩანს და ეს არჩევანი პრიორიტეტულია. თუ არცერთი არაა მონიშნული, აირჩევა ის პროექტი, რომელსაც ყველაზე მეტი ბინა აქვს.',
          },
        },
        {
          name: 'homepageOrder',
          type: 'number',
          label: 'თანმიმდევრობა მთავარ გვერდზე',
          defaultValue: 0,
          admin: {
            position: 'sidebar',
          },
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
            description: 'მაგალითად: საძინებელი 1 (12.26), აბაზანა (3.91)',
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
      slug: 'about-page',
      access: {
        read: () => true,
      },
      admin: {
        useAsTitle: 'label',
        description: '"ჩვენ შესახებ" გვერდის მთლიანი კონტენტი. საკმარისია ერთი ჩანაწერი.',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          admin: {
            description: 'მხოლოდ ადმინისთვის (მაგალითად: "ჩვენ შესახებ").',
          },
        },

        /* ჰერო */
        {
          name: 'heroBadge',
          type: 'text',
          label: 'ზედა პატარა წარწერა',
          localized: true,
          admin: {
            description: 'მაგალითად: ფიჭვები 2010',
          },
        },
        {
          name: 'heroTitle',
          type: 'textarea',
          label: 'ჰეროს სათაური',
          localized: true,
          admin: {
            description: 'ახალი ხაზი იქ გადადის, სადაც Enter-ს დააჭერ.',
          },
        },
        {
          name: 'heroDescription',
          type: 'textarea',
          label: 'ჰეროს ტექსტი',
          localized: true,
        },
        {
          name: 'heroStats',
          type: 'array',
          label: 'ჰეროს ციფრები (ორი ბარათი)',
          maxRows: 2,
          fields: [
            {
              name: 'label',
              type: 'text',
              label: 'ზედა წარწერა (მაგალითად: გამოცდილება)',
              localized: true,
              required: true,
            },
            {
              name: 'value',
              type: 'number',
              label: 'ციფრი',
              required: true,
            },
            {
              name: 'suffix',
              type: 'text',
              label: 'ციფრის შემდეგ სიმბოლო (მაგალითად: +)',
              defaultValue: '+',
            },
            {
              name: 'caption',
              type: 'text',
              label: 'ქვედა წარწერა (მაგალითად: წელი ბაზარზე)',
              localized: true,
            },
          ],
        },
        {
          name: 'heroImages',
          type: 'array',
          label: 'ჰეროს ფოტოები (ორი ცალი)',
          maxRows: 2,
          fields: [
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
          ],
        },

        /* ისტორია */
        {
          name: 'timelineBadge',
          type: 'text',
          label: 'ისტორიის სექციის პატარა წარწერა',
          localized: true,
        },
        {
          name: 'timelineTitle',
          type: 'text',
          label: 'ისტორიის სექციის სათაური',
          localized: true,
        },
        {
          name: 'timeline',
          type: 'array',
          label: 'ისტორიის ეტაპები',
          fields: [
            {
              name: 'year',
              type: 'number',
              label: 'წელი',
              required: true,
            },
            {
              name: 'title',
              type: 'text',
              label: 'სათაური',
              localized: true,
              required: true,
            },
            {
              name: 'description',
              type: 'textarea',
              label: 'აღწერა',
              localized: true,
            },
          ],
        },

        /* მისია */
        {
          name: 'missionTitle',
          type: 'text',
          label: 'მისიის სათაური',
          localized: true,
        },
        {
          name: 'missionTitleHighlight',
          type: 'text',
          label: 'მისიის სათაურის ფერადი ნაწილი',
          localized: true,
        },
        {
          name: 'missionDescription',
          type: 'textarea',
          label: 'მისიის ტექსტი',
          localized: true,
        },
        {
          name: 'missionFeatures',
          type: 'array',
          label: 'მისიის ჩამონათვალი',
          fields: [
            {
              name: 'text',
              type: 'text',
              localized: true,
              required: true,
            },
          ],
        },
        {
          name: 'missionImage',
          type: 'upload',
          relationTo: 'media',
          label: 'მისიის ფოტო',
        },

        /* ხედვა */
        {
          name: 'visionTitle',
          type: 'text',
          label: 'ხედვის სათაური',
          localized: true,
        },
        {
          name: 'visionTitleHighlight',
          type: 'text',
          label: 'ხედვის სათაურის ფერადი ნაწილი',
          localized: true,
        },
        {
          name: 'visionDescription',
          type: 'textarea',
          label: 'ხედვის ტექსტი',
          localized: true,
        },
        {
          name: 'visionStats',
          type: 'array',
          label: 'ხედვის სექციის ციფრები',
          maxRows: 2,
          fields: [
            {
              name: 'value',
              type: 'text',
              label: 'ციფრი (მაგალითად: 500+)',
              required: true,
            },
            {
              name: 'label',
              type: 'text',
              label: 'წარწერა',
              localized: true,
              required: true,
            },
          ],
        },
        {
          name: 'visionImage',
          type: 'upload',
          relationTo: 'media',
          label: 'ხედვის ფოტო',
        },

        /* გუნდი */
        {
          name: 'teamBadge',
          type: 'text',
          label: 'გუნდის სექციის პატარა წარწერა',
          localized: true,
        },
        {
          name: 'teamTitle',
          type: 'text',
          label: 'გუნდის სექციის სათაური',
          localized: true,
        },
        {
          name: 'team',
          type: 'array',
          label: 'გუნდის წევრები',
          fields: [
            {
              name: 'name',
              type: 'text',
              label: 'სახელი და გვარი',
              localized: true,
              required: true,
            },
            {
              name: 'role',
              type: 'text',
              label: 'პოზიცია',
              localized: true,
            },
            {
              name: 'photo',
              type: 'upload',
              relationTo: 'media',
              label: 'ფოტო',
            },
            {
              name: 'facebookUrl',
              type: 'text',
              label: 'Facebook ბმული',
            },
            {
              name: 'instagramUrl',
              type: 'text',
              label: 'Instagram ბმული',
            },
            {
              name: 'whatsappUrl',
              type: 'text',
              label: 'WhatsApp/მესენჯერის ბმული',
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
    {
      slug: 'footer',
      admin: {
        useAsTitle: 'label',
        description: 'საიტის ფუტერის კონტენტი (ლოგოს გვერდით ტექსტი, სექციები, კონტაქტი)',
      },
      access: {
        read: () => true,
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          admin: {
            description: 'მხოლოდ ადმინისთვის (მაგ: "მთავარი ფუტერი")',
          },
        },
        {
          name: 'brandName',
          type: 'text',
          localized: true,
        },
        {
          name: 'copyrightText',
          type: 'text',
          localized: true,
        },
        {
          name: 'phone',
          type: 'text',
        },
        {
          name: 'addressText',
          type: 'text',
          localized: true,
        },
        {
          name: 'socialLinks',
          type: 'array',
          label: 'სოც. ქსელების ლინკები',
          fields: [
            {
              name: 'platform',
              type: 'select',
              options: [
                { label: 'Instagram', value: 'instagram' },
                { label: 'Facebook', value: 'facebook' },
              ],
              required: true,
            },
            {
              name: 'url',
              type: 'text',
              required: true,
            },
          ],
        },
        {
          name: 'sections',
          type: 'array',
          label: 'ფუტერის სექციები',
          fields: [
            {
              name: 'title',
              type: 'text',
              localized: true,
              required: true,
            },
            {
              name: 'links',
              type: 'array',
              fields: [
                {
                  name: 'label',
                  type: 'text',
                  localized: true,
                  required: true,
                },
                {
                  name: 'href',
                  type: 'text',
                  required: true,
                },
              ],
            },
          ],
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
