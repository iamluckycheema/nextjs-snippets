import { db } from '@/db'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import * as actions from '@/actions'
import { Snippet } from 'next/font/google'

/*
[id] due to dynamic routing this will always be dynamic
but we can force cache it.
using 'generateStaticParams'
will get all current data and forEach id it will make a cached page collection collection 
keep in mind all will happen at build time
*/

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

  const deleteSnippetAction = actions.deleteSnippet.bind(null, snippet.id)

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
          <form action={deleteSnippetAction}>
            <button type="submit" className="p-2 border rounded">
              Delete
            </button>
          </form>
        </div>
      </div>
      <pre className="p-3 border rounded bg-gray-200 border-gray-200">
        <code>{snippet.code}</code>
      </pre>
    </div>
  )
}

export async function generateStaticParams() {
  const snippets = await db.snippet.findMany()

  return snippets.map((snippet) => {
    return {
      id: snippet.id.toString(),
    }
  })
}
