import { Route, Switch } from 'react-router-dom';
import './App.css';
import Dogs from './components/Home/dogs';
import DogDetail from './components/DetailDog/dogDetail';
import NavBar from './components/navBar';
import MyDogs from './components/myDogs';
import AddDog from './components/addDog'

function App() {
  return (
    <div className="App">
      <NavBar/>
      <Switch>

        <Route path="/myDogs">
          <MyDogs/>
        </Route>

        <Route path="/addDog">
          <AddDog/>
        </Route>

        <Route path="/home/:id">
          <DogDetail/>
        </Route>

        <Route path="/home">
          <Dogs/>
        </Route>

      </Switch>
    </div>
  );
}

export default App;
