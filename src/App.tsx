import { useState } from 'react'
import './App.css'

import Heading from "./components/header.tsx"
import Body from "./components/body.tsx"

function App() {
  const [count, setCount] = useState(0)

  return (
    <Heading />
    <Body />
  )
}

export default App
