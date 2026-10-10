import { Route, Routes } from "react-router-dom";
import CordelDetails from "../pages/cordels/CordelDetails";
import CordelsReviewList from "../pages/cordels/review/CordelsReviewList";
import CordelReview from "../pages/cordels/review/CordelReview";
import Home from "../pages/Home";
import Login from "../pages/Login";
import AuthorList from "../pages/authors/AuthorsList";
import AuthorForm from "../pages/authors/AuthorForm";
import AuthorDetails from "../pages/authors/AuthorDetails";
import About from "../pages/About";
import Privacy from "../pages/Privacy";
import Terms from "../pages/Terms";
import Contact from "../pages/Contact";
import { RequireAuth } from "./RequireAuth";
import { RequireAdmin } from "./RequireAdmin";

export const ECordelRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/sobre" element={<About />} />
    <Route path="/privacidade" element={<Privacy />} />
    <Route path="/termos" element={<Terms />} />
    <Route path="/contato" element={<Contact />} />
    <Route path="/login" element={<Login />} />
    <Route path="/cordeis/:id" element={<CordelDetails />} />
    <Route path="/autores/:id" element={<AuthorDetails />} />
    <Route path="/revisao" element={<RequireAuth><CordelsReviewList /></RequireAuth>} />
    <Route path="/revisao/:id" element={<RequireAuth><CordelReview /></RequireAuth>} />
    <Route path="/autores" element={<AuthorList />} />
    <Route path="/autores/novo" element={<RequireAdmin><AuthorForm /></RequireAdmin>} />
    <Route path="/autores/editar/:id" element={<RequireAdmin><AuthorForm /></RequireAdmin>} />
  </Routes>
);