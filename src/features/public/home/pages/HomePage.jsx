import Hero from '../components/Hero';
import Services from '../components/Services';
import Fleet from '../components/Fleet';
import Testimonials from '../components/Testimonials';
import Contact from '../components/Contact';

function HomePage() {
  return (
    <div>
      <Hero />
      <Services />
      <Fleet />
      <Testimonials />
      <Contact />
    </div>
  );
}

export default HomePage;
