import Pokemon from "../components/Pokemon"
import { useEffect, useState } from "react";
import './MainMenuPage.css'
import { Row, Col } from 'react-bootstrap';
import {
    useNavigate
} from "react-router-dom";
import { useMyPokemonList } from "../hooks/useMyPokemonList";
import { useFetchPokemon } from "../hooks/useFetchPokemon";
import CustomModal from "../components/CustomModal";

export const MainMenuPage = () => {

    const {
        lstPokemon,
        setCompleteLstPokemon,
        getMyLstPokemon,
        currentPokemon,
        setCurrentPokemon,
        reorderPokemon
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
            redirect('/battle?pokemonId=' + currentPokemon?.id);
            if (currentPokemon) {
                reorderPokemon(currentPokemon.id)
            }
        }, 3_000);
    }

    const selectCurrentPokemon = (pokemon) => {
        // const audio = new Audio('https://pokemoncries.com/cries/' + pokemon.id + '.mp3');
        // audio.play();
        setCurrentPokemon(pokemon);
    }

    if (!currentPokemon && lstPokemon.length > 0) {
        selectCurrentPokemon(lstPokemon[0]);
    }

    const PokemonInfo = () => {
        if (!currentPokemon) {
            return <></>
        }

        return (
            <div className="pokemon-info-container">
                <h2 className="capitalize">{currentPokemon.name}</h2>
                <div className="capitalize pokemon-types-container ">
                    {currentPokemon.types?.map(type => <span key={type} className="type">{type}</span>)}
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

    const openFreePokemonModal = () => {
        setShowFreePokemonModal(true);
    }

    const closeFreePokemonModal = () => {
        setShowFreePokemonModal(false);
    }

    const acceptToFreePokemon = () => {
        const { id } = currentPokemon;
        redirect('freePokemon?pokemonId=' + id);
        closeFreePokemonModal();
    }

    const capitalizeFirstLetter = (string) => {
        if (!string) {
            return string;
        }
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    return (
        <>
            {battleEffect && <div id="black-screen"></div>}
            <div id="main-menu-container" className="grid-container full-height">
                    <PokemonInfo />
                    <hr/>
                <Row >
                    <Col xs={12} md={12} xl={12} xxl={12}  >
                        <Row >
                            {
                                currentPokemon && lstPokemon.map((pokemon, index) =>
                                    <Col key={'poke_' + index} xs={4} md={4} xl={4} xxl={4}
                                        className={currentPokemon.id == pokemon.id ? 'pokemon-list-container-selected' : 'pokemon-list-container'}
                                        onClick={() => selectCurrentPokemon(pokemon)}>
                                        <Pokemon pokemon={pokemon} animated={currentPokemon.id == pokemon.id} cssClass={currentPokemon.id == pokemon.id ? 'animate-pokemon-menu' : 'pokemon-sprite-menu'} />
                                    </Col>
                                )
                            }
                        </Row>
                    </Col>
                    </Row>
                    <Row>
                    <Col className="flex-center" style={{padding: 5}}>

                                <hr />
                                {currentPokemon && lstPokemon.length > 1 && <button className="btn btn-outline-primary" onClick={openFreePokemonModal}>Liberar Pokémon</button>}
                                <hr />
                                <button className="btn btn-primary" onClick={() => goToBattle()}>Pokémon salvaje</button>
                                <hr />
                                <button className="btn btn-primary" onClick={genPokemonRandom}>Gen Pokemon</button>
                        {/* <Row style={{ height: '50%' }}>
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
                                <button className="btn btn-primary" onClick={genPokemonRandom}>Gen Pokemon</button>
                            </Col>
                        </Row> */}
                    </Col>

                </Row>
            </div>
            {currentPokemon &&
                <CustomModal
                    show={showFreePokemonModal}
                    title={'¿Deseas liberar a "' + capitalizeFirstLetter(currentPokemon.name) + '"? Ya no será parte de tu equipo'}
                    okText={'Liberar'}
                    cancelText={'Cancelar'}
                    cancelCallback={closeFreePokemonModal}
                    acceptCallback={acceptToFreePokemon}
                    imgUrl={currentPokemon.spriteFront}
                />}
        </>
    )
}
