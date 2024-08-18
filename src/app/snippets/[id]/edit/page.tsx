import { db } from '@/db'
import { notFound } from 'next/navigation'
import SnippetEitForm from '@/components/snippet-edit-form'

interface SnippetEditProps {
  params: {
    id: string
  }
}
export default async function EditSnippet(props: SnippetEditProps) {
  const id = parseInt(props.params.id)

  const snippet = await db.snippet.findFirst({
    where: { id },
  })

  if (!snippet) {
    notFound()
  }

  return (
    <div>
      <SnippetEitForm snippet={snippet} />
    </div>
  )
}
