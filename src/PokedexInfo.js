import axios from 'axios';
import React, { useEffect, useState } from 'react';
import useAuth from './Auth/useAuth';

const PokedexInfo = ({pokemonUrl}) =>  {
  const [pokemoneswindow, setPokemonesWindow] = useState([])
  const [pokemonesPoints, setPokemonesPoints] = useState([])
    
  useEffect(()=> {
    if(pokemonUrl){
      const getPokemonesWindow = () => {
        axios.get(pokemonUrl)
        .then((response)=> {
          const pokemones  = response
          setPokemonesWindow(pokemones.data)
          setPokemonesPoints(pokemones.data.stats)
        })
        .catch(error => console.error(`Error: ${error}`))
      }
      getPokemonesWindow()
    }
  },[pokemonUrl])

    return (
        <div>
            {pokemonesPoints.length && pokemoneswindow? (<> <h3>{pokemoneswindow.name}</h3>
            <img src={pokemoneswindow.sprites?.other.dream_world.front_default} alt={pokemoneswindow.name}></img>,
            <h4>{`${pokemonesPoints[0].stat.name}: ${pokemonesPoints[0].base_stat}`}</h4>
            <h4>{`${pokemonesPoints[1].stat.name}: ${pokemonesPoints[1].base_stat}`}</h4>
            <h4>{`${pokemonesPoints[2].stat.name}: ${pokemonesPoints[2].base_stat}`}</h4>
            <h4>{`${pokemonesPoints[3].stat.name}: ${pokemonesPoints[3].base_stat}`}</h4>
            <h4>{`${pokemonesPoints[4].stat.name}: ${pokemonesPoints[4].base_stat}`}</h4>
            <h4>{`${pokemonesPoints[5].stat.name}: ${pokemonesPoints[5].base_stat}`}</h4>
            </>
            ): (null)}
            
        </div>
    );
}

export default PokedexInfo;