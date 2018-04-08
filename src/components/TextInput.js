import React from 'react'
import { connect } from 'react-redux'

import { sendMessage } from '../actions/messageActions';

class TextInput extends React.Component {
    render() {
        return <div className="textInput">
            <input 
                type="text" 
                placeholder="Type message here"
                onKeyPress={ this.handleKeyPress.bind(this) }
            />
        </div>
    }

    handleKeyPress(e) {
        if(e.key === 'Enter' && e.target.value !== '') {
            this.props.onEnter(e.target.value, Date.now())
            e.target.value = "";
        }
    }
}

function mapStateToProps(state) {
    return {}
}

const mapDispatchToProps = {
    onEnter: sendMessage,
}

export default connect(mapStateToProps, mapDispatchToProps)(TextInput)
