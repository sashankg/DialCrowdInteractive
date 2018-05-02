import React from 'react'
import { connect } from 'react-redux'
import MaterialIcon from 'material-icons-react';
//import { Motion, spring } from 'react-motion';

import { startMicrophone, cancelMicrophone } from '../actions/microphoneActions';

class Microphone extends React.Component {
    render() {
        return <div 
            style={ this.props.mode === "speech" ? {
                width: 72, height: 72, borderRadius: 36,
            } : null }
            className={ "microphone" + (this.props.listening ? " listening" : "") }
            onClick={ this.onClick.bind(this) }
        >
            <MaterialIcon 
                icon="mic" 
                size={ this.props.mode === "speech" ? "medium" : "small"  }
                color={ this.props.listening ? "#e84118" : "white" }
            />
        </div>
    }

    onClick() {
        if(this.props.listening) {
            this.props.cancelMicrophone();
        }
        else {
            this.props.startMicrophone();
        }
    }
}

function mapStateToProps(state) {
    return {
        listening: state.listening,
        mode: state.mode
    }
}

const mapDispatchToProps = {
    startMicrophone,
    cancelMicrophone
}

export default connect(mapStateToProps, mapDispatchToProps)(Microphone)
