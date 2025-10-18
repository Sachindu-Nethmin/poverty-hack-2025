import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import type { HospitalNeedRequest, RequestStatus, RequestStats } from '../types/request';
import {
  ShieldCheck,
  TrendingUp,
  Eye,
  Filter,
  Building2,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  MapPin,
  Calendar,
  Home,
  LogOut
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Footer from './Footer';
import logo from '../assets/Sri_Lanka.svg';
import { ministryDummyRequests } from '../data/ministryDummyData';

export default function MinistryDashboard() {
  const { user, hasRole, logout } = useAuth();
  const navigate = useNavigate();
  const [requests, setRequests] = useState<HospitalNeedRequest[]>([]);
  const [filterStatus, setFilterStatus] = useState<RequestStatus | 'all'>('all');
  const [stats, setStats] = useState<RequestStats>({
    total: 0,
    pending: 0,
    approved: 0,
    denied: 0,
    byDistrict: {},
    byUrgency: { critical: 0, high: 0, medium: 0, low: 0 },
    byHospital: {},
  });

  useEffect(() => {
    if (!user || user.role !== 'government_admin') {
      navigate('/auth');
      return;
    }
    loadRequests();
  }, [user, navigate, hasRole]);

  const loadRequests = () => {
    // First, try to load from localStorage
    const storedRequests = localStorage.getItem('hospitalRequests');
    let allRequests: HospitalNeedRequest[] = [];
    
    if (storedRequests) {
      allRequests = JSON.parse(storedRequests);
    }
    
    // If no stored requests, use dummy data
    if (allRequests.length === 0) {
      allRequests = ministryDummyRequests;
      // Store dummy data in localStorage for persistence
      localStorage.setItem('hospitalRequests', JSON.stringify(allRequests));
    }
    
    setRequests(allRequests);
    calculateStats(allRequests);
  };

  const calculateStats = (requestsList: HospitalNeedRequest[]) => {
    const newStats: RequestStats = {
      total: requestsList.length,
      pending: requestsList.filter(r => r.status === 'pending').length,
      approved: requestsList.filter(r => r.status === 'approved').length,
      denied: requestsList.filter(r => r.status === 'denied').length,
      byDistrict: {},
      byUrgency: { critical: 0, high: 0, medium: 0, low: 0 },
      byHospital: {},
    };

    requestsList.forEach(request => {
      // By district
      newStats.byDistrict[request.hospitalDistrict] = (newStats.byDistrict[request.hospitalDistrict] || 0) + 1;

      // By urgency
      newStats.byUrgency[request.urgency as keyof typeof newStats.byUrgency]++;

      // By hospital
      newStats.byHospital[request.hospitalName] = (newStats.byHospital[request.hospitalName] || 0) + 1;
    });

    setStats(newStats);
  };

  const filteredRequests = filterStatus === 'all'
    ? requests
    : requests.filter(req => req.status === filterStatus);

  // Chart data
  const hospitalChartData = Object.entries(stats.byHospital)
    .map(([name, count]) => ({ hospital: name, requests: count }))
    .sort((a, b) => b.requests - a.requests)
    .slice(0, 5);

  const urgencyChartData = [
    { urgency: 'Critical', count: stats.byUrgency.critical },
    { urgency: 'High', count: stats.byUrgency.high },
    { urgency: 'Medium', count: stats.byUrgency.medium },
    { urgency: 'Low', count: stats.byUrgency.low },
  ];

  const getUrgencyBadge = (urgency: string) => {
    const styles = {
      critical: 'bg-red-100 text-red-700 border-red-300',
      high: 'bg-orange-100 text-orange-700 border-orange-300',
      medium: 'bg-yellow-100 text-yellow-700 border-yellow-300',
      low: 'bg-blue-100 text-blue-700 border-blue-300',
    };
    return (
      <span className={`px-2 py-1 rounded border text-xs font-bold ${styles[urgency as keyof typeof styles]}`}>
        {urgency.toUpperCase()}
      </span>
    );
  };

  const getStatusBadge = (status: RequestStatus) => {
    const styles = {
      pending: 'bg-yellow-100 text-yellow-800',
      approved: 'bg-green-100 text-green-800',
      denied: 'bg-red-100 text-red-800',
    };
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${styles[status]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
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
            
            <div className="flex items-center gap-2 px-3 py-2 bg-blue-50 rounded-lg border border-blue-200">
              <ShieldCheck className="w-4 h-4 text-blue-700" />
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-blue-900">{user?.name}</span>
                <span className="text-[10px] text-blue-600">Ministry Officer</span>
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
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-3">
                <ShieldCheck className="w-10 h-10" />
                Health Ministry Dashboard
              </h1>
              <p className="text-blue-100 mt-2">
                {user?.name} • Ministry of Health, Sri Lanka
              </p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-xl">
              <p className="text-sm font-semibold">Total Requests</p>
              <p className="text-3xl font-bold">{stats.total}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-yellow-400 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-semibold">Pending Review</p>
                <p className="text-3xl font-bold text-yellow-600 mt-1">{stats.pending}</p>
              </div>
              <Clock className="w-12 h-12 text-yellow-400" />
            </div>
            <p className="text-gray-500 text-xs mt-2">Requires action</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-green-400 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-semibold">Approved</p>
                <p className="text-3xl font-bold text-green-600 mt-1">{stats.approved}</p>
              </div>
              <CheckCircle className="w-12 h-12 text-green-400" />
            </div>
            <p className="text-gray-500 text-xs mt-2">Active in public feed</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-red-400 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-semibold">Denied</p>
                <p className="text-3xl font-bold text-red-600 mt-1">{stats.denied}</p>
              </div>
              <XCircle className="w-12 h-12 text-red-400" />
            </div>
            <p className="text-gray-500 text-xs mt-2">Not approved</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-orange-400 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-semibold">Critical</p>
                <p className="text-3xl font-bold text-orange-600 mt-1">{stats.byUrgency.critical}</p>
              </div>
              <AlertTriangle className="w-12 h-12 text-orange-400" />
            </div>
            <p className="text-gray-500 text-xs mt-2">Urgent attention needed</p>
          </div>
        </div>

        {/* Analytics Charts */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Requests by Hospital */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              Top 5 Hospitals by Requests
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={hospitalChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hospital" angle={-45} textAnchor="end" height={100} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="requests" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Requests by Urgency */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-orange-600" />
              Requests by Urgency Level
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={urgencyChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="urgency" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#f59e0b" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex items-center gap-4 mb-6">
          <Filter className="w-5 h-5 text-gray-600" />
          <div className="flex flex-wrap gap-2">
            {(['all', 'pending', 'approved', 'denied'] as const).map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  filterStatus === status
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 border border-gray-300 hover:border-blue-600 hover:text-blue-600'
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
                <span className="ml-2 px-2 py-0.5 bg-white/20 rounded-full text-xs">
                  {status === 'all' ? stats.total : stats[status]}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Request Tiles */}
        {filteredRequests.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <Building2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No {filterStatus !== 'all' ? filterStatus : ''} Requests
            </h3>
            <p className="text-gray-600">
              {filterStatus === 'all'
                ? 'No hospital requests have been submitted yet.'
                : `There are no ${filterStatus} requests at this time.`}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredRequests.map((request) => (
              <div
                key={request.id}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-200 overflow-hidden border border-gray-200"
              >
                {/* Card Header */}
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 border-b border-blue-200">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-bold text-gray-900 text-lg line-clamp-1">
                      {request.hospitalName}
                    </h3>
                    {getUrgencyBadge(request.urgency)}
                  </div>
                  <p className="text-sm text-gray-600 flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {request.hospitalDistrict}
                  </p>
                </div>

                {/* Card Body */}
                <div className="p-4">
                  <div className="mb-3">
                    <p className="text-sm text-gray-500 font-semibold mb-1">Equipment Needed</p>
                    <p className="font-bold text-gray-900">{request.equipmentName}</p>
                    <p className="text-sm text-gray-600">{request.equipmentCategory}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-3 text-sm">
                    <div>
                      <p className="text-gray-500 font-semibold">Quantity</p>
                      <p className="text-gray-900 font-bold">{request.quantity}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 font-semibold">Est. Cost</p>
                      <p className="text-gray-900 font-bold">
                        LKR {(request.estimatedCost / 1000).toFixed(0)}K
                      </p>
                    </div>
                  </div>

                  <div className="mb-3">
                    <p className="text-sm text-gray-500 font-semibold mb-1">Reason</p>
                    <p className="text-sm text-gray-700 line-clamp-2">{request.reason}</p>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
                    <Calendar className="w-3 h-3" />
                    Submitted {new Date(request.submittedAt).toLocaleDateString()}
                  </div>

                  {/* Status Badge */}
                  <div className="mb-4">
                    {getStatusBadge(request.status)}
                  </div>

                  {/* View Request Button */}
                  <button
                    onClick={() => navigate(`/admin/requests/${request.id}`)}
                    className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 shadow hover:shadow-lg"
                  >
                    <Eye className="w-5 h-5" />
                    View Request
                  </button>
                </div>
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
