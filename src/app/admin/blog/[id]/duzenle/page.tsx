import BlogFormPage from './components/BlogFormPage'

interface BlogEditPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function BlogEditPage({ params }: BlogEditPageProps) {
  const { id } = await params
  return <BlogFormPage blogId={id} />
}
