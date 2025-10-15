import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import 'sweetalert2/dist/sweetalert2.min.css';
import axiosInstance from "../api/axiosInstance.jsx";
import Navbar from "../components/Navbar";
import Footer from "./Footer";

const Home = () => {
  const [profiles, setProfiles] = useState([]);

  // Fetch profiles from backend
  const fetchProfiles = async () => {
    try {
      const response = await axiosInstance.get("/profiles/");
      setProfiles(response.data);
    } catch (error) {
      console.error("Error fetching profiles:", error);
      toast.error("Error fetching profiles. Please login again.");
    }
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  // Delete profile
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this profile!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      customClass: {
        confirmButton: "bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-red-400",
        cancelButton: "bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-400",
      },
      buttonsStyling: false,
    });

    if (result.isConfirmed) {
      try {
        await axiosInstance.delete(`/profiles/${id}/`);
        setProfiles(profiles.filter(profile => profile.id !== id));
        toast.success("Profile deleted successfully");
      } catch (error) {
        console.error("Error deleting profile:", error);
        toast.error("Error deleting profile");
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="bg-gradient-to-b from-teal-300 to-white p-5 rounded-lg">
        <div className="px-3 mt-10">
          <div className="max-w-4xl mx-auto bg-white rounded-lg overflow-hidden shadow-md">
            <div className="bg-white p-4 sm:flex sm:justify-between items-center rounded-t-lg">
              <h3 className="text-2xl font-bold mb-4 sm:mb-0 sm:mr-4 text-teal-600">
                Profile List
              </h3>
            </div>

            <div className="overflow-x-auto w-full">
              <table className="table text-gray-400 border-separate space-y-6 text-sm w-full">
                <thead className="bg-teal-600 text-white">
                  <tr>
                    <th className="p-3">Sl No</th>
                    <th className="p-3 text-left">Name</th>
                    <th className="p-3 text-left">Email</th>
                    <th className="p-3 text-left">Mobile</th>
                    <th className="p-5 text-left">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {profiles.length > 0 ? (
                    profiles.map((profile, index) => (
                      <tr key={profile.id} className="bg-teal-50 lg:text-black">
                        <td className="p-3 font-medium capitalize">{index + 1}</td>
                        <td className="p-3">{profile.username}</td>
                        <td className="p-3">{profile.email}</td>
                        <td className="p-3">{profile.mobile}</td>
                        <td className="p-3">
                          <div className="flex items-center space-x-2">
                            <Link to={`/profiles/${profile.id}`}>
                              <button className="px-4 py-2 text-sm font-medium text-white bg-orange-500 rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400">
                                Edit
                              </button>
                            </Link>
                            <button
                              onClick={() => handleDelete(profile.id)}
                              className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="text-center py-4 text-gray-500">
                        No profiles found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
