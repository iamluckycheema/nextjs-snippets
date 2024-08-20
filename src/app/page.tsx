import { db } from '@/db'
import Link from 'next/link'

/*1. disable cache (outside API or data might be diffirent with each request)
export const dynamic = 'force-dynamic'
2. time-based caching (maybe redit example)
export const revalidate = 0 //(seconds - 0 will disable caching)
3. when you are sure that data changed manual revalidation (edit or delete or add)
import { revelidatePath } from 'next/cache'
revalidatePath('/route'); 
*/

export default async function Home() {
  const snippets = await db.snippet.findMany()

  const renderedSnippets = snippets.map((snippet) => {
    return (
      <Link
        href={`/snippets/${snippet.id}`}
        className="flex justify-between items-center p-2 border rounded"
        key={snippet.id}
      >
        <div>{snippet.title}</div>
        <div>View</div>
      </Link>
    )
  })
  return (
    <div>
      <div className="flex my-2 justify-between items-center">
        <h1 className="text-xl font-bold">Snippets</h1>
        <Link href={'/snippets/new'} className="border p-2 rounded">
          New
        </Link>
      </div>
      <div className="flex flex-col gap-2">{renderedSnippets}</div>
    </div>
  )
}
