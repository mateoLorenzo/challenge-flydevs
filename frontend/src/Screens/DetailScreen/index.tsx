import './styles.css'
import axios from 'axios';
import { useState } from 'react'
import { useLocation } from 'react-router-dom';
import { PokemonQuickView } from '../../Entities/PokemonQuickView';
import { useEffect } from 'react';
import { PokemonDetail } from '../../Entities/PokemonDetail';
import { useHistory } from 'react-router-dom';
import { HiOutlineArrowSmLeft } from 'react-icons/hi'
import pokemonLogo from '../../Assets/pokemonLogo.png'
import questionMark from '../../Assets/questionMark.png'
import transparentPokeball from '../../Assets/transparentPokeball.svg'

const PokemonDetailScreen = () => {
   const [selectedPokemon, setSelectedPokemon] = useState<PokemonDetail>()
   const [selectedPokemonQuickView, setSelectedPokemonQuickView] = useState<PokemonQuickView>()
   const [loadingPokemonDetail, setLoadingPokemonDetail] = useState<boolean>(false)
   const actualPage: any = useLocation()
   const history = useHistory();

   useEffect(() => {
      savePokemonDetail()
   }, [])

   const savePokemonDetail = async () => {
      setLoadingPokemonDetail(true)
      const pokemonDetailResponse = await getPokemonDetail()
      setSelectedPokemon(pokemonDetailResponse)
      setLoadingPokemonDetail(false)
   }

   const getPokemonQuickViewDetails = (): {
      height: number;
      id: number;
      image: string;
      name: string;
      types: string[];
      weight: number;
   } => {
      const pokemonQuickViewDetails: PokemonQuickView =
         actualPage.state.pokemonQuickViewDetails;
      setSelectedPokemonQuickView(pokemonQuickViewDetails);
      return {
         height: pokemonQuickViewDetails.height,
         id: pokemonQuickViewDetails.id,
         image: pokemonQuickViewDetails.image,
         name: pokemonQuickViewDetails.name,
         types: pokemonQuickViewDetails.types,
         weight: pokemonQuickViewDetails.weight,
      };
   };

   const getPokemonDetail = async (): Promise<PokemonDetail> => {
      const { height, id, image, name, types, weight } =
         getPokemonQuickViewDetails();
      const { description, gender, habitat } = await fetchPokemonDetail(id);
      return new PokemonDetail(
         image,
         name,
         id,
         types,
         Math.trunc(height),
         Math.trunc(weight),
         `"${description}"`,
         gender,
         habitat,
      );
   };

   const fetchPokemonDetail = async (
      pokemonId: number,
   ): Promise<{ description: string; gender: string; habitat: string }> => {
      const response = await axios.get(`http://localhost:3001/pokemons/detail/`, {
         params: { id: pokemonId },
      });
      return {
         description: response.data.description,
         gender: response.data.gender,
         habitat: response.data.habitat,
      };
   };

   return (
      <div className='detailScreenMainContainer'>
         <img src={pokemonLogo} onClick={() => history.push("/home")} alt="pokemon-logo" className='pokemonLogo' />
         {loadingPokemonDetail &&
            <div className='mainScreenLoaderContainer'>
               <div className='mainHomeLoader'></div>
            </div>
         }
         <div className="detailScreenSubContainer">
            <div className='goBackButtonContainer' onClick={() => history.push('/')}>
               <HiOutlineArrowSmLeft size={30} />
               <h3>Back</h3>
            </div>
            <div className="detailScreenContentContainer">
               <div className="detailScreenLeftCardContainer">
                  <div
                     style={{
                        backgroundImage: `url(${selectedPokemonQuickView?.image
                           ? selectedPokemonQuickView?.image
                           : questionMark
                           })`
                     }}
                     className='pokemonDetailImage'
                  />
                  <p className='pokemonDetailName'>{selectedPokemonQuickView?.name} </p>
                  <div className='leftBlockDetailsContainer'>
                     <div className='leftBlockFirstPokemonDetails'>
                        <p className='pokemonDetail-id'>N.º{selectedPokemonQuickView?.id.toString().padStart(3, "0")}</p>
                        <p className='pokemonDetail-description'>{selectedPokemon?.description}</p>
                     </div>
                     <div className='leftBlockDivisorLine'></div>
                     <div className='leftBlock-PokemonTypesContainer'>
                        {selectedPokemonQuickView?.types.map((pokemonType, index) => {
                           return <div key={index} className='leftBlock-pokemonType'>
                              <p className='pokemonDetail-PokemonTypeText'>{pokemonType}</p>
                           </div>
                        })}
                     </div>
                  </div>
               </div>

               <div className="detailScreenRightCardContainer">
                  <img src={transparentPokeball} alt="transparent-pokeball" className="pokemonDetailTransparentPokeball" />
                  <div className="pokemonPropertyBlockContainer">
                     <p className='pokemonDetailProperty'>Height</p>
                     <p className='pokemonDetailValue'>{selectedPokemon?.height.toFixed(2)}</p>
                  </div>
                  <div className="propertyDivisor"></div>
                  <div className="pokemonPropertyBlockContainer">
                     <p className='pokemonDetailProperty'>Weight</p>
                     <p className='pokemonDetailValue'>{selectedPokemon?.weight.toFixed(2)}</p>
                  </div>
                  <div className="propertyDivisor"></div>
                  <div className="pokemonPropertyBlockContainer">
                     <p className='pokemonDetailProperty'>Gender</p>
                     <p className='pokemonDetailValue'>{selectedPokemon?.gender}</p>
                  </div>
                  <div className="propertyDivisor"></div>
                  <div className="pokemonPropertyBlockContainer">
                     <p className='pokemonDetailProperty'>Habitat</p>
                     <p className='pokemonDetailValue'>{selectedPokemon?.habitat}</p>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default PokemonDetailScreen