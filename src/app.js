import toStyle from "css-to-style";
import _, { last } from "lodash";
import React, { useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";
import { createGlobalStyle } from "styled-components";
import { images } from "min-document";

import data from "../data";

const GlobalStyle = createGlobalStyle``;

const DrawingData = ({ data }) => {
    console.log(data);
    return (
        <DrawingContainer>
            {data.images.map(({ url, style, xy }) => (
                <Img src={url} style={{ ...toStyle(style) }} left={xy[0]} top={xy[1]} />
            ))}
            {data.textContainers.map(({ label, style, xy }) => (
                <Text style={{ ...toStyle(style) }} left={xy[0]} top={xy[1]}>
                    {label}
                </Text>
            ))}
        </DrawingContainer>
    );
};
const DrawingContainer = styled.div`
    width: inherit;
    height: inherit;
    display: flex;
    flex-wrap: wrap;
`;
// Main page
const App = () => {
    const ref = useRef();
    const onClick = () => {
        const video = ref.current;
        const method = video.paused ? "play" : "pause";
        video[method]();
    };

    const onTimeEvent = (event) => {
        const currentSecond = event.timeStamp / 1000;
        const nodeIndex = _.findLastIndex(data, (obj) => obj.defDuration < currentSecond);
        console.log(currentSecond);
        if (_.isUndefined(nodeIndex)) {
            return;
        }
        console.log(data[nodeIndex]);
        setNodeData(data[nodeIndex]);
    };
    const [nodeData, setNodeData] = useState();
    return (
        <Container>
            <ContentFrame>
                {nodeData && <DrawingData data={nodeData} />}
                <Video src="./public/video.mp4" onTimeUpdate={onTimeEvent} ref={ref} />
            </ContentFrame>
            <Button onClick={onClick}>play/pause</Button>
        </Container>
    );
};

const ContentFrame = styled.div`
    position: relative;
    background-color: gray;
    width: 1200px;
    height: 600px;
`;
const Button = styled.button``;
const Video = styled.video`
    position: absolute;
    right: -300px;
    bottom: 0;
`;
const Container = styled.div`
    min-width: 100vw;
    min-height: 100vh;
`;
const Img = styled.img`
    object-fit: contain;
`;

const Text = styled.p``;
export default App;
