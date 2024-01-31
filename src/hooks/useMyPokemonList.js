import { useState } from "react";
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

    const setCompleteLstPokemon = (lstPokemon) =>{
        localStorage.setItem(myPokemonListKey, JSON.stringify(lstPokemon));
        setLstPokemon(lstPokemon || []);
    }

    const removePokemon = ( id)=>{
        let lstPokemon = JSON.parse(localStorage.getItem(myPokemonListKey)) || [];
        const index = lstPokemon.findIndex(item => item.id == id);
        if(index != -1){
            lstPokemon.splice(index, 1);
        }
        localStorage.setItem(myPokemonListKey, JSON.stringify(lstPokemon));
        setLstPokemon(lstPokemon);
    }

    return {
        addPokemonToMyList,
        currentPokemon,
        getMyLstPokemon,
        getRandomPokemonNum,
        lstPokemon,
        setCurrentPokemon,
        setCompleteLstPokemon,
        removePokemon
    }
}
