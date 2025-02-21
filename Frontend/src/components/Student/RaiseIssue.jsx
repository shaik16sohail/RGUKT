import React,{useState} from 'react'
import '../../style/student.css';
const RaiseIssue=()=>{
    const [formData, setFormData] = useState({
        category: "",
        description: "",
        photo: null,
      });
    
      const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData((prev) => ({
          ...prev,
          [name]: files ? files[0] : value,
        }));
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        alert("form submitted succesfully");
        console.log("Form Data:", formData);
        // Add submission logic here (API call, validation, etc.)
      };
    
      return (
        <div className="flex justify-center items-center min-h-screen  student-issue">
          <form
            onSubmit={handleSubmit}
            className="shadow-2xl rounded-2xl p-8 w-full max-w-lg space-y-6 student-issueIn"
          >
            <h2 className="text-2xl font-bold text-center text-white-800">
              Raise a Complaint
            </h2>
    
            <div>
              <label className="block text-white-700 font-semibold mb-2">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full p-3  rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white bg-black"
              >
                <option value="" disabled>
                  Select Category
                </option>
                <option value="Maintenance">Maintenance</option>
                <option value="Facility">Facility</option>
                <option value="Technical">Technical</option>
                <option value="Other">Other</option>
              </select>
            </div>
    
            <div>
              <label className="block text-white-700 font-semibold mb-2">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe the issue in detail..."
                rows="4"
                required
                className="w-full p-3  rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none bg-black text-white"
              ></textarea>
            </div>
    
            <div>
              <label className="block text-white-700 font-semibold mb-2">Upload Photo</label>
              <input
                type="file"
                name="photo"
                accept="image/*"
                onChange={handleChange}
                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border file:border-gray-300 file:rounded-lg file:bg-gray-50 hover:file:bg-gray-100 bg-black"
              />
            </div>
    
            <button
              type="submit"
              className="w-2/5 p-2 py-3 bg-black-600 text-white font-bold rounded-lg hover:bg-black-700 transition duration-200 block mx-auto outpass-button"
            >
              Submit Issue
            </button>
          </form>
        </div>
      );
}

export default RaiseIssue;