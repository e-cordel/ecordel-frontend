import CordelDetails from "../pages/cordels/CordelDetails";
import CordelsReviewList from "../pages/cordels/review/CordelsReviewList";
import CordelReview from "../pages/cordels/review/CordelReview";
import Home from "../pages/Home";
import Login from "../pages/Login";

import AuthorList from "../pages/authors/AuthorsList";
import AuthorForm from "../pages/authors/AuthorForm";


import AuthorDetails from "../pages/authors/AuthorDetails";
import { Route, Routes } from "react-router-dom";
import { RequireAuth } from "./RequireAuth";

export const ECordelRoutes = () => (
  <>
    <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/cordeis/:id" element={<CordelDetails />} />
        <Route path="/autores/:id" element={<AuthorDetails />} />
        <Route path="/revisao" element={
          <RequireAuth>
            <CordelsReviewList />
          </RequireAuth>
        } />
        <Route path="/revisao/:id" element={
          <RequireAuth>
            <CordelReview />
          </RequireAuth>
        } />
        <Route path="/autores" element={
          <RequireAuth>
            <AuthorList />
          </RequireAuth>
        } />
        <Route path="/autores/novo" element={
          <RequireAuth>
            <AuthorForm />
          </RequireAuth>
        } />
        <Route path="/autores/editar/:id" element={
          <RequireAuth>
            <AuthorForm />
          </RequireAuth>
        } />
    </Routes>
  </>
);
