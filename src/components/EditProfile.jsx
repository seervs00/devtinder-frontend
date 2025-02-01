import axios from "axios";
import { useState } from "react";
import UserCard from "./UserCard";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ User }) => {
  const [firstName, setFirstName] = useState(User.firstName);
  const [lastName, setLastName] = useState(User.lastName);
  const [age, setAge] = useState(User.age);
  const [gender, setGender] = useState(User.gender);
  const [photoUrl, setPhotoUrl] = useState(User.photoUrl);
  const [skills, setSkills] = useState(User.skills);
  const [about, setAbout] = useState(User.about);
  const [err, setErr] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const dispatch = useDispatch();

  const handleSaveProfile = async () => {
    setErr(""); // Clear previous errors
    setIsSaving(true); // Start the saving process

    // Basic validation
    if (!firstName || !lastName || !age) {
      setErr("First name, last name, and age are required.");
      setIsSaving(false);
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5170/profile/edit",
        { firstName, lastName, gender, age, about, photoUrl, skills },
        { withCredentials: true }
      );

      dispatch(addUser(res?.data?.data)); // Update user in Redux store
      setShowSuccessMessage(true); // Show success message

      // Hide success message after 2 seconds
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 2000);
    } catch (err) {
      setErr("Failed to save profile. Please try again later.");
      console.error(err);
    } finally {
      setIsSaving(false); // Stop the saving process
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 py-10">
      <div className="max-w-6xl mx-auto px-4 ">
        <div className="flex flex-col lg:flex-row gap-8 items-stretch">
          {/* Edit Profile Form */}
          <div className="w-full lg:w-1/2 bg-white rounded-lg shadow-2xl p-6 flex flex-col">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Edit Profile</h2>
            <div className="space-y-4 flex-grow">
              {[
                { label: "First Name", value: firstName, onChange: setFirstName, type: "text" },
                { label: "Last Name", value: lastName, onChange: setLastName, type: "text" },
                { label: "Age", value: age, onChange: setAge, type: "number" },
                { label: "Gender", value: gender, onChange: setGender, type: "text" },
                { label: "Photo URL", value: photoUrl, onChange: setPhotoUrl, type: "text" },
                { label: "Skills", value: skills, onChange: setSkills, type: "text" },
                { label: "About", value: about, onChange: setAbout, type: "text" },
              ].map((field, index) => (
                <div key={index} className="form-control">
                  <label className="label">
                    <span className="label-text text-gray-700">{field.label}</span>
                  </label>
                  <input
                    type={field.type}
                    value={field.value}
                    className="input input-bordered w-full bg-gray-50"
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                </div>
              ))}
            </div>

            {err && <p className="text-red-500 text-sm mt-4">{err}</p>}

            <div className="mt-6">
              <button
                className={`btn btn-primary w-full ${isSaving ? "loading" : ""}`}
                onClick={handleSaveProfile}
                disabled={isSaving}
              >
                {isSaving ? "Saving..." : "Save Profile"}
              </button>
            </div>
          </div>

          {/* User Card Preview */}
          <div className="w-full lg:w-1/2 flex">
            <UserCard user={{ firstName, lastName, photoUrl, about, age, gender }} />
          </div>
        </div>
      </div>

      {/* Success Toast */}
      {showSuccessMessage && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile saved successfully!</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfile;