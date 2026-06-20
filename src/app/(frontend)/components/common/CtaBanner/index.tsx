type CtaBannerProps = {
  title?: string
  description?: string
  badges?: { text: string }[]
}

export default function CtaBanner({ title, description, badges }: CtaBannerProps) {
  return (
    <div className="bg-green-primary text-white py-12 md:py-16 px-6 md:px-12 rounded-xl text-center shadow-2xl">
      <h3 className="text-2xl md:text-3xl font-extrabold mb-4 font-kirovi">
        {title ?? 'განსაკუთრებული ლოკაცია'}
      </h3>

      <p className="max-w-3xl mx-auto text-base opacity-90 mb-8">
        {description ??
          'მანგლისის მშვიდი, კომფორტული, გამწვანებული გარემო განსაკუთრებული ჰავით, რომელიც ცნობილია თავისი სამკურნალო თვისებებით'}
      </p>

      <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-10 font-bold text-sm">
        {(
          badges ?? [{ text: '40 წუთი თბილისიდან' }, { text: 'მთის ჰაერი' }, { text: 'ფიჭვნარი' }]
        ).map((badge, index) => (
          <span key={index} className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-white-primary"></span>
            {badge.text}
          </span>
        ))}
      </div>
    </div>
  )
}
