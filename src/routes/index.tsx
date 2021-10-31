import { Switch } from "react-router-dom";
import CordelDetails from "../pages/cordels/CordelDetails";
import Home from "../pages/Home";
import Login from "../pages/Login";

import { Route } from "./Route";

export const Routes = () => (
  <>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/login" exact component={Login} />
      <Route path="/cordels/:id" exact component={CordelDetails} />
    </Switch>
  </>
);
