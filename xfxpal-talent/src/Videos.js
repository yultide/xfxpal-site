import React from 'react'
import { Header } from 'semantic-ui-react'

export default () => {
    return (
        <>
            <Header as="h1" textAlign="center">Videos showcasing the work done at FXPAL</Header>
            <iframe title="FXPAL playlist" style={{ border: 0, width: '100%', height: '500px' }} src="http://www.youtube.com/embed/?listType=user_uploads&list=FXPAL" ></iframe>
        </>
    )
}