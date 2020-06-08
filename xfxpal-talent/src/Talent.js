import React from 'react'

import { Icon, Card, Header } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import BlurImage from './BlurImage';

import peopleJson from './people.json';
import { peopleMap } from './peopleMap';

const style = {
    h1: {
        marginBottom: '1em'
    },
    iconbar: {
        marginTop: '1em',
        marginBottom: '1em'
    },
};

const getLink = (icon, label, link, newPage = true) => {
    if (link !== '') {
        if (newPage) {
            return (
                <a target={newPage ? '_blank' : null} rel='noopener noreferrer' href={link} style={{ display: 'inline-block', minWidth: '90px' }}>
                    <Icon name={icon} /> {label}{' '}
                </a>
            );
        } else {
            return (
                <Link to={link} style={{ display: 'inline-block', minWidth: '90px' }}>
                    <Icon name={icon} /> {label}{' '}
                </Link>
            );
        }
    }
};

function makePublicationsUrl(name) {
    let parts = name.split(/\s+/);
    parts = parts.map(p => '+' + p)
    return encodeURIComponent(parts.join(' '));
}

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
    imagefile = '',
    blurhash = '',
    pubSearch = ''
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
                <BlurImage
                    blurhash={blurhash}
                    style={{ width: '150px', height: '150px' }}
                    width={150}
                    height={150}
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
                        {getLink('book', 'FXPAL Pubs', '/publications?q=' + makePublicationsUrl(pubSearch), false)}
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
    return array.filter(p => p['Hide my information'] !== 'yes');
};

export default () => {
    let people = shuffleArr(peopleJson);
    return (
        <>
            <Header
                as='h1'
                style={style.h1}
                content='See the amazing scientists, engineers, and creatives at FXPAL'
                textAlign='center'
            />
            <Card.Group itemsPerRow='2' stackable={true}>
                {people.map((pj, i) =>
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
                        peopleMap[pj['Name']].image,
                        peopleMap[pj['Name']].blurhash || 'UEHV6nWB2yk8pyoJadR*.7kCMdnjS#M|%1%2',
                        peopleMap[pj['Name']].pubSearch || pj['Name']
                    )
                )}{' '}
            </Card.Group>
        </>
    );
};
