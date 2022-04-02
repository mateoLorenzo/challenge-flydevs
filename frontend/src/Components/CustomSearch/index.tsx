import "./styles.css"
import { ReactComponent as SearchIcon } from '../../Assets/searchIcon.svg';
import { IoCloseSharp } from 'react-icons/io5';
import ReactTooltip from 'react-tooltip'

/**
 * @name CustomSearch
 * @description 
 * Component to render a custom search bar
 * @param {string} textSearched Value of the search bar input
 * @param {Function} onClearSearch Function to execute when clicking on search bar clear icon
 * @param {Function} onSearch Function to execute when typing enter or clicking in search button
 * @param {Function} onChangeText Function to execute when user type something in the search input
 * @param {boolean} loading Property to determine if search spinner must be shown 
 * @param {boolean} userHasSearchedSomething Property to determine if clear icon must be shown
 * @example
 *     const SomeComponent = () => {
         <CustomSearch
            onClearSearch={() => console.log("onClearIconFunction")}
            textSearched={"example of text searched"}
            onSearch={() => console.log("onSearchFunction")}
            onChangeText={() => console.log("onChangeTextFunction")}
            loading={false}
            userHasSearchedSomething={false}
         />
*     }
*/

interface ICustomSearchParams {
   textSearched: string;
   onClearSearch: Function;
   onSearch: Function;
   onChangeText: Function;
   loading: boolean;
   userHasSearchedSomething: boolean;
}

const CustomSearch = ({
   textSearched,
   onClearSearch,
   onSearch,
   onChangeText,
   loading,
   userHasSearchedSomething
}: ICustomSearchParams) => {

   const onKeyPress = (event: any) => {
      if (event.key === 'Enter') {
         event.preventDefault()
         onSearch(event)
      }
   }

   return (
      <form className="searchInputContainer">
         {userHasSearchedSomething &&
            <div className="removeSearchButton" onClick={() => onClearSearch()}>
               <IoCloseSharp size={30} />
            </div>
         }
         <input
            type="text"
            className="searchInput"
            onChange={(event) => onChangeText(event.target.value)}
            placeholder="Search Pokemons"
            onKeyDown={(e) => onKeyPress(e)}
            value={textSearched}
         />
         <button
            type="submit"
            className="searchButton"
            onClick={(event) => onSearch(event)}
            data-tip
            data-for="buttonTooltip"
         >
            <ReactTooltip
               id="buttonTooltip"
               place="top"
               type="dark"
               effect="solid"
               className={textSearched.length === 0 ? "searchTooltip" : "invisible"}
               arrowColor="black"
            >Type something!</ReactTooltip>
            {loading
               ? <div className="searchSpinner"></div>
               : <SearchIcon className="searchIcon" />
            }
         </button>
      </form >
   )
}

export default CustomSearch