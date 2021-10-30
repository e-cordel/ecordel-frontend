import { Switch } from "react-router-dom";
import CordelDetail from "../pages/cordels/CodelDetails";
import Home from "../pages/Home";
import Login from "../pages/Login";

import { Route } from "./Route";

export const Routes = () => (
  <>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/login" exact component={Login} />
      <Route path="/cordels/:id" exact component={CordelDetail} />
    </Switch>
  </>
);
