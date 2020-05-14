import React from 'react';
import { Container, Grid, Header, Icon, Image, Menu, Card } from 'semantic-ui-react';

import { peopleJson } from './peopleJson';

import './App.css';

const style = {
  h1: {
    marginBottom: '1em'
  },
  h2: {
    margin: '4em 0em 2em'
  },
  h3: {
    marginTop: '2em',
    padding: '2em 0em'
  },
  last: {
    marginBottom: '300px'
  }
};

const FixedMenuLayout = () => (
  <div>
    <Menu fixed='top' inverted>
      <Container>
        <Menu.Item as='a' header>
          XFXPAL Talent
        </Menu.Item>
      </Container>
    </Menu>
  </div>
);

const IDCard = (
  name,
  title = 'Senior Scientist',
  role,
  location = 'San Francisco Bay Area',
  locoption = '',
  blurb = '',
  linkedin = '',
  scholar = '',
  resume = '',
  github = '',
  twitter = '',
  instagram = '',
  website = '',
  webname = 'Website'
) => (
    <Card fluid>
      <Card.Content textAlign='left'>
        <Image floated='right' size='mini' src='/images/avatar/large/steve.jpg' />
        <Card.Header>{name}</Card.Header>
        <Card.Meta>
          <div>
            <span style={{ color: '#333' }}>{title}</span> <br />
            <span className='role'>{role}</span>
          </div>
          <div>
            ({location} &bull; {locoption})
        </div>
        </Card.Meta>
        <Card.Description>{blurb}</Card.Description>
      </Card.Content>
      <Card.Content textAlign='left' className='blackleft'>
        <Grid columns={3}>
          <Grid.Row>
            <Grid.Column>
              <Icon name='linkedin' /> LinkedIn{' '}
            </Grid.Column>
            <Grid.Column>
              <Icon name='lab' /> Scholar{' '}
            </Grid.Column>
            <Grid.Column>
              <Icon name='file alternate' /> Resume{' '}
            </Grid.Column>
            <Grid.Column>
              <Icon name='github' /> GitHub{' '}
            </Grid.Column>
            <Grid.Column>
              <Icon name='twitter' /> Twitter{' '}
            </Grid.Column>
            <Grid.Column>
              <Icon name='instagram' /> Instagram{' '}
            </Grid.Column>
            <Grid.Column>
              <Icon name='globe' /> {webname}{' '}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Card.Content>
    </Card>
  );

const makeIDs = () => {
  return (
    <Card.Group itemsPerRow='2'>
      {peopleJson.map((pj) =>
        IDCard(pj['Name'], pj['Job Title'], pj['Job Function'], pj.Location, pj['Location Options'], pj.Description)
      )}{' '}
    </Card.Group>
  );
};

function App() {
  return (
    <div className='App'>
      <Container style={{ marginTop: '5em' }}>
        {FixedMenuLayout()}
        <Header
          as='h1'
          style={style.h1}
          content='Browse through the talented individuals who have worked at FXPAL.'
          textAlign='center'
        />
        {makeIDs()}
      </Container>
    </div>
  );
}

export default App;
