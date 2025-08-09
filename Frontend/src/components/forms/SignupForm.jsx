import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
export default function SignupForm() {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    otp: '',
    phone: '',
    hostelName: '',
    role: '',
    studentId: '',
    password: '',
    confirmPassword: ''
  });

  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [timer, setTimer] = useState(0);
  const [passwordMatch, setPasswordMatch] = useState(true);

  const hostelOptions = ['GH-1', 'GH-2', 'BH-1-Back', 'BH-1-Front', 'BH-2-Front', 'BH-2-Back'];

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    if (name === 'password' || name === 'confirmPassword') {
      const updatedPassword = name === 'password' ? value : formData.password;
      const updatedConfirm = name === 'confirmPassword' ? value : formData.confirmPassword;
      setPasswordMatch(updatedPassword === updatedConfirm);
    }
  };

  const handleOtpSend = async () => {
    try {
      await axios.post(`${backendUrl}/api/auth/send-otp`, { email: formData.email });
      // alert('OTP sent to your email.');
      toast.success("OTP sent to your email");
      setOtpSent(true);
      setTimer(60);
    } catch {
      // alert('Failed to send OTP.');
      toast.error('Failed to send OTP.');
    }
  };

  const verifyOtp = async () => {
    try {
      await axios.post(`${backendUrl}/api/auth/verify-otp`, {
        email: formData.email,
        otp: formData.otp
      });
      setOtpVerified(true);
      setTimer(0);
    } catch {
      // alert('OTP verification failed');
      toast.error('OTP verification failed');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!otpVerified) {
      // alert('Please verify your email with OTP first.');
      toast.error('Please verify your email with OTP first.');
      return;
    }

    if (!passwordMatch) {
      // alert('Passwords do not match.');
      toast.error('Passwords do not match.');
      return;
    }

    if (formData.password.length < 6) {
      // alert('Password should be at least 6 characters long.');
      toast.error('Password should be at least 6 characters long.');
      return;
    }

    try {
      await axios.post(`${backendUrl}/api/auth/register`, {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        hostelName: formData.hostelName,
        role: formData.role,
        id: formData.role === 'student' ? formData.studentId : null,
        password: formData.password
      });

      // alert('Signup successful!');
      toast.success("Signup successful");
      navigate('/login');
    } catch (err) {
      console.error(err);
      // alert('Failed to register.');
      toast.error("Failed to register");
    }
  };

  return (
    <div 
      className="min-h-screen w-full flex items-center justify-center p-3 sm:p-4 md:p-6 lg:p-8"
      style={{
        background: 'linear-gradient(90deg, hsla(351, 100%, 25%, 1) 0%, hsla(9, 59%, 7%, 1) 100%)'
      }}
    >
      <div 
        className="w-full max-w-xs sm:max-w-sm md:max-w-lg lg:max-w-xl xl:max-w-2xl rounded-2xl shadow-2xl p-4 sm:p-6 md:p-8 lg:p-10 backdrop-blur-sm"
        style={{ backgroundColor: '#1b1b1b93' }}
      >
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">Create Account</h2>
          <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-red-500 to-orange-600 mx-auto rounded-full"></div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          {/* Name */}
          <div className="space-y-1 sm:space-y-2">
            <label className="block text-xs sm:text-sm font-semibold text-gray-200">Full Name</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 text-sm sm:text-base"
              placeholder="Enter your full name"
              required
            />
          </div>

          {/* Email + OTP */}
          <div className="space-y-1 sm:space-y-2">
            <label className="block text-xs sm:text-sm font-semibold text-gray-200">Email Address</label>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="flex-1 px-3 py-2 sm:px-4 sm:py-3 bg-gray-800/50 border border-gray-600 rounded-lg sm:rounded-r-none text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 text-sm sm:text-base"
                placeholder="your@email.com"
                disabled={otpSent}
                required
              />
              <button
                type="button"
                onClick={handleOtpSend}
                disabled={otpSent && timer > 0}
                className={`px-3 py-2 sm:py-2.5 rounded-lg sm:rounded-l-none font-medium text-xs sm:text-sm transition-all duration-300 whitespace-nowrap ${
                  otpSent && timer > 0 
                    ? 'bg-gray-600 text-gray-300 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg hover:shadow-red-500/25'
                }`}
              >
                {otpSent && timer > 0 ? `${timer}s` : 'Send OTP'}
              </button>
            </div>
          </div>

          {/* OTP Verification */}
          {otpSent && (
            <div className="space-y-1 sm:space-y-2">
              <label className="block text-xs sm:text-sm font-semibold text-gray-200">Enter OTP</label>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  name="otp"
                  value={formData.otp}
                  onChange={handleChange}
                  className="flex-1 px-3 py-2 sm:px-4 sm:py-3 bg-gray-800/50 border border-gray-600 rounded-lg sm:rounded-r-none text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 text-sm sm:text-base"
                  placeholder="Enter 6-digit OTP"
                  disabled={otpVerified}
                  required
                />
                <button
                  type="button"
                  onClick={verifyOtp}
                  disabled={otpVerified || formData.otp.length !== 6}
                  className={`px-3 py-2 sm:py-2.5 rounded-lg sm:rounded-l-none font-medium text-xs sm:text-sm transition-all duration-300 whitespace-nowrap ${
                    otpVerified
                      ? 'bg-gradient-to-r from-green-500 to-green-600 text-white'
                      : formData.otp.length !== 6
                      ? 'bg-gray-600 text-gray-300 cursor-not-allowed'
                      : 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg hover:shadow-red-500/25'
                  }`}
                >
                  {otpVerified ? '✓ Verified' : 'Verify'}
                </button>
              </div>
              {otpVerified && (
                <div className="flex items-center gap-2 text-green-400 text-xs sm:text-sm">
                  <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Email verified successfully!
                </div>
              )}
            </div>
          )}

          {/* Rest of the form if OTP is verified */}
          {otpVerified && (
            <>
              {/* Phone */}
              <div className="space-y-1 sm:space-y-2">
                <label className="block text-xs sm:text-sm font-semibold text-gray-200">Phone Number</label>
                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 text-sm sm:text-base"
                  placeholder="Enter your phone number"
                  required
                />
              </div>

              {/* Hostel Name */}
              <div className="space-y-2 sm:space-y-3">
                <label className="block text-xs sm:text-sm font-semibold text-gray-200">Select Hostel</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 sm:gap-2">
                  {hostelOptions.map((hostel) => (
                    <label key={hostel} className="flex items-center gap-1.5 sm:gap-2 p-2 sm:p-2.5 bg-gray-800/30 rounded-lg border border-gray-600 hover:border-red-500 cursor-pointer transition-all duration-300 group">
                      <input
                        type="radio"
                        name="hostelName"
                        value={hostel}
                        checked={formData.hostelName === hostel}
                        onChange={handleChange}
                        className="text-red-500 focus:ring-red-500 focus:ring-2 w-3 h-3 sm:w-4 sm:h-4"
                        required
                      />
                      <span className="text-gray-200 text-xs sm:text-sm font-medium group-hover:text-white transition-colors duration-300">{hostel}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Role */}
              <div className="space-y-2 sm:space-y-3">
                <label className="block text-xs sm:text-sm font-semibold text-gray-200">Select Role</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2">
                  <label className="flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 bg-gray-800/30 rounded-lg border border-gray-600 hover:border-red-500 cursor-pointer transition-all duration-300 group">
                    <input
                      type="radio"
                      name="role"
                      value="student"
                      checked={formData.role === 'student'}
                      onChange={handleChange}
                      className="text-red-500 focus:ring-red-500 focus:ring-2 w-3 h-3 sm:w-4 sm:h-4"
                      required
                    />
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <svg className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                      </svg>
                      <span className="text-gray-200 text-xs sm:text-sm font-medium group-hover:text-white transition-colors duration-300">Student</span>
                    </div>
                  </label>
                  <label className="flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 bg-gray-800/30 rounded-lg border border-gray-600 hover:border-red-500 cursor-pointer transition-all duration-300 group">
                    <input
                      type="radio"
                      name="role"
                      value="caretaker"
                      checked={formData.role === 'caretaker'}
                      onChange={handleChange}
                      className="text-red-500 focus:ring-red-500 focus:ring-2 w-3 h-3 sm:w-4 sm:h-4"
                      required
                    />
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <svg className="w-3 h-3 sm:w-4 sm:h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-200 text-xs sm:text-sm font-medium group-hover:text-white transition-colors duration-300">Caretaker</span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Student ID */}
              {formData.role === 'student' && (
                <div className="space-y-1 sm:space-y-2">
                  <label className="block text-xs sm:text-sm font-semibold text-gray-200">Student ID</label>
                  <input
                    name="studentId"
                    value={formData.studentId}
                    onChange={handleChange}
                    className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 text-sm sm:text-base"
                    placeholder="Enter Student ID"
                    required
                  />
                </div>
              )}

              {/* Password */}
              <div className="space-y-1 sm:space-y-2">
                <label className="block text-xs sm:text-sm font-semibold text-gray-200">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 text-sm sm:text-base"
                  placeholder="Enter a strong password"
                  required
                />
              </div>

              {/* Confirm Password */}
              <div className="space-y-1 sm:space-y-2">
                <label className="block text-xs sm:text-sm font-semibold text-gray-200">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 text-sm sm:text-base"
                  placeholder="Confirm your password"
                  required
                />
                {!passwordMatch && (
                  <div className="flex items-center gap-1.5 sm:gap-2 text-red-400 text-xs sm:text-sm">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    Passwords do not match
                  </div>
                )}
              </div>
            </>
          )}

          {/* Submit Button */}
          <div className="pt-3 sm:pt-4">
            <button
              type="submit"
              disabled={!otpVerified}
              className={`w-full py-2 sm:py-2.5 md:py-3 px-3 sm:px-4 rounded-lg font-semibold text-sm sm:text-base transition-all duration-300 transform ${
                otpVerified
                  ? 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg hover:shadow-red-500/25 hover:scale-[1.02] active:scale-[0.98]'
                  : 'bg-gray-600 text-gray-400 cursor-not-allowed'
              }`}
            >
              {otpVerified ? 'Create Account' : 'Verify Email First'}
            </button>
          </div>

          <div className="text-center pt-3 sm:pt-4">
            <p className="text-gray-400 text-xs sm:text-sm">
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => navigate('/login')}
                className="text-red-400 hover:text-red-300 font-medium transition-colors duration-300 text-xs sm:text-sm"
              >
                Sign in here
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}