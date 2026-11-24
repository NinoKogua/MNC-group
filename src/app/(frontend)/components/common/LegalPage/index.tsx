export type LegalSection = { title: string; paragraphs: string[]; list?: string[] }

type Props = {
  title: string
  updated: string
  intro: string
  sections: LegalSection[]
}

export default function LegalPage({ title, updated, intro, sections }: Props) {
  return (
    <section className="bg-beige-50 py-12 lg:py-20 px-4">
      <article className="bg-white-primary max-w-4xl mx-auto px-6 md:px-10 py-10 rounded-2xl">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">{title}</h1>
        <p className="text-sm text-gray-500 mb-6">{updated}</p>
        <p className="mb-8 leading-relaxed">{intro}</p>
        {sections.map((section) => (
          <div key={section.title} className="mb-8">
            <h2 className="text-xl font-bold mb-3">{section.title}</h2>
            {section.paragraphs.map((p) => (
              <p key={p} className="mb-3 leading-relaxed">
                {p}
              </p>
            ))}
            {section.list && (
              <ul className="list-disc pl-6 space-y-1 leading-relaxed">
                {section.list.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </article>
    </section>
  )
}
