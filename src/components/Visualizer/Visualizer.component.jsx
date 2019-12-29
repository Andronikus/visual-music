/************************************************************
    Main component for music visualization.
    Uses react-p5-wrapper to load state values to the p5 canvas.

    Current loaded sketch file is defined in line 18.
    It is then passed as props to P5Wrapper component
    along with other needed values such as volume, uploaded file, etc.

    Current features:
    1. Display ellipses based on sound's amplitude.

    TODO:

************************************************************/

import React from 'react';
import { useDispatch } from 'react-redux';
import classes from './Visualizer.module.scss';
import P5Wrapper from 'react-p5-wrapper';
import sketch from '../../vendor/sketches/sketch';
import Measure from 'react-measure';

class Visualizer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            sketch,
            canvasWidth: 100,
            canvasHeight: 100
        };
    }

    onResize = content => {
        const { width, height, left, top } = content;
        const cWidth = width - left;
        const cHeight = height - top;
        this.setState({ canvasWidth: cWidth, canvasHeight: cHeight });
    };

    
    shouldComponentUpdate(nextProps, nextState){
        return (this.props.playPressed !== nextProps.playPressed || 
                this.props.uploadedSong !== nextProps.uploadedSong ||
                this.props.volume !== nextProps.volume || 
                this.props.blob !== nextProps.blob ||
                this.props.audioRef !== nextProps.audioRef ||
                this.props.downloadVisual !== nextProps.downloadVisual);
    }
      
    render() {
        const { sketch, canvasWidth, canvasHeight } = this.state;

        return (
            <Measure
                offset
                onResize={content => {
                    this.onResize(content.offset);
                }}
            >
                {({ measureRef }) => (
                    <div ref={measureRef} className={classes.visualizer}>
                        <P5Wrapper
                            sketch={sketch}
                            volume={this.props.volume}
                            playPressed={this.props.playPressed}
                            uploadedSong={this.props.uploadedSong}
                            canvasWidth={canvasWidth}
                            canvasHeight={canvasHeight}
                            audioRef={this.props.audioRef}
                            downloadVisual={this.props.downloadVisual}
                            blob={this.props.blob}
                            dispatch={useDispatch()}
                        />
                    </div>
                )}
            </Measure>
        );
    }
}

export default Visualizer;
