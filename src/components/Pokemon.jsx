import './pokemon.css';
const Pokemon = ({ pokemon, front = true, animated = false, type = 'menu', showName = false, cssId }) => {

    const { id, name, spriteFront, spriteBack } = pokemon;
    return (
        <>
            {showName && <span className="front-pokemon-battle-name">{name} #{id}</span>}
            {pokemon && type == 'menu' &&
                <img id={cssId} src={front ? spriteFront : spriteBack} className={animated ? 'animate-pokemon-menu' : 'pokemon-sprite-menu'} alt={name} />
            }
            {pokemon && type == 'battle' &&
                <img id={cssId} src={front ? spriteFront : spriteBack} className={front ? 'front-pokemon-battle' : 'back-pokemon-battle'} alt={name} />
            }
        </>
    )
}

export default Pokemon;