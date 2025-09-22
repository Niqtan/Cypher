import { useState} from 'react'
import './App.css'

import Heading from "./components/header.tsx"
import SummarizeBody from "./components/body.tsx"
import SummarizeFooter from "./components/footer.tsx"


import {exportToMarkdown, Summarize} from "./components/logic.ts"
import type { SummaryData } from "./components/types.ts"

function App() {
  const [summaryData, setSummaryData] = useState<SummaryData | null>(null)
  const [loading, setLoading] = useState(false)


  async function handleSummarize() {
    setLoading(true)
    const result = await Summarize()
        
    if (result) {
      setSummaryData(result)
      
      if (result.summary) {
        const speak = new SpeechSynthesisUtterance(result.summary)
        speak.rate = 1.5
        window.speechSynthesis.speak(speak)
      }
    }

    setLoading(false)
  }

  async function handleExportMarkdown() {
    if (!summaryData) {
      alert("No summary has been given yet!")
      return
    }

    await exportToMarkdown(summaryData)
  }




  return (
    <div className="w-full h-full m-0 p-0 flex flex-col">
      <Heading />
      <div className="overflow-auto">
        <SummarizeBody summary={summaryData?.summary ?? ""} loading={loading}/>
      </div>
      <footer >
        <SummarizeFooter onSummarize={handleSummarize} onExportMarkdown={handleExportMarkdown}/>
      </footer>
    </div>
  )
}

export default App
