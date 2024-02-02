import Pokemon from "../components/Pokemon"
import { useEffect, useState } from "react";
import './MainMenuPage.css'
import { Row, Col } from 'react-bootstrap';
import {
    useNavigate
} from "react-router-dom";
import { myPokemonListKey, useMyPokemonList } from "../hooks/useMyPokemonList";
import { useFetchPokemon } from "../hooks/useFetchPokemon";
import profOak from "../assets/img/oak.png";
import './SelectFirstPokemon.css';

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

    const getRandom3PokemonStartersNums = () =>{

        const lsrt1 = [1,4,7];
        const lsrt2 = [152, 155, 158];
        const lsrt3 = [252,255,258];

        const selectedList = [lsrt1, lsrt2, lsrt3][ Math.floor(Math.random() * 3)];
        console.log(selectedList);
        return selectedList;
    }

    const fillStartedPokemons = async () => {
        const lstNewPokemon = [];
        const lstPokemonsStarterNums = getRandom3PokemonStartersNums();
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
                    <Col xs={12} md={12} xl={12} xxl={12}  >
                        <br/>
                        <h1>Selecciona a tu Pokémon inicial</h1>
                        <hr/>
                        <Row className="flex-center-inline" style={{ padding: 15}}>
                            {
                                lstInitialPokemon.map((pokemon, index) =>
                                    <Col key={'poke_' + index} xs={4} md={4} xl={4} xxl={4} className="flex-center"
                                        onClick={() => selectInitialPokemon(pokemon)} style={{ border: '5px solid black', borderRadius: 5,background: 'white', overflow: 'hidden'}}>
                                        <Pokemon pokemon={pokemon} cssId={'scale-selectable'}/>
                                    </Col>
                                )
                            }
                        </Row>
                        <img id="oak" src={profOak} alt=""/>
                    </Col>
                </Row>
            </div>
        </>
    )
}
