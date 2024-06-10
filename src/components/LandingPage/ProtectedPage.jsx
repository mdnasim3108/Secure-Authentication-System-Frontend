import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
const protectedPage = () => {
    const navigate=useNavigate()
  return (
    <div className="flex h-screen items-center justify-center">
      <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow text-center dark:bg-gray-800 dark:border-gray-700">
        <div class="p-5">
          <a href="#">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Successfully Verified!
            </h5>
          </a>
          <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
          Congratulations! You have been successfully verified using advanced JWT technology. Welcome to your secure space!
          </p>
          <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          onClick={()=>navigate("/home")}
        >
          <FaArrowLeftLong className="inline mr-3 mb-1" />
          Back to Home
        </button>
        </div>
      </div>
    </div>
  );
};
export default protectedPage;
