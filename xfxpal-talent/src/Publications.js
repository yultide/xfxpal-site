import React from 'react'
import { Header, Card, Form } from 'semantic-ui-react'
import lunr from 'lunr'
import queryString from 'query-string'

import publications from './publications.json'
import publicationsIndex from './publications-idx.json'

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
        queryText: '',
        publicationCount: 10,
        publications: publications
    }

    componentDidMount() {
        // load from prebuilt index
        this.idx = lunr.Index.load(publicationsIndex)

        let pubIdx = {}
        this.pubIdx = pubIdx
        publications.forEach((p) => {
            pubIdx[p.ID] = p
        })

        let qs = queryString.parse(window.location.search);
        this.setState({'queryText': qs.q, 'q': qs.q});

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
            var numPubs = this.state.publicationCount + 10;
            if (numPubs > publications.length) {
                numPubs = publications.length
            }
            if (this.state.publicationCount !== numPubs) {
                this.setState({
                    publicationCount: numPubs,
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
        this.setState({queryText: event.target.value})
    }

    onKeyPress = (event) => {
        if (event.key === 'Enter') {
            // let publications = this.searchText(event.target.value)
            this.setState({q: event.target.value, publicationCount: 10})

            // update location
            if (window.history.pushState) {
                var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?q=' + encodeURIComponent(event.target.value);
                window.history.pushState({path:newurl},'',newurl);
            }
        }
    }

    render() {
        let pubs = this.searchText(this.state.q);
        return (
            <>
            <Header as="h1" style={style.h1} textAlign='center' >FXPAL publishes in top scientific conferences and journals</Header>
            <Form>
            <Form.Input fluid icon='search' placeholder='Search...'
                value={this.state.queryText} onChange={this.onQueryChange} onKeyPress={this.onKeyPress}
                autoFocus
            />
            </Form>
            {pubs.slice(0, this.state.publicationCount).map((p,i) => {
                return <Card fluid key={i} style={style.card}>
                    <Card.Content textAlign='left'>
                        <Card.Header dangerouslySetInnerHTML={{ __html: p.Title}} />
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