import React, { Component } from 'react';
import { connect } from 'react-redux';

import Help from './Help';
import Messages from './Messages';
import TextInput from './TextInput';
import Microphone from './Microphone';

class App extends Component {
  render() {
    return (
      <div className="app">
          <Help />
          <Messages />
          <div className="bottom">
              { 
                  this.props.mode != "text" ? <Microphone /> : null
              }
              {
                this.props.mode != "speech" ? <TextInput /> : null
              }
          </div>
      </div>
    );
  }
}

function mapStateToProp(state) {
    return {
        mode: state.mode
    }
}

export default connect(mapStateToProp)(App);
