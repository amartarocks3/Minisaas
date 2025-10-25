import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Pie, Line, Bar } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function Dashboard() {
  const router = useRouter();
  const [stats, setStats] = useState({
    total: 0,
    new: 0,
    contacted: 0,
    qualified: 0,
    lost: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) router.replace('/login');
  }, [router]);

  // Fetch lead statistics
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/leads/stats`);
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  // Pie Chart Data
  const pieChartData = {
    labels: ['New', 'Contacted', 'Qualified', 'Lost'],
    datasets: [
      {
        label: 'Lead Status Distribution',
        data: [stats.new, stats.contacted, stats.qualified, stats.lost],
        backgroundColor: [
          'rgba(34, 197, 94, 0.8)',   // Green
          'rgba(234, 179, 8, 0.8)',    // Yellow
          'rgba(168, 85, 247, 0.8)',   // Purple
          'rgba(239, 68, 68, 0.8)',    // Red
        ],
        borderColor: [
          'rgba(34, 197, 94, 1)',
          'rgba(234, 179, 8, 1)',
          'rgba(168, 85, 247, 1)',
          'rgba(239, 68, 68, 1)',
        ],
        borderWidth: 2,
      },
    ],
  };

  // Bar Chart Data
  const barChartData = {
    labels: ['New', 'Contacted', 'Qualified', 'Lost'],
    datasets: [
      {
        label: 'Number of Leads',
        data: [stats.new, stats.contacted, stats.qualified, stats.lost],
        backgroundColor: [
          'rgba(34, 197, 94, 0.7)',
          'rgba(234, 179, 8, 0.7)',
          'rgba(168, 85, 247, 0.7)',
          'rgba(239, 68, 68, 0.7)',
        ],
        borderColor: [
          'rgba(34, 197, 94, 1)',
          'rgba(234, 179, 8, 1)',
          'rgba(168, 85, 247, 1)',
          'rgba(239, 68, 68, 1)',
        ],
        borderWidth: 2,
      },
    ],
  };

  // Line Chart Data (Example: simulated weekly trend)
  const lineChartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'New Leads This Week',
        data: [12, 19, 15, 25, 22, 30, 28],
        fill: false,
        borderColor: 'rgba(59, 130, 246, 1)',
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        tension: 0.4,
      },
      {
        label: 'Qualified Leads This Week',
        data: [5, 10, 8, 15, 12, 18, 20],
        fill: false,
        borderColor: 'rgba(168, 85, 247, 1)',
        backgroundColor: 'rgba(168, 85, 247, 0.2)',
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
      <h1 className="max-w-7xl mx-auto px-4 text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
        Dashboard
      </h1>

      {/* Stats Cards */}
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6 mb-8">
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
          <h3 className="text-base sm:text-lg font-semibold mb-2 text-gray-700">Total Leads</h3>
          {loading ? (
            <p className="text-2xl sm:text-3xl font-bold text-gray-400">...</p>
          ) : (
            <p className="text-2xl sm:text-3xl font-bold text-blue-600">{stats.total}</p>
          )}
        </div>

        <div className="bg-white p-4 sm:p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
          <h3 className="text-base sm:text-lg font-semibold mb-2 text-gray-700">New Leads</h3>
          {loading ? (
            <p className="text-2xl sm:text-3xl font-bold text-gray-400">...</p>
          ) : (
            <p className="text-2xl sm:text-3xl font-bold text-green-600">{stats.new}</p>
          )}
        </div>

        <div className="bg-white p-4 sm:p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
          <h3 className="text-base sm:text-lg font-semibold mb-2 text-gray-700">Contacted</h3>
          {loading ? (
            <p className="text-2xl sm:text-3xl font-bold text-gray-400">...</p>
          ) : (
            <p className="text-2xl sm:text-3xl font-bold text-yellow-600">{stats.contacted}</p>
          )}
        </div>

        <div className="bg-white p-4 sm:p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
          <h3 className="text-base sm:text-lg font-semibold mb-2 text-gray-700">Qualified</h3>
          {loading ? (
            <p className="text-2xl sm:text-3xl font-bold text-gray-400">...</p>
          ) : (
            <p className="text-2xl sm:text-3xl font-bold text-purple-600">{stats.qualified}</p>
          )}
        </div>

        <div className="bg-white p-4 sm:p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
          <h3 className="text-base sm:text-lg font-semibold mb-2 text-gray-700">Lost</h3>
          {loading ? (
            <p className="text-2xl sm:text-3xl font-bold text-gray-400">...</p>
          ) : (
            <p className="text-2xl sm:text-3xl font-bold text-red-600">{stats.lost}</p>
          )}
        </div>
      </div>

      {/* Charts Section */}
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Pie Chart */}
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-gray-800">
            Lead Status Distribution
          </h2>
          <div className="h-64 sm:h-80">
            {!loading && stats.total > 0 ? (
              <Pie data={pieChartData} options={chartOptions} />
            ) : (
              <p className="text-gray-500 text-center py-20">
                {loading ? 'Loading chart...' : 'No data available'}
              </p>
            )}
          </div>
        </div>

        {/* Bar Chart */}
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-gray-800">
            Leads by Status
          </h2>
          <div className="h-64 sm:h-80">
            {!loading && stats.total > 0 ? (
              <Bar data={barChartData} options={chartOptions} />
            ) : (
              <p className="text-gray-500 text-center py-20">
                {loading ? 'Loading chart...' : 'No data available'}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Line Chart - Full Width */}
      <div className="max-w-7xl mx-auto px-4 mb-8">
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-gray-800">
            Weekly Lead Trends
          </h2>
          <div className="h-64 sm:h-80">
            <Line data={lineChartData} options={chartOptions} />
          </div>
        </div>
      </div>

      {/* Progress Bars Section */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-gray-800">
            Lead Status Breakdown
          </h2>
          {!loading && stats.total > 0 ? (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <span className="text-gray-700 font-medium w-24">New</span>
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-full sm:w-64 bg-gray-200 rounded-full h-4">
                    <div
                      className="bg-green-600 h-4 rounded-full transition-all duration-300"
                      style={{ width: `${(stats.new / stats.total) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-semibold text-gray-600 w-16 text-right">
                    {stats.new} ({Math.round((stats.new / stats.total) * 100)}%)
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <span className="text-gray-700 font-medium w-24">Contacted</span>
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-full sm:w-64 bg-gray-200 rounded-full h-4">
                    <div
                      className="bg-yellow-600 h-4 rounded-full transition-all duration-300"
                      style={{ width: `${(stats.contacted / stats.total) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-semibold text-gray-600 w-16 text-right">
                    {stats.contacted} ({Math.round((stats.contacted / stats.total) * 100)}%)
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <span className="text-gray-700 font-medium w-24">Qualified</span>
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-full sm:w-64 bg-gray-200 rounded-full h-4">
                    <div
                      className="bg-purple-600 h-4 rounded-full transition-all duration-300"
                      style={{ width: `${(stats.qualified / stats.total) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-semibold text-gray-600 w-16 text-right">
                    {stats.qualified} ({Math.round((stats.qualified / stats.total) * 100)}%)
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <span className="text-gray-700 font-medium w-24">Lost</span>
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-full sm:w-64 bg-gray-200 rounded-full h-4">
                    <div
                      className="bg-red-600 h-4 rounded-full transition-all duration-300"
                      style={{ width: `${(stats.lost / stats.total) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-semibold text-gray-600 w-16 text-right">
                    {stats.lost} ({Math.round((stats.lost / stats.total) * 100)}%)
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">
              {loading ? 'Loading stats...' : 'No leads data available'}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
