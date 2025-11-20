import { first151Pokemon, getFullPokedexNumber } from "../utils"

export default function SideNav () { // will render out all the different pokemon from the original 151 pokemon in the first pokeLibrary, user will be able to select pokemon different pokemon and get a breakdown of their stats 
    return (
        <nav>
            <div className={"header"}>
            <h1 className="text-gradient">PokéLibrary</h1>
            </div>
            <input />
            {first151Pokemon.map((pokemon, pokemonIndex) => {
            return(
                <button key={pokemonIndex} className={'nav-card'}>
                    <p>{getFullPokedexNumber(pokemonIndex)}</p>
                    <p>{pokemon}</p>
                </button>
            )
            
})}
        </nav>
        
    )
}