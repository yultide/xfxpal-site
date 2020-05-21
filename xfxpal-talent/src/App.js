import React from 'react';
import { Container, Header, Icon, Image, Card } from 'semantic-ui-react';

import peopleJson from './people.json';
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
  iconbar: {
    marginTop: '1em',
    marginBottom: '1em'
  },
  last: {
    marginBottom: '300px'
  }
};

const getLink = (icon, label, link) => {
  if (link !== '') {
    return (
      <a target='_blank' rel='noopener noreferrer' href={link} style={{ display: 'inline-block', minWidth: '90px' }}>
        <Icon name={icon} /> {label}{' '}
      </a>
    );
  }
};

const IDCard = (
  key,
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
    locoption = locoption.replace('Open to Local Area', '');
    if (locoption !== '') {
      locoption = locoption.replace(';', ', ');
      region += ' (' + locoption + ')';
    }
  }
  if (website !== '' && webname === '') {
    webname = 'Website';
  }
  return (
    <Card fluid key={key}>
      <Card.Content textAlign='left'>
        <Image
          style={{ width: '150px', height: '150px' }}
          rounded
          floated='right'
          size='small'
          src={process.env.PUBLIC_URL + 'images/' + imagefile}
        />
        <Card.Header>{name}</Card.Header>
        <Card.Meta>
          <div>
            <span style={{ color: '#333' }}>{title}</span> <br />
            <span style={{ color: '#555' }}>{role}</span>
          </div>
          <div>
            <span style={{ fontStyle: 'italic', color: '#777' }}>{region}</span>
          </div>
          <div style={style.iconbar}>
            {getLink('linkedin', 'LinkedIn', linkedin)}
            {getLink('lab', 'Scholar', scholar)}
            {getLink('file alternate', 'Resume', resume)}
            {getLink('github', 'GitHub', github)}
            {getLink('twitter', 'Twitter', twitter)}
            {getLink('instagram', 'Instagram', instagram)}
            {getLink('globe', webname, website)}
          </div>
        </Card.Meta>
        <Card.Description>{blurb}</Card.Description>
      </Card.Content>
    </Card>
  );
};

const shuffleArr = (array) => {
  for (var i = array.length - 1; i > 0; i--) {
    var rand = Math.floor(Math.random() * (i + 1));
    [array[i], array[rand]] = [array[rand], array[i]];
  }
};

const makeIDs = () => {
  shuffleArr(peopleJson);
  return (
    <Card.Group itemsPerRow='2' stackable={true}>
      {peopleJson.map((pj, i) =>
        IDCard(
          i,
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
      <Container style={{ marginTop: '2em' }}>
        <Header
          as='h1'
          style={style.h1}
          content='See the amazing scientists, engineers, and creatives at FXPAL'
          textAlign='center'
        />
        {makeIDs()}
      </Container>
    </div>
  );
}

export default App;
