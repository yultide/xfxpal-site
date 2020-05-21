import React from 'react'
import { Header, Image, Grid } from 'semantic-ui-react'
import { LightgalleryItem, LightgalleryProvider } from "react-lightgallery";
import "lightgallery.js/dist/css/lightgallery.css";
import videos from './videos.json';

const style = {
    h1: {
        marginBottom: '1em'
    }
}

export default class Videos extends React.Component {

    componentDidMount() {
        console.log('LightgalleryProvider', LightgalleryProvider)
    }

    render() {
        return (
            <>
                <Header as="h1" style={style.h1} textAlign="center">Videos showcasing the work done at FXPAL</Header>
                <LightgalleryProvider
                    lightgallerySettings={{}}
                    plugins={[
                        "lg-video.js",
                        "lg-thumbnail.js",
                    ]}
                >
                    <Grid columns={4} doubling stackable>
                    {videos.map((v,i) => {
                        // implement youtube links for now
                        let videoUrl = `https://youtu.be/${v.videoId}`;
                        let videoThumb = `https://i3.ytimg.com/vi/${v.videoId}/mqdefault.jpg`;
                        return <Grid.Column key={i}>
                            <LightgalleryItem group='any' src={videoUrl} thumb={videoThumb}>
                                <Image src={videoThumb} size='massive' rounded />
                            </LightgalleryItem>
                            </Grid.Column>
                    })}
                    </Grid>
                </LightgalleryProvider>
            </>
        )
    }
}
