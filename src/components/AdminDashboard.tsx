// src/components/AdminDashboard.tsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import type { HospitalNeedRequest, RequestStats } from '../types/request';
import { BarChart3, Eye, AlertCircle, CheckCircle, XCircle, Clock } from 'lucide-react';

export default function AdminDashboard() {
  const { user, isAuthenticated, hasRole } = useAuth();
  const navigate = useNavigate();
  const [requests, setRequests] = useState<HospitalNeedRequest[]>([]);
  const [stats, setStats] = useState<RequestStats | null>(null);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'denied'>('all');

  useEffect(() => {
    // Load requests from localStorage
    const stored = localStorage.getItem('hospitalRequests');
    if (stored) {
      const parsed = JSON.parse(stored);
      setRequests(parsed);
      calculateStats(parsed);
    }
  }, []);

  const calculateStats = (reqs: HospitalNeedRequest[]) => {
    const stats: RequestStats = {
      total: reqs.length,
      pending: reqs.filter(r => r.status === 'pending').length,
      approved: reqs.filter(r => r.status === 'approved').length,
      denied: reqs.filter(r => r.status === 'denied').length,
      byDistrict: {},
      byUrgency: {},
      byHospital: {},
    };

    reqs.forEach(r => {
      stats.byDistrict[r.hospitalDistrict] = (stats.byDistrict[r.hospitalDistrict] || 0) + 1;
      stats.byUrgency[r.urgency] = (stats.byUrgency[r.urgency] || 0) + 1;
      stats.byHospital[r.hospitalName] = (stats.byHospital[r.hospitalName] || 0) + 1;
    });

    setStats(stats);
  };

  // Redirect if not admin
  if (!isAuthenticated || !hasRole(['government_admin'])) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
          <AlertCircle className="w-16 h-16 text-amber-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-600 mb-6">
            You need government admin privileges to access this dashboard.
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

  const filteredRequests = requests.filter(r => 
    filter === 'all' ? true : r.status === filter
  );

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircle className="w-5 h-5 text-emerald-600" />;
      case 'denied': return <XCircle className="w-5 h-5 text-red-600" />;
      default: return <Clock className="w-5 h-5 text-amber-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Government Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome, {user?.name}</p>
        </div>

        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-600">Total Requests</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{stats.total}</p>
                </div>
                <BarChart3 className="w-12 h-12 text-blue-500 opacity-20" />
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-amber-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-600">Pending</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{stats.pending}</p>
                </div>
                <Clock className="w-12 h-12 text-amber-500 opacity-20" />
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-emerald-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-600">Approved</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{stats.approved}</p>
                </div>
                <CheckCircle className="w-12 h-12 text-emerald-500 opacity-20" />
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-red-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-600">Denied</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{stats.denied}</p>
                </div>
                <XCircle className="w-12 h-12 text-red-500 opacity-20" />
              </div>
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 mb-6">
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                filter === 'all'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All ({stats?.total || 0})
            </button>
            <button
              onClick={() => setFilter('pending')}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                filter === 'pending'
                  ? 'bg-amber-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Pending ({stats?.pending || 0})
            </button>
            <button
              onClick={() => setFilter('approved')}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                filter === 'approved'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Approved ({stats?.approved || 0})
            </button>
            <button
              onClick={() => setFilter('denied')}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                filter === 'denied'
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Denied ({stats?.denied || 0})
            </button>
          </div>
        </div>

        {/* Requests List */}
        <div className="space-y-4">
          {filteredRequests.length === 0 ? (
            <div className="bg-white rounded-xl shadow-md p-12 text-center">
              <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 text-lg">No requests found</p>
            </div>
          ) : (
            filteredRequests.map(request => (
              <div
                key={request.id}
                className="bg-white rounded-xl shadow-md p-4 sm:p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      {getStatusIcon(request.status)}
                      <h3 className="text-xl font-bold text-gray-900">{request.equipmentName}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getUrgencyColor(request.urgency)}`}>
                        {request.urgency.toUpperCase()}
                      </span>
                    </div>
                    
                    <div className="space-y-1 text-sm text-gray-600">
                      <p><strong>Hospital:</strong> {request.hospitalName}</p>
                      <p><strong>District:</strong> {request.hospitalDistrict}</p>
                      <p><strong>Submitted by:</strong> {request.submitterName} ({request.submitterRole})</p>
                      <p><strong>Cost:</strong> LKR {request.estimatedCost.toLocaleString()}</p>
                      <p><strong>Beneficiaries:</strong> {request.expectedBeneficiaries.toLocaleString()} patients/year</p>
                    </div>
                  </div>

                  <button
                    onClick={() => navigate(`/admin/requests/${request.id}`)}
                    className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 transition-colors whitespace-nowrap"
                  >
                    <Eye className="w-4 h-4" />
                    View Request
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
