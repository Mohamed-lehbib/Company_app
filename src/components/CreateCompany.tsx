import React from "react";

export default function CreateCompany() {
  return (
    <div>
      <form>
        <label>Name:</label>
        <input type="text" />
        <br />
        <label>Email:</label>
        <input type="email" />
        <br />
        <label>Website:</label>
        <input type="url" />
        <br />
        <label>Logo:</label>
        <input type="file" />
        <br />
        <label>Type:</label>
        <select>
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
