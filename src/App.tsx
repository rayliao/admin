import * as React from 'react';
import { Link } from 'react-router'
import { Button } from 'antd';
import './App.css';

const logo = require('./logo.svg');

class App extends React.Component<null, null> {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <Button type="primary">Button</Button>
        <ul>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/inbox">Inbox</Link></li>
        </ul>
        <p className="App-intro">
          {this.props.children}
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
