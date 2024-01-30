import { useFetchPokemon } from "../hooks/useFetchPokemon";
import './pokemon.css';

const Pokemon = ({ num = 1, front = true, animated = false}) => {

    const url = 'https://pokeapi.co/api/v2/pokemon/' + num;
    const { loading, pokemon } = useFetchPokemon(url);

    const { name, spriteFront, spriteBack } = pokemon;

    return (
        <>
            {!loading && pokemon &&
                <img src={front? spriteFront: spriteBack} className={animated? 'animate-pokemon': 'pokemon-sprite'} alt={name} />
            }
        </>
    )
}

export default Pokemon;