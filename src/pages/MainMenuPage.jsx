import Pokemon from "../components/Pokemon"
import { useState } from "react";
import './MainMenuPage.css'
import { Row, Col } from 'react-bootstrap';
import { 
    useNavigate 
 } from "react-router-dom";

export const MainMenuPage = () => {

    const [lstPokemonNums, setLstPokemonNums] = useState([9, 18, 57, 94, 136, 151]);
    const [currentSelected, setCurrentSelected] = useState(null);
    const [battleEffect, setBattleEffect] = useState(false);

    const navigate = useNavigate();

    const redirect = (page) => {
      navigate(page, {
         myPokemonNum: currentSelected
      });
    }

    const goToBattle = () =>{
        setBattleEffect(true);
        setTimeout(() =>{
            redirect('/battle?myPokemonNum=' + currentSelected)
        }, 3_000);
    }

    const genPokemonTest = () => {
        const lstNewPokemon = [];
        for (let i = 0; i < 6; i++) {
            lstNewPokemon.push(1 + Math.floor(Math.random() * 242));
        }
        setLstPokemonNums(lstNewPokemon);
        setCurrentSelected(null);
    }

    if(!currentSelected && lstPokemonNums.length > 0){
        setCurrentSelected(lstPokemonNums[0]);
    }

    return (
        <>
        {battleEffect && <div id="black-screen"></div>}
        <div id="main-menu-container" className="grid-container full-height">
            <Row className="full-height">
                <Col xs={4} md={4} xl={4} xxl={4}  >
                    <Row >
                        {
                            lstPokemonNums.map((num, index) =>
                                <Col key={'poke_' + index} xs={6} md={6} xl={6} xxl={6}
                                    className={currentSelected == num ? 'pokemon-list-container-selected' : 'pokemon-list-container'}
                                    onClick={() => setCurrentSelected(num)}>
                                    <Pokemon num={num} animated={currentSelected == num} />
                                </Col>
                            )
                        }
                    </Row>
                </Col>
                <Col xs={8} md={8} xl={8} xxl={8}>
                    <Row style={{ height: '50%' }}>
                        <Col xs={6} md={6} xl={6} xxl={6} className="flex-center area-containter " >
                        </Col>
                        <Col xs={6} md={6} xl={6} xxl={6} className="flex-center area-containter ">
                            <button className="btn btn-primary" onClick={() => goToBattle()}>Pokémon salvaje</button>
                        </Col>
                    </Row>
                    <Row style={{ height: '50%' }}>
                        <Col xs={6} md={6} xl={6} xxl={6} className="flex-center area-containter " >
                        </Col>
                        <Col xs={6} md={6} xl={6} xxl={6} className="flex-center area-containter ">
                            <button className="btn btn-primary" onClick={genPokemonTest}>Gen Pokemon</button>
                        </Col>
                    </Row>
                </Col>

            </Row>
        </div>
        </>
    )
}
