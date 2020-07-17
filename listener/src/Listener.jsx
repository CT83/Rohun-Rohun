import React, { useState, useEffect, Component } from 'react';
import annyang from './Annyang'

class Listener extends Component {

    componentDidMount() {
        annyang.addCommands(this.reset, this.change, this.undo)
        annyang.addCallback(this.engineCallback, this.resultCallback)
        annyang.start()
        this.setState({
            voiceStatus: annyang.isSupported() ? 'Supported' : 'Unsupported'
        })
    }
    // 3
    componentWillUnmount() {
        annyang.abort()
    }
    engineCallback = (status) => {
        // Set engine status
    }
    resultCallback = (voiceInput) => {
        // send info to brain
        console.log(voiceInput);
    }

    render() {
        return (
            <div style={{ textAlign: "center", paddingTop: "50px" }}>
                <h2>I am listening to everything!👂🏼</h2>
            </div>

        );
    }
}

export default Listener;