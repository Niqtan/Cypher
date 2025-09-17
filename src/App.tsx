import { useState } from 'react'
import './App.css'

import Heading from "./components/header.tsx"
import Body from "./components/body.tsx"
import Footer from "./components/footer.tsx"
function App() {

  return (
    <div className="absolute inset-0 h-screen w-full flex flex-col">
      <Heading />
      <Body />
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default App
