import EgitimFormPage from './components/EgitimFormPage'

interface EgitimEditPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function EgitimEditPage({ params }: EgitimEditPageProps) {
  const { id } = await params
  return <EgitimFormPage egitimId={id} />
}
