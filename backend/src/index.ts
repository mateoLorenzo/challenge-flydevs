import express from "express";
import cors from 'cors';
import { PokemonDetailResponse } from "./Entities/PokemonDetailResponse";
import { PokemonQuickViewResponse } from "./Entities/PokemonQuickViewResponse";
import { default as axios } from 'axios';
const app = express()
app.use(cors())

let allPokemonsNames: string[];
let pokemonsSearchedNames: string[];

app.get('/pokemons/detail/', async (req: any, res: any) => {
   let responseToFront;
   try {
      const pokemonId = getIdFromQuery(req)
      const pokemonDescriptionResponse = await fetchPokemonInfo("characteristic", pokemonId)
      const pokemonGenderResponse = await fetchPokemonInfo("gender", pokemonId)
      const pokemonHabitatResponse = await fetchPokemonInfo("pokemon-habitat", pokemonId)
      responseToFront = filterPokemonDetailResponse(
         pokemonDescriptionResponse,
         pokemonGenderResponse,
         pokemonHabitatResponse
      )
   } catch (error) {
      responseToFront = `Something went wrong, please, try again. ${error}`
   }
   res.json(responseToFront)
})

app.get('/pokemons/list/', async (req: any, res: any) => {
   let responseToFront;
   try {
      await loadPokemonsNames()
      const { page, limit, name } = getQueryValues(req)
      const { startIndex, endIndex } = calculateResponseLength(page, limit)
      const listOfPokemonsToFetch = getListOfPokemonsToFetch(name, startIndex, endIndex)
      const pokemonsListResponse = await fetchPokemons(listOfPokemonsToFetch)
      const pokemonsListFiltered = filterPokemonsProperties(pokemonsListResponse)
      const pokemonsReferenceList = getPokemonsReferenceList(name)
      const previousAndNextPage = getPreviousAndNextPage(pokemonsReferenceList, startIndex, endIndex, page, limit)
      const listPokemonsResult = { ...previousAndNextPage, pokemonsList: pokemonsListFiltered }
      responseToFront = listPokemonsResult
   } catch (error) {
      responseToFront = `Something went wrong, please, try again. ${error}`
   }
   res.json(responseToFront)
})

const getIdFromQuery = (request: any): number => {
   return parseInt(request.query.id)
}

const fetchPokemonInfo = async (pokemonDetail: string, pokemonId: number): Promise<any> => {
   let pokemonResponse;
   try {
      pokemonResponse = await axios.get(`https://pokeapi.co/api/v2/${pokemonDetail}/${pokemonId}/`)
   } catch {
      pokemonResponse = "Unknown"
   }
   return pokemonResponse
}

const filterPokemonDetailResponse = (
   pokemonDescriptionResponse: any,
   pokemonGenderResponse: any,
   pokemonHabitatResponse: any,
): PokemonDetailResponse => {
   return new PokemonDetailResponse(
      getPokemonDescriptionValue(pokemonDescriptionResponse),
      getPokemonResponseValue(pokemonGenderResponse),
      getPokemonResponseValue(pokemonHabitatResponse)
   )
}

const getPokemonDescriptionValue = (pokemonResponse: any): string => {
   if (!pokemonResponse.data) return pokemonResponse
   const completePokemonDescription = pokemonResponse.data.descriptions.find((description: any) => {
      return description.language.name === "en"
   })
   return completePokemonDescription.description
}

const getPokemonResponseValue = (pokemonResponse: "Unknown" | any): string => {
   if (!pokemonResponse.data) return pokemonResponse
   return capitalizeFirstLetter(pokemonResponse.data.name)
}

const loadPokemonsNames = async () => {
   if (!allPokemonsNames) {
      const pokemonsReference = await getAllPokemonsReference()
      allPokemonsNames = getPokemonsNames(pokemonsReference)
   }
}

const getAllPokemonsReference = async (): Promise<any> => {
   const allPokemonsReferenceResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon/`, { params: { limit: 1200, page: 1 } })
   return allPokemonsReferenceResponse.data.results
}

const getPokemonsNames = (allPokemonsReference: any[]): string[] => {
   const pokemonsNames = allPokemonsReference.map((pokemon: any) => {
      return pokemon.name
   })
   return pokemonsNames
}

const getQueryValues = (request: any): {page: number, limit: number, name: string} => {
   let page = 1
   let limit = 20
   if (request.query.page) {
      page = parseInt(request.query.page)
   }
   if (request.query.limit) {
      limit = parseInt(request.query.limit)
   }
   return { page, limit, name: request.query.name }
}

const calculateResponseLength = (page: number, limit: number) => {
   const startIndex = (page - 1) * limit
   const endIndex = page * limit
   return { startIndex, endIndex }
}

const getListOfPokemonsToFetch = (name: string, startIndex: number, endIndex: number): any[] => {
   let listOfPokemonsToFetch: string[];
   if (name) {
      savePokemonsSearchedNames(name)
      listOfPokemonsToFetch = pokemonsSearchedNames.slice(startIndex, endIndex)
      return listOfPokemonsToFetch
   }
   listOfPokemonsToFetch = allPokemonsNames.slice(startIndex, endIndex)
   return listOfPokemonsToFetch
}

const savePokemonsSearchedNames = (name: string) => {
   pokemonsSearchedNames = allPokemonsNames.filter(pokemonName => {
      return pokemonName.includes(name)
   })
}

const fetchPokemons = async (pokemonsNamesList: string[]): Promise<any[]> => {
   const myArray = await Promise.all(pokemonsNamesList.map(async (pokemonName) => {
      const actualPokemon = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}/`)
      return actualPokemon.data
   }))
   return myArray
}

const filterPokemonsProperties = (pokemonsList: any[]): PokemonQuickViewResponse[] => {
   const pokemonsFiltered = pokemonsList.map(pokemon => {
      const pokemonTypes = getPokemonTypes(pokemon.types)
      return new PokemonQuickViewResponse(
         pokemon.sprites.other['official-artwork'].front_default,
         capitalizeFirstLetter(pokemon.name),
         pokemon.id,
         pokemonTypes,
         pokemon.height,
         pokemon.weight
      )
   })
   return pokemonsFiltered;
}

const getPokemonTypes = (pokemonTypes: any): string[] => {
   const pokemonTypesNames = pokemonTypes.map((pokemonType: any) => {
      return capitalizeFirstLetter(pokemonType.type.name)
   })
   return pokemonTypesNames
}

const capitalizeFirstLetter = (wordToCapitalize: string): string => {
   return wordToCapitalize.charAt(0).toUpperCase() + wordToCapitalize.slice(1);
}

const getPokemonsReferenceList = (name: string): string[] => {
   if (name) {
      return pokemonsSearchedNames
   }
   return allPokemonsNames
}

const getPreviousAndNextPage = (
   pokemonsNamesReference: string[],
   startIndex: number,
   endIndex: number,
   page: number,
   limit: number
): any => {
   let previousAndNextPage = {}
   if (startIndex > 1) {
      previousAndNextPage = {
         previous: {
            page: page - 1,
            limit: limit
         }
      }
   }

   if (endIndex < pokemonsNamesReference.length) {
      previousAndNextPage = {
         ...previousAndNextPage,
         next: {
            page: page + 1,
            limit: limit
         }
      }
   }
   return previousAndNextPage
}

app.listen('3001', () => console.log("listening on port 3001"))