import React from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function DetailsCompany({
  companies,
}: {
  companies: Company[];
}) {
  const { id } = useParams<{ id?: string }>();
  const index = id ? parseInt(id, 10) : -1;
  const company =
    index >= 0 && index < companies.length ? companies[index] : null;

  const navigate = useNavigate();

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
      <button onClick={() => navigate(-1)}>Go Back</button>
    </div>
  );
}
