'use server'
import { revalidatePath } from 'next/cache'

import { db } from '@/db'
import { redirect } from 'next/navigation'

export async function updateSnippet(id: number, code: string) {
  await db.snippet.update({
    where: { id },
    data: { code },
  })

  revalidatePath(`/snippets/${id}`)
  redirect(`/snippets/${id}`)
}

export async function deleteSnippet(id: number) {
  await db.snippet.delete({ where: { id } })

  revalidatePath('/')
  redirect(`/`)
}

export async function createSnippet(
  formState: { message: string },
  formData: FormData
) {
  const title = formData.get('title')
  const code = formData.get('code')

  if (typeof title !== 'string' || title.length < 3) {
    return {
      message: 'Title must be longer.',
    }
  }
  if (typeof code !== 'string' || code.length < 10) {
    return {
      message: 'Code must be longer.',
    }
  }

  try {
    const snippet = await db.snippet.create({
      data: {
        title,
        code,
      },
    })
  } catch (e: unknown) {
    if (e instanceof Error) {
      return {
        message: e.message,
      }
    }
  }

  revalidatePath('/')
  redirect('/')
}
