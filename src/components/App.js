import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { getPosts } from '../api';
import { useAuth } from '../hooks';
import { Home, Login } from '../pages';
import { Loader, Navbar } from './';
// import {API_ROOT} from '../utils/constants';


// These are a few dummy cmponents whicha are rendered upon destroying the main page and change of route
// dummy component About
const About = () => {
  return <h1>About</h1>;
};

//Dummy component UserInfo
const UserInfo = () => {
  return <h1>User</h1>;
};

//Dummy component Page404
const Page404 = () => {
  return <h1>404</h1>;
};

function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const auth = useAuth();

  

  if (auth.loading) {
    return <Loader />;
  }

  return (
    // Here Router s used to render different pages( different elements ) upon every change in Route 
    
     <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Home posts={[]} />
          </Route>

          <Route exact path="/login">
            <Login />
          </Route>

          <Route exact path="/about">
            <About />
          </Route>

          <Route exact path="/user/asdasd">
            <UserInfo />
          </Route>

          <Route>
            <Page404 />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
