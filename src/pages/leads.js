import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';

export default function Leads() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('viewLeads');
  const [leads, setLeads] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);
  const [newLead, setNewLead] = useState({ name: '', email: '', status: '', aiMessage: '' });
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) router.replace('/login');
  }, [router]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/leads`)
      .then((res) => res.json())
      .then(setLeads)
      .catch(console.error);
  }, []);

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/leads/${selectedLead._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(selectedLead),
    });
    if (res.ok) {
      const updated = await res.json();
      setLeads(leads.map((l) => (l._id === updated._id ? updated : l)));
      setShowModal(false);
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this lead?')) {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/leads/${id}`, { method: 'DELETE' });
      setLeads(leads.filter((l) => l._id !== id));
    }
  };

  const handleAddLead = async (e) => {
    e.preventDefault();
    if (!newLead.name || !newLead.email || !newLead.status || !newLead.aiMessage) {
      alert('Please fill in all fields.');
      return;
    }
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/leads`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newLead),
    });
    if (res.ok) {
      const addedLead = await res.json();
      setLeads((prev) => [...prev, addedLead]);
      setNewLead({ name: '', email: '', status: '', aiMessage: '' });
      setActiveTab('viewLeads');
    } else {
      alert('Failed to add lead');
    }
  };

  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const matchesSearch =
        lead.name.toLowerCase().includes(searchText.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchText.toLowerCase()) ||
        lead.aiMessage.toLowerCase().includes(searchText.toLowerCase());
      const matchesStatus = statusFilter ? lead.status === statusFilter : true;
      return matchesSearch && matchesStatus;
    });
  }, [leads, searchText, statusFilter]);

  return (
    <div className="max-w-7xl mx-auto min-h-screen p-6">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">Leads Management</h1>

      {/* Sub Navigation */}
      <div className="flex space-x-4 mb-6 border-b">
        {['viewLeads', 'addLead'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 font-medium ${
              activeTab === tab
                ? 'border-b-2 border-blue-600 text-blue-700'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            {tab === 'viewLeads' ? 'View Leads' : 'Add Lead'}
          </button>
        ))}
      </div>

      {/* View Leads */}
      {activeTab === 'viewLeads' && (
        <div className="bg-white rounded-lg shadow p-6 overflow-x-auto">
          <div className="flex flex-col md:flex-row md:space-x-4 mb-4">
            <input
              type="text"
              placeholder="Search leads..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="mb-2 md:mb-0 px-3 py-2 border rounded w-full md:w-1/2"
            />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border rounded w-full md:w-1/4"
            >
              <option value="">All Statuses</option>
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="qualified">Qualified</option>
              <option value="lost">Lost</option>
            </select>
          </div>
          <table className="min-w-full border">
            <thead className="bg-gray-50">
              <tr>
                <th className="border px-4 py-2">Name</th>
                <th className="border px-4 py-2">Email</th>
                <th className="border px-4 py-2">Status</th>
                <th className="border px-4 py-2">AI Message</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeads.length ? (
                filteredLeads.map((lead) => (
                  <tr key={lead._id} className="border-b">
                    <td className="px-4 py-2">{lead.name}</td>
                    <td className="px-4 py-2">{lead.email}</td>
                    <td className="px-4 py-2">{lead.status}</td>
                    <td className="px-4 py-2">{lead.aiMessage}</td>
                    <td className="px-4 py-2 space-x-2">
                      <button
                        onClick={() => {
                          setSelectedLead(lead);
                          setShowModal(true);
                        }}
                        className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(lead._id)}
                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-gray-500">
                    No leads found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Add Lead */}
      {activeTab === 'addLead' && (
        <form onSubmit={handleAddLead} className="max-w-md bg-white p-6 rounded-lg shadow space-y-4">
          <h2 className="text-2xl font-semibold mb-2">Add New Lead</h2>
          {['name', 'email', 'status', 'aiMessage'].map((field) => (
            <div key={field}>
              <label className="block font-medium mb-1 capitalize">{field}</label>
              {field === 'status' ? (
                <select
                  value={newLead[field]}
                  onChange={(e) => setNewLead({ ...newLead, [field]: e.target.value })}
                  className="w-full border rounded px-3 py-2"
                >
                  <option value="">Select status</option>
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="qualified">Qualified</option>
                  <option value="lost">Lost</option>
                </select>
              ) : (
                <input
                  value={newLead[field]}
                  onChange={(e) => setNewLead({ ...newLead, [field]: e.target.value })}
                  placeholder={`Enter ${field}`}
                  className="w-full border rounded px-3 py-2"
                />
              )}
            </div>
          ))}
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
            Add Lead
          </button>
        </form>
      )}

      {/* Edit Modal */}
      {showModal && selectedLead && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <form onSubmit={handleEditSubmit} className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md space-y-4">
            <h2 className="text-xl font-bold">Edit Lead</h2>
            {['name', 'email', 'status', 'aiMessage'].map((field) => (
              <div key={field}>
                <label className="block font-medium mb-1 capitalize">{field}</label>
                {field === 'status' ? (
                  <select
                    value={selectedLead[field]}
                    onChange={(e) => setSelectedLead({ ...selectedLead, [field]: e.target.value })}
                    className="w-full border rounded px-3 py-2"
                  >
                    <option value="">Select status</option>
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="qualified">Qualified</option>
                    <option value="lost">Lost</option>
                  </select>
                ) : (
                  <input
                    value={selectedLead[field]}
                    onChange={(e) => setSelectedLead({ ...selectedLead, [field]: e.target.value })}
                    className="w-full border rounded px-3 py-2"
                  />
                )}
              </div>
            ))}
            <div className="flex justify-end space-x-2">
              <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 bg-gray-300 rounded">
                Cancel
              </button>
              <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
                Save
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
