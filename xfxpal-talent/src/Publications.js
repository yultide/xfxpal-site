import React from 'react'
import { Header, Card, Grid, Input, Form } from 'semantic-ui-react'
import lunr from 'lunr'

import publications from './publications.json'

const style = {
    h1: {
        marginBottom: '2em'
    },
    iconbar: {
        marginTop: '1em',
        marginBottom: '1em'
    },
    hilight: {
        color: '#666',
        fontWeight: 'bold'
    },
    abstract: {
        marginTop: '1em',
        marginBottom: '1em'
    },
    card: {
        marginTop: '2em',
        marginBottom: '2em'
    }
}

export default class Publications extends React.Component {

    state = {
        q: '',
        publications: []
    }

    componentDidMount() {
        this.idx = lunr(function() {
            this.ref('ID')
            this.field('Title')
            this.field('Abstract')
            this.field('AuthorsList')
            this.field('keywordsList')
            publications.forEach(
                (d) => {
                    d.AuthorsList = d.Authors.join(',')
                    if (d.keywords)
                        d.keywordsList = d.keywords.join(',')
                    this.add(d)
                }
            )
        });
        let pubIdx = {}
        this.pubIdx = pubIdx
        publications.forEach((p) => {
            pubIdx[p.ID] = p
        })

        this.setState({publications: this.getRandomArrayElements(publications, 10)})
    }

    getRandomArrayElements(arr, count) {
        var shuffled = arr.slice(0), i = arr.length, min = i - count, temp, index;
        while (i-- > min) {
            index = Math.floor((i + 1) * Math.random());
            temp = shuffled[index];
            shuffled[index] = shuffled[i];
            shuffled[i] = temp;
        }
        return shuffled.slice(min);
    }

    searchText = (text) => {
        if (text) {
            let results = this.idx.search(text)
            if (results) {
                let self = this;
                return results.map((r) => {
                    return self.pubIdx[r.ref]
                })
            } else {
                return []
            }
        } else {
            return this.getRandomArrayElements(publications, 10)
        }
    }

    onQueryChange = (event) => {
        this.setState({q: event.target.value})
        if (event.target.value === '') {
            let publications = this.searchText(event.target.value)
            this.setState({publications})
        }
    }

    onKeyPress = (event) => {
        if (event.key === 'Enter') {
            let publications = this.searchText(this.state.q)
            this.setState({publications})
        }
    }

    render() {
        return (
            <>
            <Header as="h1" style={style.h1} textAlign='center' >FXPAL publishes in top scientific conferences and journals</Header>
            <Input fluid icon='search' placeholder='Search...'
                value={this.state.q} onChange={this.onQueryChange} onKeyPress={this.onKeyPress}
            />
            {this.state.publications.map((p,i) => {
                return <Card fluid key={i} style={style.card}>
                    <Card.Content textAlign='left'>
                        <Card.Header>{p.Title}</Card.Header>
                        <Card.Description>
                            <div><span style={style.hilight}>Authors:</span> {p.Authors.join(', ')}</div>
                            <div><span style={style.hilight}>Publication Date:</span> {p.PublicationDate}</div>
                            <div><span style={style.hilight}>Venue:</span> {p.Venue}</div>
                            { p.Abstract ?
                                <div style={style.abstract}><span style={style.hilight}>Abstract:</span>
                                    <p>{p.Abstract}</p>
                                </div> : null }
                            { p.keywords ?
                                <div><span style={style.hilight}>Tags:</span> {p.keywords.join(', ')}</div>
                                : null }
                        </Card.Description>
                    </Card.Content>
                </Card>
            })}
            </>
        )
    }
}