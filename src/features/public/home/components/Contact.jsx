import { useState } from 'react';
import { MdLocationOn, MdPhone, MdEmail, MdAccessTime } from 'react-icons/md';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Message sent! We will get back to you soon.');
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  const contactInfo = [
    {
      Icon: MdLocationOn,
      title: 'Our Office',
      details: ['9 4 Falcon Vallejo Place Pasong Buaya II Cavite 4103']
    },
    {
      Icon: MdPhone,
      title: 'Phone',
      details: ['+1 (555) 123-4567', 'Mon-Fri: 8AM - 8PM', 'Sat-Sun: 9AM - 6PM']
    },
    {
      Icon: MdEmail,
      title: 'Email',
      details: ['info@searchgear.com', 'bookings@searchgear.com']
    },
    {
      Icon: MdAccessTime,
      title: '24/7 Support',
      details: ['Emergency hotline available round the clock for active bookings and urgent inquiries']
    }
  ];

  return (
    <section id="contact" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Get In Touch</h2>
          <p className="text-lg text-gray-600">Have questions? We're here to help you plan your perfect journey</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="flex flex-col gap-8">
            {contactInfo.map((info, index) => {
              const Icon = info.Icon;
              return (
                <div key={index} className="flex gap-6 items-start">
                  <div className="w-[60px] h-[60px] bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <Icon className="text-2xl text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{info.title}</h3>
                    {info.details.map((detail, idx) => (
                      <p key={idx} className="text-gray-600 leading-relaxed">
                        {detail}
                      </p>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="bg-white p-10 rounded-xl shadow-md">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">Send Us a Message</h3>
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div>
                <label htmlFor="name" className="block font-semibold text-gray-900 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary transition-colors"
                />
              </div>

              <div>
                <label htmlFor="email" className="block font-semibold text-gray-900 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary transition-colors"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block font-semibold text-gray-900 mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary transition-colors"
                />
              </div>

              <div>
                <label htmlFor="message" className="block font-semibold text-gray-900 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary transition-colors resize-y"
                ></textarea>
              </div>

              <button
                type="submit"
                className="bg-primary hover:bg-primary-dark text-white px-6 py-4 rounded-lg font-semibold transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
