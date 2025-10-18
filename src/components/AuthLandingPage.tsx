import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import type { UserRole } from '../types/auth';
import { Building2, ShieldCheck, Heart, Eye, EyeOff } from 'lucide-react';
import logo from '../assets/logo .png';

type AuthMode = 'signin' | 'signup';

export default function AuthLandingPage() {
  const { login, signup } = useAuth();
  const navigate = useNavigate();
  const [mode, setMode] = useState<AuthMode>('signin');
  const [selectedRole, setSelectedRole] = useState<UserRole>('hospital');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    hospitalName: '',
    district: '',
  });
  
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const roles = [
    {
      value: 'hospital' as UserRole,
      label: 'Hospital User',
      icon: Building2,
      description: 'Submit equipment and resource needs',
      color: 'emerald',
    },
    {
      value: 'government_admin' as UserRole,
      label: 'Health Ministry Officer',
      icon: ShieldCheck,
      description: 'Review and approve hospital requests',
      color: 'blue',
    },
    {
      value: 'local_user' as UserRole,
      label: 'Local User / Donor',
      icon: Heart,
      description: 'Support verified hospital needs',
      color: 'rose',
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (mode === 'signup') {
      // Signup validation
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        return;
      }
      if (formData.password.length < 6) {
        setError('Password must be at least 6 characters');
        return;
      }
      if (selectedRole === 'hospital' && !formData.hospitalName) {
        setError('Hospital name is required for hospital accounts');
        return;
      }

      setLoading(true);
      try {
        await signup({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: selectedRole,
          hospitalName: formData.hospitalName || undefined,
          district: formData.district || undefined,
        });
        
        // Redirect based on role
        if (selectedRole === 'government_admin') {
          navigate('/dashboard/ministry');
        } else if (selectedRole === 'hospital') {
          navigate('/dashboard/hospital');
        } else {
          navigate('/');
        }
      } catch (err: any) {
        setError(err?.message || 'Signup failed. Please try again.');
      } finally {
        setLoading(false);
      }
    } else {
      // Sign in
      if (!formData.email || !formData.password) {
        setError('Please enter email and password');
        return;
      }

      setLoading(true);
      try {
        // Trim whitespace from inputs
        const email = formData.email.trim().toLowerCase();
        const password = formData.password.trim();
        
        await login(email, password);
        
        // Get user from localStorage to determine role
        const userStr = localStorage.getItem('user');
        if (userStr) {
          const user = JSON.parse(userStr);
          if (user.role === 'government_admin') {
            navigate('/dashboard/ministry');
          } else if (user.role === 'hospital') {
            navigate('/dashboard/hospital');
          } else {
            navigate('/');
          }
        }
      } catch (err: any) {
        console.error('Login error:', err);
        setError(err?.message || 'Login failed. Please check your credentials.');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-50 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-4 mb-4">
            <img 
              src={logo} 
              alt="Hope4ever Logo" 
              className="h-20 w-20 object-contain"
            />
            <div className="text-left">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                Hope4ever
              </h1>
              <p className="text-emerald-600 font-semibold text-sm md:text-base">
                Give health, Get Hope
              </p>
            </div>
          </div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Connecting hospitals, ministry officers, and donors for transparent healthcare support
          </p>
        </div>

        {/* Main Auth Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="grid md:grid-cols-2 gap-0">
            {/* Left Side - Role Selection */}
            <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 p-8 md:p-12 text-white">
              <h2 className="text-2xl font-bold mb-6">Select Your Role</h2>
              <div className="space-y-4">
                {roles.map((role) => {
                  const Icon = role.icon;
                  const isSelected = selectedRole === role.value;
                  return (
                    <button
                      key={role.value}
                      onClick={() => setSelectedRole(role.value)}
                      className={`w-full text-left p-4 rounded-xl transition-all duration-200 ${
                        isSelected
                          ? 'bg-white text-emerald-900 shadow-lg scale-105'
                          : 'bg-emerald-500/30 hover:bg-emerald-500/50 text-white'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <Icon className={`w-6 h-6 mt-1 ${isSelected ? 'text-emerald-600' : 'text-white'}`} />
                        <div>
                          <h3 className="font-semibold text-lg mb-1">{role.label}</h3>
                          <p className={`text-sm ${isSelected ? 'text-emerald-700' : 'text-emerald-100'}`}>
                            {role.description}
                          </p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Demo Credentials */}
              <div className="mt-8 p-4 bg-emerald-800/50 rounded-xl">
                <p className="text-sm font-semibold mb-2">Quick Login (Click to use):</p>
                <div className="text-xs space-y-2 text-emerald-100">
                  <button
                    type="button"
                    onClick={() => {
                      setFormData(prev => ({ ...prev, email: 'hospital@cgh.lk', password: 'hospital123' }));
                      setSelectedRole('hospital');
                      setMode('signin');
                    }}
                    className="w-full text-left p-2 bg-emerald-700/50 hover:bg-emerald-700 rounded transition-colors"
                  >
                    🏥 Hospital: hospital@cgh.lk / hospital123
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setFormData(prev => ({ ...prev, email: 'admin@health.gov.lk', password: 'admin123' }));
                      setSelectedRole('government_admin');
                      setMode('signin');
                    }}
                    className="w-full text-left p-2 bg-emerald-700/50 hover:bg-emerald-700 rounded transition-colors"
                  >
                    🧑‍⚕️ Ministry: admin@health.gov.lk / admin123
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setFormData(prev => ({ ...prev, email: 'user@example.com', password: 'user123' }));
                      setSelectedRole('local_user');
                      setMode('signin');
                    }}
                    className="w-full text-left p-2 bg-emerald-700/50 hover:bg-emerald-700 rounded transition-colors"
                  >
                    👤 Donor: user@example.com / user123
                  </button>
                </div>
              </div>
            </div>

            {/* Right Side - Form */}
            <div className="p-8 md:p-12">
              {/* Mode Toggle */}
              <div className="flex gap-2 mb-8 bg-gray-100 p-1 rounded-lg">
                <button
                  onClick={() => setMode('signin')}
                  className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-all ${
                    mode === 'signin'
                      ? 'bg-white text-emerald-600 shadow'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Sign In
                </button>
                <button
                  onClick={() => setMode('signup')}
                  className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-all ${
                    mode === 'signup'
                      ? 'bg-white text-emerald-600 shadow'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Sign Up
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                {mode === 'signup' && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
                      placeholder="Enter your full name"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
                      placeholder="Enter password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {mode === 'signup' && (
                  <>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Confirm Password
                      </label>
                      <div className="relative">
                        <input
                          type={showConfirmPassword ? 'text' : 'password'}
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
                          placeholder="Confirm password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        >
                          {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>

                    {selectedRole === 'hospital' && (
                      <>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Hospital Name
                          </label>
                          <input
                            type="text"
                            name="hospitalName"
                            value={formData.hospitalName}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
                            placeholder="e.g., Colombo General Hospital"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            District
                          </label>
                          <input
                            type="text"
                            name="district"
                            value={formData.district}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
                            placeholder="e.g., Colombo"
                          />
                        </div>
                      </>
                    )}
                  </>
                )}

                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Processing...' : mode === 'signin' ? 'Sign In' : 'Create Account'}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-600 text-sm">
          <p>© 2025 Sri Lanka Public Health Support Portal. All rights reserved.</p>
          <p className="mt-2">Building transparent healthcare support for everyone.</p>
        </div>
      </div>
    </div>
  );
}
