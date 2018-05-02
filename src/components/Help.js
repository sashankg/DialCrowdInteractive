import React from 'react'
import { connect } from 'react-redux'
import MaterialIcon from 'material-icons-react'
import { Motion, spring } from 'react-motion';

class Help extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false,
        }
    }
    render() {
        return <Motion style={{ height: spring(this.state.open ? 360 : 0 )}}>
            { ({ height }) =>
                <div className="help" style={{ height: height + 54 }}>
                    { height > 0 ? <div className="helpText">{ this.props.text }</div> : null }
                    <div className="helpHeader" onClick={ this.toggleOpen.bind(this) }>
                        <span className="helpTitle">Help</span>
                        <div className="helpIcon" style={{ transform: `rotate(${height/2}deg)` }}>
                            <MaterialIcon icon="keyboard_arrow_down" size="small" color="#353b48"/>
                        </div>
                    </div>
                </div>
            }
        </Motion>    
    }

    toggleOpen() {
        this.setState({
            open: !this.state.open
        })
    }
}

function mapStateToProps(state) {
    return {
        text: state.help
    }
} 

export default connect(mapStateToProps)(Help)
