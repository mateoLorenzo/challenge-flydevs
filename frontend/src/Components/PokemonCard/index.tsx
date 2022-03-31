import CustomTypeButton from '../CustomTypeButton'
import "./styles.css"
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { PokemonQuickView } from '../../Entities/PokemonQuickView';

interface IPokemonCardProps {
   // imageUrl: string;
   // pokemonName: string
   // id: number
   pokemonQuickViewDetails: PokemonQuickView
}

// const getCardBackgroundColor = (pokemonTypeSelected: string) => {
//    if (pokemonTypeSelected === "Fire") return "#F76545"
//    if (pokemonTypeSelected === "Water") return "#76AADB"
//    if (pokemonTypeSelected === "Plant") return "#70A83B"
//    if (pokemonTypeSelected === "Psychic") return "#A974BC"
//    if (pokemonTypeSelected === "Electric") return "#F7C545"
// }

// const PokemonCard = ({ imageUrl, pokemonName, id }: IPokemonCardProps) => {
const PokemonCard = ({ pokemonQuickViewDetails }: IPokemonCardProps) => {

   let history = useHistory();

   return (
      <>
         <div className='pokemonCardContainer'>
            <div style={{ backgroundImage: `url(${pokemonQuickViewDetails.image})` }} className='pokemonCardImage'></div>
            <div style={{ backgroundImage: `url(https://i.imgur.com/375wJTo.png)` }} className="pokeballImage" ></div>
            <div
               className='pokemonCardSubContainer'
               onClick={() => {
                  history.push(`/detail/${pokemonQuickViewDetails.name}`, { pokemonQuickViewDetails })
               }}>

               <p className='pokemonName'>{pokemonQuickViewDetails.name}</p>
               <div className='quickViewButtonContainer'
               >
                  <p className='quickViewButtonText'>View Detail</p>
               </div>
            </div>
         </div>
      </>
   )
}

export default PokemonCard