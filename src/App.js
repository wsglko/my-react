import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Hygiene from './pages/Hygiene';
import GisList from './pages/GisList';
import TestSearchBar from './pages/TestSearchBar';
import BstList from './pages/BstList';
import Infra from './pages/Infra'
import Operations from './pages/Operations'
import EbModule from './pages/EbModule'
import NewEpm from './pages/NewEpm'
import NewCheklist from './pages/Infra/NewChecklist'
import NewImage from './pages/Images/NewImage'
  
const App = () => {
  return (
    <BrowserRouter basename="/sksapp">
        <Route exact path="/" component={Home}/>
        <Route exact path="/hygiene" component={Hygiene}/>
        <Route exact path="/gis" component={GisList}/>
        <Route exact path="/search" component={TestSearchBar} />
        <Route exact path="/bstlist" component={BstList} />
        <Route exact path="/infra" component={Infra} />
        <Route exact path="/operation" component={Operations} />
        <Route path="/ebm/:bstID/:bstName" component={EbModule} />
        <Route path="/newepm/:bstID/:bstName" component={NewEpm} />
        <Route path="/newCheckList" component={NewCheklist} />
        <Route path="/newimg" component={NewImage} />
  </BrowserRouter>
  );
}
export default App;
/*
<BrowserRouter basename="/sksapp"> use this when deploying app to website
*/