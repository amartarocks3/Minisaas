import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Settings() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) router.replace('/login');
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.replace('/login');
  };

  return (
    <div className="max-w-7xl mx-auto min-h-screen  p-4 sm:p-6 lg:p-8">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">Settings</h1>
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow max-w-md ">
        <h2 className="text-xl sm:text-2xl font-semibold mb-4">Account Settings</h2>
        <p className="text-sm sm:text-base text-gray-600 mb-6">Manage your account preferences.</p>
        <button
          onClick={handleLogout}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded text-sm sm:text-base"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
