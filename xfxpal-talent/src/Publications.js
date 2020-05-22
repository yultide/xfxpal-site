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
        showPublications: 10,
        publications: publications
    }

    componentDidMount() {
        this.idx = lunr(function() {
            this.ref('ID')
            this.field('Title')
            this.field('Abstract')
            this.field('AuthorsList')
            this.field('keywordsList')
            publications.forEach((d) => this.add(d))
        });
        let pubIdx = {}
        this.pubIdx = pubIdx
        publications.forEach((p) => {
            pubIdx[p.ID] = p
        })

        document.addEventListener('scroll', this.trackScrolling);
    }

    componentWillUnmount() {
        document.removeEventListener('scroll', this.trackScrolling);
    }

    isBottom(el) {
        return el.getBoundingClientRect().bottom <= window.innerHeight;
    }

    trackScrolling = () => {
        const wrappedElement = document.getElementById('root');
        if (this.isBottom(wrappedElement)) {
            console.log('header bottom reached');
            //document.removeEventListener('scroll', this.trackScrolling);
            var numPubs = this.state.showPublications + 10;
            if (numPubs > publications.length) {
                numPubs = publications.length
            }
            if (this.state.showPublications !== numPubs) {
                this.setState({
                    showPublications: numPubs,
                })
            }
        }
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
                        // convert search results to list of publications
                        return self.pubIdx[r.ref]
                    })
                    .sort((a,b) => {
                        // reverse sort
                        return new Date(b.PublicationDate) - new Date(a.PublicationDate);
                    });
            } else {
                return []
            }
        } else {
            return publications
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
            {this.state.publications.slice(0, this.state.showPublications).map((p,i) => {
                return <Card fluid key={i} style={style.card}>
                    <Card.Content textAlign='left'>
                        <Card.Header>{p.Title}</Card.Header>
                        <Card.Description>
                            <div><span style={style.hilight}>Authors:</span> {p.AuthorsList}</div>
                            <div><span style={style.hilight}>Publication Date:</span> {p.PublicationDate}</div>
                            <div><span style={style.hilight}>Venue:</span> {p.Venue}</div>
                            { p.Publisher ? <div><span style={style.hilight}>DOI:</span> <a href={p.Publisher}>{p.Publisher}</a> </div> : null }
                            { p.Abstract ?
                                <div style={style.abstract}><span style={style.hilight}>Abstract:</span>
                                    <p>{p.Abstract}</p>
                                </div> : null }
                            { p.keywordsList ?
                                <div><span style={style.hilight}>Tags:</span> {p.keywordsList}</div>
                                : null }
                        </Card.Description>
                    </Card.Content>
                </Card>
            })}
            </>
        )
    }
}