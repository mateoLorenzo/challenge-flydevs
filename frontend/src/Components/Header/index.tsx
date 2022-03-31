
import './styles.css'
import { Link, useLocation } from 'react-router-dom';


const Header = () => {
   const currentPath = useLocation().pathname

   const getNavItemClassName = (navItemName: string) => {
      if (currentPath === `/${navItemName}`) {
         return "navBarItem selectedPath"
      }
      return "navBarItem"
   }

   return (
      <div className="headerContainer">
         <div className='navbarContainer'>
            <Link to="/pokedex" className={getNavItemClassName("pokedex")} >Pokedex</Link>
            <Link to="/maps" className={getNavItemClassName("maps")}>Maps</Link>
            <Link to="/games" className={getNavItemClassName("games")}>Games</Link>
         </div>
      </div>
   )
}

export default Header;