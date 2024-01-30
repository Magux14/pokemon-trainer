import { useEffect, useState } from "react";
const myPokemonListKey = 'my-pokemons';

export const useMyPokemonList = () => {

    const [lstPokemon, setLstPokemon] = useState([]);
    const [currentPokemon, setCurrentPokemon] = useState(null);

    const getMyLstPokemon = () => {
        let lstPokemon = JSON.parse(localStorage.getItem(myPokemonListKey));
        setLstPokemon(lstPokemon || []);
    }

    const addPokemonToMyList = (pokemon) => {
        let lstPokemon = JSON.parse(localStorage.getItem(myPokemonListKey));
        if (!lstPokemon) {
            lstPokemon = [];
        }

        if (lstPokemon.length >= 6) {
            return;
        }

        lstPokemon.push(pokemon);
        localStorage.setItem(myPokemonListKey, JSON.stringify(lstPokemon));
        setLstPokemon(lstPokemon);
    }

    const getRandomPokemonNum = () => {
        return 1 + Math.floor(Math.random() * 242);
    }

    const genPokemonTest = () => {
        const lstNewPokemon = [];
        for (let i = 0; i < 6; i++) {
            lstNewPokemon.push(getRandomPokemonNum());
        }
        setLstPokemon(lstNewPokemon);
        setCurrentPokemon(null);
    }

    useEffect(() => {
        getMyLstPokemon();
    }, [])

    return {
        lstPokemon,
        addPokemonToMyList,
        genPokemonTest,
        currentPokemon,
        setCurrentPokemon,
        getRandomPokemonNum
    }
}
