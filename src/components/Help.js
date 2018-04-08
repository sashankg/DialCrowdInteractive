import React from 'react'
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
                    { height > 0 ? <div className="helpText">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div> : null }
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

export default Help  
