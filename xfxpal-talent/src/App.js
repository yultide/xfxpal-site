import React from 'react';
import { Container, Menu, Dimmer, Loader } from 'semantic-ui-react';
import { BrowserRouter as Router, Switch, Route, NavLink } from 'react-router-dom';

import './App.css';

const Talent = React.lazy(() => import('./Talent'))
const Publications = React.lazy(() => import('./Publications'))
const Videos = React.lazy(() => import('./Videos'))

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
        <React.Suspense fallback={
            <Dimmer active inverted>
              <Loader inverted content='Loading' />
            </Dimmer>
        }>
        <Switch>
          <Route component={Publications} path="/publications" />
          <Route component={Videos} path="/videos" />
          <Route component={Talent} path="/" exact />
        </Switch>
        </React.Suspense>
      </Container>
    </Router>
  );
}

export default App;
