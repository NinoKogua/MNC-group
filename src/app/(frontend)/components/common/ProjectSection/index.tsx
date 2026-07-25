import { getPayload } from 'payload'
import configPromise from '@payload-config'
import ProjectCard, { type ProjectCardData } from '../ProjectCard'

type PayloadImage = { url?: string | null; alt?: string | null }

type ProjectDoc = {
  id: string | number
  slug?: string | null
  title: string
  description?: unknown
  price?: number | null
  coverImage?: PayloadImage | string | null
  gallery?: { image?: PayloadImage | string | null }[] | null
  highlights?: { icon?: string | null; label: string; value: string; unit?: string | null }[] | null
  showOnHomepage?: boolean | null
  homepageOrder?: number | null
}

type ApartmentDoc = {
  id: string | number
  project: string | number | { id: string | number }
  floor?: number | null
  area: number
  bedrooms?: number | null
  price?: number | null
  status?: 'available' | 'booked' | 'sold' | null
  gallery?: { image?: PayloadImage | string | null }[] | null
}

/** ფიჭვების კატეგორიის ამოცნობა სახელით (ka: ფიჭვები, en: Pines) */
const PINES_PATTERN = /ფიჭვ|pine/i

/**
 * სათადარიგო ტექსტი ბარათზე, თუ პროექტს ადმინში აღწერა არ აქვს შევსებული.
 * შესაცვლელად: Projects > პროექტი > description
 */
function fallbackDescription(apartmentCount: number, isKa: boolean): string {
  if (isKa) {
    return `პროექტში ${apartmentCount} ბინაა, სხვადასხვა ფართითა და გეგმარებით, ისე რომ ყველას თავისი ვარიანტი მოუნახოს. თითოეულ ბინაზე ნახავ ფოტოებს, ოთახების ზუსტ ფართობებს და მიმდინარე სტატუსს, ანუ თავისუფალია თუ უკვე დაჯავშნილი.`
  }

  return `The project has ${apartmentCount} apartments in a range of sizes and layouts, so there is something for most needs. For each one you can see photos, exact room areas and whether it is still available or already booked.`
}

/** ლექსიკალური richText-იდან უბრალო ტექსტის ამოღება (ბარათის აღწერისთვის) */
function richTextToPlainText(value: unknown): string {
  if (!value || typeof value !== 'object') return ''

  const collect = (node: any): string => {
    if (!node || typeof node !== 'object') return ''
    if (typeof node.text === 'string') return node.text
    if (Array.isArray(node.children)) return node.children.map(collect).join('')
    return ''
  }

  const root = (value as any).root
  if (!root || !Array.isArray(root.children)) return ''

  return root.children
    .map(collect)
    .filter(Boolean)
    .join(' ')
    .trim()
}

function resolveImageUrl(image: PayloadImage | string | null | undefined): string {
  if (!image) return ''
  if (typeof image === 'string') return ''
  return image.url ?? ''
}

/**
 * ბარათის 4 პატარა სურათი ბინების რენდერებიდან.
 * ერთ ბინაზე ერთი სურათი ვიღებთ (round-robin), რომ ვიზუალი მრავალფეროვანი იყოს.
 */
function pickRenderImages(apartments: ApartmentDoc[], count: number): string[] {
  const galleries = apartments.map((apartment) =>
    (apartment.gallery ?? []).map((item) => resolveImageUrl(item?.image)).filter(Boolean),
  )

  const picked: string[] = []
  const maxLength = Math.max(0, ...galleries.map((gallery) => gallery.length))

  for (let index = 0; index < maxLength && picked.length < count; index++) {
    for (const gallery of galleries) {
      const url = gallery[index]
      if (url && !picked.includes(url) && picked.length < count) picked.push(url)
    }
  }

  return picked
}

function relationId(value: ApartmentDoc['project']): string {
  if (value && typeof value === 'object') return String(value.id)
  return String(value)
}

/** ბინების მიხედვით ბარათის მახასიათებლების აწყობა */
function buildHighlightsFromApartments(apartments: ApartmentDoc[], isKa: boolean) {
  const details: ProjectCardData['details'] = []

  const bedrooms = apartments.map((a) => a.bedrooms).filter((n): n is number => typeof n === 'number')
  const areas = apartments.map((a) => a.area).filter((n): n is number => typeof n === 'number')
  const floors = apartments.map((a) => a.floor).filter((n): n is number => typeof n === 'number')
  const available = apartments.filter((a) => a.status !== 'sold')

  const range = (values: number[]) => {
    const min = Math.min(...values)
    const max = Math.max(...values)
    return min === max ? `${Math.round(min)}` : `${Math.round(min)}-${Math.round(max)}`
  }

  if (bedrooms.length) {
    details.push({
      icon: 'bed',
      label: isKa ? 'საძინებელი' : 'Bedrooms',
      value: range(bedrooms),
    })
  }

  if (floors.length) {
    details.push({
      icon: 'layers',
      label: isKa ? 'სართულები' : 'Floors',
      value: `${Math.max(...floors)}`,
    })
  }

  if (areas.length) {
    details.push({
      icon: 'area',
      label: isKa ? 'კვადრატულობა' : 'Area',
      value: range(areas),
      unit: 'M²',
    })
  }

  details.push({
    icon: 'building',
    label: isKa ? 'ბინები' : 'Apartments',
    value: `${apartments.length}`,
  })

  if (available.length) {
    details.push({
      icon: 'key',
      label: isKa ? 'თავისუფალი' : 'Available',
      value: `${available.length}`,
    })
  }

  return details.slice(0, 5)
}

