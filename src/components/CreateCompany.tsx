import React, { FormEvent, useState } from "react";
import ListCompanies from "./ListCompanies";

export default function CreateCompany() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [url, setUrl] = useState<string>("");
  const [logo, setLogo] = useState<File | null>(null); // State for storing the file object
  const [logoPath, setLogoPath] = useState<string>(""); // State for storing the path of the logo image
  const [type, setType] = useState<string>("Government");
  const [companies, setCompanies] = useState<Company[]>([]);

  function handleSubmit(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    if (
      !name ||
      !email ||
      !url ||
      !isValidEmail(email) ||
      !isValidUrl(url) ||
      !isValidLogo(logo)
    ) {
      alert("Please fill in all fields correctly.");
    }
    const newCompany: Company = {
      name,
      email,
      website: url,
      logo: logoPath,
      type,
    };

    setCompanies([...companies, newCompany]); // Append new company to the list
    // Reset form fields after submission
    setName("");
    setEmail("");
    setUrl("");
    setLogo(null);
    setLogoPath("");
    setType("Government");

    console.log("Company added:", newCompany);
  }

  function handleLogoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]; // Get the first file selected by the user
    if (file) {
      if (!isValidLogo(file)) {
        alert("Please select a valid image file (JPEG, PNG, GIF, SVG).");
      }
      setLogo(file); // Set the file object to state
      setLogoPath(URL.createObjectURL(file)); // Get the path of the file object
    } else {
      setLogo(null); // Reset the file object if no file is selected
      setLogoPath(""); // Reset the path if no file is selected
    }
  }

  function isValidEmail(email: string): boolean {
    // Basic email format validation using regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function isValidUrl(url: string): boolean {
    // Basic URL format validation using regular expression
    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
    return urlRegex.test(url);
  }

  function isValidLogo(logo: File | null): boolean {
    if (!logo) return false;
    // Check if the file type is image or svg
    return logo.type.startsWith("image/") || logo.type === "image/svg+xml";
  }

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <br />
          <label>Email:</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          {email && !isValidEmail(email) && (
            <p style={{ color: "red" }}>
              The email format isn't valid, Valid format: example@example.com
            </p>
          )}
          <label>Website:</label>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <br />
          {url && !isValidUrl(url) && (
            <p style={{ color: "red" }}>
              The website format isn't valid, Valid format: http://example.com
            </p>
          )}
          <br />
          <label>Logo:</label>
          <input type="file" onChange={handleLogoChange} />
          <br />
          {logo && !isValidLogo(logo) && (
            <p style={{ color: "red" }}>
              This isn't a valid logo if no valid format
            </p>
          )}
          {logoPath && (
            <img src={logoPath} alt="Logo Preview" width={150} height={150} />
          )}{" "}
          {/* Display preview of the logo */}
          <br />
          <label>Type:</label>
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="Government">Government</option>
            <option value="Private">Private</option>
            <option value="Foreign">Foreign</option>
          </select>
          <br />
          <button type="submit">Submit</button>
        </form>
      </div>
      <div>
        <ListCompanies companies={companies} />
      </div>
    </div>
  );
}
