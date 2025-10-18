// src/components/RequestReviewPage.tsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import type { HospitalNeedRequest } from '../types/request';
import { CheckCircle, XCircle, AlertCircle, ArrowLeft } from 'lucide-react';

export default function RequestReviewPage() {
  const { requestId } = useParams<{ requestId: string }>();
  const { user, isAuthenticated, hasRole } = useAuth();
  const navigate = useNavigate();
  const [request, setRequest] = useState<HospitalNeedRequest | null>(null);
  const [adminNotes, setAdminNotes] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('hospitalRequests');
    if (stored) {
      const requests: HospitalNeedRequest[] = JSON.parse(stored);
      const found = requests.find(r => r.id === requestId);
      if (found) {
        setRequest(found);
        setAdminNotes(found.adminNotes || '');
      }
    }
  }, [requestId]);

  if (!isAuthenticated || !hasRole(['government_admin'])) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
          <AlertCircle className="w-16 h-16 text-amber-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-600 mb-6">Admin privileges required.</p>
          <button onClick={() => navigate('/')} className="px-6 py-3 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700">
            Go Home
          </button>
        </div>
      </div>
    );
  }

  if (!request) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading request...</p>
        </div>
      </div>
    );
  }

  const handleApprove = async () => {
    setLoading(true);
    try {
      const stored = localStorage.getItem('hospitalRequests');
      if (stored) {
        const requests: HospitalNeedRequest[] = JSON.parse(stored);
        const updated = requests.map(r =>
          r.id === requestId
            ? {
                ...r,
                status: 'approved' as const,
                reviewedAt: new Date(),
                reviewedBy: user?.id,
                adminNotes,
                approvalDetails: {
                  approvedAmount: r.estimatedCost,
                  targetAmount: r.estimatedCost,
                  currentRaised: 0,
                },
              }
            : r
        );
        localStorage.setItem('hospitalRequests', JSON.stringify(updated));
        alert('Request approved successfully!');
        navigate('/admin/dashboard');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDeny = async () => {
    if (!confirm('Are you sure you want to deny this request?')) return;
    
    setLoading(true);
    try {
      const stored = localStorage.getItem('hospitalRequests');
      if (stored) {
        const requests: HospitalNeedRequest[] = JSON.parse(stored);
        const updated = requests.map(r =>
          r.id === requestId
            ? {
                ...r,
                status: 'denied' as const,
                reviewedAt: new Date(),
                reviewedBy: user?.id,
                adminNotes,
              }
            : r
        );
        localStorage.setItem('hospitalRequests', JSON.stringify(updated));
        alert('Request denied.');
        navigate('/admin/dashboard');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate('/admin/dashboard')}
          className="flex items-center gap-2 text-emerald-600 font-semibold hover:text-emerald-700 mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Dashboard
        </button>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 px-6 sm:px-8 py-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-white">{request.equipmentName}</h1>
            <p className="text-emerald-100 mt-1">{request.hospitalName}</p>
          </div>

          {/* Content */}
          <div className="p-6 sm:p-8 space-y-6">
            {/* Status Badge */}
            <div className="flex items-center gap-2">
              <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                request.status === 'pending' ? 'bg-amber-100 text-amber-800' :
                request.status === 'approved' ? 'bg-emerald-100 text-emerald-800' :
                'bg-red-100 text-red-800'
              }`}>
                {request.status.toUpperCase()}
              </span>
              <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                request.urgency === 'critical' ? 'bg-red-100 text-red-800' :
                request.urgency === 'high' ? 'bg-orange-100 text-orange-800' :
                request.urgency === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                'bg-blue-100 text-blue-800'
              }`}>
                {request.urgency.toUpperCase()} PRIORITY
              </span>
            </div>

            {/* Key Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-6 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm font-semibold text-gray-600">Hospital District</p>
                <p className="text-lg font-bold text-gray-900">{request.hospitalDistrict}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-600">Equipment Category</p>
                <p className="text-lg font-bold text-gray-900">{request.equipmentCategory}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-600">Estimated Cost</p>
                <p className="text-lg font-bold text-emerald-600">LKR {request.estimatedCost.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-600">Expected Beneficiaries</p>
                <p className="text-lg font-bold text-gray-900">{request.expectedBeneficiaries.toLocaleString()} patients/year</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-600">Quantity</p>
                <p className="text-lg font-bold text-gray-900">{request.quantity}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-600">Submitted By</p>
                <p className="text-lg font-bold text-gray-900">{request.submitterName}</p>
                <p className="text-xs text-gray-600">{request.submitterRole}</p>
              </div>
            </div>

            {/* Descriptions */}
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Equipment Description</h3>
                <p className="text-gray-700 leading-relaxed">{request.description}</p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Reason for Request</h3>
                <p className="text-gray-700 leading-relaxed">{request.reason}</p>
              </div>

              {request.currentCondition && (
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Current Equipment Condition</h3>
                  <p className="text-gray-700 leading-relaxed">{request.currentCondition}</p>
                </div>
              )}
            </div>

            {/* Admin Actions (only for pending) */}
            {request.status === 'pending' && (
              <div className="border-t pt-6 space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Admin Notes
                  </label>
                  <textarea
                    value={adminNotes}
                    onChange={(e) => setAdminNotes(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                    rows={4}
                    placeholder="Add any notes or comments about this request..."
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={handleDeny}
                    disabled={loading}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors disabled:opacity-50"
                  >
                    <XCircle className="w-5 h-5" />
                    Deny Request
                  </button>
                  <button
                    onClick={handleApprove}
                    disabled={loading}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 transition-colors disabled:opacity-50 shadow-md"
                  >
                    <CheckCircle className="w-5 h-5" />
                    Approve Request
                  </button>
                </div>
              </div>
            )}

            {/* Review Info (if reviewed) */}
            {request.status !== 'pending' && (
              <div className="border-t pt-6 bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Review Information</h3>
                <p className="text-sm text-gray-600">
                  <strong>Status:</strong> {request.status.toUpperCase()}
                </p>
                {request.adminNotes && (
                  <div className="mt-3">
                    <p className="text-sm font-semibold text-gray-700">Admin Notes:</p>
                    <p className="text-gray-700 mt-1">{request.adminNotes}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
