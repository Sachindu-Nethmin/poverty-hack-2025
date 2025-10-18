import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import type { HospitalNeedRequest, RequestStatus } from '../types/request';
import { 
  Building2, 
  Plus, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  FileText,
  Calendar,
  Home,
  LogOut
} from 'lucide-react';
import Footer from './Footer';
import logo from '../assets/Sri_Lanka.svg';

export default function HospitalDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [requests, setRequests] = useState<HospitalNeedRequest[]>([]);
  const [filterStatus, setFilterStatus] = useState<RequestStatus | 'all'>('all');

  useEffect(() => {
    if (!user || user.role !== 'hospital') {
      navigate('/auth');
      return;
    }
    loadRequests();
  }, [user, navigate]);

  const loadRequests = () => {
    const storedRequests = localStorage.getItem('hospitalRequests');
    if (storedRequests) {
      const allRequests: HospitalNeedRequest[] = JSON.parse(storedRequests);
      // Filter requests for current hospital only
      const hospitalRequests = allRequests.filter(
        req => req.submitterEmail === user?.email
      );
      setRequests(hospitalRequests);
    }
  };

  const filteredRequests = filterStatus === 'all' 
    ? requests 
    : requests.filter(req => req.status === filterStatus);

  const stats = {
    total: requests.length,
    pending: requests.filter(r => r.status === 'pending').length,
    approved: requests.filter(r => r.status === 'approved').length,
    denied: requests.filter(r => r.status === 'denied').length,
  };

  const getStatusBadge = (status: RequestStatus) => {
    const styles = {
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      approved: 'bg-green-100 text-green-800 border-green-200',
      denied: 'bg-red-100 text-red-800 border-red-200',
    };
    
    const icons = {
      pending: <Clock className="w-4 h-4" />,
      approved: <CheckCircle className="w-4 h-4" />,
      denied: <XCircle className="w-4 h-4" />,
    };

    return (
      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold border ${styles[status]}`}>
        {icons[status]}
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const getUrgencyBadge = (urgency: string) => {
    const styles = {
      critical: 'bg-red-100 text-red-700',
      high: 'bg-orange-100 text-orange-700',
      medium: 'bg-yellow-100 text-yellow-700',
      low: 'bg-blue-100 text-blue-700',
    };
    return (
      <span className={`px-2 py-1 rounded text-xs font-semibold ${styles[urgency as keyof typeof styles]}`}>
        {urgency.toUpperCase()}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header Navigation */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <img 
              src={logo} 
              alt="Sri Lanka Health Logo" 
              className="h-12 w-12 object-contain transition-transform group-hover:scale-105"
            />
            <div className="flex flex-col">
              <span className="font-bold text-xl text-gray-900">Public Health Portal</span>
              <span className="text-xs text-emerald-600 font-semibold">Ministry of Health, Sri Lanka</span>
            </div>
          </Link>
          
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="hidden sm:flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-emerald-600 transition-colors"
            >
              <Home className="w-4 h-4" />
              <span className="font-medium">Home</span>
            </Link>
            
            <div className="flex items-center gap-2 px-3 py-2 bg-emerald-50 rounded-lg border border-emerald-200">
              <Building2 className="w-4 h-4 text-emerald-700" />
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-emerald-900">{user?.name}</span>
                <span className="text-[10px] text-emerald-600">Hospital User</span>
              </div>
            </div>
            
            <button 
              onClick={() => {
                logout();
                navigate('/auth');
              }}
              className="flex items-center gap-2 px-4 py-2 rounded-md border-2 border-gray-300 hover:bg-gray-50 text-base font-medium transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Dashboard Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-3">
                <Building2 className="w-10 h-10" />
                Hospital Dashboard
              </h1>
              <p className="text-emerald-100 mt-2">
                {user?.hospitalName || user?.name} • {user?.district || 'Sri Lanka'}
              </p>
            </div>
            <button
              onClick={() => navigate('/submit-need')}
              className="flex items-center gap-2 bg-white text-emerald-600 hover:bg-emerald-50 font-semibold px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <Plus className="w-5 h-5" />
              Request Need
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-gray-400">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-semibold">Total Requests</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{stats.total}</p>
              </div>
              <FileText className="w-10 h-10 text-gray-400" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-yellow-400">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-semibold">Pending Review</p>
                <p className="text-3xl font-bold text-yellow-600 mt-1">{stats.pending}</p>
              </div>
              <Clock className="w-10 h-10 text-yellow-400" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-green-400">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-semibold">Approved</p>
                <p className="text-3xl font-bold text-green-600 mt-1">{stats.approved}</p>
              </div>
              <CheckCircle className="w-10 h-10 text-green-400" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-red-400">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-semibold">Denied</p>
                <p className="text-3xl font-bold text-red-600 mt-1">{stats.denied}</p>
              </div>
              <XCircle className="w-10 h-10 text-red-400" />
            </div>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-3 mb-6">
          {(['all', 'pending', 'approved', 'denied'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                filterStatus === status
                  ? 'bg-emerald-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 border border-gray-300 hover:border-emerald-600 hover:text-emerald-600'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
              {status !== 'all' && (
                <span className="ml-2 px-2 py-0.5 bg-white/20 rounded-full text-xs">
                  {stats[status]}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Requests List */}
        {filteredRequests.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {filterStatus === 'all' ? 'No Requests Yet' : `No ${filterStatus} Requests`}
            </h3>
            <p className="text-gray-600 mb-6">
              {filterStatus === 'all' 
                ? 'Submit your first equipment or resource request to get started.'
                : `You don't have any ${filterStatus} requests at the moment.`}
            </p>
            {filterStatus === 'all' && (
              <button
                onClick={() => navigate('/submit-need')}
                className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-3 rounded-lg transition-all"
              >
                <Plus className="w-5 h-5" />
                Submit Request
              </button>
            )}
          </div>
        ) : (
          <div className="grid gap-6">
            {filteredRequests.map((request) => (
              <div
                key={request.id}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-200 p-6 border border-gray-200"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-gray-900">
                        {request.equipmentName}
                      </h3>
                      {getUrgencyBadge(request.urgency)}
                    </div>
                    <p className="text-gray-600 text-sm">
                      Category: {request.equipmentCategory} • Quantity: {request.quantity}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    {getStatusBadge(request.status)}
                  </div>
                </div>

                <p className="text-gray-700 mb-4 line-clamp-2">{request.reason}</p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4 text-sm">
                  <div>
                    <p className="text-gray-500 font-semibold">Est. Cost</p>
                    <p className="text-gray-900 font-bold">LKR {request.estimatedCost.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 font-semibold">Beneficiaries</p>
                    <p className="text-gray-900 font-bold">{request.expectedBeneficiaries.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 font-semibold">Submitted</p>
                    <p className="text-gray-900 font-bold flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(request.submittedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 font-semibold">Request ID</p>
                    <p className="text-gray-900 font-mono text-xs">{request.id.slice(0, 8)}</p>
                  </div>
                </div>

                {request.status === 'approved' && request.reviewedBy && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-4">
                    <p className="text-green-800 font-semibold mb-1">✅ Approved</p>
                    <p className="text-green-700 text-sm">
                      Reviewed by: {request.reviewedBy}
                    </p>
                    {request.reviewedAt && (
                      <p className="text-green-700 text-sm">
                        Date: {new Date(request.reviewedAt).toLocaleString()}
                      </p>
                    )}
                    {request.adminNotes && (
                      <p className="text-green-700 text-sm mt-2 italic">
                        Note: {request.adminNotes}
                      </p>
                    )}
                  </div>
                )}

                {request.status === 'denied' && request.reviewedBy && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 mt-4">
                    <p className="text-red-800 font-semibold mb-1">❌ Denied</p>
                    <p className="text-red-700 text-sm">
                      Reviewed by: {request.reviewedBy}
                    </p>
                    {request.reviewedAt && (
                      <p className="text-red-700 text-sm">
                        Date: {new Date(request.reviewedAt).toLocaleString()}
                      </p>
                    )}
                    {request.adminNotes && (
                      <p className="text-red-700 text-sm mt-2 italic">
                        Reason: {request.adminNotes}
                      </p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}
