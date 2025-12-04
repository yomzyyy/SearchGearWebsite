import { useState } from 'react';
import { MdSearch, MdClose, MdPerson, MdAdd } from 'react-icons/md';

function ClientSelector({ selectedClient, onSelectClient }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const clients = [
    {
      id: 1,
      name: 'Accountinus Business Solution Inc.',
      email: 'contact@accountinus.com',
      phone: '0912-345-6789',
      address: 'Makati City, Metro Manila',
    },
    {
      id: 2,
      name: 'Tech Solutions Corp.',
      email: 'info@techsolutions.com',
      phone: '0923-456-7890',
      address: 'Quezon City, Metro Manila',
    },
    {
      id: 3,
      name: 'ABC Manufacturing Ltd.',
      email: 'sales@abcmfg.com',
      phone: '0934-567-8901',
      address: 'Pasig City, Metro Manila',
    },
    {
      id: 4,
      name: 'Global Enterprises Inc.',
      email: 'hello@globalent.com',
      phone: '0945-678-9012',
      address: 'Taguig City, Metro Manila',
    },
    {
      id: 5,
      name: 'Sunrise Travel Agency',
      email: 'bookings@sunrisetravel.com',
      phone: '0956-789-0123',
      address: 'Manila City, Metro Manila',
    },
  ];

  const filteredClients = clients.filter(
    (client) =>
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectClient = (client) => {
    onSelectClient(client);
    setIsModalOpen(false);
    setSearchTerm('');
  };

  return (
    <div>
      
      {selectedClient ? (
        <div className="border border-gray-300 rounded-lg p-4 bg-gray-50">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <MdPerson className="text-primary text-xl" />
                <h3 className="font-semibold text-gray-900">{selectedClient.name}</h3>
              </div>
              <p className="text-sm text-gray-600">{selectedClient.email}</p>
              <p className="text-sm text-gray-600">{selectedClient.phone}</p>
              <p className="text-sm text-gray-600">{selectedClient.address}</p>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="text-primary hover:text-primary-dark font-semibold text-sm transition-colors"
            >
              Change
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsModalOpen(true)}
          className="w-full border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-primary hover:bg-blue-50 transition-all text-center"
        >
          <MdAdd className="text-3xl text-gray-400 mx-auto mb-2" />
          <p className="text-gray-600 font-medium">Select a Client</p>
          <p className="text-sm text-gray-500 mt-1">Click to choose from existing clients</p>
        </button>
      )}

      
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] flex flex-col mx-4">
            
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Select Client</h2>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setSearchTerm('');
                }}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <MdClose className="text-2xl" />
              </button>
            </div>

            
            <div className="p-6 border-b border-gray-200">
              <div className="relative">
                <MdSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                <input
                  type="text"
                  placeholder="Search by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>

            
            <div className="flex-1 overflow-y-auto p-6">
              {filteredClients.length > 0 ? (
                <div className="space-y-3">
                  {filteredClients.map((client) => (
                    <button
                      key={client.id}
                      onClick={() => handleSelectClient(client)}
                      className="w-full text-left p-4 border border-gray-200 rounded-lg hover:border-primary hover:bg-blue-50 transition-all"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white flex-shrink-0 mt-1">
                          <MdPerson className="text-xl" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-900 mb-1">{client.name}</h3>
                          <p className="text-sm text-gray-600">{client.email}</p>
                          <p className="text-sm text-gray-600">{client.phone}</p>
                          <p className="text-sm text-gray-500">{client.address}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500">No clients found matching your search.</p>
                </div>
              )}
            </div>

            
            <div className="p-6 border-t border-gray-200">
              <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2">
                <MdAdd className="text-xl" />
                <span>Add New Client</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ClientSelector;
