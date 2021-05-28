import toStyle from "css-to-style";
import _, { last } from "lodash";
import React, { useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";
import { createGlobalStyle } from "styled-components";
import { images } from "min-document";

import data from "../data";

const GlobalStyle = createGlobalStyle``;

const DrawingData = ({ data }) => {
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

const Control = ({ percent, onClick }) => {
    return (
        <ControlContainer>
            <ProgressBarLine onClick={onClick}>
                <ProgressBarFilled percent={percent} />
            </ProgressBarLine>
        </ControlContainer>
    );
};

const ControlContainer = styled.div`
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 20px;
    display: flex;
`;
const ProgressBarLine = styled.div`
    display: flex;
    width: inherit;
    background-color: #c9d5ff;
    cursor: pointer;
`;
const ProgressBarFilled = styled.div`
    color: white;
    flex-basis: ${(props) => props.percent}%;
    background-color: #4568e2;
`;

// Main page
const App = () => {
    const ref = useRef();
    const widthRef = useRef();
    const onClick = () => {
        const video = ref.current;
        const method = video.paused ? "play" : "pause";
        video[method]();
    };
    const onResetData = (currentTime) => {
        const video = ref.current;
        const nodeIndex = _.findLastIndex(data, (obj) => obj.defDuration < currentTime);
        const percentPoint = (currentTime / video.duration) * 100;
        setPercent(percentPoint);
        if (_.isUndefined(nodeIndex)) {
            return;
        }
        setNodeData(data[nodeIndex]);
    };

    const onTimeEvent = (event) => {
        const video = ref.current;
        onResetData(video.currentTime);
    };
    const [nodeData, setNodeData] = useState();
    const [percent, setPercent] = useState(0);

    const barClick = (e) => {
        const video = ref.current;
        const percentPoint = e.nativeEvent.offsetX / widthRef.current.offsetWidth;
        const currentTime = percentPoint * video.duration;
        video.currentTime = currentTime;
        onResetData(currentTime);
    };

    return (
        <Container ref={widthRef}>
            <ContentFrame>{nodeData && <DrawingData data={nodeData} />}</ContentFrame>
            <Control percent={percent} onClick={barClick} />
            <Video src="./public/video.mp4" onTimeUpdate={onTimeEvent} ref={ref} />
            <Button onClick={onClick}>play/pause</Button>
        </Container>
    );
};

const ContentFrame = styled.div`
    position: relative;
    display: flex;
    background-color: gray;
    height: 600px;
    max-width: 80%;
`;
const Button = styled.button`
    position: absolute;
    bottom: -20px;
`;
const Video = styled.video`
    position: absolute;
    right: 0;
    width: 30%;
    bottom: 50px;
`;
const Container = styled.div`
    position: relative;
    border: 1px solid black;
    min-width: 500px;
`;
const Img = styled.img`
    object-fit: contain;
`;

const Text = styled.p``;
export default App;
