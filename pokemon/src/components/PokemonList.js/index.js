// PokemonList.js
import React, { useState, useEffect } from 'react';
import './index.css';

const PokemonList = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    fetchPokemon();
  }, []);

  const fetchPokemon = async () => {
    try {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=14');
      const data = await response.json();
      setPokemonList(data.results);
    } catch (error) {
      console.error('Error fetching Pokémon:', error);
    }
  };

  const fetchPokemonDetails = async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setSelectedPokemon(data);
      setShowDetails(true); 
    } catch (error) {
      console.error('Error fetching Pokémon details:', error);
    }
  };

  return (
    <div className="pokemon-container">
        <h1>Pokémon List</h1>
        <div className='pokemon'>
      <div className="pokemon-list">
        {pokemonList.map((pokemon, index) => (
          <div key={index} className="pokemon-card" onClick={() => fetchPokemonDetails(pokemon.url)}>
            {index + 1}. {pokemon.name.charAt(0).toUpperCase()+pokemon.name.slice(1)}
          </div>
        ))}
      </div>

      <div className={showDetails ? "pokemon-details show" : "pokemon-details"}>
        {selectedPokemon && (
          <div>
            <h2 style={{ textTransform: 'capitalize' }}>{selectedPokemon.name}</h2>
            <img src={selectedPokemon.sprites.front_default} alt={selectedPokemon.name} />
            <p>Height: {selectedPokemon.height}</p>
            <p>Weight: {selectedPokemon.weight}</p>
            <p>Abilities:</p>
            <ul>
              {selectedPokemon.abilities.map((ability, index) => (
                <li key={index}>{ability.ability.name}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
      </div>
    </div>
  );
};

export default PokemonList;
