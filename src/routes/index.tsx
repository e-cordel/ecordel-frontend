import { Switch } from "react-router-dom";
import CordelDetails from "../pages/cordels/CordelDetails";
import CordelsReview from "../pages/cordels/CordelsReview";
import EditCordel from "../pages/cordels/EditCordel";
import Home from "../pages/Home";
import Login from "../pages/Login";

import { Route } from "./Route";

export const Routes = () => (
  <>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/cordels" exact component={Home} />
      <Route path="/login" exact component={Login} />
      <Route path="/cordels/review" exact component={CordelsReview} isPrivate />
      <Route path="/cordels/edit/:id" exact component={EditCordel} isPrivate />
      <Route path="/cordels/:id" exact component={CordelDetails} />
    </Switch>
  </>
);
