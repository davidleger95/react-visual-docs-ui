import React, { Component } from 'react';
import { BrowserRouter as Router, Route, IndexRoute } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import DocPage from './components/DocPage';
import DiGraph from './components/Chart/DiGraph';


import fetch from 'isomorphic-fetch';

import routes from './routes';

import './css/App.css';

import data from './docs.json';
// const appHistory = useRouterHistory(createBrowserHistory)({ queryKey: false });

class App extends Component {


  componentWillMount() {
    console.log(data);
  }

  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Route path="*" component={Header} />
            <Route path="*" component={DiGraph} />
            <Route exact path="/" component={Home} />
            <Route path="/docs" component={DocPage} />
            <Route path="*" component={Footer} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
