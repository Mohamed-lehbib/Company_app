import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";

interface ListCompaniesProps {
  companies: Company[];
  handleDelete: (index: number) => void;
}

export default function ListCompanies({
  companies,
  handleDelete,
}: ListCompaniesProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState<string>("");

  const filteredCompanies = companies.filter((company) => {
    if (
      selectedType &&
      selectedType !== "" &&
      company.type.toLowerCase() !== selectedType.toLowerCase()
    ) {
      return false; // Skip if type is selected and doesn't match
    }

    if (
      searchTerm &&
      searchTerm !== "" &&
      !company.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false; // Skip if search term is provided and doesn't match
    }

    return true; // Include if matches all criteria
  });

  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedType(event.target.value);
  };

  const [selectedCompanyIndex, setSelectedCompanyIndex] = useState<number>(-1);
  const [selectedCompany, setSelectedCompany] = useState<string>(
    "No company is selected"
  );
  const { getItem, setItem } = useLocalStorage();
  // The visite number
  const [visiteNumber, setVisiteNumber] = useState(0);
  // to update the visite number
  useEffect(() => {
    getItem("selectedCompany") &&
      setSelectedCompany(getItem("selectedCompany").name);
    getItem("selectedCompany") &&
      setSelectedCompanyIndex(getItem("selectedCompany").index);
    const incrementVisitCount = () => {
      // Check if the user is navigating to the home page
      if (location.pathname === "/") {
        // Check if the variable exists in local storage
        const visitCount = parseInt(getItem("visitCount")) || 0;
        setItem("visitCount", visitCount + 1);
        setVisiteNumber(getItem("visitCount"));
      }
    };

    // Call the function when the component mounts
    incrementVisitCount();

    // Clean up the listener when the component unmounts
    return () => {};
  }, [location]);
  return (
    <div className="container mt-4">
      <p>
        selectedCompany:
        <b>{selectedCompany ? selectedCompany : "No company is selected"}</b>
      </p>

      <p>
        and visite number:
        <b>{getItem("visitCount") ? getItem("visitCount") : 0} </b>
      </p>
      <h2 className="mb-4">List of Companies</h2>
      <button
        onClick={() => {
          navigate("/add-company");
        }}
        className="btn btn-primary mb-3"
      >
        Add New Company
      </button>
      <div className="row mb-3">
        <div className="col-md-6">
          <input
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="col-md-6">
          <select
            value={selectedType}
            onChange={handleTypeChange}
            className="form-select"
          >
            <option value="">All Types</option>
            <option value="Government">Government</option>
            <option value="Private">Private</option>
            <option value="Foreign">Foreign</option>
          </select>
        </div>
      </div>
      <div className="row">
        {filteredCompanies.map((company, index) => (
          <div className="col-md-4 mb-3" key={index}>
            <div
              className={
                "card " +
                (getItem("selectedCompany") &&
                  (getItem("selectedCompany").index === index
                    ? "border-primary"
                    : ""))
              }
              onClick={() => {
                console.log("Card clicked");
                // setSelectedCompanyIndex(index);
                // setSelectedCompany(company.name);
                setItem("selectedCompany", {
                  name: company.name,
                  index: index,
                });
                setSelectedCompanyIndex(getItem("selectedCompany").index);
                setSelectedCompany(getItem("selectedCompany").name);
              }}
            >
              <img
                src={company.logo}
                className="card-img-top"
                alt={`${company.name} Logo`}
                style={{ height: "180px", objectFit: "cover" }}
              />
              <div className="card-body">
                <Link
                  to={`/company/${index}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <h5 className="card-title">{company.name}</h5>
                </Link>
                <p className="card-text">Type: {company.type}</p>
                <button
                  onClick={() => handleDelete(index)}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
