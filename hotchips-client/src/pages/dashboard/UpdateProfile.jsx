import React, { useContext } from "react";
import { AuthContext } from "../../contexts/AuthProvider";
import { useForm } from "react-hook-form";

const UpdateProfile = () => {
  const { updateUserProfile } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const name = data.name;
    const photoURL = data.photoURL;

    updateUserProfile(name, photoURL)
      .then(() => {
        // Profile updated!
        alert("Profile updated successfully");
      })
      .catch((error) => {
        // An error occurred
        // ...
      });
  };
  return (
    <div className="flex items-center justify-center h-screen max-w-md mx-auto ">
      <div className="w-full max-w-sm shadow-2xl card shrink-0 bg-base-100">
        <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              {...register("name")}
              placeholder="Your name"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Upload Photo</span>
            </label>
            <input
              type="file"
              {...register("photoURL")}
              className="w-full mt-1 file-input"
            />
            {/* <input type="text" {...register("photoURL")} placeholder="photo url" className="input input-bordered" required /> */}
          </div>
          <div className="mt-6 form-control">
            <input
              type="submit"
              value={"Update"}
              className="text-white btn bg-green"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
