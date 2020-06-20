
import React, { useState, useEffect } from "react";
import { decode } from 'blurhash';
import { Image } from 'semantic-ui-react';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

function useBlurhash(
    blurhash,
    width = 32,
    height = 32,
    punch = 1
) {
    punch = punch || 1;

    const [url, setUrl] = useState('');

    useEffect(() => {
        let isCancelled = false;

        if (!blurhash) return;

        // decode hash
        const pixels = decode(blurhash, width, height, punch);

        // temporary canvas to create a blob from decoded ImageData
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const context = canvas.getContext('2d');
        const imageData = context.createImageData(width, height);
        imageData.data.set(pixels);
        context.putImageData(imageData, 0, 0);
        canvas.toBlob(blob => {
            if (!isCancelled) {
                setUrl(oldUrl => {
                    if (oldUrl) {
                        URL.revokeObjectURL(oldUrl);
                    }
                    return URL.createObjectURL(blob);
                });
            }
        });

        return function cleanupBlurhash() {
            isCancelled = true;
            setUrl(oldUrl => {
                if (oldUrl) {
                    URL.revokeObjectURL(oldUrl);
                }
                return null;
            });
        };
    }, [blurhash, height, width, punch]);

    return url;
}

export default function BlurImage(allProps) {
    const { loading = "lazy", blurhash, style, width, height, ...props } = allProps;

    const blurUrl = useBlurhash(blurhash, width, height);

    const [isOpen, setOpen] = useState(false);

    const newStyle = blurUrl
        ? {
            ...style,
            cursor: 'pointer',
            backgroundImage: `url("${blurUrl}")`,
            backgroundSize:
                props.width && props.height
                    ? `${props.width}px ${props.height}px`
                    : "100% 100%"
        }
        : {
            ...style,
            cursor: 'pointer',
        };

    return (
        <>
        <Image
            {...props}
            loading={loading}
            style={newStyle}
            alt=''
            onClick={() => setOpen(true)}
        />
        {isOpen && (<Lightbox
            mainSrc={props.src}
            imageTitle={props.alt}
            onCloseRequest={() => setOpen(false)}
            />)}
        </>

    );
}