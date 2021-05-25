import React, { useState, useEffect } from 'react';
import './App.css';

// import classes from '*.module.css';
import Login from './components/login';
import SignUp from './components/signup';
import Books from './components/books';
import Profile from './components/profile';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useHistory,
  withRouter
  // Link
} from "react-router-dom";
import ProtectedRoute from './utils/protectedRoute'


function App() {
  const token = localStorage.getItem('token');
  const [isAuthenticated, setIsAuthenticated] = useState<Boolean>(false);
  const history = useHistory();

  useEffect(()=> {
    setIsAuthenticated((token && token.length > 0) ? true : false)
  }, []);

  const onClickLogout = (e: any): void => {
    setIsAuthenticated(false);
    localStorage.clear();

    axios.get('http://localhost:4000/api/logout', { withCredentials: true })
            .then(body => {
                history.push('/login');
            })
            .catch(error => {
                console.log(error);
                history.push('/login');
            }
            );
  };

  // const onClickAuthenticateButton = (e: any): void => {
  //   localStorage.setItem('token', 'Bearer Valid_TOKEN');
  //   setIsAuthenticated(true);
  // };

  // const checkAuth = () => {
  //   let auth: any = JSON.stringify(localStorage.getItem('token'));
  //   if(auth !== null) {
  //     setIsAuth(true);
  //     setUser(auth.user);
  //   }
  // };

  return (
      <Switch>
        <Route exact path="/">
          <Books />
        </Route>
        <Route path="/login" render={(props) =>
          <>
            {isAuthenticated ? <Redirect to='/profile' />
              :
              <Login {...props} setIsAuthenticated={setIsAuthenticated} />
            }
          </>
        } />
        <Route path="/signup">
          <SignUp />
        </Route>
        <Route path="/books">
          <Books />
        </Route>
        <ProtectedRoute
          path='/profile'
          isAuthenticated={isAuthenticated}>
          <Profile onClickLogout={onClickLogout} />
        </ProtectedRoute>
      </Switch>
  );
}

export default withRouter(App);
