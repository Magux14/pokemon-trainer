import { useFetchPokemon } from "../hooks/useFetchPokemon";
import './pokemon.css';

const Pokemon = ({ num = 1, front = true, animated = false, type = 'menu', showName = false }) => {

    const url = 'https://pokeapi.co/api/v2/pokemon/' + num;
    const { loading, pokemon } = useFetchPokemon(url);

    const { name, spriteFront, spriteBack } = pokemon;

    return (
        <>
            {showName && <span className="front-pokemon-battle-name">{name} #{num}</span>}
            {!loading && pokemon && type == 'menu' &&
                <img src={front ? spriteFront : spriteBack} className={animated ? 'animate-pokemon-menu' : 'pokemon-sprite-menu'} alt={name} />
            }
            {!loading && pokemon && type == 'battle' &&
                <img src={front ? spriteFront : spriteBack} className={front ? 'front-pokemon-battle' : 'back-pokemon-battle'} alt={name} />
            }
        </>
    )
}

export default Pokemon;