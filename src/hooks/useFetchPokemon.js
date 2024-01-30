import { useEffect, useState } from "react";


export const useFetchPokemon = (url) => {

    const [apiResponse, setApiResponse] = useState({
        loading: true,
        pokemon: {}
    });

    const getFetch = async () => {
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
            baseExperience: data.base_experience
        }
        setApiResponse({
            loading: false,
            pokemon
        })
    }

    useEffect(() => {

        getFetch();

    }, [url]);

    return {
        ...apiResponse
    }
}
