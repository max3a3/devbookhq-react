import {
  DevbookStatus,
  useDevbook,
} from '@devbookhq/sdk'
import {
  Language,
  Editor,
  Button,
  Output,
} from '@devbookhq/ui'
import {
  useCallback,
  useEffect,
  useState,
} from 'react'
import { opts } from 'src/devbookSettings'

const initialCode = `import { SuperfaceClient } from '@superfaceai/one-sdk';
const sdk = new SuperfaceClient();

async function main() {
  // Load the capability profile
  const profile = await sdk.getProfile('vcs/user-repos');

  // Invoke the capability use case
  const result = await profile
    .getUseCase('UserRepos')
    .perform({
      user: 'superfaceai'
    });

  // Handle the result
  try {
    const data = result.unwrap();
    console.log(data)
  } catch (error) {
    console.error(error)
  }
}

main();`

function SnippetComponent() {
  const devbook = useDevbook(opts)

  const [isLoading, setIsLoading] = useState(false)

  const [code, setCode] = useState(initialCode)

  const run = useCallback(async () => {
    if (devbook?.status !== DevbookStatus.Connected) return

    setIsLoading(true)

    try {
      await devbook.fs?.write('/index.js', code)
      await devbook.runCmd('node index.js')
    } catch (err: any) {
      console.error(err)
    } finally {
      // console.log("inloading")
      // setIsLoading(false)
    }
  }, [
    devbook?.status,
    devbook?.runCmd,
    setIsLoading,
    code,
  ])

  useEffect(() => {
    if (!devbook) return

    if (devbook.stderr.length > 0 || devbook.stdout.length > 0) {
      setIsLoading(false)
    }

  }, [devbook?.stdout, devbook?.stderr])

  return (
    <div className="flex flex-row space-x-1">
      <Button
        isLoading={isLoading}
        disabled={devbook?.status !== DevbookStatus.Connected}
        text="Run"
        onClick={run}
      />
      <div className="flex flex-col flex-1">
        <div
          className="rounded border-[#565f6a] border"
        >
          <Editor
            initialContent={initialCode}
            height="550px"
            language={Language.js}
            onContentChange={setCode}
          />
        </div>
        {(devbook && (devbook?.stderr.length > 0 || devbook?.stdout.length > 0)) &&
          <div className="text-left output-style rounded border-[#565f6a] border mt-1">
            <Output
              height="300px"
              stderr={devbook?.stderr}
              stdout={devbook?.stdout}
            />
          </div>
        }
      </div>
    </div>
  )
}

export default SnippetComponent
