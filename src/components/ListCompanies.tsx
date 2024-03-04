import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ListCompanies({ companies }: { companies: Company[] }) {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCompanies =
    searchTerm.length === 0
      ? companies
      : companies.filter((company) =>
          company.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
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
          style={{ maxWidth: "300px", margin: "0 auto 20px" }} // Optional inline styles
        />
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
              <h5 className="card-title">{company.name}</h5>
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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
