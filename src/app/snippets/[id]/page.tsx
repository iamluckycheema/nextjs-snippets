import { db } from '@/db'
import Link from 'next/link'
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
      <div className="flex my-4 justify-between items-center">
        <h1 className=" text-xl font-bold">{snippet.title}</h1>
        <div className="flex gap-2">
          <Link
            href={`/snippets/${snippet.id}/edit`}
            className="p-2 border rounded"
          >
            Edit
          </Link>
          <button className="p-2 border rounded">Delete</button>
        </div>
      </div>
      <pre className="p-3 border rounded bg-gray-200 border-gray-200">
        <code>{snippet.code}</code>
      </pre>
    </div>
  )
}
