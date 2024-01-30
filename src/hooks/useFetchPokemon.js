import { useEffect, useState } from "react";

export const useFetchPokemon = (pokemonNum) => {

    const getRandomPokemonNum = () => {
        return 1 + Math.floor(Math.random() * 242);
    }

    if(!pokemonNum){
        pokemonNum = getRandomPokemonNum();
    }
  
    const url = 'https://pokeapi.co/api/v2/pokemon/' + pokemonNum;
    const [apiResponse, setApiResponse] = useState({
        loading: true,
        pokemon: {}
    });

    const getFetch = async () => {
        console.log('Llamada a la API: ' + url);
        const resp = await fetch(url).catch(( )=> null);
        if(!resp){
            return;
        }
        const data = await resp.json().catch(( )=> null)
        if(!data){
            return;
        }
        const pokemon ={
            id: data.id,
            name: data.name,
            spriteFront: data.sprites.front_default,
            spriteBack: data.sprites.back_default,
            baseExperience: data.base_experience,
            types: data.types.map(item => item.type.name)
        }
        setApiResponse({
            loading: false,
            pokemon
        })
    }

    useEffect(() => {
        console.log('useEffect useFetchPokemon');
        getFetch();

    }, []);

    return {
        ...apiResponse
    }
}
