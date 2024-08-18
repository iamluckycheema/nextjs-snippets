'use client'

import type { Snippet } from '@prisma/client'
import Editor from '@monaco-editor/react'
import { startTransition, useState } from 'react'
import * as actions from '@/actions'

interface SnippetEditFormProps {
  snippet: Snippet
}

export default function SnippetEitForm(props: SnippetEditFormProps) {
  const [code, setCode] = useState(props.snippet.code)

  const handleEditorChange = (value: string = '') => {
    setCode(value)
  }

  const editSnippetAction = actions.updateSnippet.bind(
    null,
    props.snippet.id,
    code
  )

  return (
    <div>
      <Editor
        height={'60vh'}
        theme="vs-dark"
        language="javascript"
        defaultValue={props.snippet.code}
        options={{
          minimap: { enabled: false },
        }}
        onChange={handleEditorChange}
      />
      <form action={editSnippetAction}>
        <button
          type="submit"
          className="border rounded p-3 mt-2 bg-blue-200 hover:bg-blue-400"
        >
          Update
        </button>
      </form>
    </div>
  )
}
