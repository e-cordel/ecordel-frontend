import { Switch } from "react-router-dom";
import CordelDetails from "../pages/cordels/CordelDetails";
import CordelsReviewList from "../pages/cordels/review/CordelsReviewList";
import CordelReview from "../pages/cordels/review/CordelTextReview";
import Home from "../pages/Home";
import Login from "../pages/Login";

import { Route } from "./Route";

export const Routes = () => (
  <>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/cordels" exact component={Home} />
      <Route path="/login" exact component={Login} />
      <Route path="/cordels/review" exact component={CordelsReviewList} isPrivate />
      <Route path="/cordels/review/:id" exact component={CordelReview} isPrivate />
      <Route path="/cordels/:id" exact component={CordelDetails} />
    </Switch>
  </>
);
