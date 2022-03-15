import {
  DevbookStatus,
} from "@devbookhq/sdk"
import {
  useEffect,
  useState,
} from "react"
import Editor from "@monaco-editor/react"

import ReactLoading from 'react-loading'

import useCustomDevbook from './useCustomDevbook'
import CodeOut from "../codeout"
import React from "react"

const nodeCode = `const banana = require("@banana-dev/banana-dev")
const apiKey = "{{YOUR_API_KEY}}"
const modelKey = "{{MODEL_KEY}}"
const modelParameters = {
  // "text": "which sport is being played?", // Uncomment this parameter to ask prompted questions
  "imageURL": "https://demo-images-banana.s3.us-west-1.amazonaws.com/image2.jpg"
}
async function run() {
  const out = await banana.run(apiKey, modelKey, modelParameters)
  console.log(out["modelOutputs"])
}
run()`

const pythonCode = `import banana_dev as banana
api_key = "{{YOUR_API_KEY}}"
model_key = "{{MODEL_KEY}}"
model_parameters = {
  # "text": "which sport is being played?", # Uncomment this parameter to ask prompted questions
  "imageURL":"https://demo-images-banana.s3.us-west-1.amazonaws.com/image2.jpg"
}
out = banana.run(api_key, model_key, model_parameters)
print(out["modelOutputs"])`

export interface Props {
  apiKey: string
  modelKey?: string
  language: "python" | "javascript",
  setLanguage: React.Dispatch<React.SetStateAction<"python" | "javascript">>,
}

function InteractiveCodeSnippet({
  apiKey,
  modelKey,
  language,
  setLanguage,
}: Props) {
  const [code, setCode] = useState("")
  const {
    stderr,
    stdout,
    status,
    runCode,
  } = useCustomDevbook({ language })

  useEffect(function configureCode() {
    if (!modelKey) return

    switch (language) {
      case "javascript":
        setCode(nodeCode
          .replace("{{YOUR_API_KEY}}", apiKey)
          .replace("{{MODEL_KEY}}", modelKey)
        )
        try{
          runCode(code)
        }catch{
        }
        break
      case "python":
        setCode(pythonCode
          .replace("{{YOUR_API_KEY}}", apiKey)
          .replace("{{MODEL_KEY}}", modelKey)
        )
        try{
          runCode(code)
        }catch{
        }
        break
    }
  }, [
    apiKey,
    modelKey,
    language,
  ])

  function handleEditorChange(value: string = "") {
    setCode(value)
  }

  if (modelKey === undefined) {
    return <p>No model key supplied </p>
  }

  function findImageURL(text: string) {
    const urlRegex = /https:.*?\.(?:png|jpg)/
    const regexed = urlRegex.exec(text)
    if (regexed == null){
      return undefined
    }
    if (regexed.length == 0) {
      return undefined
    }
    return regexed[0]
  }

  var imageURL = findImageURL(code)


  return (
    <div className="fixed right-1 left-1 flex flex-col">

      <div className="flex justify-center">
        <button className="nav-button shadow-lg bg-green-600 text-white font-bold" onClick={() => runCode(code)}>Run Code</button>
      </div>

      <div className="relative h-auto">
        <div className="flex flex-row">
          <div className="w-3/4">
            <div className="m-2 p-3 rounded-md bg-monaco-gray">
              <button className="nav-button rounded-sm text-white bg-gray-800 mr-1" onClick={()=>{setLanguage("python")}}>Python</button>
              <button className="nav-button rounded-sm text-white bg-gray-800" onClick={()=>{setLanguage("javascript")}}>Node JS</button>
              <div className="relative mt-2">
                <Editor
                  height="40vh"
                  width="100%"
                  theme="vs-dark"
                  language={language}
                  value={code}
                  onChange={handleEditorChange}
                />
              </div>
            </div>
            <div className="m-2 p-3 rounded-md bg-monaco-gray">
              <div className="relative h-60 bg-monaco-gray p-1 text-white">
                {status === DevbookStatus.Connected && 
                  <CodeOut
                    stdout={stdout}
                    stderr={stderr}
                  />
                }
                {status !== DevbookStatus.Connected && 
                  <div className="relative">
                    <p className="">Sandbox Loading...</p>
                    <ReactLoading className="" type={"cylon"} color="#fff" />
                  </div>
                } 
              </div>
            </div>
          </div>
          <div className="w-1/4 m-2 p-3 bg-gray-200 rounded-md">
            <p>Backend:</p>
              <div className="flex flex-col h-auto w-auto">
                {status === DevbookStatus.Disconnected && <p className="bg-red-500  p-1 rounded-md w-full text-white nav-button">Idle</p>}
                {status === DevbookStatus.Connecting && <p className="bg-yellow-500  p-1 rounded-md w-full text-white nav-button">Starting...</p>}
                {status === DevbookStatus.Connected && <p className="bg-green-600  p-1 rounded-md w-full text-white nav-button">Ready</p>}
              </div>
            {(imageURL !== undefined) && <>
              <p>Image Preview:</p>
              <img className=" border-2 border-gray-400 shadow-sm" src={imageURL}></img>
            </>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default InteractiveCodeSnippet
