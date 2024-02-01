import Pokemon from "../components/Pokemon"
import {
  useNavigate
} from "react-router-dom";
import { useSearchParams } from "react-router-dom/dist";
import background from "../assets/img/background-battle.png";
import pokeballImg from "../assets/img/pokeball.png";
import { useMyPokemonList } from "../hooks/useMyPokemonList";
import { useFetchPokemon } from "../hooks/useFetchPokemon";
import { useEffect, useState } from "react";
import { useFetchQuestion } from "../hooks/useFetchQuestion";
import CustomModal from "../components/CustomModal";
import QuestionModal from "../components/QuestionModal";
import './PokemonBattlePage.css';

export const PokemonBattlePage = () => {

  const { getMyLstPokemon, currentPokemon, lstPokemon, setCurrentPokemon, addPokemonToMyList } = useMyPokemonList();
  const { question, generateQuestion, questionError } = useFetchQuestion();
  const [pokeball, setPokeball] = useState(false);
  const [showEnemyPokemon, setShowEnemyPokemon] = useState(true);
  const [showBrightPokemon, setShowBrightPokemon] = useState(false);
  const [pokemonAnimationTransition, setPokemonAnimationTransition] = useState({ myPokemon: 'back-pokemon-battle-enter-left', enemy: 'front-pokemon-battle-enter-right' });
  const [searchParams] = useSearchParams();
  const pokemonId = searchParams.get("pokemonId");
  const { pokemon: enemyPokemon, getFetch } = useFetchPokemon();

  const updatePage = () => {
    location.reload();
  }

  const exit = () => {
    redirect('/');
  }

  const tryToCath = () => {
    setTimeout(() => {
      generateQuestion();
    }, 3_000);
    setTimeout(() => {
      setShowBrightPokemon(true);
    }, 700);
    setTimeout(() => {
      setShowEnemyPokemon(false);
    }, 800)
    setPokeball(true);
  }

  const addCurrentPokemonTomyList = () => {
    addPokemonToMyList(enemyPokemon);
    exit();
  }

  const navigate = useNavigate();
  const redirect = (page) => {
    navigate(page);
  }

  const runEnemyPokemonActions = () => {
    if (!enemyPokemon) {
      return;
    }

    setTimeout(() => {
      const audio = new Audio('https://pokemoncries.com/cries/' + enemyPokemon.id + '.mp3');
      audio.play();
    }, 800);
    setTimeout(() => {
      setPokemonAnimationTransition({
        myPokemon: 'back-pokemon-battle',
        enemy: 'front-pokemon-battle'
      });
    }, 1_400);
  }

  useEffect(() => {
    getMyLstPokemon();
    getFetch();
  }, []);

  useEffect(() => {
    runEnemyPokemonActions();
  }, [enemyPokemon]);

  useEffect(() => {
    const pokemon = lstPokemon.find(item => item.id == pokemonId);
    setCurrentPokemon(pokemon);
  }, [lstPokemon]);

  return (
    <div id="battle-container" className="full-height" style={{
      backgroundImage: `url(${background})`,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      position: 'relative',
      overflow: 'hidden'
    }}>

      {enemyPokemon && <span className="front-pokemon-battle-name">{enemyPokemon.name} #{enemyPokemon.id}</span>}
      {showEnemyPokemon && enemyPokemon && <Pokemon cssId={showBrightPokemon ? 'bright' : 'none'} pokemon={enemyPokemon} type={'battle'} cssClass={pokemonAnimationTransition.enemy} />}
      {currentPokemon && pokemonId &&
        <Pokemon pokemon={currentPokemon} front={false} type={'battle'} cssClass={pokemonAnimationTransition.myPokemon} />}

      {pokeball && <img id="pokeball" src={pokeballImg} alt="" />}

      <CustomModal
        show={questionError}
        title={'Sucedió un error, recargue la página.'}
        okText={'Ok'}
        acceptCallback={updatePage}
      />

      {question && <QuestionModal
        show={question?.text}
        text={question.text}
        options={question.options}
        answer={question.correctAnswer}
        successCallback={addCurrentPokemonTomyList}
        errorCallback={exit} />
      }

      <button id="button-not-catch" className="btn btn-secondary" onClick={() => redirect('/')}>Escapar</button>
      <button id="button-catch" className="btn btn-danger" onClick={() => tryToCath()}>Atrapar</button>
    </div>
  )
}

