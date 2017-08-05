import React from 'react';
import { Route, IndexRoute } from 'react-router';

import Header from './components/Header';
import Home from './components/Home';
import DocPage from './components/DocPage';

export default (
  <Route path="/" component={Header}>
    <IndexRoute component={Home} />
    <Route path="docs/:id" component={DocPage} />
  </Route>
);
