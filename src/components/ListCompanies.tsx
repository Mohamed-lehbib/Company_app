import React from "react";

export default function ListCompanies({companies}: {companies: Company[]}) {
  return (
    <div>
      <h2>List of Companies</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Website</th>
            <th>Logo</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {companies.map((company, index) => (
            <tr key={index}>
              <td>{company.name}</td>
              <td>{company.email}</td>
              <td>{company.website}</td>
              <td>
                <img
                  src={company.logo}
                  alt={`${company.name} Logo`}
                  width={50}
                  height={50}
                />
              </td>
              <td>{company.type}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
