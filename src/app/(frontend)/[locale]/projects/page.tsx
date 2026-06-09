import { getPayload } from 'payload'
import config from '@payload-config'
import DoorAnimation from '../../components/common/DoorAnimation/index'
import ProjectsClient from './ProjectsClient'

type Props = {
  params: Promise<{ locale: string }>
}

export default async function ProjectsPage({ params }: Props) {
  const { locale } = await params
  const payload = await getPayload({ config })

  const { docs: projects } = (await payload.find({
    collection: 'projects' as any,
    locale: locale as 'en' | 'ka',
    depth: 2,
    limit: 100,
  })) as unknown as { docs: any[] }

  return (
    <DoorAnimation>
      <ProjectsClient projects={projects} locale={locale} />
    </DoorAnimation>
  )
}