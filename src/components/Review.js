import React from 'react'
import { connect } from 'react-redux'

import MaterialIcon from 'material-icons-react'
import { sendFeedback } from '../actions/messageActions'

class Review extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            up: false,
            down: false
        }
    }
    render() {
        return <div className="review">
            <div
                className="reviewButton" 
                onClick={ this.thumbUp.bind(this) }
            >
                <MaterialIcon icon="thumb_up" color={ this.state.up ? "#0097e6" : "#353b48"}/>
            </div>

            <div
                className="reviewButton" 
                onClick={ this.thumbDown.bind(this) }
            >
                <MaterialIcon icon="thumb_down" color={ this.state.down ? "#0097e6" : "#353b48"}/>
            </div>
        </div>
    }

    thumbUp() {
        if(this.state.up) {
            this.props.sendFeedback(this.props.text, Date.now(), "none") 
        }
        else {
            this.props.sendFeedback(this.props.text, Date.now(), "thumbs_up") 
        }
        this.setState({
            up: !this.state.up,
            down: false
        })
    }

    thumbDown() {
        if(this.state.down) {
            this.props.sendFeedback(this.props.text, Date.now(), "none") 
        }
        else {
            this.props.sendFeedback(this.props.text, Date.now(), "thumbs_down") 
        }
        this.setState({
            up: false,
            down: !this.state.down
        })
    }
}

function mapStateToProps(state, props) {
    return state.messages[props.index]
}

const mapDispatchToProps = {
    sendFeedback
}

export default connect(mapStateToProps, mapDispatchToProps)(Review)
