import React from 'react';
import { Container, Grid, Header, Icon, Image, Menu, Card } from 'semantic-ui-react';

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
  blurb = 'Pellentesque dapibus suscipit ligula.  Donec posuere augue in quam.  Etiam vel tortor sodales tellus ultricies commodo.  Suspendisse potenti.  Aenean in sem ac leo mollis blandit.  Donec neque quam, dignissim in, mollis nec, sagittis eu, wisi.  Phasellus lacus.  Etiam laoreet quam sed arcu.  Phasellus at dui in ligula mollis ultricies.  Integer placerat tristique nisl.  Praesent augue.  Fusce commodo.  Vestibulum convallis, lorem a tempus semper, dui dui euismod elit, vitae placerat urna tortor vitae lacus.  Nullam libero mauris, consequat quis, varius et, dictum id, arcu.  Mauris mollis tincidunt felis.  Aliquam feugiat tellus ut neque.  Nulla facilisis, risus a rhoncus fermentum, tellus tellus lacinia purus, et dictum nunc justo sit amet elit.',
  other = 'Website'
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
              <Icon name='globe' /> {other}{' '}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Card.Content>
    </Card>
  );

const CardExampleGroups = () => (
  <Card.Group itemsPerRow='2'>
    {IDCard(
      'David A. Shamma',
      'Senior Research Scientist',
      'Research, Engineering, Prototyping',
      'San Francisco',
      'Open to Remote'
    )}
    {IDCard(
      'Mitesh Patel',
      'Senior Research Scientist',
      'Research & Development',
      'San Francisco Bay Area',
      'Open to Remote'
    )}
  </Card.Group>
);

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
        {CardExampleGroups()}
      </Container>
    </div>
  );
}

export default App;
