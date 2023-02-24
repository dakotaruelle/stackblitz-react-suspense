import * as React from 'react';
import { Nav } from './nav';
import { MainClient, NamedAPIResource } from 'pokenode-ts';
import { Fragment, Suspense, useEffect, useState } from 'react';
import { Button, Card } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

export function Page1() {
  const [showPokemonList, setShowPokemonList] = useState<boolean>(false);

  return (
    <div>
      <Nav />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <h1 style={{ color: 'white' }}>Suspense Demo</h1>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          variant="contained"
          onClick={() => setShowPokemonList(true)}
          style={{ marginBottom: '50px' }}
        >
          Load Data
        </Button>
      </div>

      {showPokemonList && (
        <Suspense fallback={<LoadingSpinner1 />}>
          <PokemonList />
        </Suspense>
      )}
    </div>
  );
}

function PokemonList() {
  const { data } = useQuery({
    queryKey: ['pokemonList'],
    queryFn: getPokemonList,
  });

  return (
    <Fragment>
      {data.results.map((pokemon, index) => (
        <div key={index} style={{ display: 'flex', justifyContent: 'center' }}>
          <Pokemon name={pokemon.name} url={pokemon.url} />
        </div>
      ))}
    </Fragment>
  );
}

function Pokemon(props: { name: string; url: string }) {
  return (
    <Card
      style={{
        padding: '20px',
        marginBottom: '5px',
        width: '200px',
        background: 'rgb(18, 18, 18)',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ color: 'white', display: 'flex', alignItems: 'center' }}>
          {props.name.charAt(0).toUpperCase() + props.name.slice(1)}
        </div>
        <Suspense fallback={<LoadingSpinner2 />}>
          <PokemonImage name={props.name} />
        </Suspense>
      </div>
    </Card>
  );
}

function PokemonImage(props: { name: string }) {
  const { data } = useQuery({
    queryKey: ['pokemonDetails'],
    queryFn: () => getPokemonDetails(props.name),
  });

  return <img src={data.sprites.front_default} />;
}

function getPokemonList() {
  const api = new MainClient();

  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        const data = await api.pokemon.listPokemons(0, 1);
        resolve(data);
      } catch (error) {
        reject(error);
      }
    }, 3000);
  });
}

async function getPokemonDetails(name: string) {
  const api = new MainClient();

  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        const data = await api.pokemon.getPokemonByName(name);
        resolve(data);
      } catch (error) {
        reject(error);
      }
    }, 5000);
  });
}

function LoadingSpinner1() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div className="lds-grid">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

function LoadingSpinner2() {
  return (
    <div className="lds-ring">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}
