import React, { useState } from "react";
// import CompanyComponent from "./components/Company";
import { Route, Routes } from "react-router-dom";
import CreateCompanies from "./components/CreateCompanies";
import ListCompanies from "./components/ListCompanies";

export default function App() {
  const [companies, setCompanies] = useState<Company[]>([]);

  // Function to add a new company
  const addCompany = (newCompany: Company) => {
    setCompanies((prevCompanies) => [...prevCompanies, newCompany]);
  };

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={<CreateCompanies addCompany={addCompany} />}
        ></Route>
        <Route
          path="/list"
          element={<ListCompanies companies={companies} />}
        ></Route>
      </Routes>
      {/* <CompanyComponent /> */}
    </div>
  );
}
