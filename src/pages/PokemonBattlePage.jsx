import Pokemon from "../components/Pokemon"
import {
  useNavigate
} from "react-router-dom";
import { useSearchParams } from "react-router-dom/dist";
import background from "../assets/img/background-battle.png";
import { useMyPokemonList } from "../hooks/useMyPokemonList";
import { useFetchPokemon } from "../hooks/useFetchPokemon";
import { useEffect } from "react";

export const PokemonBattlePage = () => {

  const { getMyLstPokemon, currentPokemon, lstPokemon, setCurrentPokemon, addPokemonToMyList } = useMyPokemonList([]);
  const [searchParams] = useSearchParams();
  const pokemonId = searchParams.get("pokemonId");
  const { pokemon: enemyPokemon, getFetch } = useFetchPokemon();
  const navigate = useNavigate();
  const redirect = (page) => {
    navigate(page);
  }

  useEffect(() => {
    getMyLstPokemon();
    getFetch();
  }, []);

  useEffect(() => {
    const pokemon = lstPokemon.find(item => item.id == pokemonId);
    setCurrentPokemon(pokemon);
  }, [lstPokemon]);


  return (
    <div className="full-height" style={{
      backgroundImage: `url(${background})`,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <button className="btn btn-primary" onClick={() => redirect('/')} style={{ position: 'absolute', zIndex: 10 }}>Regresar</button>
      <button className="btn btn-primary" onClick={() => addPokemonToMyList(enemyPokemon)} style={{ position: 'absolute', zIndex: 10, top: '10%' }}>Catch</button>
      {enemyPokemon && <Pokemon pokemon={enemyPokemon} type={'battle'} showName={true} />}
      {currentPokemon && pokemonId &&
        <Pokemon pokemon={currentPokemon} front={false} type={'battle'} />}
    </div>
  )
}

