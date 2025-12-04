import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../../core/auth/useAuth';
import QuoteRequestModal from './QuoteRequestModal';

function Hero() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleRequestQuote = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    setIsModalOpen(true);
  };

  return (
    <section className="relative h-[600px] flex items-center justify-center">
      <div className="absolute inset-0">
        <img
          src="/Hero.png"
          alt="Tourist Bus"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="relative z-10 max-w-4xl text-center px-8">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
          Experience Comfort on Every Journey
        </h1>
        <p className="text-xl text-white mb-8 leading-relaxed drop-shadow-md">
          Premium tourist bus services for unforgettable travel experiences. Safe, comfortable, and reliable transportation for your adventures.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleRequestQuote}
            className="bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-full font-semibold transition-all hover:-translate-y-1"
          >
            Request a Quote
          </button>
          <a
            href="#fleet"
            className="bg-white hover:bg-blue-50 text-primary px-8 py-4 rounded-full font-semibold transition-all hover:-translate-y-1 inline-block"
          >
            View Our Fleet
          </a>
        </div>
      </div>

      
      <QuoteRequestModal
        isOpen={isModalOpen && isAuthenticated}
        onClose={() => setIsModalOpen(false)}
        user={user}
      />
    </section>
  );
}

export default Hero;
