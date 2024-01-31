import Pokemon from "../components/Pokemon"
import { useEffect, useState } from "react";
import './MainMenuPage.css'
import { Row, Col } from 'react-bootstrap';
import {
    useNavigate
} from "react-router-dom";
import { useMyPokemonList } from "../hooks/useMyPokemonList";
import { useFetchPokemon } from "../hooks/useFetchPokemon";
import CustomModal from "../components/Modal";

export const MainMenuPage = () => {

    const {
        lstPokemon,
        setCompleteLstPokemon,
        getMyLstPokemon,
        currentPokemon,
        setCurrentPokemon
    } = useMyPokemonList([]);
    const [battleEffect, setBattleEffect] = useState(false);
    const [showFreePokemonModal, setShowFreePokemonModal] = useState(false);
    const { getPokemon, getRandomPokemonNum } = useFetchPokemon();

    const navigate = useNavigate();
    const redirect = (page) => {
        navigate(page);
    }

    const goToBattle = () => {
        setBattleEffect(true);
        setTimeout(() => {
            redirect('/battle?pokemonId=' + currentPokemon?.id)
        }, 3_000);
    }

    if (!currentPokemon && lstPokemon.length > 0) {
        setCurrentPokemon(lstPokemon[0]);
    }

    const PokemonInfo = () => {
        if (!currentPokemon) {
            return <></>
        }

        return (
            <div>
                <h2 className="capitalize">{currentPokemon.name}</h2>
                <div className="flex-center-inline capitalize">
                    {currentPokemon.types?.map(type => <div key={type} className="type">{type}</div>)}
                </div>
            </div>
        )
    }

    const genPokemonRandom = async () => {
        const lstNewPokemon = [];
        for (let i = 0; i < 6; i++) {
            const pokemon = await getPokemon(getRandomPokemonNum());
            lstNewPokemon.push(pokemon);
        }
        setCompleteLstPokemon(lstNewPokemon);
        setCurrentPokemon(null);
    }

    useEffect(() => {
        getMyLstPokemon();
    }, []);

    const openFreePokemonModal = () =>{
        setShowFreePokemonModal(true);
    }

    const closeFreePokemonModal = ()=>{
        setShowFreePokemonModal(false);
    }

    const acceptToFreePokemon = () =>{
        const {id} = currentPokemon;
        redirect('freePokemon?pokemonId=' + id);
        closeFreePokemonModal();
    }

    return (
        <>
            {battleEffect && <div id="black-screen"></div>}
            <div id="main-menu-container" className="grid-container full-height">
                <Row className="full-height">
                    <Col xs={4} md={4} xl={4} xxl={4}  >
                        <Row >
                            {
                                currentPokemon && lstPokemon.map((pokemon, index) =>
                                    <Col key={'poke_' + index} xs={6} md={6} xl={6} xxl={6}
                                        className={currentPokemon.id == pokemon.id ? 'pokemon-list-container-selected' : 'pokemon-list-container'}
                                        onClick={() => setCurrentPokemon(pokemon)}>
                                        <Pokemon pokemon={pokemon} animated={currentPokemon.id == pokemon.id} />
                                    </Col>
                                )
                            }
                        </Row>
                    </Col>
                    <Col xs={8} md={8} xl={8} xxl={8}>
                        <Row style={{ height: '50%' }}>
                            <Col xs={6} md={6} xl={6} xxl={6} className="flex-center area-containter " >
                                <PokemonInfo />
                                <hr/>
                                <button className="btn btn-outline-primary" onClick={openFreePokemonModal}>Liberar Pokémon</button>
                            </Col>
                            <Col xs={6} md={6} xl={6} xxl={6} className="flex-center area-containter ">
                                <button className="btn btn-primary" onClick={() => goToBattle()}>Pokémon salvaje</button>
                            </Col>
                        </Row>
                        <Row style={{ height: '50%' }}>
                            <Col xs={6} md={6} xl={6} xxl={6} className="flex-center area-containter " >
                            </Col>
                            <Col xs={6} md={6} xl={6} xxl={6} className="flex-center area-containter ">
                                <button className="btn btn-primary" onClick={genPokemonRandom}>Gen Pokemon</button>
                            </Col>
                        </Row>
                    </Col>

                </Row>
            </div>
            {currentPokemon && 
            <CustomModal 
            show={showFreePokemonModal} 
            title={'¿Deseas liberar a "' + currentPokemon.name + '"? Ya no será parte de tu equipo'} 
            okText={'Liberar'} 
            cancelText={'Cancelar'}
            cancelCallback={closeFreePokemonModal}
            acceptCallback={acceptToFreePokemon}
            />}
        </>
    )
}
