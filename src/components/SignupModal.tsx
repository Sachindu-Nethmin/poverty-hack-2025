// src/components/SignupModal.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import type { UserRole } from '../types/auth';

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToLogin: () => void;
}

export default function SignupModal({ isOpen, onClose, onSwitchToLogin }: SignupModalProps) {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'hospital' as UserRole, // Default to hospital
    hospitalName: '',
    district: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    if (formData.role === 'hospital' && !formData.hospitalName) {
      setError('Hospital name is required for hospital accounts');
      return;
    }

    setLoading(true);

    try {
      await signup({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        hospitalName: formData.hospitalName || undefined,
        district: formData.district || undefined,
      });
      
      // Redirect based on role
      if (formData.role === 'government_admin') {
        navigate('/dashboard/ministry');
      } else if (formData.role === 'hospital') {
        navigate('/dashboard/hospital');
      } else {
        navigate('/');
      }
      
      onClose();
      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'hospital', // Reset to default
        hospitalName: '',
        district: '',
      });
    } catch (err: any) {
      setError(err?.message || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-8 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close"
        >
          <X size={24} />
        </button>

        <h2 className="text-3xl font-bold mb-2 text-gray-900">Create Account</h2>
        <p className="text-gray-600 mb-6">Choose your account type</p>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Role Selection - Prominent */}
          <div className="bg-gradient-to-r from-emerald-50 to-blue-50 p-6 rounded-xl border-2 border-emerald-200">
            <label className="block text-base font-bold text-gray-800 mb-4 text-center">
              Select Account Type
            </label>
            <div className="space-y-3">
              <label className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all ${
                formData.role === 'hospital' 
                  ? 'bg-emerald-600 border-emerald-600 text-white' 
                  : 'bg-white border-gray-300 text-gray-700 hover:border-emerald-400'
              }`}>
                <input
                  type="radio"
                  name="role"
                  value="hospital"
                  checked={formData.role === 'hospital'}
                  onChange={(e) => handleChange('role', e.target.value)}
                  className="w-5 h-5 text-emerald-600"
                  required
                />
                <div className="ml-3">
                  <p className="font-bold text-lg">🏥 Hospital User</p>
                  <p className="text-sm opacity-90">Submit equipment needs for your hospital</p>
                </div>
              </label>

              <label className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all ${
                formData.role === 'government_admin' 
                  ? 'bg-blue-600 border-blue-600 text-white' 
                  : 'bg-white border-gray-300 text-gray-700 hover:border-blue-400'
              }`}>
                <input
                  type="radio"
                  name="role"
                  value="government_admin"
                  checked={formData.role === 'government_admin'}
                  onChange={(e) => handleChange('role', e.target.value)}
                  className="w-5 h-5 text-blue-600"
                />
                <div className="ml-3">
                  <p className="font-bold text-lg">🏛️ Health Ministry Official</p>
                  <p className="text-sm opacity-90">Review and approve hospital requests</p>
                </div>
              </label>

              <label className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all ${
                formData.role === 'local_user' 
                  ? 'bg-amber-600 border-amber-600 text-white' 
                  : 'bg-white border-gray-300 text-gray-700 hover:border-amber-400'
              }`}>
                <input
                  type="radio"
                  name="role"
                  value="local_user"
                  checked={formData.role === 'local_user'}
                  onChange={(e) => handleChange('role', e.target.value)}
                  className="w-5 h-5 text-amber-600"
                />
                <div className="ml-3">
                  <p className="font-bold text-lg">👤 Local User</p>
                  <p className="text-sm opacity-90">Report needs or donate to causes</p>
                </div>
              </label>
            </div>
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Full Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
              placeholder="John Doe"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
              placeholder="your@email.com"
              required
            />
          </div>

          {/* Hospital Name (only for hospital role) */}
          {formData.role === 'hospital' && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Hospital Name
              </label>
              <input
                type="text"
                value={formData.hospitalName}
                onChange={(e) => handleChange('hospitalName', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                placeholder="e.g., Colombo General Hospital"
                required
              />
            </div>
          )}

          {/* District */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              District
            </label>
            <select
              value={formData.district}
              onChange={(e) => handleChange('district', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
              required
            >
              <option value="">Select District</option>
              <option value="Colombo">Colombo</option>
              <option value="Gampaha">Gampaha</option>
              <option value="Kalutara">Kalutara</option>
              <option value="Kandy">Kandy</option>
              <option value="Matale">Matale</option>
              <option value="Nuwara Eliya">Nuwara Eliya</option>
              <option value="Galle">Galle</option>
              <option value="Matara">Matara</option>
              <option value="Hambantota">Hambantota</option>
              <option value="Jaffna">Jaffna</option>
              <option value="Kilinochchi">Kilinochchi</option>
              <option value="Mannar">Mannar</option>
              <option value="Vavuniya">Vavuniya</option>
              <option value="Mullaitivu">Mullaitivu</option>
              <option value="Batticaloa">Batticaloa</option>
              <option value="Ampara">Ampara</option>
              <option value="Trincomalee">Trincomalee</option>
              <option value="Kurunegala">Kurunegala</option>
              <option value="Puttalam">Puttalam</option>
              <option value="Anuradhapura">Anuradhapura</option>
              <option value="Polonnaruwa">Polonnaruwa</option>
              <option value="Badulla">Badulla</option>
              <option value="Moneragala">Moneragala</option>
              <option value="Ratnapura">Ratnapura</option>
              <option value="Kegalle">Kegalle</option>
            </select>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => handleChange('password', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
              placeholder="••••••••"
              required
              minLength={6}
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => handleChange('confirmPassword', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
              placeholder="••••••••"
              required
              minLength={6}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-600 text-white py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600">
          Already have an account?{' '}
          <button
            onClick={onSwitchToLogin}
            className="text-emerald-600 font-semibold hover:text-emerald-700 transition-colors"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
}
