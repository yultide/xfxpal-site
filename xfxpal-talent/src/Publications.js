import React from 'react'
import { Header, Card, Grid } from 'semantic-ui-react'

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
    }
}

export default class Publications extends React.Component {
    render() {
        return (
            <>
            <Header as="h1" style={style.h1} textAlign='center' >FXPAL publishes in top scientific conferences and journals</Header>
            <Grid>
                {publications.map((p,i) => {
                    return <Card fluid key={i}>
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
            </Grid>
            </>
        )
    }
}