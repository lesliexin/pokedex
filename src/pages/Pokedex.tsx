import { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

interface PokemonInfo {
  id: number;
  height: number;
  weight: number;
  sprites: {
    front_default: string;
  };
}

export const Pokedex = () => {
  const [pokemonInfo, setPokemonInfo] = useState<PokemonInfo>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { pokemon } = useParams();
  const URL = `https://pokeapi.co/api/v2/pokemon/${pokemon}`; // default 20

  const [cacheData, setCacheData] = useState<boolean>(false);

  const getPokemon = () => {
    fetch(URL)
      .then((response) => response.json())
      .then((json) => {
        const temp = (({ id, height, weight, sprites }: PokemonInfo) => ({
          id,
          height,
          weight,
          sprites,
        }))(json);
        setPokemonInfo(temp);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getPokemon();
    checkCache();
  }, []);

  const capturePokemon = () => {
    pokemon && localStorage.setItem(pokemon, JSON.stringify(pokemon));
    setCacheData(true);
  };

  const checkCache = () => {
    setCacheData(localStorage.getItem(pokemon ?? "") !== null);
  };

  const alreadyCaptured = (
    <>
      <p>Already captured</p>
      <button onClick={() => {}}>Release</button>
    </>
  );

  const toBeCaptured = (
    <button onClick={() => capturePokemon()}>Capture</button>
  );

  return (
    <>
      <Container>
        <p>Pokedex page</p>
        <p>name: {pokemon}</p>
        {isLoading && <p>loading...</p>}
        {pokemonInfo && (
          <>
            <p>id: {pokemonInfo.id}</p>
            <p>height: {pokemonInfo.height}</p>
            <p>weight: {pokemonInfo.weight}</p>
            <img
              alt={`${pokemon} from the front`}
              src={pokemonInfo.sprites.front_default}
            />
            {cacheData ? alreadyCaptured : toBeCaptured}
          </>
        )}
      </Container>
    </>
  );
};
