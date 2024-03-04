import React, { useState } from "react";
// import CompanyComponent from "./components/Company";
import { Route, Routes } from "react-router-dom";
import CreateCompanies from "./components/CreateCompanies";
import ListCompanies from "./components/ListCompanies";
import DetailsCompany from "./components/DetailsCompany";

export default function App() {
  const [companies, setCompanies] = useState<Company[]>([
    {
      email: "user@example.com",
      logo: "https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg",
      name: "make coffee",
      type: "Foreign",
      website: "http://ndfnk.h",
    },
    {
      email: "user@example.com",
      logo: "https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg",
      name: "make coffee",
      type: "Foreign",
      website: "http://ndfnk.h",
    },
    {
      email: "user@example.com",
      logo: "https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg",
      name: "make coffee",
      type: "Foreign",
      website: "http://ndfnk.h",
    },
  ]);

  // Function to add a new company
  const addCompany = (newCompany: Company) => {
    setCompanies((prevCompanies) => [...prevCompanies, newCompany]);
  };

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={<ListCompanies companies={companies} />}
        ></Route>
        <Route
          path="/add-company"
          element={<CreateCompanies addCompany={addCompany} />}
        ></Route>
        <Route
          path="/company/:id"
          element={<DetailsCompany companies={companies} />}
        ></Route>
      </Routes>
      {/* <CompanyComponent /> */}
    </div>
  );
}
