import { Switch } from "react-router-dom";
import CordelDetails from "../pages/cordels/CordelDetails";
import CordelsReviewList from "../pages/cordels/review/CordelsReviewList";
import CordelReview from "../pages/cordels/review/CordelReview";
import Home from "../pages/Home";
import Login from "../pages/Login";

import { Route } from "./Route";
import AuthorList from "../pages/authors/AuthorsList";
import AuthorForm from "../pages/authors/AuthorForm";

//hook
import ScrollToTop from "../hooks/useScrollToTop";

export const Routes = () => (
  <>
    <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" exact component={Login} />
      <ScrollToTop>
        <Route path="/revisao" exact component={CordelsReviewList} isPrivate />
        <Route path="/revisao/:id" exact component={CordelReview} isPrivate />
        <Route path="/cordeis/:id" exact component={CordelDetails} />
        <Route path="/autores" exact component={AuthorList} isPrivate />
        <Route path="/autores/novo" exact component={AuthorForm} isPrivate />
        <Route path="/autores/editar/:id" exact component={AuthorForm} isPrivate />
      </ScrollToTop>
    </Switch>
  </>
);
