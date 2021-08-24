import React from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Hygiene from "./pages/Hygiene";
import GisList from "./pages/GisList";
import TestSearchBar from "./pages/TestSearchBar";
import BstList from "./pages/BstList";
import Infra from "./pages/Infra";
import Snaps from "./pages/Snaps";
import EbModule from "./pages/EbModule";
import NewEpm from "./pages/NewEpm";
import NewCheklist from "./pages/Infra/NewChecklist";
import NewImage from "./pages/Images/NewImage";
import Cloudinary from "./pages/Images/Cloudinary";
import Epm from "./pages/epm/Epm";
import ColoProvider from "./pages/Infra/ColoProvider";
import NewColoProvider from "./pages/Infra/NewColoProvider";

const App = () => {
    return (
        <BrowserRouter basename="/sifyApp">
            <Route exact path="/" component={Home} />
            <Route exact path="/hygiene" component={Hygiene} />
            <Route exact path="/gis/:bstName" component={GisList} />
            <Route exact path="/search" component={TestSearchBar} />
            <Route exact path="/bstlist" component={BstList} />
            <Route exact path="/infra" component={Infra} />
            <Route exact path="/snaps" component={Snaps} />
            <Route exact path="/ebm/:bstID/:bstName" component={EbModule} />
            <Route exact path="/newepm/:bstID/:bstName" component={NewEpm} />
            <Route exact path="/newCheckList" component={NewCheklist} />
            <Route exact path="/newimg" component={NewImage} />
            <Route exact path="/cimage" component={Cloudinary} />
            <Route exact path="/epm" component={Epm} />
            <Route exact path="/cp" component={ColoProvider} />
            <Route exact path="/ncp" component={NewColoProvider} />
        </BrowserRouter>
    );
};
export default App;
/*
<BrowserRouter basename="/sksapp"> use this when deploying app to website
*/
