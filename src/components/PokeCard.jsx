import { useEffect, useState } from "react"
import { getPokedexNumber, getFullPokedexNumber } from "../utils"
import  TypeCard  from "./TypeCard"

export default function PokeCard (props) { //Once user selects a pokemon from the SideNav, this component will render out the details of the selected pokemon including stats, type, abilities, etc.
    const {selectedPokemon} = props
    const [data, setData] = useState(null) // State to hold the fetched Pokémon data
    const [loading, setLoading] = useState(false) // State to indicate loading status
   //const [error, setError] = useState(null) // State to hold any error that occurs during fetching

    const { name, height, abilities, stats, types, moves, sprites } = data || {}

    const imgList = Object.keys(sprites || {}).filter(val => {
        if (!sprites[val]) {return false }
            if(['versions','other'].includes(val)) {return false }
            return true
        
        })

    useEffect(() => { 
        // Logic to fetch and display details of the selected Pokémon
        //If loading, exit loop
        if (loading || !localStorage) {return}

        //check if the selected pokemon information is available in the cache
        // 1. define the cache
        let cache = {} // defining in cache before the info we will get from the API is object - you can see on their website the data structure that is returned
        if (localStorage.getItem('pokedex')) {
            cache = JSON.parse(localStorage.getItem('pokedex'))
        }

        // 2. Check if the selected prokong is in the cache, otherwise fetch from the API
        if(selectedPokemon in cache) {
            //READ FROM CACHE
            setData(cache[selectedPokemon])
            return
        } 

        //FETCH FROM API, passed all the cache stuff to no avail.

        async function fetchPokemonData() {
            setLoading(true)
            try {
                const baseIRL = 'https://pokeapi.co/api/v2/'
                const suffix = 'pokemon/' + getPokedexNumber(selectedPokemon)
                const finalURL = baseIRL + suffix
                const res = await fetch(finalURL)
                const pokemonData = await res.json()
                setData(pokemonData)
                console.log(pokemonData)
                cache[selectedPokemon] = pokemonData
                localStorage.setItem('pokedex',JSON.stringify(cache))
            } catch (err) {
                //setError(err)
                console.log(err.message)
            } finally {
                setLoading(false)
            }
            }

            fetchPokemonData()

        // 3. If fetched from the API, store in the cache for future use

        // These steps are essential to prevent from getting banned from the API due to excessive requests
    }, [selectedPokemon])

     if (loading || !data) {
        return (
            <div>
                <h4>Loading...</h4>
            </div>
        )
    }
    
    return (
        <div className="poke-card">
            <div>
                <h4>#{getFullPokedexNumber(selectedPokemon)}</h4>
                  <h2>{name}</h2>
            </div>
            <div className="type-container">
                {types.map((typeObj, typeIndex) => {
                    return (
                        <TypeCard key={typeIndex} type={typeObj?.type?.name} />
                    )
                })}
            
            </div>
            <img className="default-img" src={'/pokemon/' + getFullPokedexNumber(selectedPokemon) + 
                '.png'} alt={'${name}-large=img'} />
                <div className="img-container">
                    {imgList.map((spriteUrl, spriteIndex) => {
                        const imgURL = sprites[spriteUrl]
                        return (
                            <img key={spriteIndex} src={imgURL} alt={`${name}-img-${spriteUrl}-img`} />
                        )
                    })}
                </div>
                <h3>Stats</h3>
                <div className="stats-card">
                    {stats.map((statObj, statIndex) => {
                   const { stat, base_stat } = statObj
                   return (
                    <div key={statIndex} className="stat-item">
                        <p>{stat?.name.replaceAll('-', ' ')}</p>
                        <p>{base_stat}</p>
                    </div>
                   ) 
                })}
                </div>
                <h3>Moves</h3>
                <div className="pokemon-move-grid">
                    {moves.map((moveObj, moveIndex) => {
                    return (
                        <button className="button-card pokemon-move"
                        key={moveIndex} onClick={() => {}}>
                            <p>{moveObj?.move?.name.replaceAll('-',' ')}</p>
                        </button>
                    )
                    })}
                </div>
            
                </div>
        
    )
}