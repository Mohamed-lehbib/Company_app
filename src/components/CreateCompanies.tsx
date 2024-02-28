import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

export default function CreateCompanies() {
  const form = useForm<Company>({ mode: "all" });
  const { register, handleSubmit, formState, reset } = form;
  const { errors } = formState;
  const [logo, setLogo] = useState<File | null>(null); // State for storing the file object
  const [logoPath, setLogoPath] = useState<string>("");
  const onSubmit = (data: Company) => {
    const submissionData = {
      ...data,
      logoPath, // Include the logoPath in the data being submitted
    };
    console.log(submissionData);
    reset();
    setLogo(null);
    setLogoPath("");
  };
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
  const isValidLogo = (logo: File) => {
    // Check if the file type is image or svg
    return logo.type.startsWith("image/");
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Name</label>
        <input
          type="text"
          {...register("name", {
            required: { value: true, message: "Name is required" },
          })}
        />
        <br />
        <p style={{ color: "red" }}>{errors.name?.message}</p>
        <label>Email</label>
        <input
          type="text"
          {...register("email", {
            required: { value: true, message: "Email is required" },
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid Email format example: example@example.com",
            },
          })}
        />
        <br />

        <p style={{ color: "red" }}>{errors.email?.message}</p>

        <label>WebSite</label>
        <input
          type="text"
          {...register("website", {
            required: { value: true, message: "WebSite is required" },
            pattern: {
              value: /^(ftp|http|https):\/\/[^ "]+$/,
              message: "Invalid website URL format example: http://example.com",
            },
          })}
        />
        <br />

        <p style={{ color: "red" }}>{errors.website?.message}</p>

        <label>Logo</label>
        {/* <Controller
          name="logo"
          control={control}
          defaultValue=""
          render={({ field: { onChange } }) => (
            <input
              type="file"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  onChange(file);
                  handleFileChange(file);
                }
              }}
            />
          )}
        /> */}
        <input type="file" onChange={handleLogoChange} />
        <br />
        {logo && !isValidLogo(logo) && (
          <p style={{ color: "red" }}>
            This isn't a valid logo if no valid format
          </p>
        )}
        {logoPath && (
          <img src={logoPath} alt="Logo Preview" width={150} height={150} />
        )}
        {/* Display preview of the logo */}

        <br />
        <label>Type</label>
        <select {...register("type")}>
          <option value="Government">Government</option>
          <option value="Private">Private</option>
          <option value="Foreign">Foreign</option>
        </select>
        <br />
        <button> Submit </button>
      </form>
    </div>
  );
}
