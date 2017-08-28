import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import DocPage from './components/DocPage';
import DiGraph from './components/Chart/ForceGraph';

import './css/App.css';

import data from './docs.json';

class App extends Component {


  componentWillMount() {
    console.log(data);
  }

  render() {
    return (
      <div className="App">
        <Router>
          <div className="app-wrapper">
            <Route path="*" component={Header} />
            <Route path="*" component={DiGraph} />
            <Route path="/docs" component={DocPage} />
            <Route path="*" component={Footer} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
