import { MdAirlineSeatReclineNormal, MdAcUnit, MdMic, MdKitchen, MdLuggage, MdSecurity, MdTv } from 'react-icons/md';

function Fleet() {
  const buses = [
    {
      name: 'Tourist Bus - 49 Seater',
      description: 'Our premium 49-seater tourist bus is designed for maximum comfort and entertainment during your journey. Perfect for group tours, corporate events, school trips, and special occasions.',
      features: [
        {
          Icon: MdAirlineSeatReclineNormal,
          title: '49 Seats',
          description: 'Comfortable seating'
        },
        {
          Icon: MdAcUnit,
          title: 'Air Conditioning',
          description: 'Climate control'
        },
        {
          Icon: MdMic,
          title: 'Karaoke System',
          description: 'Entertainment'
        },
        {
          Icon: MdTv,
          title: 'Smart TV',
          description: 'HD entertainment'
        },
        {
          Icon: MdKitchen,
          title: 'Mini Refrigerator',
          description: 'Refreshments'
        },
        {
          Icon: MdLuggage,
          title: 'Luggage Space',
          description: 'Ample storage'
        },
        {
          Icon: MdSecurity,
          title: 'Safety Features',
          description: 'Certified & insured'
        }
      ]
    },
    {
      name: 'Tourist Bus - 60 Seater',
      description: 'Our spacious 60-seater tourist bus offers premium amenities and extra capacity for larger groups. Ideal for major corporate events, extended tours, large family gatherings, and school field trips.',
      features: [
        {
          Icon: MdAirlineSeatReclineNormal,
          title: '60 Seats',
          description: 'Spacious seating'
        },
        {
          Icon: MdAcUnit,
          title: 'Air Conditioning',
          description: 'Climate control'
        },
        {
          Icon: MdMic,
          title: 'Karaoke System',
          description: 'Entertainment'
        },
        {
          Icon: MdTv,
          title: 'Smart TV',
          description: 'HD entertainment'
        },
        {
          Icon: MdKitchen,
          title: 'Mini Refrigerator',
          description: 'Refreshments'
        },
        {
          Icon: MdLuggage,
          title: 'Extra Luggage Space',
          description: 'Large storage capacity'
        },
        {
          Icon: MdSecurity,
          title: 'Safety Features',
          description: 'Certified & insured'
        }
      ]
    }
  ];

  return (
    <section id="fleet" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-8">
        <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center">Our Fleet</h2>
        <p className="text-lg text-gray-600 text-center mb-16">
          Choose from our premium fleet of tourist buses designed for comfort and reliability
        </p>

        <div className="space-y-8">
          {buses.map((bus, busIndex) => (
            <div key={busIndex} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="flex flex-col lg:flex-row">
                
                <div className="lg:w-[400px] h-[300px] lg:h-auto bg-gradient-to-br from-blue-100 to-blue-300 flex items-center justify-center flex-shrink-0">
                  <span className="text-8xl">🚌</span>
                </div>

                
                <div className="flex-1 p-8">
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">{bus.name}</h3>
                  <p className="text-gray-600 leading-relaxed mb-8">
                    {bus.description}
                  </p>

                  
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {bus.features.map((feature, index) => {
                      const Icon = feature.Icon;
                      return (
                        <div key={index} className="flex flex-col items-start gap-2">
                          <div className="w-[50px] h-[50px] bg-blue-100 rounded-full flex items-center justify-center">
                            <Icon className="text-2xl text-primary" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 text-sm">{feature.title}</h4>
                            <p className="text-gray-600 text-xs">{feature.description}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Fleet;
