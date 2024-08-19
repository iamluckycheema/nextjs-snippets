'use client'

import { useFormState } from 'react-dom'
import * as actions from '@/actions'

export default function NewSnippet() {
  const [formState, action] = useFormState(actions.createSnippet, {
    message: '',
  })

  return (
    <form action={action}>
      <h3 className="font-bold my-3">Create a snippet</h3>
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <label className="w-12" htmlFor="title">
            Title
          </label>
          <input
            name="title"
            className="border rounded p-2 w-full"
            id="title"
          />
        </div>
        <div className="flex gap-4">
          <label className="w-12" htmlFor="code">
            Code
          </label>
          <textarea
            name="code"
            className="border rounded p-2 w-full"
            id="code"
          />
        </div>
        {formState.message && (
          <div className="p-2 text-sm text-red-600 border rounded border-red-400 bg-red-200">
            {formState.message}
          </div>
        )}
        <button className="rounded p-2 bg-blue-200">Create</button>
      </div>
    </form>
  )
}
