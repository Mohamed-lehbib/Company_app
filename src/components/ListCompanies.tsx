import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

interface ListCompaniesProps {
  companies: Company[];
  handleDelete: (index: number) => void; // Function to handle deletion
}

export default function ListCompanies({
  companies,
  handleDelete,
}: ListCompaniesProps) {
  const navigate = useNavigate();
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

  return (
    <div>
      <h2 className="mb-4">List of Companies</h2>
      <button
        onClick={() => {
          navigate("/add-company");
        }}
      >
        Add new Company
      </button>
      <div>
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="form-control mb-4"
          style={{ maxWidth: "300px", margin: "0 auto 20px" }}
        />
        <select
          value={selectedType}
          onChange={handleTypeChange}
          className="form-select mb-4"
          style={{ maxWidth: "300px", margin: "0 auto 20px" }}
        >
          <option value="">All Types</option>
          <option value="Government">Government</option>
          <option value="Private">Private</option>
          <option value="Foreign">Foreign</option>
        </select>
      </div>
      <div className="d-flex flex-wrap justify-content-start">
        {filteredCompanies.map((company, index) => (
          <div className="card m-2" style={{ width: "18rem" }} key={index}>
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

              {/* <p className="card-text">Email: {company.email}</p>
              <p className="card-text">
                Website:{" "}
                <a
                  href={company.website}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {company.website}
                </a>
              </p> */}
              <p className="card-text">Type: {company.type}</p>
              <button onClick={() => handleDelete(index)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
