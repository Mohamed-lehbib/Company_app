import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";
interface CreateCompaniesProps {
  addCompany: (newCompany: Company) => void;
}

export default function CreateCompanies({ addCompany }: CreateCompaniesProps) {
  const form = useForm<Company>({ mode: "all" });
  const { register, handleSubmit, formState, reset } = form;
  const { errors } = formState;
  // const [logo, setLogo] = useState<File | null>(null); // State for storing the file object
  // const [logoPath, setLogoPath] = useState<string>("");
  // ** Navigation
  const navigate = useNavigate();
  // ** The Function on Submit
  const onSubmit = (data: Company) => {
    const submissionData = {
      ...data,
      // logo: logoPath, // Include the logoPath in the data being submitted
    };
    console.log(submissionData);
    addCompany(submissionData);
    reset();
    // setLogo(null);
    // setLogoPath("");
    navigate("/");
  };
  //  ** Controlled Inputs
  // function handleLogoChange(e: React.ChangeEvent<HTMLInputElement>) {
  //   const file = e.target.files?.[0]; // Get the first file selected by the user
  //   if (file) {
  //     if (!isValidLogo(file)) {
  //       alert("Please select a valid image file (JPEG, PNG, GIF, SVG).");
  //       setLogo(null);
  //     }
  //     setLogo(file); // Set the file object to state
  //     setLogoPath(URL.createObjectURL(file)); // Get the path of the file object
  //   } else {
  //     setLogo(null); // Reset the file object if no file is selected
  //     setLogoPath(""); // Reset the path if no file is selected
  //   }
  // }
  // ** Validating the logo type
  // const isValidLogo = (logo: File) => {
  //   // Check if the file type is image or svg
  //   return logo.type.startsWith("image/");
  // };
  const onCancel = () => {
    navigate(-1);
  };
  const { getItem } = useLocalStorage();
  return (
    <div className="container mt-4">
      <p>
        and visite number:
        <b>{getItem("visitCount") ? getItem("visitCount") : 0}</b>
      </p>
      <p>
        selectedCompany:
        <b>
          {getItem("selectedCompany")
            ? getItem("selectedCompany").name
            : "No company is selected"}
        </b>
      </p>
      <h2 className="mb-4">Add New Company</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            {...register("name", {
              required: { value: true, message: "Name is required" },
            })}
          />

          <p className="text-danger">{errors.name?.message}</p>
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="text"
            className="form-control"
            {...register("email", {
              required: { value: true, message: "Email is required" },
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid Email format example: example@example.com",
              },
            })}
          />

          <p className="text-danger">{errors.email?.message}</p>
        </div>
        <div className="mb-3">
          <label className="form-label">WebSite</label>
          <input
            type="text"
            className="form-control"
            {...register("website", {
              required: { value: true, message: "WebSite is required" },
              pattern: {
                value: /^(ftp|http|https):\/\/[^ "]+$/,
                message:
                  "Invalid website URL format example: http://example.com",
              },
            })}
          />

          <p className="text-danger">{errors.website?.message}</p>
        </div>
        <div className="mb-3">
          <label className="form-label">Logo</label>
          {/* <input type="file" onChange={handleLogoChange} />
        <br />
        {logo && !isValidLogo(logo) && (
          <p className="text-danger">
            This isn't a valid logo if no valid format
          </p>
        )}
        {logoPath && (
          <img src={logoPath} alt="Logo Preview" width={150} height={150} />
        )} */}
          <input
            type="text"
            className="form-control"
            {...register("logo", {
              required: { value: true, message: "Logo is required" },
              pattern: {
                value: /^(ftp|http|https):\/\/[^ "]+$/,
                message: "Invalid logo URL format example: http://example.com",
              },
            })}
          />
          <p className="text-danger">{errors.logo?.message}</p>
        </div>
        {/* Display preview of the logo */}
        <div className="mb-3">
          {form.getValues().logo && (
            <img
              src={form.getValues().logo}
              alt="Logo Preview"
              className="img-thumbnail"
              style={{ width: "150px", height: "150px" }}
            />
          )}
        </div>
        <div className="mb-3">
          <label className="form-label">Type</label>
          <select {...register("type")} className="form-select">
            <option value="Government">Government</option>
            <option value="Private">Private</option>
            <option value="Foreign">Foreign</option>
          </select>
        </div>

        <div className="text-start">
          <button
            type="button"
            className="btn btn-secondary me-2"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
