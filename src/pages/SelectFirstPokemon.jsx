import Pokemon from "../components/Pokemon"
import { useEffect, useState } from "react";
import './MainMenuPage.css'
import { Row, Col } from 'react-bootstrap';
import {
    useNavigate
} from "react-router-dom";
import { myPokemonListKey, useMyPokemonList } from "../hooks/useMyPokemonList";
import { useFetchPokemon } from "../hooks/useFetchPokemon";

export const SelectFirstPokemon = () => {

    const [lstInitialPokemon, setLstInitialPokemon] = useState([])

    const {
        addPokemonToMyList
    } = useMyPokemonList([]);
    const { getPokemon } = useFetchPokemon();

    const navigate = useNavigate();
    const redirect = (page) => {
        navigate(page);
    }

    const fillStartedPokemons = async () => {
        const lstNewPokemon = [];
        const lstPokemonsStarterNums = [1, 4, 7, 25, 152, 155, 158, 133]
        for (let num of lstPokemonsStarterNums) {
            const pokemon = await getPokemon(num);
            lstNewPokemon.push(pokemon);
        }
        setLstInitialPokemon(lstNewPokemon);
    }

    const selectInitialPokemon = (pokemon) =>{
        localStorage.removeItem(myPokemonListKey);
        addPokemonToMyList(pokemon);
        redirect('/');
    }

    useEffect(() => {
        fillStartedPokemons();
    }, []);


    return (
        <>
            <div className="grid-container full-height" style={{background: '#75A7FA'}}>
                <Row className="full-height">
                    <Col xs={2} md={2} xl={2} xxl={2}  >
                    </Col>
                    <Col xs={8} md={8} xl={8} xxl={8}  >
                        <br/>
                        <h1>Selecciona a tu Pokémon inicial</h1>
                        <hr/>
                        <Row className="flex-center-inline">
                            {
                                lstInitialPokemon.map((pokemon, index) =>
                                    <Col key={'poke_' + index} xs={3} md={3} xl={3} xxl={3}
                                        onClick={() => selectInitialPokemon(pokemon)} style={{ border: '4px solid black', borderRadius: 5,background: 'white'}}>
                                        <Pokemon pokemon={pokemon}/>
                                    </Col>
                                )
                            }
                        </Row>
                    </Col>
                    <Col xs={2} md={2} xl={2} xxl={2}  >
                    </Col>
                </Row>


            </div>
        </>
    )
}
