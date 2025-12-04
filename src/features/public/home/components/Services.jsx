import { MdFlight, MdBusiness, MdStar, MdSchool, MdFavorite, MdExplore } from 'react-icons/md';

function Services() {
  const services = [
    {
      Icon: MdFlight,
      title: 'Airport Transfers',
      description: 'Reliable airport pickup and drop-off services for groups. Punctual, professional service ensuring you never miss your flight or wait at the terminal.'
    },
    {
      Icon: MdBusiness,
      title: 'Corporate Events',
      description: 'Professional transportation for business conferences, team building events, and corporate outings. Modern buses with WiFi and power outlets available.'
    },
    {
      Icon: MdStar,
      title: 'Custom Packages',
      description: 'Tailored travel solutions designed around your specific needs. Work with our team to create the perfect itinerary for your group\'s unique journey.'
    },
    {
      Icon: MdSchool,
      title: 'School Field Trips',
      description: 'Safe and comfortable transportation for educational trips and excursions. Experienced drivers trained in student safety protocols with proper insurance coverage.'
    },
    {
      Icon: MdFavorite,
      title: 'Wedding & Events',
      description: 'Elegant transportation for weddings, birthdays, and special celebrations. Coordinated shuttle services ensuring your guests arrive on time and in style.'
    },
    {
      Icon: MdExplore,
      title: 'City Tours',
      description: 'Guided sightseeing tours and day trips to popular destinations. Explore local attractions with comfortable rides and knowledgeable tour coordinators.'
    }
  ];

  return (
    <section id="services" className="py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.Icon;
            return (
              <div
                key={index}
                className="bg-white p-10 rounded-xl shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
              >
                <div className="w-[70px] h-[70px] bg-blue-100 rounded-full flex items-center justify-center mb-6">
                  <Icon className="text-4xl text-primary" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed">{service.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Services;
