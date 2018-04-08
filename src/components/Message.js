import React from 'react'
import { connect } from 'react-redux'

import Review from './Review';

class Message extends React.Component {
    render() {
        return <div className="messageContainer" style={{ ...this.props.style }}>
            <div 
                className={ 
                    (this.props.received ? "received" : "sent") + " message" 
                }>
                <span className="messageText">{ this.props.text }</span>
            </div>
            { this.props.received ? <Review index={ this.props.index }/> : null }
        </div>    
    }
}

function mapStateToProps(state, props) {
    return state.messages[props.index];
}

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Message)

