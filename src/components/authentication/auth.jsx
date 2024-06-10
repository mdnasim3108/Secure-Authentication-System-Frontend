import Login from "./login";
import loginImg from "../../assets/loginCartoon.png";
import SignUp from "./signUp";
import { useState } from "react";
import wanderonLogo from "../../assets/wanderonLogo.png";
import toast from "react-hot-toast"
import {Toaster} from 'react-hot-toast'
const Auth = (props) => {
  const [showLog, setShowLog] = useState(true);

  return (
    <>
    <Toaster/>
      <div className="authContainer w-full lg:h-screen">
        <div className=" flex justify-between items-center lg:flex-row flex-col   py-7 lg:pl-20 w-full lg:h-[20vh] lg:pr-[15rem] ">
          <div className="flex items-center justify-center">
            <img src={wanderonLogo} className="lg:w-[5rem] w-[3rem]  mr-3 " />
            <p className="lg:text-2xl text-lg  font-roboto">
              Secure authentication system
            </p>
          </div>
          <div className="w-[14rem] h-[2.5rem] lg:w-[18rem] lg:h-[3rem] lg:mt-0 mt-7 rounded-[30px] flex justify-between bg-violet-700 items-center px-[2px] relative">
            <button
              className={`text-white font-bold rounded-[30px] h-[90%] w-[50%]`}
              onClick={() => setShowLog(true)}
            >
              Login
            </button>
            <button
              className={` text-white font-bold rounded-[30px] w-[50%] h-[90%]`}
              onClick={() => setShowLog(false)}
            >
              Register{" "}
            </button>
            <button
              className={`bg-white transition-all ease-in-out duration-[400ms] text-violet-600 font-bold rounded-[30px] w-[50%] h-[90%] absolute ${
                !showLog ? "translate-x-[96.5%]" : ""
              }`}
            >
              {showLog ? "Login" : "Register"}
            </button>
          </div>
        </div>
        <div className="flex justify-between lg:flex-row flex-col-reverse lg:items-start items-center  lg:px-[3rem] px-[1rem]  w-full lg:h-[80vh] ">
          <div className=" lg:w-[50%] w-full  lg:h-[90%] relative bottom-5">
            <img
              src={loginImg}
              className="logCartImg w-[2rem] h-[2rem]"
              alt=""
            />
          </div>
          {showLog ? (
            <Login
              login={(email) => props.login(email)}
              toast={(msg) => toast.success(msg)}
              fail={(msg)=>toast.error(msg)}
            />
          ) : (
            <SignUp
              showlogin={() => setShowLog(true)}
              toast={(msg) => toast.success(msg)}
              fail={(msg)=>toast.error(msg)}
            />
          )}
        </div>
      </div>
    </>
  );
};
export default Auth;
