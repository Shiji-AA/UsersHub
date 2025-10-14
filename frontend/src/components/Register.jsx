import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import logo from "../assets/logo.jpg";
import tutor6 from "../assets/tutor6.jpg";
import axiosInstance from "../api/AxiosInstance.jsx";

function Register() {
  const navigate = useNavigate();
  const [username, setuserName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");

const handleSubmit = async (e) => {
  e.preventDefault();

  if (password !== confirmpassword) {
    toast.error("Passwords do not match");
    return;
  }

  try {
    const response = await axiosInstance.post("/register/", {
      name: username,           // match serializer field
      email,
      mobile,
      password,
      confirm_password: confirmpassword, // include confirm password
    });

    toast.success(response.data.message || "Registration successful!");
    navigate("/");
  } catch (error) {
    console.error(error);
    toast.error(error.response?.data?.message || "Registration failed");
  }
};


  return (
    <section>
      <div
        className="flex min-h-full flex-1 flex-col px-6 py-12 lg:px-8 bg-gray-500"
        style={{
          backgroundImage: `url(${tutor6})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "120vh",
          width: "100vw",
        }}
      >
        <div className="flex flex-col items-center px-6 py-4 md:h-screen lg:py-0">
          <div className="w-full bg-white border border-indigo-600 lg:mt-0 sm:max-w-lg xl:p-0">
            <div className="p-6 space-y-4 md:space-y-2 sm:p-8">
              <div className="flex justify-center items-center">
                <img src={logo} className="h-9 w-110" alt="Arcite" width="120" />
              </div>

              <h1 className="font-semibold text-xl text-center">Sign up to your account</h1>

              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
                <input
                  type="text"
                  placeholder="Name"
                  value={username}
                  onChange={(e) => setuserName(e.target.value)}
                  className="bg-white border border-gray-400 text-gray-900 text-sm block w-full p-2.5"
                  required
                />

                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white border border-gray-400 text-gray-900 text-sm block w-full p-2.5"
                  required
                />

                <input
                  type="text"
                  placeholder="Mobile"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  className="bg-white border border-gray-400 text-gray-900 text-sm block w-full p-2.5"
                  required
                />

                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-white border border-gray-400 text-gray-900 text-sm block w-full p-2.5"
                  required
                />

                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmpassword}
                  onChange={(e) => setConfirmpassword(e.target.value)}
                  className="bg-white border border-gray-400 text-gray-900 text-sm block w-full p-2.5"
                  required
                />

                <button
                  type="submit"
                  className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-700"
                >
                  Signup
                </button>
              </form>

              <p className="text-center text-sm font-semibold text-gray-900">
                Already have an account?{" "}
                <Link to="/login" className="font-medium text-indigo-600 hover:underline">
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Register;
