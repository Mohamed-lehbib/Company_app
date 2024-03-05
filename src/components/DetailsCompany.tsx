import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";

interface DetailsCompanyProps {
  companies: Company[];
  setCompanies: React.Dispatch<React.SetStateAction<Company[]>>;
}

export default function DetailsCompany({
  companies,
  setCompanies,
}: DetailsCompanyProps) {
  const { id } = useParams<{ id?: string }>();
  const index = id ? parseInt(id, 10) : -1;
  const company =
    index >= 0 && index < companies.length ? companies[index] : null;

  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedCompany, setEditedCompany] = useState<Partial<Company> | null>(
    null
  );

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    setEditedCompany(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedCompany((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditedCompany((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editedCompany) return;

    const updatedCompanies = [...companies];
    updatedCompanies[index] = {
      ...updatedCompanies[index],
      ...editedCompany,
    };
    setCompanies(updatedCompanies);
    toggleModal();
  };

  if (!company) {
    return <div>Company not found</div>;
  }
  const { getItem } = useLocalStorage();
  return (
    <div className="container mt-4">
      <p>
        and visite number:
         <b>{getItem("visitCount") ? getItem("visitCount") : 0}</b>
      </p>
      <p>
        selectedCompany:
         <b>{getItem("selectedCompany")
          ? getItem("selectedCompany").name
          : "No company is selected"} </b>
      </p>
      <div>
        <img
          src={company.logo}
          className="card-img-top"
          alt={`${company.name} Logo`}
          style={{ height: "180px", objectFit: "cover" }}
        />
        <h2>{company.name} Details</h2>
        <p>Email: {company.email}</p>
        <p>
          Website:{" "}
          <a href={company.website} target="_blank" rel="noopener noreferrer">
            {company.website}
          </a>
        </p>
        <p>Type: {company.type}</p>
        <button onClick={toggleModal} className="btn btn-primary me-2">
          Edit
        </button>
        <button onClick={() => navigate(-1)} className="btn btn-secondary">
          Go Back
        </button>
      </div>
      <div
        className={`modal ${isModalOpen ? "show" : ""}`}
        style={{ display: isModalOpen ? "block" : "none" }}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Company</h5>
              <button
                type="button"
                className="btn-close"
                onClick={toggleModal}
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Name:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={
                      (editedCompany && editedCompany.name) ||
                      company.name ||
                      ""
                    }
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="email"
                    value={
                      (editedCompany && editedCompany.email) ||
                      company.email ||
                      ""
                    }
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Website:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="website"
                    value={
                      (editedCompany && editedCompany.website) ||
                      company.website ||
                      ""
                    }
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Type:</label>
                  <select
                    className="form-select"
                    name="type"
                    value={
                      (editedCompany && editedCompany.type) ||
                      company.type ||
                      ""
                    }
                    onChange={handleSelectChange}
                  >
                    <option value="Government">Government</option>
                    <option value="Private">Private</option>
                    <option value="Foreign">Foreign</option>
                  </select>
                </div>
                <div className="text-end">
                  <button
                    type="button"
                    className="btn btn-secondary me-2"
                    onClick={toggleModal}
                  >
                    Close
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && <div className="modal-backdrop fade show"></div>}
    </div>
  );
}
