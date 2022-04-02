import HomeScreen from './Screens/HomeScreen/index';
import { BrowserRouter, Route, Switch, } from 'react-router-dom';
import PokemonDetailScreen from './Screens/DetailScreen/index';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/home">
          <HomeScreen />
        </Route>
        <Route exact path="/detail/:id">
          <PokemonDetailScreen />
        </Route>
        <Route path="*">
          <HomeScreen />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}
export default App