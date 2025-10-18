// src/components/HospitalNeedFormPage.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import type { HospitalNeedRequest, UrgencyLevel } from '../types/request';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

export default function HospitalNeedFormPage() {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    hospitalName: user?.role === 'hospital' ? user.hospitalName || '' : '',
    hospitalDistrict: user?.district || '',
    equipmentName: '',
    equipmentCategory: '',
    quantity: '1',
    estimatedCost: '',
    urgency: 'high' as UrgencyLevel,
    description: '',
    reason: '',
    expectedBeneficiaries: '',
    currentCondition: '',
  });

  // Redirect if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
          <AlertCircle className="w-16 h-16 text-amber-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Authentication Required</h2>
          <p className="text-gray-600 mb-6">
            Please login to submit a hospital need request.
          </p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Create request object
      const request: Omit<HospitalNeedRequest, 'id' | 'submittedAt'> = {
        submittedBy: user!.id,
        submitterName: user!.name,
        submitterEmail: user!.email,
        submitterRole: user!.role === 'hospital' ? 'hospital' : 'local_user',
        hospitalName: formData.hospitalName,
        hospitalDistrict: formData.hospitalDistrict,
        equipmentName: formData.equipmentName,
        equipmentCategory: formData.equipmentCategory,
        quantity: parseInt(formData.quantity),
        estimatedCost: parseFloat(formData.estimatedCost),
        urgency: formData.urgency,
        description: formData.description,
        reason: formData.reason,
        expectedBeneficiaries: parseInt(formData.expectedBeneficiaries),
        currentCondition: formData.currentCondition,
        status: 'pending',
      };

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Store in localStorage (in production, this would be an API call)
      const existingRequests = JSON.parse(localStorage.getItem('hospitalRequests') || '[]');
      const newRequest: HospitalNeedRequest = {
        ...request,
        id: Date.now().toString(),
        submittedAt: new Date(),
      };
      localStorage.setItem('hospitalRequests', JSON.stringify([...existingRequests, newRequest]));

      setSuccess(true);
      
      // Reset form after 2 seconds
      setTimeout(() => {
        setFormData({
          hospitalName: user?.role === 'hospital' ? user.hospitalName || '' : '',
          hospitalDistrict: user?.district || '',
          equipmentName: '',
          equipmentCategory: '',
          quantity: '1',
          estimatedCost: '',
          urgency: 'high',
          description: '',
          reason: '',
          expectedBeneficiaries: '',
          currentCondition: '',
        });
        setSuccess(false);
      }, 3000);

    } catch (err: any) {
      setError(err?.message || 'Failed to submit request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
          <CheckCircle2 className="w-16 h-16 text-emerald-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Request Submitted!</h2>
          <p className="text-gray-600 mb-6">
            Your hospital need request has been submitted successfully. The Health Ministry will review it soon.
          </p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 px-8 py-6">
            <h1 className="text-3xl font-bold text-white">Submit Hospital Need Request</h1>
            <p className="text-emerald-100 mt-2">
              Fill out the form below to request medical equipment for your hospital
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-start gap-3">
                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span className="text-sm">{error}</span>
              </div>
            )}

            {/* Submitter Info */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
              <p className="text-sm font-semibold text-emerald-800">Submitted by:</p>
              <p className="text-emerald-700">{user?.name} ({user?.email})</p>
              <p className="text-xs text-emerald-600 mt-1">Role: {user?.role.replace('_', ' ').toUpperCase()}</p>
            </div>

            {/* Hospital Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Hospital Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.hospitalName}
                  onChange={(e) => handleChange('hospitalName', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="e.g., Colombo General Hospital"
                  required
                  disabled={user?.role === 'hospital'}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  District <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.hospitalDistrict}
                  onChange={(e) => handleChange('hospitalDistrict', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
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
                  <option value="Mannar">Mannar</option>
                  <option value="Anuradhapura">Anuradhapura</option>
                  <option value="Polonnaruwa">Polonnaruwa</option>
                  <option value="Badulla">Badulla</option>
                  <option value="Ratnapura">Ratnapura</option>
                  <option value="Kurunegala">Kurunegala</option>
                  <option value="Ampara">Ampara</option>
                  <option value="Batticaloa">Batticaloa</option>
                  <option value="Trincomalee">Trincomalee</option>
                </select>
              </div>
            </div>

            {/* Equipment Details */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Equipment Details</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Equipment Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.equipmentName}
                    onChange={(e) => handleChange('equipmentName', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="e.g., CT Scanner"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.equipmentCategory}
                    onChange={(e) => handleChange('equipmentCategory', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select Category</option>
                    <option value="Diagnostic Equipment">Diagnostic Equipment</option>
                    <option value="Imaging Equipment">Imaging Equipment</option>
                    <option value="Monitoring Equipment">Monitoring Equipment</option>
                    <option value="Surgical Equipment">Surgical Equipment</option>
                    <option value="Life Support Equipment">Life Support Equipment</option>
                    <option value="Laboratory Equipment">Laboratory Equipment</option>
                    <option value="General Medical Equipment">General Medical Equipment</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Quantity <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    value={formData.quantity}
                    onChange={(e) => handleChange('quantity', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    min="1"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Estimated Cost (LKR) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    value={formData.estimatedCost}
                    onChange={(e) => handleChange('estimatedCost', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="e.g., 8500000"
                    min="0"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Urgency Level <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.urgency}
                    onChange={(e) => handleChange('urgency', e.target.value as UrgencyLevel)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    required
                  >
                    <option value="critical">Critical</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Expected Beneficiaries (patients/year) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    value={formData.expectedBeneficiaries}
                    onChange={(e) => handleChange('expectedBeneficiaries', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="e.g., 5000"
                    min="0"
                    required
                  />
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Equipment Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  rows={3}
                  placeholder="Provide a brief description of the equipment needed..."
                  required
                />
              </div>

              <div className="mt-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Reason for Request <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formData.reason}
                  onChange={(e) => handleChange('reason', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  rows={4}
                  placeholder="Explain why this equipment is needed and how it will benefit patients..."
                  required
                />
              </div>

              <div className="mt-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Current Equipment Condition (if applicable)
                </label>
                <textarea
                  value={formData.currentCondition}
                  onChange={(e) => handleChange('currentCondition', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  rows={3}
                  placeholder="Describe the current condition of existing equipment (if replacing/upgrading)..."
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex gap-4 pt-6 border-t">
              <button
                type="button"
                onClick={() => navigate('/')}
                className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 px-6 py-3 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
              >
                {loading ? 'Submitting...' : 'Submit Request'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
