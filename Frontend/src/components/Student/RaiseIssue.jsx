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
        console.log("Form Data:", formData);
        // Add submission logic here (API call, validation, etc.)
      };
    
      return (
        <div className="flex justify-center items-center min-h-screen bg-red-700 p-4">
          <form
            onSubmit={handleSubmit}
            className="bg-black shadow-2xl rounded-2xl p-8 w-full max-w-lg space-y-6"
          >
            <h2 className="text-2xl font-bold text-center text-white-800">
              Report an Issue
            </h2>
    
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
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
              <label className="block text-gray-700 font-semibold mb-2">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe the issue in detail..."
                rows="4"
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              ></textarea>
            </div>
    
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Upload Photo</label>
              <input
                type="file"
                name="photo"
                accept="image/*"
                onChange={handleChange}
                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border file:border-gray-300 file:rounded-lg file:bg-gray-50 hover:file:bg-gray-100"
              />
            </div>
    
            <button
              type="submit"
              className="w-2/5 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition duration-200 block"
            >
              Submit Issue
            </button>
          </form>
        </div>
      );
}

export default RaiseIssue;