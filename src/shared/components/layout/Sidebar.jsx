import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  MdDashboard,
  MdEventNote,
  MdDirectionsBus,
  MdAssessment,
  MdReceipt,
  MdSettings,
  MdPerson,
  MdLogout,
} from 'react-icons/md';
import { useAuth } from '../../../core/auth/useAuth';

function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = [
    {
      title: 'Dashboard',
      icon: MdDashboard,
      path: '/admin/dashboard',
    },
    {
      title: 'Bookings',
      icon: MdEventNote,
      path: '/admin/bookings',
      subItems: [
        { title: 'All Bookings', path: '/admin/bookings' },
        { title: 'Pending', path: '/admin/bookings?status=pending' },
        { title: 'Confirmed', path: '/admin/bookings?status=confirmed' },
        { title: 'Completed', path: '/admin/bookings?status=completed' },
        { title: 'Cancelled', path: '/admin/bookings?status=cancelled' },
      ],
    },
    {
      title: 'Fleet Management',
      icon: MdDirectionsBus,
      path: '/admin/fleet',
      subItems: [
        { title: 'All Vehicles', path: '/admin/fleet' },
        { title: 'Available', path: '/admin/fleet?status=available' },
        { title: 'In Service', path: '/admin/fleet?status=in-service' },
        { title: 'Maintenance', path: '/admin/fleet?status=maintenance' },
        { title: 'Add New Vehicle', path: '/admin/fleet/add' },
      ],
    },
    {
      title: 'Reports',
      icon: MdAssessment,
      path: '/admin/reports',
      subItems: [
        { title: 'Income vs Expenses', path: '/admin/reports' },
        { title: 'Transactions', path: '/admin/reports#transactions' },
        { title: 'Add Transaction', path: '/admin/reports#add' },
      ],
    },
    {
      title: 'Invoice',
      icon: MdReceipt,
      path: '/admin/invoice',
      subItems: [
        { title: 'All Invoices', path: '/admin/invoice' },
        { title: 'Create Invoice', path: '/admin/invoice/create' },
        { title: 'Pending', path: '/admin/invoice?status=pending' },
        { title: 'Paid', path: '/admin/invoice?status=paid' },
        { title: 'Overdue', path: '/admin/invoice?status=overdue' },
      ],
    },
    {
      title: 'Settings',
      icon: MdSettings,
      path: '/admin/settings',
      subItems: [
        { title: 'General', path: '/admin/settings' },
        { title: 'Notifications', path: '/admin/settings/notifications' },
        { title: 'Admin Users', path: '/admin/settings/users' },
        { title: 'System Logs', path: '/admin/settings/logs' },
      ],
    },
  ];

  return (
    <div className="group w-20 hover:w-64 bg-white h-screen shadow-lg flex flex-col transition-all duration-300 ease-in-out">
      
      <div className="p-4 border-b border-gray-200 overflow-hidden">
        <Link to="/" className="flex items-center justify-center group-hover:justify-start">
          <span className="text-2xl font-bold text-primary italic whitespace-nowrap">
            <span className="inline-block">S</span>
            <span className="hidden group-hover:inline-block">earchGear</span>
          </span>
        </Link>
        <p className="text-xs text-gray-500 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
          Admin Panel
        </p>
      </div>

      
      <nav className="flex-1 overflow-y-auto py-4 overflow-x-hidden">
        {menuItems.map((item) => (
          <div key={item.path}>
            <Link
              to={item.path}
              className={`flex items-center gap-3 px-5 py-3 text-gray-700 hover:bg-blue-50 hover:text-primary transition-colors ${
                isActive(item.path) ? 'bg-blue-50 text-primary border-r-4 border-primary' : ''
              }`}
              title={item.title}
            >
              <item.icon className="text-xl min-w-[20px]" />
              <span className="font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {item.title}
              </span>
            </Link>

            
            {item.subItems && isActive(item.path) && (
              <div className="ml-12 mt-1 hidden group-hover:block">
                {item.subItems.map((subItem) => (
                  <Link
                    key={subItem.path}
                    to={subItem.path}
                    className="block py-2 px-4 text-sm text-gray-600 hover:text-primary transition-colors whitespace-nowrap"
                  >
                    • {subItem.title}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      
      <div className="border-t border-gray-200 p-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white min-w-[40px]">
            <MdPerson className="text-xl" />
          </div>
          <div className="flex-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 overflow-hidden">
            <p className="text-sm font-semibold text-gray-900 whitespace-nowrap">Admin</p>
            <p className="text-xs text-gray-500 whitespace-nowrap">admin@searchgear.com</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-red-600 transition-colors w-full py-2 px-3 rounded hover:bg-red-50"
          title="Logout"
        >
          <MdLogout className="min-w-[16px]" />
          <span className="whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Logout
          </span>
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
