import React from 'react';
import { Container, Grid, Header, Icon, Image, Menu, Card } from 'semantic-ui-react';

import { peopleJson } from './peopleJson';
import { peopleMap } from './peopleMap';

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

const getLinkColumn = (icon, label, link) => {
  if (link !== '') {
    return (
      <Grid.Column>
        <a target='_blank' rel='noopener noreferrer' href={link}>
          <Icon name={icon} /> {label}{' '}
        </a>
      </Grid.Column>
    );
  }
};

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
  webname = 'Website',
  imagefile = ''
) => {
  let region = location;
  if (locoption !== '') {
    region += ' (' + locoption + ')';
  }
  return (
    <Card fluid>
      <Card.Content textAlign='left'>
        <Image floated='right' size='small' src={process.env.PUBLIC_URL + 'images/' + imagefile} />
        <Card.Header>{name}</Card.Header>
        <Card.Meta>
          <div>
            <span style={{ color: '#333' }}>{title}</span> <br />
            <span style={{ color: '#555' }}>{role}</span>
          </div>
          <div>
            <span style={{ 'font-style': 'italic', color: '#777' }}>{region}</span>
          </div>
        </Card.Meta>
        <Card.Description>{blurb}</Card.Description>
      </Card.Content>
      <Card.Content textAlign='left'>
        <Grid columns={3}>
          <Grid.Row>
            {getLinkColumn('linkedin', 'LinkedIn', linkedin)}
            {getLinkColumn('lab', 'Scholar', scholar)}
            {getLinkColumn('file alternate', 'Resume', resume)}
            {getLinkColumn('github', 'GitHub', github)}
            {getLinkColumn('twitter', 'Twitter', twitter)}
            {getLinkColumn('instagram', 'Instagram', instagram)}
            {getLinkColumn('globe', webname, website)}
          </Grid.Row>
        </Grid>
      </Card.Content>
    </Card>
  );
};

const makeIDs = () => {
  peopleJson.sort((a, b) => a.Name.localeCompare(b.Name));
  return (
    <Card.Group itemsPerRow='2'>
      {peopleJson.map((pj) =>
        IDCard(
          pj['Name'],
          pj['Job Title'],
          pj['Job Function'],
          pj.Location,
          pj['Location Options'],
          pj.Description,
          pj.LinkedIn,
          pj['Google Scholar'],
          pj.Resume,
          pj.GitHub,
          pj['Twitter?'],
          pj.Instagram,
          pj['Other Website'],
          pj['Pretty Name for Other Website'],
          peopleMap[pj['Name']]
        )
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
          content='See the amazing scientists and engineers who have worked at FXPAL.'
          textAlign='center'
        />
        {makeIDs()}
      </Container>
    </div>
  );
}

export default App;
