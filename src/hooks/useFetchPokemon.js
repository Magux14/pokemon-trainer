import { useState } from "react";

export const useFetchPokemon = (pokemonNum) => {

    const getRandomPokemonNum = (legendary = false) => {

        const lstLegendaryNums = [150, 151, 243, 244, 245, 249, 250, 251, 377, 378, 379, 380, 381, 382, 383, 384, 385, 386];

        if (legendary) {
            return lstLegendaryNums[Math.floor(Math.random() * lstLegendaryNums.length)];
        }

        const normalNum = 1 + Math.floor(Math.random() * 386);
        if (lstLegendaryNums.includes(normalNum)) {
            return getRandomPokemonNum(legendary);
        }
        return normalNum;
    }

    if (!pokemonNum) {
        pokemonNum = getRandomPokemonNum();
    }

    const url = 'https://pokeapi.co/api/v2/pokemon/';
    const [apiResponse, setApiResponse] = useState({
        loading: true,
        pokemon: null
    });

    const getPokemon = async (id) => {
        const fullUrl = url + id;
        console.log('Llamada a la API: ' + fullUrl);
        const resp = await fetch(fullUrl).catch(() => null);
        if (!resp) {
            return;
        }
        const data = await resp.json().catch(() => null)
        if (!data) {
            return;
        }
        const pokemon = {
            id: data.id,
            name: data.name,
            spriteFront: data.sprites.front_default,
            spriteBack: data.sprites.back_default,
            baseExperience: data.base_experience,
            types: data.types.map(item => item.type.name)
        }

        return pokemon;
    }

    const getFetch = async () => {
        const pokemon = await getPokemon(pokemonNum)
        setApiResponse({
            loading: false,
            pokemon
        })
    }

    return {
        ...apiResponse,
        getFetch,
        getPokemon,
        getRandomPokemonNum
    }
}
