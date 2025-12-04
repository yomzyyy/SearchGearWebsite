export const ENDPOINTS = {
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  LOGOUT: '/auth/logout',
  REFRESH_TOKEN: '/auth/refresh',

  CONTACT: '/contact',
  BOOKINGS: '/bookings',
  FLEET: '/fleet',
  SERVICES: '/services',

  ADMIN_USERS: '/admin/users',
  ADMIN_USER_BY_ID: (id) => `/admin/users/${id}`,

  ADMIN_BOOKINGS: '/bookings/admin/all',
  ADMIN_BOOKINGS_CALENDAR: '/bookings/admin/calendar',
  ADMIN_BOOKING_BY_ID: (id) => `/bookings/admin/${id}`,
  ADMIN_BOOKING_CREATE: '/bookings/admin/create',
  ADMIN_BOOKING_UPDATE_STATUS: (id) => `/bookings/admin/${id}/status`,
  ADMIN_BOOKING_MARK_PAID: (id) => `/bookings/admin/${id}/mark-paid`,
  ADMIN_BOOKING_CANCEL: (id) => `/bookings/admin/${id}/cancel`,
  ADMIN_BOOKING_DELETE: (id) => `/bookings/admin/${id}`,

  ADMIN_FLEET: '/admin/fleet',
  ADMIN_FLEET_BY_ID: (id) => `/admin/fleet/${id}`,

  ADMIN_DASHBOARD: '/admin/dashboard',
  ADMIN_STATS: '/admin/stats',

  QUOTES_CREATE: '/quotes',
  QUOTES_MY_QUOTES: '/quotes/my-quotes',
  QUOTES_BY_ID: (id) => `/quotes/${id}`,

  ADMIN_QUOTES_ALL: '/quotes/admin/all',
  ADMIN_QUOTES_UPDATE: (id) => `/quotes/admin/${id}`,
  ADMIN_QUOTES_SUBMIT: (id) => `/quotes/admin/${id}/submit`,
  ADMIN_QUOTES_DELETE: (id) => `/quotes/admin/${id}`,
};
