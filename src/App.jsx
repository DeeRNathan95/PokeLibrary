import  Header  from "./components/Header"
import  Modal  from "./components/Modal"
import  PokeCard  from "./components/PokeCard"
import  SideNav  from "./components/SideNav"
import  TypeCard from "./components/TypeCard"

import {useState} from "react"

function App() {
  const [selectedPokemon, setSelectedPokemon] = useState(0)

  return (
    <>
    <Header />
    <Modal />
    <PokeCard selectedPokemon = {selectedPokemon} setSelectedPokemon = {setSelectedPokemon} />
    <SideNav selectedPokemon = {selectedPokemon}/>
    <TypeCard />
    </>
  )
}

export default App
