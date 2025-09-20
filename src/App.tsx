import { useState } from 'react'
import './App.css'

import Heading from "./components/header.tsx"
import SummarizeBody from "./components/body.tsx"
import SummarizeFooter from "./components/footer.tsx"


import Summarize from "./components/logic.ts"

function App() {
  const [summary, setSummary] = useState<string | undefined>("")
  const [loading, setLoading] = useState(false)

  async function handleSummarize() {
    setLoading(true)
    const result = await Summarize()
    
    if (result) {
      setSummary(result ?? "")
    }
    
    setLoading(false)
  }


  return (
    <div className="absolute inset-0 h-screen w-full flex flex-col">
      <Heading />
      <SummarizeBody summary={summary} loading={loading}/>
      <footer>
        <SummarizeFooter onSummarize={handleSummarize}/>
      </footer>
    </div>
  )
}

export default App
