import { useForm } from "react-hook-form";

export default function CreateCompanies() {
  const form = useForm<Company>({ mode: "all" });
  const { register, handleSubmit, formState, watch } = form;
  const { errors } = formState;
  const onSubmit = (data: Company) => {
    console.log(data);
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

        {/* <label>Logo</label>
        <input type="file" /> */}
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
