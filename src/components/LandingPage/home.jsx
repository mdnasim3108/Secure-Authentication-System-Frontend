import { FaLock } from "react-icons/fa6";
import { Cookies } from "react-cookie";
import axios from "axios";
import { api } from "../../constants";
import { useNavigate } from "react-router-dom";
const home = () => {
    const cookies=new Cookies()
    const navigate=useNavigate()
    const verifyHandler=()=>{
        
        axios.post(`${api}/verifyAccess`,{},{
            headers:{
                Authorization:`Bearer ${cookies.get("token")}`
            }
        })
        .then(()=>navigate("/protectedPage"))
        .catch(er=>console.log(er))
    }
  return (
    <div className="flex items-center justify-center h-screen flex-col">
    <p className="font-bold text-3xl tracking-wider">Welcome Back {cookies.get("user")}!</p>
      <div
        className="mt-10 block text-center max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
      >
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Please click below to access a protected resource
        </h5>
        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          onClick={verifyHandler}
        >
          <FaLock className="inline mr-3 mb-1" />
          Access
        </button>
      </div>
    </div>
  );
};
export default home;
