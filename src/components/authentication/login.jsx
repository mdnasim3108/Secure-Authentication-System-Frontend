import { useState, useEffect } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Cookies } from "react-cookie";
import { MailOutlined } from "@ant-design/icons";
import { AiOutlineLock } from "react-icons/ai";
import { api } from "../../constants";
import { useContext } from "react";
const Login = (props) => {
  const cookies = new Cookies();
  var today = new Date();
  var tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);
  const [loading, setLoading] = useState(false);
  

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const formsubmitHandler = async (e) => {
    e.preventDefault();
    axios
      .post(`${api}/login`, { email, password })
      .then((res) => {
        if(res.data.error){
          props.fail("Invalid credentials!")
          return
        }
        cookies.set("token", res.data.token, {
          path: "/",
          expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
        });
        cookies.set("user", res.data.user.username, {
          path: "/",
          expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
        });
        navigate("/home");
      })
      .catch((er) => props.toast(er.message));
  };

  const formChange = (e) => {
    setFormData((previousState) => ({
      ...previousState,
      [e.target.id]: e.target.value,
    }));
  };

  
  return (
    <div className="logForm  lg:pr-[3rem] mt-8 lg:w-[50%] w-full">
      <h1 className="text-4xl font-bold">Welcome Back!</h1>
      <h3
        className="text-xl mt-[1rem] font-semibold mb-[3rem]"
        style={{ color: "darkgray" }}
      >
        Login to continue
      </h3>
      <form onSubmit={formsubmitHandler} autoComplete="off" className="">
        <MailOutlined className="absolute lg:ml-[2rem] ml-[1rem] mt-[1.7rem] text-lg text-gray-600" />
        <input
          id="email"
          type="email"
          name="email"
          value={email}
          onChange={formChange}
          placeholder="Enter Your Email"
          className={`lg:pl-[4rem] pl-[2.8rem] lg:py-5 py-3 block  border-2   overflow-visible authip lg:w-[36.5rem] w-full border-violet-700 focus:border-green-500 `}
          style={{
            fontSize: "1.1rem",
          }}
          autoComplete="new-password"
          required
        />
        <AiOutlineLock className="absolute lg:ml-[2rem] ml-[1rem] lg:mt-[2.5rem] mt-[1rem] text-2xl text-gray-600" />
        <input
          id="password"
          type="password"
          name="new-password"
          value={password}
          onChange={formChange}
          placeholder="Enter Your Password"
          className={`lg:pl-[4rem] pl-[2.8rem] lg:py-5 py-3 block border-2 mt-5   border-violet-700 focus:border-green-500 authip lg:w-[36.5rem] w-full`}
          style={{
            fontSize: "1.1rem",
          }}
          required
        />
        <div className="logFormBottom mt-8 flex items-center">
          <button
            disabled={loading}
            className={`loginButton font-bold text-xl text-white lg:mr-[5rem] py-[1.5rem] lg:w-[15rem] w-[9rem] ${
              loading ? "bg-gray-400" : "bg-violet-500"
            } transition-all duration-300 ease-in-out`}
          >
            {loading ? (
              <p className="lg:text-xl text-sm">LOGGING IN</p>
            ) : (
              <p className="lg:text-xl text-sm">LOGIN</p>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
export default Login;
