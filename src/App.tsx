import { useState} from 'react'
import './App.css'

import Heading from "./components/header.tsx"
import SummarizeBody from "./components/body.tsx"
import SummarizeFooter from "./components/footer.tsx"


import {Summarize} from "./components/logic.ts"

function App() {
  const [summary, setSummary] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSummarize() {
    setLoading(true)
    const result = await Summarize()
    
    if (result) {
      setSummary(result ?? "")
    }
    
    setLoading(false)
  }

  // async function handleGetSummary() {
  //   const result = await getSummary() 
  // }



  return (
    <div className=" overflow-hidden h-[500px] w-[400px] flex flex-col">
      <Heading />
      <SummarizeBody summary={summary} loading={loading}/>
      <footer>
        <SummarizeFooter onSummarize={handleSummarize}/>
      </footer>
    </div>
  )
}

export default App
