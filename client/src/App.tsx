import React, { useState } from 'react';
import './App.css';

// import classes from '*.module.css';
import Login from './components/login';
import SignUp from './components/signup';
import Books from './components/books';
import Profile from './components/profile';
import {
  BrowserRouter as Router,
  Switch,
  Route
  // Link
} from "react-router-dom";
import ProtectedRoute from './utils/protectedRoute'


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<Boolean>(false);

  const toggleAuth = (): void => {
    setIsAuthenticated(!isAuthenticated);
  };

  return (
    <Router>
      <Switch>
        <Route path="/login">
          <Login toggleAuth={toggleAuth} />
        </Route>
        <Route path="/signup">
          <SignUp />
        </Route>
        <Route path="/books">
          <Books />
        </Route>
        <Route path="/profile2">
          <Profile />
        </Route>
        <ProtectedRoute
          path='/profile'
          isAuthenticated={isAuthenticated}
        >
          <Profile />
        </ProtectedRoute>
      </Switch>
    </Router>
  );
}

export default App;
