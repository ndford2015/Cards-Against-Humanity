import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Games } from './games/games';
import { BrowserRouter as Router, Switch, Route, withRouter } from 'react-router-dom'
import { GameBoard } from './games/game-board';
function App() {
  return (
    <Router>
      <Switch>
        <Route key="games" exact path='/' component={withRouter(Games)} />
        <Route key="games" exact path='/:gameId' component={withRouter(Games)} />
        <Route key="game-board" exact path='/games/:gameId' component={withRouter(GameBoard)} />
      </Switch>
    </Router>
  );
}

export default App;
