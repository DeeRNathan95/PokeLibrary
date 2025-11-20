import { pokemonTypeColors } from "../utils"

export default function TypeCard (props) { // will render out the different pokemon types including their strengths and weaknesses, fire, water, poison etc.
    const { type } = props
    return (
        <div className="type-tile" style={{color: pokemonTypeColors?.
            [type]?.color, background: pokemonTypeColors?.[type]?.
            background}}>
            <p>{type}</p>
        </div>
    )
}