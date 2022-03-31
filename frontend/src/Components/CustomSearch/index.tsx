import "./styles.css"
import { ReactComponent as SearchIcon } from '../../Assets/searchIcon.svg';
import { IoCloseSharp } from 'react-icons/io5';
import { GrFormClose } from 'react-icons/gr';
import { FaThumbsDown } from 'react-icons/fa';
import { VscClose } from 'react-icons/vsc';
import { IconContext } from "react-icons";


interface ICustomSearchParams {
   // pokemonsToRender: PokemonQuickView[];
   // pokemonsToRender: any[];
   textSearched: string;
   onClearSearch: Function;
   onSearch: Function;
   onChangeText: Function;
   loading: boolean;
   userHasSearchedSomething: boolean;
}

const CustomSearch = ({ textSearched, onSearch, onClearSearch, onChangeText, loading, userHasSearchedSomething }: ICustomSearchParams) => {

   const _handleKeyDown = (e: any) => {
      if (e.key === 'Enter') {
         e.preventDefault()
         onSearch(e)
      }
   }


   return (
      <form className="searchInputContainer">
         {userHasSearchedSomething &&
            <div className="removeSearchButton" onClick={async () => await onClearSearch()}>
               <IoCloseSharp size={30} />
            </div>
         }
         <input
            type="text"
            className="searchInput"
            onChange={(e) => onChangeText(e.target.value)}
            placeholder="Search Pokemons"
            onKeyDown={(e) => _handleKeyDown(e)}
            value={textSearched}
         />
         <button
            type="submit"
            className="searchButton"
            onClick={(e) => onSearch(e)}
         >
            {loading
               ? <div className="searchSpinner"></div>
               : <SearchIcon className="searchIcon" />
            }
         </button>
      </form >
   )
}

export default CustomSearch