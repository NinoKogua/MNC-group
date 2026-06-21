import React from 'react'
import Image from 'next/image'
import AppButton from '@/app/(frontend)/components/ui/AppButton'

interface ProjectFeatureProps {
  title: string
  description?: string
  image: string
  isLarge?: boolean
  tags?: string
}

const ProjectFeatureCard: React.FC<ProjectFeatureProps> = ({
  title,
  description,
  image,
  isLarge = false,
  tags,
}) => {
  // Grid განლაგება შენი ნიმუშის მიხედვით
  const cardClasses = isLarge ? 'col-span-1 h-[500px] md:h-full' : 'col-span-1 row-span-1 h-[450px]'

  return (
    <div className={`relative rounded-2xl overflow-hidden shadow-xl group ${cardClasses}`}>
      {/* ფონური სურათი Next.js Image-ით (background-image-ის ეფექტით) */}
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-110"
        priority={isLarge}
      />

      {/* Overlay - ზუსტად black/40 -> black/20 გადასვლა */}
      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300"></div>

      {/* Content - p-6 md:p-10 */}
      <div className="absolute inset-0 p-6 md:p-10 flex flex-col justify-end text-white z-10">
        {isLarge && tags && (
          <div className="mb-4">
            <span className="inline-block bg-white/20 text-white text-xs font-bold py-1 px-3 rounded-full backdrop-blur-sm">
              {tags}
            </span>
          </div>
        )}

        <h3 className="text-2xl md:text-3xl font-extrabold mb-3 leading-tight">{title}</h3>

        {isLarge && description && (
          <p className="text-base font-medium mb-6 max-w-lg">{description}</p>
        )}
      </div>
    </div>
  )
}

export default ProjectFeatureCard
