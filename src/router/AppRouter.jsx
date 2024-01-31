import { Route, Routes } from "react-router-dom/dist"
import { MainMenuPage } from "../pages/MainMenuPage"
import { PokemonBattlePage } from "../pages/PokemonBattlePage"
import { FreePokemon } from "../pages/FreePokemon"
import { SelectFirstPokemon } from "../pages/SelectFirstPokemon"

export const AppRouter = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<MainMenuPage />} />
                <Route path="/select-poke" element={<SelectFirstPokemon />} />
                <Route path="battle" element={<PokemonBattlePage />} />
                <Route path="freePokemon" element={<FreePokemon />} />
            </Routes>
        </>
    )
}
