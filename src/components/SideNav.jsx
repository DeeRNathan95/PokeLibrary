import { first151Pokemon, getFullPokedexNumber } from "../utils"

import { useState } from "react"

export default function SideNav (props) { // will render out all the different pokemon from the original 151 pokemon in the first pokeLibrary, user will be able to select pokemon different pokemon and get a breakdown of their stats 
    const {selectedPokemon, setSelectedPokemon, handleCloseMenu, showSideMenu} = props

    const [searchValue, setSearchValue] = useState('')

    const filteredPokemon = first151Pokemon.filter((ele, eleIndex) => {
        // if the full pokedex number includes the current seach value, return true
        if ((getFullPokedexNumber(eleIndex)).includes(searchValue)) {
            return true
        }
        //if the pokemon name includes thge currenct search value,, return true
        if (ele.toLowerCase().includes(searchValue.toLowerCase())) {
            return true
        }
        //otherwise, exclude value from array.
        return false
    })

    return (
        <nav className={" " + (!showSideMenu ? "open" : '')}>
            <div className={"header" + (!showSideMenu ? "open" : '')}>
                <button onClick={handleCloseMenu} 
                className="open-nav-button">
                    <i className="fa-solid fa-arrow-left-long"></i>
                </button>
            <h1 className="text-gradient">PokéLibrary</h1>
            </div>
            <input placeholder="E.g. 001 or Bulba..." value={searchValue} onChange={(e) => {
                setSearchValue(e.target.value)
            }} />
            {filteredPokemon.map((pokemon, pokemonIndex) => {
                const truePokemonNumber = first151Pokemon.
                    indexOf(pokemon)
            return(
                <button onClick={() => {
                    setSelectedPokemon(truePokemonNumber)
                    handleCloseMenu()
                 }} key={pokemonIndex} className={'nav-card' + (pokemonIndex === selectedPokemon ? ' nav-card-selected' : '')}>
                    <p>{getFullPokedexNumber(truePokemonNumber)}</p>
                    <p>{pokemon}</p>
                </button>
            )
            
})}
        </nav>
        
    )
}