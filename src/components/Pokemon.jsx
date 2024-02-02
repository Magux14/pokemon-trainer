import './pokemon.css';
const Pokemon = ({ pokemon, front = true, type = 'menu', cssId, cssClass}) => {

    console.log(pokemon.name, cssClass)
    const { name, spriteFront, spriteBack } = pokemon;
    return (
        <>
            {pokemon && type == 'menu' &&
                <img id={cssId} src={front ? spriteFront : spriteBack} className={cssClass} alt={name} />
            }
            {pokemon && type == 'battle' &&
                <img id={cssId} src={front ? spriteFront : spriteBack} className={cssClass} alt={name} />
            }
        </>
    )
}


export default Pokemon;