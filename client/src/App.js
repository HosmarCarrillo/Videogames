import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Home from "./components/Home";
import NewVideoGame from "./components/NewVideoGame";
import Detail from './components/Detail';
import './App.css';

function App() {
  return (
    <BrowserRouter>
    <div>
      <div className="App">          
      <Switch>
            <Route exact path = '/' component= { LandingPage }/>
            <Route path = '/home' component= { Home }/>
            <Route path = '/videogames' component= {NewVideoGame}/>
            <Route path = '/detail/:id' component= {Detail}/>
      </Switch>
      </div>
    </div>
    </BrowserRouter>
  );
}

export default App;
