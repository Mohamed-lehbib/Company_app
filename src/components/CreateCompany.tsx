import React, { FormEvent, useState } from "react";

export default function CreateCompany() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [url, setUrl] = useState<string>("");
  const [logo, setLogo] = useState<File | null>(null);
  const [type, setType] = useState("Government");
  const [companies, setCompanies] = useState<Company[]>([])
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

  }
  return (
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
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <label>Website:</label>
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <br />
        {/* <label>Logo:</label>
        <input type="file" value={logo} onChange={(e) => setName(e.target.value)}/>
        <br /> */}
        <label>Type:</label>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="Government ">Government </option>
          <option value="Private ">Private </option>
          <option value="Foreign ">Foreign </option>
        </select>
        <br />
        <button type="submit">submit</button>
      </form>
    </div>
  );
}
