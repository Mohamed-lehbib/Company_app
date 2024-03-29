import React, { useState } from "react";
// import CompanyComponent from "./components/Company";
import { Route, Routes } from "react-router-dom";
import CreateCompanies from "./components/CreateCompanies";
import ListCompanies from "./components/ListCompanies";
import DetailsCompany from "./components/DetailsCompany";

export default function App() {
  const [companies, setCompanies] = useState<Company[]>([
    {
      email: "contact@vector-mind.com",
      logo: "https://www.vector-mind.com/assets/images/vm-logo-purpel.svg",
      name: "Vector Mind",
      type: "Private",
      website: "https://www.vector-mind.com",
    },
    {
      email: "contact@apple.com",
      logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
      name: "Apple",
      type: "Foreign",
      website: "http://apple.com",
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

  // Function to delete a company
  const handleDelete = (index: number) => {
    setCompanies((prevCompanies) =>
      prevCompanies.filter((_, i) => i !== index)
    );
  };

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <ListCompanies companies={companies} handleDelete={handleDelete} />
          }
        ></Route>
        <Route
          path="/add-company"
          element={<CreateCompanies addCompany={addCompany} />}
        ></Route>
        <Route
          path="/company/:id"
          element={
            <DetailsCompany companies={companies} setCompanies={setCompanies} />
          }
        ></Route>
      </Routes>
      {/* <CompanyComponent /> */}
    </div>
  );
}
