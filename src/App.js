import './App.scss';
import { Nav } from './components/Nav/Nav';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { Home } from './pages/Home/Home';
import { Events } from './pages/Events/Events';
import { Favories } from './pages/Favories/Favories';
import { Event } from './pages/Event/Event';
function App() {
  return (<Router>

    <div className="App">
      <Nav />
      <Switch>
        <Route exact path="/events">
          <Events />
        </Route>
        <Route path="/events/:id">
          <Event />
        </Route>
        <Route path="/favories">
          <Favories />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </div>
  </Router>
  );
}

export default App;
