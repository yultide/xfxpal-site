import React from 'react';
import { Container, Menu } from 'semantic-ui-react';
import { BrowserRouter as Router, Switch, Route, NavLink } from 'react-router-dom';

import './App.css';

import Talent from './Talent'
import Publications from './Publications'
import Videos from './Videos'

const SiteMenu = () => (
  <Menu pointing secondary>
    <Menu.Item to="/" as={NavLink} exact>TALENT</Menu.Item>
    <Menu.Item to="/publications" as={NavLink}>PUBLICATIONS</Menu.Item>
    <Menu.Item to="/videos" as={NavLink}>VIDEOS</Menu.Item>
  </Menu>
)

function App() {
  return (
    <Router>
      <Container>
        <SiteMenu />
        <Switch>
          <Route component={Publications} path="/publications" />
          <Route component={Videos} path="/videos" />
          <Route component={Talent} path="/" exact />
        </Switch>
      </Container>
    </Router>
  );
}

export default App;
