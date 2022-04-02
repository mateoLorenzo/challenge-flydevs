import "./styles.css"
import { useHistory } from 'react-router-dom';
import { PokemonQuickView } from '../../Entities/PokemonQuickView';
import transparentPokeball from '../../Assets/transparentPokeball.png'
import questionMark from '../../Assets/questionMark.png'

/**
 * @name PokemonCard
 * @description 
 * Component to render a custom pokemon card
 * @param {PokemonQuickView} pokemonQuickViewDetails Set of properties that the component will use to render pokemon info
 * @example
 *     const SomeComponent = () => {
         {pokemonsList.map((pokemon: PokemonQuickView) => {
            return (
               <PokemonCard
                  key={pokemon.id}
                  pokemonQuickViewDetails={pokemon}
               />
            )
         })}
*     }
*/

interface IPokemonCardProps {
   pokemonQuickViewDetails: PokemonQuickView
}

const PokemonCard = ({ pokemonQuickViewDetails }: IPokemonCardProps) => {
   let history = useHistory();
   return (
      <div className='pokemonCardContainer'>
         <div
            style={{
               backgroundImage: `url(${pokemonQuickViewDetails.image
                  ? pokemonQuickViewDetails.image
                  : questionMark
                  })`
            }}
            className='pokemonCardImage'
         />
         <div
            className='pokemonCardSubContainer'
            onClick={() => {
               history.push(
                  `/detail/${pokemonQuickViewDetails.name}`,
                  { pokemonQuickViewDetails }
               )
            }}
         >
            <div className='pokemonCard-DivisorLine' />
            <div className="pokemonCard-InfoContainer">
               <img src={transparentPokeball} alt="transparent-pokeball" className="pokeballImage" />
               <p className='pokemonName'>{pokemonQuickViewDetails.name}</p>
               <img src={transparentPokeball} alt="transparent-pokeball" className="pokeballImage" />
            </div>
            <div className='quickViewButtonContainer'
            >
               <p className='quickViewButtonText'>View Detail</p>
            </div>
         </div>
      </div>
   )
}

export default PokemonCard