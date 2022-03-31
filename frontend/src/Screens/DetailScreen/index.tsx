import axios from 'axios';
import React from 'react'
import { useParams, useLocation } from 'react-router-dom';
import { PokemonQuickView } from '../../Entities/PokemonQuickView';
import { useEffect } from 'react';
import { PokemonDetail } from '../../Entities/PokemonDetail';
import transparentPokeball from '../../Assets/transparentPokeball.png'
import './styles.css'

const PokemonDetailScreen = () => {
   const actualPage: any = useLocation()

   useEffect(() => {
      fetchPokemonDetail(1)
      getPokemonDetail().then(response => console.log('response from getPokemonDetail: ', response))
   }, [])

   const getPokemonQuickViewDetails = () => {
      const pokemonQuickViewDetails: PokemonQuickView = actualPage.state.pokemonQuickViewDetails
      return {
         height: pokemonQuickViewDetails.height,
         id: pokemonQuickViewDetails.id,
         image: pokemonQuickViewDetails.image,
         name: pokemonQuickViewDetails.name,
         types: pokemonQuickViewDetails.types,
         weight: pokemonQuickViewDetails.weight
      }
   }

   const getPokemonDetail = async (): Promise<PokemonDetail> => {
      const { height, id, image, name, types, weight } = getPokemonQuickViewDetails()
      const { description, gender, habitat } = await fetchPokemonDetail(id)
      return new PokemonDetail(
         image,
         name,
         id,
         types,
         height,
         weight,
         description,
         gender,
         habitat
      )
   }

   const fetchPokemonDetail = async (pokemonId: number) => {
      const response = await axios.get(`http://localhost:3002/pokemons/detail/`, { params: { id: pokemonId } })
      console.log("response : ", response.data)
      return {
         description: response.data.description,
         gender: response.data.gender,
         habitat: response.data.habitat
      }
   }

   return (
      <div className='detailScreenMainContainer'>
         <div className="detailScreenSubContainer">
            <h3>Back</h3>
            <div className="detailScreenContentContainer">
               <div className="detailScreenLeftCardContainer"></div>
               <div className="detailScreenRightCardContainer">
                  <img src={transparentPokeball} />
                  <div className="pokemonPropertyBlockContainer">
                     <p className='pokemonDetailProperty'>Height</p>
                     <p className='pokemonDetailValue'>0,00</p>
                  </div>
                  <div className="propertyDivisor"></div>
                  <div className="pokemonPropertyBlockContainer">
                     <p className='pokemonDetailProperty'>Weight</p>
                     <p className='pokemonDetailValue'>0,00</p>
                  </div>
                  <div className="propertyDivisor"></div>
                  <div className="pokemonPropertyBlockContainer">
                     <p className='pokemonDetailProperty'>Gender</p>
                     <p className='pokemonDetailValue'>value</p>
                  </div>
                  <div className="propertyDivisor"></div>
                  <div className="pokemonPropertyBlockContainer">
                     <p className='pokemonDetailProperty'>Habitat</p>
                     <p className='pokemonDetailValue'>Mountain</p>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default PokemonDetailScreen