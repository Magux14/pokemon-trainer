import { useState } from 'react'
import { MainMenuPage } from './pages/MainMenuPage'
import './App.css';
import { AppRouter } from './router/AppRouter';

const App = () => {
  const [count, setCount] = useState(0)

  return (
    <>
     <AppRouter/>
    </>
  )
}

export default App
