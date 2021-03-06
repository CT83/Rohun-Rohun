import React, { Component } from 'react';
import annyang from './Annyang'

class Listener extends Component {

    constructor(props) {
        super(props);

        this.state = {
            voiceInput: '-'
        }
    }

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

        this.setState({ voiceInput })
        console.log(JSON.stringify(voiceInput[0]));

        fetch('http://localhost:6969/listen', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(voiceInput),
        }).then(response => response.json()).then(data => {
            console.log('Success:', data);
        }).catch((error) => {
            console.error('Error:', error);
        });
    }

    render() {
        return (
            <div style={{ textAlign: "center", paddingTop: "50px" }}>
                <h2>I am listening to everything!👂🏼</h2>
                {this.state.voiceInput[0]}
            </div>

        );
    }
}

export default Listener;