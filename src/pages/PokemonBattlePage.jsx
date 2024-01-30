import { useState } from "react";
import Pokemon from "../components/Pokemon"
import {
  useNavigate
} from "react-router-dom";
import { useSearchParams } from "react-router-dom/dist";
import { Col, Row } from "react-bootstrap";
import background from "../assets/img/background-battle.png";

export const PokemonBattlePage = () => {

  const getRandomPokemonNum = () => {
    return 1 + Math.floor(Math.random() * 242);
  }
  const [searchParams] = useSearchParams();
  const myPokemonNum = searchParams.get("myPokemonNum");
  const [enemyPokemonNum] = useState(getRandomPokemonNum())
  const navigate = useNavigate();

  const redirect = (page) => {
    navigate(page);
  }

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
      <Pokemon num={enemyPokemonNum} type={'battle'} showName={true} />
      {myPokemonNum &&
        <Pokemon num={myPokemonNum} front={false} type={'battle'} />}
    </div>
  )
}

