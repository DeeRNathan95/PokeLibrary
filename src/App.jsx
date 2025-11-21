import  Header  from "./components/Header"
import  Modal  from "./components/Modal"
import  PokeCard  from "./components/PokeCard"
import  SideNav  from "./components/SideNav"
import  TypeCard from "./components/TypeCard"

import {useState} from "react"

function App() {
  const [selectedPokemon, setSelectedPokemon] = useState(0)
  const [showSideMenu, setShowSideMenu] = useState(true) //this does the opposite of what it should do (ie, when showSideMeny it true, its actual false)

  function handleToggleMenu() {
    setShowSideMenu(!showSideMenu)
  } 

  function handleCloseMenu() {
    setShowSideMenu(true)
  }

  return (
    <>
    <Header handleToggleMenu={handleToggleMenu} />
    <SideNav 
      showSideMenu={showSideMenu} 
      selectedPokemon = {selectedPokemon} 
      setSelectedPokemon = {setSelectedPokemon} 
      handleCloseMenu={handleCloseMenu} />
    <PokeCard selectedPokemon = {selectedPokemon} />
    </>
  )
}

export default App
