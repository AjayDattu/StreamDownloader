import { useState } from 'react'
import Nav from './components/Navbar'
import { Link } from 'react-router-dom'
import LinkP from './components/LinkP'

function App() {

  return (
    <div className="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]">
      <Nav/>
      <LinkP/>
    </div>
  )
}

export default App
