import { useLocation } from "react-router-dom";

const OutpassDetails = () => {
  const location = useLocation();
  const outpassData = location.state; // Get data passed via navigation
  const reason="I need to leave the hostel as I have a scheduled medical appointment with a specialist in the city for a follow-up checkup. The doctor recommended this consultation to ensure proper recovery. Additionally, I need to collect important documents from my home related to an upcoming university submission.";
  const moblieNo=8790345569;
  if (!outpassData) return <p>No data found</p>;

  return (
    <div className=" outpass-details">
        <div className="outpass-detailsIn">
            <h1 className="text-3xl font-bold text-center">Outpass Details</h1>
            <br></br>
            <br></br>
            <div className="outpass-info">
            <p><strong>ID:</strong> {outpassData.id}</p>
            <p><strong>Name:</strong> {outpassData.name}</p>
            {/* <p><strong>Type:</strong> {outpassData.type}</p>                <p><strong>Status:</strong> {outpassData.status}</p> */}
            <p><strong>Date:</strong> {outpassData.date}</p>
            <p><strong>Mobile No:</strong> {moblieNo}</p>
            <p><strong>Expected Return:</strong> {outpassData.date}</p>
            </div>
           
            
            
            <div className="outpass-reason">
            <p><strong>Reason:</strong> </p>
                {reason}
            </div>
            <div className="outpass-call">
                <button><i class="fa-solid fa-phone"></i>  call to student</button>
                <button>call to parent <i class="fa-solid fa-phone"></i> </button>
            </div>
            <div className="outpass-final">
            <button type="button" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"><i class="fa-regular fa-circle-xmark"></i> Reject</button>
            <button type="button" class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Approve <i class="fa-solid fa-check"></i></button>
            </div>

        </div>
      
    </div>
  );
};

export default OutpassDetails;
