import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
        <Link to="/" className="text-3xl font-bold text-primary italic">
          SearchGear
        </Link>

        <nav className="hidden md:flex gap-8">
          <a href="#services" className="text-gray-700 hover:text-primary font-medium transition-colors">
            Services
          </a>
          <a href="#fleet" className="text-gray-700 hover:text-primary font-medium transition-colors">
            Our Fleet
          </a>
          <a href="#testimonials" className="text-gray-700 hover:text-primary font-medium transition-colors">
            Testimonials
          </a>
          <a href="#contact" className="text-gray-700 hover:text-primary font-medium transition-colors">
            Contact
          </a>
        </nav>

        <Link to="/login">
          <button className="bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-full font-semibold transition-colors">
            Login
          </button>
        </Link>
      </div>
    </header>
  );
}

export default Header;
