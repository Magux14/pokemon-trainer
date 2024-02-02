import { Route, Routes, useNavigate } from "react-router-dom/dist"
import { MainMenuPage } from "../pages/MainMenuPage"
import { PokemonBattlePage } from "../pages/PokemonBattlePage"
import { FreePokemon } from "../pages/FreePokemon"
import { SelectFirstPokemon } from "../pages/SelectFirstPokemon"
import { useEffect } from "react"
import { myPokemonListKey } from "../hooks/useMyPokemonList"

export const AppRouter = () => {
    const navigate = useNavigate();
    const redirect = (page) => {
        navigate(page);
    }
  
    useEffect(() =>{
      if (!localStorage.getItem(myPokemonListKey)) {
        redirect('/');
      } 
    }, [])

    return (
        <>
            <Routes>
                <Route path="/" element={<SelectFirstPokemon />} />
                <Route path="/main-menu" element={<MainMenuPage />} />
                <Route path="battle" element={<PokemonBattlePage />} />
                <Route path="freePokemon" element={<FreePokemon />} />
            </Routes>
        </>
    )
}
