import React, { useState, useEffect } from 'react';
import { View, Animated } from 'react-native';
import styled from 'styled-components/native';

const Image = styled.Image`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
`;

const Placeholder = styled(Animated.View)`
    z-index: 2;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
`;

const PlaceholderImage = styled.Image`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
`;

export const ProgressiveImage = ({
    style,
    duration,
    resizeMode = 'cover',
    lowQualityUri,
    highQualityUri
}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [opacityAnimation, setOpacityAnimation] = useState(new Animated.Value(1));

    useEffect(() => {
        !isLoading && Animated.timing(opacityAnimation, {
            toValue: 0,
            duration,
            useNativeDriver: true
        }).start();
    }, [
        duration,
        isLoading,
        opacityAnimation
    ]);

    const containerProps = { style };
    const placeholderProps = {
        style: {
            opacity: opacityAnimation
        }
    };

    return (
        <View {...containerProps}>
            <Placeholder {...placeholderProps}>
                <PlaceholderImage
                    resizeMode={resizeMode}
                    source={{
                        uri: lowQualityUri
                    }}
                />
            </Placeholder>
            <Image
                resizeMode={resizeMode}
                onLoadStart={() => {
                    setOpacityAnimation(new Animated.Value(1));
                    setIsLoading(true);
                }}
                onLoad={() => setIsLoading(false)}
                source={{
                    uri: highQualityUri
                }}
            />
        </View>
    );
};
