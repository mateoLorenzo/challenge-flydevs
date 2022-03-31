
import CustomSearch from '../../Components/CustomSearch/index';
import "./styles.css"
import PokemonCard from '../../Components/PokemonCard/index';
import { useEffect, useState, } from 'react';
import axios from 'axios';
import { PokemonQuickView } from '../../Entities/PokemonQuickView';
import pokemonLogo from '../../Assets/pokemonLogo.png'
import thinkingPikachu from '../../Assets/thinkingPikachu.png'

const HomeScreen = () => {
   const [pokemonsListToRender, setPokemonsListToRender] = useState<any[]>([])
   const [pageToTake, setPageToTake] = useState<number>(1)
   const [loading, setLoading] = useState<boolean>(false)
   const [loadingFirstPage, setLoadingFirstPage] = useState<boolean>(false)
   const [loadingMorePokemons, setLoadingMorePokemons] = useState<boolean>(false)
   const [loadingPokemonsSearch, setLoadingPokemonsSearch] = useState<boolean>(false)
   const [textSearched, setTextSearched] = useState<string>("")
   const [canLoadMorePokemons, setCanLoadMorePokemons] = useState<boolean>(false)
   const [userHasSearchedSomething, setUserHasSearchedSomething] = useState<boolean>(false)
   const [noPokemonsWereFound, setNoPokemonsWereFound] = useState<boolean>(false)
   const noResultsFoundMessageTitle = "Sorry! No result found :("
   const noResultsFoundMessage = `We couldnt found any pokemon that matches your current search. ${<br />} Please try another name`

   useEffect(() => {
      setLoadingFirstPage(true)
      listPokemons(pageToTake, textSearched)
         .then(pokemons => {
            setPokemonsListToRender([...pokemonsListToRender, ...pokemons])
            setLoadingFirstPage(false)
         })
   }, [])


   const listPokemons = async (pageToTake: number, textSearched: string) => {
      setLoading(true)
      const response = await axios.get("http://localhost:3002/pokemons/list/", { params: { page: pageToTake, name: textSearched.trim() } })
      console.log("response: ", response)
      if (response.data.pokemonsList.length === 0) {
         setNoPokemonsWereFound(true)
      } else {
         setNoPokemonsWereFound(false)
      }
      const pokemonsList = toPokemonsQuickView(response.data.pokemonsList)
      setPageToTake(pageToTake + 1)
      if (response.data.next) {
         setCanLoadMorePokemons(true)
      } else {
         setCanLoadMorePokemons(false)
      }
      setLoading(false)
      return pokemonsList
   }

   const toPokemonsQuickView = (pokemonsList: any[]): PokemonQuickView[] => {
      const pokemonListFiltered = pokemonsList.map(pokemon => {
         return new PokemonQuickView(
            pokemon.image,
            pokemon.name,
            pokemon.id,
            pokemon.types,
            pokemon.height,
            pokemon.weight
         )
      })
      return pokemonListFiltered
   }

   const searchPokemons = async (e: any) => {
      e.preventDefault()
      if (!loading) {
         if (textSearched.trim() === "") return alert("User type nothing to search")
         setLoadingPokemonsSearch(true)
         const pokemonsResponse = await listPokemons(1, textSearched)
         setPokemonsListToRender(pokemonsResponse)
         setUserHasSearchedSomething(true)
         setLoadingPokemonsSearch(false)
      }
   }

   // const fetchPokemonsList = async () => {
   //    return await listPokemons(1, textSearched)
   // }

   const loadMorePokemons = async () => {
      if (!loading) {
         setLoadingMorePokemons(true)
         const pokemonsResponse = await listPokemons(pageToTake, textSearched)
         setPokemonsListToRender([...pokemonsListToRender, ...pokemonsResponse])
         setLoadingMorePokemons(false)
      }
   }

   const onChangeText = (value: string) => {
      setTextSearched(value)
   }

   const onClearSearch = async () => {
      setLoadingPokemonsSearch(true)
      setTextSearched("")
      const pokemonsResponse = await listPokemons(1, "")
      setPokemonsListToRender(pokemonsResponse)
      setUserHasSearchedSomething(false)
      setLoadingPokemonsSearch(false)
   }

   return (
      <div className='pokedexScreenContainer'>
         {loadingFirstPage &&
            <div className='mainHomeLoaderContainer'>
               <div className='mainHomeLoader'></div>
            </div>
         }
         <img src={pokemonLogo} alt="pokemon-logo" className='pokemonLogo' />
         <div className='searchContainer'>
            <CustomSearch
               onClearSearch={onClearSearch}
               textSearched={textSearched}
               onSearch={searchPokemons}
               onChangeText={onChangeText}
               loading={loadingPokemonsSearch}
               userHasSearchedSomething={userHasSearchedSomething}
            />
         </div>
         <div className='pokedexScreenSubContainer'>
            {noPokemonsWereFound &&
               <div className='noPokemonsFoundMessageContainer'>
                  <div className='noPokemonsFoundMessageSubContainer'>
                     <img src={thinkingPikachu} className="noPokemonsFoundImage" />
                     <h3 className='noPokemonsFoundMessageTitle'>{noResultsFoundMessageTitle}</h3>
                     <p className='noPokemonsFoundMessage'>{noResultsFoundMessage} </p>
                  </div>
               </div>
            }
            <div className='pokemonCardsContainer'>
               {pokemonsListToRender.map((pokemon: PokemonQuickView) => {
                  return (
                     <PokemonCard
                        key={pokemon.id}
                        pokemonQuickViewDetails={pokemon}
                     />
                  )
               })}
            </div>
            {canLoadMorePokemons &&
               <div className='loadMorePokemonsButton' onClick={loadMorePokemons}>
                  {loadingMorePokemons
                     ? <div className="spinner"></div>
                     : <p className='loadMorePokemonsButtonText'>Load More</p>
                  }
               </div>
            }
         </div>
      </div>
   )
}

export default HomeScreen
