import { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

interface PokemonBasicInfo {
  id: number;
  name: string;
}

export const Home = () => {
  const [pokemonList, setPokemonList] = useState<PokemonBasicInfo[]>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const URL = "https://pokeapi.co/api/v2/pokemon/"; // default 20

  const getPokemon = () => {
    fetch(URL)
      .then((response) => response.json())
      .then((json) => {
        setPokemonList(json.results);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getPokemon();
  }, []);

  return (
    <>
      <Container>
        <div>Home page</div>
        {isLoading && <p>loading...</p>}
        {pokemonList &&
          pokemonList.map((pokemon: PokemonBasicInfo) => (
            <Link
              aria-label={`view ${pokemon.name} details`}
              to={`/${pokemon.name}`}
            >
              {pokemon.name}
            </Link>
          ))}
      </Container>
    </>
  );
};
