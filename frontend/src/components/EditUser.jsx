import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../api/axiosInstance.jsx";
import toast from "react-hot-toast";

export default function EditUser() {
  const { id } = useParams(); // get profile id from URL
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");

  // Fetch user details when the component mounts
  useEffect(() => {
    axiosInstance
      .get(`profiles/${id}/`)
      .then((res) => {
        console.log("Fetched data:", res.data);
        setUsername(res.data.username || "");
        setEmail(res.data.email || "");
        setMobile(res.data.mobile || "");
      })
      .catch((err) => {
        console.error("Error fetching user details:", err);
        toast.error("Failed to load user details");
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedUser = { username, email, mobile };

    axiosInstance
      .put(`profiles/${id}/`, updatedUser)
      .then(() => {
        toast.success("User updated successfully!");
        navigate("/profiles");
      })
      .catch((err) => {
        console.error("Error updating user:", err);
        toast.error("Failed to update user");
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-teal-600">
          Edit User
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md"
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md"
          />

          <input
            type="text"
            placeholder="Mobile"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md"
          />

          <button
            type="submit"
            className="w-full py-2 bg-teal-600 text-white rounded-md hover:bg-teal-500"
          >
            Update User
          </button>
        </form>
      </div>
    </div>
  );
}
