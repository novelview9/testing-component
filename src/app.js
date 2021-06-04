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
    bottom: -20px;
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
    const [isActiveBG, setIsActiveBG] = useState(false);

    const toggleBG = () => {
        setIsActiveBG(!isActiveBG);
    };

    const [isActiveVideo, setIsActiveVideo] = useState(true);

    const toggleVideo = () => {
        setIsActiveVideo(!isActiveVideo);
    };

    return (
        <Container ref={widthRef}>
            <Wrapper bg={isActiveBG}>
                <InnerFrame>
                    <ContentFrame isFull={!isActiveVideo}>{nodeData && <DrawingData data={nodeData} />}</ContentFrame>
                    <Video src="./public/video.mp4" onTimeUpdate={onTimeEvent} ref={ref} active={isActiveVideo} />
                </InnerFrame>
            </Wrapper>
            <Control percent={percent} onClick={barClick} />
            <Buttons>
                <Button onClick={onClick}>play/pause</Button>
                <Button onClick={toggleBG}>background on/off</Button>
                <Button onClick={toggleVideo}>video on/off</Button>
            </Buttons>
        </Container>
    );
};

const InnerFrame = styled.div`
    position: relative;
    height: 100%;
`;
const Buttons = styled.div`
    position: absolute;
    bottom: -45px;
    display: flex;
`;
const Wrapper = styled.div`
    height: 700px;
    box-sizing: border-box;
    ${(props) =>
        props.bg &&
        css`
            padding-top: 80px;
            padding-bottom: 50px;
            padding-left: 60px;
            padding-right: 60px;
            background-image: url("./public/bg_video5_5_1_shot11.jpg");
            background-size: contain;
            background-repeat: no-repeat;
        `};
`;
const ContentFrame = styled.div`
    position: relative;
    display: flex;
    background-color: gray;
    height: 100%;
    max-width: 80%;
    ${(props) =>
        props.isFull &&
        css`
            max-width: 100%;
        `}
`;
const Button = styled.button``;
const Video = styled.video`
    position: absolute;
    right: 0;
    width: 30%;
    bottom: 50px;
    opacity: 0;
    ${(props) =>
        props.active &&
        css`
            opacity: 1;
        `}
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
