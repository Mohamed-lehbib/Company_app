import React, { useState } from "react";
// import CompanyComponent from "./components/Company";
import { Route, Routes } from "react-router-dom";
import CreateCompanies from "./components/CreateCompanies";
import ListCompanies from "./components/ListCompanies";
import DetailsCompany from "./components/DetailsCompany";

export default function App() {
  const [companies, setCompanies] = useState<Company[]>([
    {
      email: "microsoft@microsoft.com",
      logo: "blob:http://localhost:3000/2fdef243-be95-4fd4-8e5e-6867abc2333d",
      name: "Microsoft",
      type: "Foreign",
      website: "http://microsoft.com",
    },
    {
      name: "Apple",
      email: "apple@apple.com",
      website: "http://apple.com",
      type: "Foreign",
      logo: "blob:http://localhost:3000/41e4c385-313f-45d6-adde-530ab3b94d27",
    },
    {
      name: "Google",
      email: "google@google.com",
      website: "http://google.com",
      type: "Foreign",
      logo: "blob:http://localhost:3000/c52f1838-e232-4b97-a76c-cb7ac34d1899",
    },
    {
      name: "Tailwind",
      email: "tailwind@tailwind.com",
      website: "http://tailwindcss.com",
      type: "Private",
      logo: "blob:http://localhost:3000/b9a1a0ee-a2a6-46b0-b8e9-b3f86b850b35",
    },
    {
      name: "React",
      email: "react@react.com",
      website: "http://react.com",
      type: "Private",
      logo: "blob:http://localhost:3000/1885ce6c-9c96-4795-9d9a-3e2892e0ca15",
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
