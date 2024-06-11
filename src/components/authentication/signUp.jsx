import { useEffect, useState } from "react";
import "./login.css";
import { AiFillEyeInvisible, AiFillEye, AiOutlineLock } from "react-icons/ai";
import axios from "axios";
import { UserOutlined, MailOutlined } from "@ant-design/icons";
import Verify from "./verify";
import { api } from "../../constants";
const SignUp = (props) => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [otp, setOtp] = useState("");
  const [formIvsValid, setFormIsValid] = useState(false);
  const [emailIsValid, setEmailIsValid] = useState(true);
  const [passIsValid, setPassIsValid] = useState(true);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const { firstName, lastName, email, password } = formData;

  const createUser = async () => {
    axios
      .post(`${api}/createUser`, {
        username: firstName + lastName,
        email,
        password,
      })
      .then((res) => {
        props.toast("Verification successfull");
        props.showlogin();
        setOtp(null);
        setLoading(false);
      })
      .catch((er) => props.fail(er.message));
  };
  const submitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);
    axios
      .post(`${api}/verifyUser`, { userName: firstName + lastName, to: email })
      .then((res) => {
        if (res.data.error) {
          props.fail("user already exists!");
          setLoading(false);
          return;
        }
        setOtp(res.data.otp);
        props.toast("Email sent sucessfully!");
        setLoading(false);
      })
      .catch((error) => {
        props.fail(error.message);
        setLoading(false);
      });
  };

  const formChange = (e) => {
    if (e.target.id === "email") {
      setEmailIsValid(
        e.target.value.includes("@") && e.target.value.includes(".")
      );
    }
    if (e.target.id === "password") {
      setPassIsValid(e.target.value.length >= 6);
    }
    setFormData((previousState) => ({
      ...previousState,
      [e.target.id]: e.target.value,
    }));
  };
  useEffect(() => {
    setFormIsValid(emailIsValid && passIsValid);
  }, [emailIsValid, passIsValid]);

  return !otp ? (
    <>
      <div className="loginForm lg:w-[50%] w-full  h-full">
        <form
          onSubmit={submitHandler}
          className="w-full lg:h-[95%]  flex flex-col justify-center"
        >
          <div className="flex justify-between lg:h-[12%] lg:mb-[2rem]">
            <div className="w-[49.5%]  h-full">
              <UserOutlined className="absolute lg:ml-[2rem] ml-[1rem] lg:mt-[1.4rem] mt-[1rem]  text-lg text-gray-600" />
              <input
                id="firstName"
                placeholder="First Name"
                name="FirstName"
                value={firstName}
                className="lg:pl-[4rem] pl-[2.8rem] py-3  mb-[1rem]  border-2  border-violet-700 focus:border-green-500 authip w-full h-full"
                style={{ fontSize: "1.1rem" }}
                onChange={formChange}
                required
              />
            </div>
            <div className="w-[49.5%] inline-block h-full">
              <UserOutlined className="absolute lg:ml-[2rem] ml-[1rem] lg:mt-[1.4rem] mt-[1rem] text-lg text-gray-600" />
              <input
                id="lastName"
                placeholder="Last Name"
                name="LastName"
                value={lastName}
                className="lg:pl-[4rem] pl-[2.8rem]  py-3  border-2  border-violet-700 focus:border-green-500 mb-[1rem] authip w-full h-full"
                style={{ fontSize: "1.1rem" }}
                onChange={formChange}
                required
              />
            </div>
          </div>

          <div className="w-full lg:h-[12%] lg:mb-[2%] lg:mt-0 mt-5">
            <MailOutlined className="absolute lg:ml-[2rem] ml-[1rem] lg:mt-[1.5rem] mt-[0.9rem] text-lg text-gray-600" />
            <input
              id="email"
              value={email}
              name="Email"
              placeholder="Enter a valid  Email address"
              className={`lg:pl-[4rem] pl-[2.8rem]  py-3 block border-2   ${
                emailIsValid ? "border-violet-700" : "border-red-500"
              } focus:${
                emailIsValid ? "border-green-500" : "border-red-500"
              } mb-[1rem] authip w-full h-full`}
              style={{ fontSize: "1.1rem" }}
              onChange={(e) => {
                formChange(e);
              }}
              required
            />
          </div>
          <p
            className="ml-4 text-red-500"
            style={{ visibility: emailIsValid ? "hidden" : "visible" }}
          >
            Enter a valid email
          </p>
          <div className=" h-0 flex justify-end pr-[2rem] ">
            {!showPassword ? (
              <AiFillEye
                className="text-[1.5rem] text-violet-800 relative lg:top-[1.3rem] top-[1rem] cursor-pointer"
                onClick={() => {
                  setShowPassword((prev) => !prev);
                }}
              />
            ) : (
              <AiFillEyeInvisible
                className="text-[1.5rem] text-violet-800 relative lg:top-[1.3rem] top-[1rem] cursor-pointer"
                onClick={() => {
                  setShowPassword((prev) => !prev);
                }}
              />
            )}
          </div>
          <div className="w-full lg:h-[12%] lg:mb-[2%]">
            <AiOutlineLock className="absolute lg:ml-[2rem] ml-[1rem] lg:mt-[1.3rem] mt-[0.7rem] text-2xl text-gray-600" />
            <input
              id="password"
              name="Password"
              type={!showPassword ? "password" : "text"}
              value={password}
              minLength="6"
              placeholder="Enter Your Password"
              className={`lg:pl-[4rem] pl-[2.8rem] ${
                passIsValid ? "border-violet-700" : "border-red-500"
              } focus:${
                passIsValid ? "border-green-500" : "border-red-500"
              }  py-3 block border-2  border-violet-700 focus:border-green-500 mb-[1rem] authip w-full h-full`}
              style={{ fontSize: "1.1rem" }}
              onChange={formChange}
              required
            />
          </div>
          <p
            className="ml-4 text-red-500"
            style={{ visibility: passIsValid ? "hidden" : "visible" }}
          >
            Password must contain atlease 6 characters
          </p>
          <div
            className="logFormBottom lg:mt-2 mt-7 flex items-center"
            style={{ justifyContent: "flex-start" }}
          >
            <button
              disabled={loading}
              className={`loginButton font-bold text-xl text-white mr-4 py-[1.5rem] lg:w-[15rem] w-[9rem] ${
                loading ? "bg-gray-400" : "bg-violet-500"
              } transition-all duration-300 ease-in-out`}
            >
              {loading ? (
                <p className="lg:text-xl text-sm">SIGNING UP</p>
              ) : (
                <p className="lg:text-xl text-sm">SIGN UP</p>
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  ) : (
    <Verify
      otp={otp}
      email={email}
      back={() => setShowOTP(false)}
      submit={createUser}
      toast={() => props.fail("Invalid OTP!")}
    />
  );
};
export default SignUp;
