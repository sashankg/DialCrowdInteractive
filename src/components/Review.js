import React from 'react'
import { connect } from 'react-redux'

import MaterialIcon from 'material-icons-react'

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
        console.log("thumb up " + this.props.index)
        this.setState({
            up: !this.state.up,
            down: false
        })
    }

    thumbDown() {
        this.setState({
            up: false,
            down: !this.state.down
        })
    }
}

function mapStateToProps(state) {
    return {}
}

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Review)
