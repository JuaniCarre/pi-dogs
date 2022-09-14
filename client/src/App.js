import { Route, Switch } from 'react-router-dom';
import './App.css';
import Dogs from './components/Home/dogs';
import DogDetail from './components/DetailDog/dogDetail';
import NavBar from './components/navBar';
import MyDogs from './components/myDogs';
import AddDog from './components/addDog'
import Landing from './components/Landing/Landing'

function App() {
  return (
    <div className="App">

      <Switch>

        <Route path="/myDogs">
        <NavBar/>
          <MyDogs/>
        </Route>

        <Route path="/addDog">
        <NavBar/>
          <AddDog/>
        </Route>

        <Route path="/home/:id">
        <NavBar/>
          <DogDetail/>
        </Route>

        <Route path="/home">
        <NavBar/>
          <Dogs/>
        </Route>

        <Route path="/">
          <Landing/>
        </Route>

      </Switch>
    </div>
  );
}

export default App;
