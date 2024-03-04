import React from "react";
import { useParams } from "react-router-dom";

export default function DetailsCompany({
  companies,
}: {
  companies: Company[];
}) {
  const { id } = useParams<{ id: string }>();
  // Parse the `id` to an integer and ensure it's a valid index
  // const index = parseInt(id, 10);
  // const company =
  //   index >= 0 && index < companies.length ? companies[index] : null;

  // Handling case where company is not found
  // if (!company) {
  //   return <div>Company not found</div>;
  // }
  return (
    <div>
      {/* <img
        src={company.logo}
        className="card-img-top"
        alt={`${company.name} Logo`}
        style={{ height: "180px", objectFit: "cover" }}
      /> */}
    </div>
  );
}
