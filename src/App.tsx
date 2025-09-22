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
    <div className=" overflow-hidden h-[500px] w-[400px] flex flex-col">
      <Heading />
      <SummarizeBody summary={summaryData?.summary ?? ""} loading={loading}/>
      <footer>
        <SummarizeFooter onSummarize={handleSummarize} onExportMarkdown={handleExportMarkdown}/>
      </footer>
    </div>
  )
}

export default App
