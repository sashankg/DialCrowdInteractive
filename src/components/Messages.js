import React from 'react'
import { connect } from 'react-redux'
import { TransitionMotion, spring } from 'react-motion';

import Message from './Message';

class Messages extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            height: 0,
        }
    }
    render() {
        return <TransitionMotion
            willEnter={ this.willEnter }
            styles={ this.props.messages.map((index) => ({
                    key: index,
                    data: index,
                    style: { y: spring(0) }
                })
            )}
        >
            { (messages) => {
                return <div className="messages" >
                        { messages.map((m) => <Message key={ m.key } index={ m.data } style={{ transform: `translate(0px, ${m.style.y}px)`}} />) }
                </div>
            } 
            }
        </TransitionMotion>
    }

    willEnter() {
        return { y: 72 }
    }
    componentDidMount() {
        this.updateScroll();
    }

    componentDidUpdate() {
        this.updateScroll();
    }

    updateScroll() {
        window.requestAnimationFrame((() => {
            const scroll = this.scroll;
            if(scroll !== undefined) {
                scroll.scrollTop = scroll.scrollHeight;
            }
        }))
    }

}

function mapStateToProps(state) {
    return {
        messages: state.messages.map((_, i) => i).reverse(),
    }
}

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Messages)
