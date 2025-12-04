import { createBrowserRouter } from 'react-router-dom';
import App from '../../App';
import HomePage from '../../features/public/home/pages/HomePage';
import LoginPage from '../../features/auth/pages/LoginPage';
import AdminLayout from '../../shared/components/layout/AdminLayout';
import DashboardPage from '../../features/admin/dashboard/pages/DashboardPage';
import ReportsPage from '../../features/admin/reports/pages/ReportsPage';
import InvoiceListPage from '../../features/admin/invoice/pages/InvoiceListPage';
import CreateInvoicePage from '../../features/admin/invoice/pages/CreateInvoicePage';
import QuotationListPage from '../../features/admin/quotations/pages/QuotationListPage';
import BookingCalendarPage from '../../features/admin/bookings/pages/BookingCalendarPage';
import { ProtectedRoute } from '../auth/ProtectedRoute';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
    ],
  },
  {
    path: '/admin',
    element: (
      <ProtectedRoute allowedRoles={['admin']}>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: 'dashboard',
        element: <DashboardPage />,
      },
      {
        path: 'reports',
        element: <ReportsPage />,
      },
      {
        path: 'invoice',
        element: <InvoiceListPage />,
      },
      {
        path: 'invoice/create',
        element: <CreateInvoicePage />,
      },
      {
        path: 'quotations',
        element: <QuotationListPage />,
      },
      {
        path: 'bookings',
        element: <BookingCalendarPage />,
      },
    ],
  },
]);
