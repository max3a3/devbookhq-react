import {
  useRef,
  memo,
  useLayoutEffect,
} from 'react'
import { EditorView } from '@codemirror/view'

import {
  Language,
} from './language'
import Header from './Header'
import Separator from '../Separator'
import createEditorState from './createEditorState'

export interface Props {
  initialContent?: string
  isReadonly?: boolean
  onContentChange?: (content: string) => void
  lightTheme?: boolean
  withFilesystem?: boolean,
  filepath?: string
  language?: Language
  height?: string
}

function Editor({
  initialContent = '',
  onContentChange,
  filepath,
  isReadonly = false,
  language,
  lightTheme,
  height,
}: Props) {
  const editorEl = useRef<HTMLDivElement>(null)

  useLayoutEffect(function initEditor() {
    if (!editorEl.current) return

    const state = createEditorState({
      initialContent,
      onContentChange,
      isReadonly,
      language,
    })

    const view = new EditorView({ state, parent: editorEl.current });
    return () => {
      view.destroy()
    }
  }, [
    initialContent,
    onContentChange,
    parent,
    language,
    isReadonly,
  ])

  return (
    <div className={`rounded ${lightTheme ? '' : 'dark'}`}>
      {filepath &&
        <>
          <Header
            filepath={filepath}
          />
          <Separator
            variant={Separator.variant.CodeEditor}
            dir={Separator.dir.Horizontal}
          />
        </>
      }
      <div
        className={`flex-1 flex max-h-full min-w-0 overflow-auto devbook ${filepath ? 'rounded-b' : 'rounded'}`}
        ref={editorEl}
        style={{
          ...height && { height },
        }}
      />
    </div>
  )
}

export default memo(Editor)