export default async function ProjectSection({ locale }: { locale: string }) {
  const payload = await getPayload({ config: configPromise })
  const isKa = locale === 'ka'
  const typedLocale = locale as 'en' | 'ka'

  // 1. ფიჭვების კატეგორია
  const { docs: categories } = (await payload.find({
    collection: 'project-categories' as any,
    locale: typedLocale,
    limit: 50,
    depth: 0,
  })) as unknown as { docs: { id: string | number; name?: string | null }[] }

  const pinesCategory = categories.find((category) => PINES_PATTERN.test(category.name ?? ''))

  // 2. ამ კატეგორიის პროექტები (თუ კატეგორია ვერ მოიძებნა, ვიღებთ ყველა პროექტს)
  const { docs: projects } = (await payload.find({
    collection: 'projects' as any,
    locale: typedLocale,
    where: pinesCategory ? { parentCategory: { equals: pinesCategory.id } } : {},
    sort: 'homepageOrder',
    limit: 50,
    depth: 2,
  })) as unknown as { docs: ProjectDoc[] }

  if (!projects.length) return null

  // 3. ამ პროექტების ბინები
  const { docs: apartments } = (await payload.find({
    collection: 'apartments' as any,
    where: { project: { in: projects.map((project) => project.id) } },
    limit: 1000,
    depth: 1,
  })) as unknown as { docs: ApartmentDoc[] }

  const apartmentsByProject = new Map<string, ApartmentDoc[]>()
  for (const apartment of apartments) {
    const key = relationId(apartment.project)
    apartmentsByProject.set(key, [...(apartmentsByProject.get(key) ?? []), apartment])
  }

  // 4. ვირჩევთ ერთ პროექტს, რომელსაც ბინები აქვს
  const withApartments = projects.filter((project) =>
    apartmentsByProject.has(String(project.id)),
  )

  if (!withApartments.length) return null

  const project =
    withApartments.find((candidate) => candidate.showOnHomepage) ??
    withApartments.reduce((best, candidate) =>
      (apartmentsByProject.get(String(candidate.id))?.length ?? 0) >
      (apartmentsByProject.get(String(best.id))?.length ?? 0)
        ? candidate
        : best,
    )

  const projectApartments = apartmentsByProject.get(String(project.id)) ?? []

  // 5. ფასი ადმინიდან, ან ბინების ყველაზე დაბალი ფასი
  const apartmentPrices = projectApartments
    .map((apartment) => apartment.price)
    .filter((price): price is number => typeof price === 'number' && price > 0)

  const price =
    typeof project.price === 'number'
      ? project.price
      : apartmentPrices.length
        ? Math.min(...apartmentPrices)
        : undefined

  // მახასიათებლები ადმინიდან, ან ბინებიდან დათვლილი
  const cmsHighlights = (project.highlights ?? []).map((highlight) => ({
    icon: highlight.icon ?? undefined,
    label: highlight.label,
    value: highlight.value,
    unit: highlight.unit ?? undefined,
  }))

  // 4 პატარა სურათი: მთავარია პროექტის გალერეა, დანაკლისი ბინების რენდერებიდან ივსება
  const projectGallery = (project.gallery ?? [])
    .map((item) => resolveImageUrl(item?.image))
    .filter(Boolean)

  const renderImages = pickRenderImages(projectApartments, 4)
  const smallImages = [
    ...projectGallery,
    ...renderImages.filter((url) => !projectGallery.includes(url)),
  ].slice(0, 4)

  const card: ProjectCardData = {
    mainImage: resolveImageUrl(project.coverImage),
    smallImages,
    title: project.title,
    description:
      richTextToPlainText(project.description) ||
      fallbackDescription(projectApartments.length, isKa),
    price: price !== undefined ? price.toLocaleString('en-US') : undefined,
    details: cmsHighlights.length
      ? cmsHighlights
      : buildHighlightsFromApartments(projectApartments, isKa),
    href: project.slug ? `/${locale}/projects/${project.slug}` : undefined,
    ctaLabel: isKa ? 'სრულად' : 'View more',
  }

  return (
    <section className="bg-beige-50 py-12 lg:py-16">
      <div className="max-w-[1440px] mx-auto px-4">
        {/* სათაურის ბლოკი */}
        <div className="text-center mb-6 lg:mb-8">
          <h2 className="text-4xl font-kirovi font-extrabold text-gray-800 mb-4">
            {isKa ? 'ჩვენი პროექტები' : 'Our Projects'}
          </h2>
          <p className="text-lg text-gray-600 font-medium max-w-2xl mx-auto">
            {isKa
              ? 'თანამედროვე არქიტექტურით და ეკოლოგიურად სუფთა მასალით'
              : 'Modern architecture built with eco-friendly materials'}
          </p>
        </div>

        {/* პროექტის ბარათი */}
        <ProjectCard project={card} />
      </div>
    </section>
  )
}
