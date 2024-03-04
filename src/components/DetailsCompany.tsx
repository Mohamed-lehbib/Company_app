import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function DetailsCompany({
  companies,
  setCompanies,
}: {
  companies: Company[];
  setCompanies: React.Dispatch<React.SetStateAction<Company[]>>;
}) {
  const { id } = useParams<{ id?: string }>();
  const index = id ? parseInt(id, 10) : -1;
  const company =
    index >= 0 && index < companies.length ? companies[index] : null;

  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedCompany, setEditedCompany] = useState<Partial<Company> | null>(
    null
  );

  // Function to toggle modal
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    setEditedCompany(null); // Reset editedCompany when modal is toggled
  };

  // Function to handle input change in the form
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedCompany((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Function to handle select change for company type
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditedCompany((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Function to handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editedCompany) return;

    const updatedCompanies = [...companies];
    updatedCompanies[index] = {
      ...updatedCompanies[index],
      ...editedCompany,
    };
    setCompanies(updatedCompanies);
    toggleModal(); // Close the modal after submission
  };

  // Handling case where company is not found
  if (!company) {
    return <div>Company not found</div>;
  }

  return (
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
      <button onClick={toggleModal}>Edit</button>
      <button onClick={() => navigate(-1)}>Go Back</button>
      {/* Modal */}
      <div
        className={`modal ${isModalOpen ? "show" : ""}`}
        style={{ display: isModalOpen ? "block" : "none" }}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            {/* Modal Header */}
            <div className="modal-header">
              <h5 className="modal-title">Edit Company</h5>
              <button type="button" className="close" onClick={toggleModal}>
                <span>&times;</span>
              </button>
            </div>
            {/* Modal Body */}
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Name:</label>
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
                <div className="form-group">
                  <label>Email:</label>
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
                <div className="form-group">
                  <label>Website:</label>
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
                <div className="form-group">
                  <label>Type:</label>
                  <select
                    className="form-control"
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
                <button type="submit" className="btn btn-primary">
                  Save
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={toggleModal}
                >
                  Close
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* Modal backdrop */}
      {isModalOpen && <div className="modal-backdrop fade show"></div>}
    </div>
  );
}
