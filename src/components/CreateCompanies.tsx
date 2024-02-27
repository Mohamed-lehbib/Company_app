import { Controller, useForm } from "react-hook-form";

export default function CreateCompanies() {
  const form = useForm<Company>({ mode: "all" });
  const { register, handleSubmit, formState, control } = form;
  const { errors } = formState;
  const onSubmit = (data: Company) => {
    console.log(data);
  };
  const handleFileChange = (file: File) => {
    if (!isValidLogo(file)) {
      alert("Please select a valid image file (JPEG, PNG, GIF, SVG).");
    }

    // Do something with the file if it's valid
  };
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
        <Controller
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
        />
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
