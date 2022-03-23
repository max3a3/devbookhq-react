import {
  useRef,
} from 'react'
import {
  useDevbook,
  DevbookStatus,
} from '@devbookhq/sdk'
import {
  Button,
  Terminal,
  TerminalHandler,
} from '@devbookhq/ui'
import { opts } from 'src/devbookSettings'

const packageJSON = `{
  "name": "superface",
  "version": "1.0.0",
  "type": "module",
  "main": "index.js"
}`

function DevbookTerminal() {
  const devbook = useDevbook(opts)
  const terminalRef = useRef<TerminalHandler>(null)

  function installSDK() {
    if (devbook.status !== DevbookStatus.Connected) return
    if (!terminalRef.current) return

    terminalRef.current.handleInput('npm install @superfaceai/one-sdk')

    terminalRef.current.focus()
  }

  function userRepos() {
    if (devbook.status !== DevbookStatus.Connected) return
    if (!terminalRef.current) return

    terminalRef.current.handleInput('npx @superfaceai/cli install vcs/user-repos')

    terminalRef.current.focus()
  }

  function github() {
    if (devbook.status !== DevbookStatus.Connected) return
    if (!terminalRef.current) return

    terminalRef.current.handleInput('npx @superfaceai/cli configure github -p vcs/user-repos')

    terminalRef.current.focus()
  }

  return (
    <div className="flex flex-col flex-1 max-w-[850px] min-w-[800px] space-y-1">
      <div className="space-x-1 flex">
        <Button
          text="Install vcs/user-repos"
          onClick={userRepos}
        />
        <Button
          text="Configure GitHub"
          onClick={github}
        />
        <Button
          text="Install SDK"
          onClick={installSDK}
        />
      </div>
      <div className="rounded border-[#565f6a] border">
        <Terminal
          onStart={async (handler) => {
            await devbook.fs?.write('/package.json', packageJSON)
          }}
          title="Terminal"
          height="360px"
          autofocus
          ref={terminalRef}
          devbook={devbook}
        />
      </div>
    </div>
  )
}

export default DevbookTerminal
