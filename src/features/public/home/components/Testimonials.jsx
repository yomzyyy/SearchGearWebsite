import { MdStar } from 'react-icons/md';

function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: 'Michael Kim',
      role: 'Newlywed',
      initials: 'MK',
      rating: 5,
      text: 'Booked for our wedding guests and couldn\'t be happier. The buses arrived on time, looked elegant, and all our guests commented on how comfortable the ride was. Thank you!'
    },
    {
      id: 2,
      name: 'Lisa Patterson',
      role: 'Retired Teacher',
      initials: 'LP',
      rating: 5,
      text: 'The coastal paradise tour was breathtaking! Every detail was handled professionally, from booking to the final drop-off. The bus amenities made the long journey enjoyable.'
    },
    {
      id: 3,
      name: 'David Wilson',
      role: 'Business Owner',
      initials: 'DW',
      rating: 5,
      text: 'Outstanding service from start to finish. The online booking was easy, customer service was responsive, and the actual trip was flawless. Will definitely use again for future tours!'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-8">
        
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
          <p className="text-lg text-gray-600">
            Don't just take our word for it - hear from our satisfied customers
          </p>
        </div>

        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-slate-50 rounded-xl shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 p-8"
            >
              
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, index) => (
                  <MdStar key={index} className="text-primary text-xl" />
                ))}
              </div>

              
              <p className="text-gray-600 leading-relaxed mb-6">
                "{testimonial.text}"
              </p>

              
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0">
                  {testimonial.initials}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
