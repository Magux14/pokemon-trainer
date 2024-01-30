import { useState } from 'react'
import { MainMenuPage } from './pages/MainMenuPage'
import './App.css';

const App = () => {
  const [count, setCount] = useState(0)

  return (
    <>
     <MainMenuPage/>
    </>
  )
}

export default App
