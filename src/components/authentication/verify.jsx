import { FaArrowLeftLong } from "react-icons/fa6";
import { useState } from "react";
const verify = (props) => {
  const [otp, setOTP] = useState("");
  const submithandler = (event) => {
    event.preventDefault()
    console.log(otp,props.otp)
    if (otp == props.otp) {
      props.submit(); 
    } else {
      props.toast("Invalid OTP");
    }
  };
  return (
    <div className="lg:w-[50%] w-full h-full flex flex-col items-center justify-center my-10 lg:m-0">
      <div className="lg:w-[70%] w-full">
        <form onSubmit={submithandler}>
          <label className="text-lg text-center">
            Enter the OTP sent to {props.email}
          </label>
          <input
            className={`lg:pl-[4rem] lg:py-5 pl-[2rem] py-3 w-full block text-lg  border-2 mt-5   overflow-visible   focus:border-green-500 `}
            placeholder="OTP"
            type="text"
            required
            onChange={(e) => setOTP(e.target.value)}
          />
          <div className="flex mt-4 items-center">
            <button
              type="submit"
              className="bg-violet-700 lg:py-4 lg:px-5 p-2 rounded  lg:text-xl text-lg text-white"
            >
              Verify
            </button>

            <p
              className="text-lg text-gray-400 cursor-pointer ml-5"
              onClick={props.back}
            >
              <FaArrowLeftLong className="inline ml-2"/> Back
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
export default verify;
