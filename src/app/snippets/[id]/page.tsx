import { db } from '@/db'
import { notFound } from 'next/navigation'

interface SnippetProps {
  params: {
    id: string
  }
}

export default async function ShowSnippet(props: SnippetProps) {
  const snippet = await db.snippet.findFirst({
    where: { id: parseInt(props.params.id) },
  })

  if (!snippet) {
    return notFound()
  }

  return (
    <div>
      <div>{snippet.title}</div>
    </div>
  )
}
