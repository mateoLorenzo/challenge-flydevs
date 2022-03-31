import CSS from 'csstype';
import './styles.css'

interface ICustomTypeButton {
   customStyle?: CSS.Properties
   // pokemonType: pokemonTypes
   pokemonType: any
}


// const getButtonBackgroundColor = (pokemonTypeSelected: pokemonTypes) => {
const getButtonBackgroundColor = (pokemonTypeSelected: any) => {
   if (pokemonTypeSelected === "Fire") return "#FC7D23"
   if (pokemonTypeSelected === "Water") return "#51C3E7"
   if (pokemonTypeSelected === "Plant") return "#9BCB50"
   if (pokemonTypeSelected === "Psychic") return "#7B62A3"
   if (pokemonTypeSelected === "Electric") return "#EDD433"
   return "#FC7D23" //TODO: Borrar este 
}

const CustomTypeButton = ({ customStyle, pokemonType }: ICustomTypeButton) => {
   const buttonBackgroundColor = getButtonBackgroundColor(pokemonType)
   return (
      <div className="pokeTypeButton" style={{ backgroundColor: buttonBackgroundColor, ...customStyle }}>
         <p className='pokeTypeButtonText'>{pokemonType}</p>
      </div>
   )
}

export default CustomTypeButton
