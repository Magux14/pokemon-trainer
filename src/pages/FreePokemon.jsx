import { useNavigate, useSearchParams } from "react-router-dom";
import background from "../assets/img/toilet.gif";
import Pokemon from "../components/Pokemon";
import { useMyPokemonList } from "../hooks/useMyPokemonList";
import { useEffect } from "react";
import './FreePokemon.css'

export const FreePokemon = () => {

    const {
        getMyLstPokemon,
        lstPokemon,
        currentPokemon,
        setCurrentPokemon,
        removePokemon
    } = useMyPokemonList([]);
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const pokemonId = searchParams.get("pokemonId");

    const redirect = (page) => {
        navigate(page);
    }

    useEffect(() => {
        getMyLstPokemon();
    }, [])

    useEffect(() => {
        const pokemon = lstPokemon.find(item => item.id == pokemonId);
        if (pokemon) {
            setCurrentPokemon(pokemon);
            removePokemon(pokemon.id);
        }
        setTimeout(() =>{
            redirect('/');
        }, 2_000);
    }, [lstPokemon])


    return (
        <div id="free-pokemon-container" className="full-height" style={{
            backgroundImage: `url(${background})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {currentPokemon && <Pokemon cssId="pokemon-to-free" pokemon={currentPokemon} />}

        </div>
    )
}
