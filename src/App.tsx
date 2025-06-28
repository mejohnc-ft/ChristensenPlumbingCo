import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Wrench, 
  Droplets, 
  Zap, 
  ShieldCheck,
  Star,
  Quote,
  Send,
  Calendar,
  Award,
  Users,
  ThumbsUp
} from 'lucide-react';

interface Testimonial {
  name: string;
  location: string;
  text: string;
  rating: number;
  service: string;
}

interface Service {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
}

function App() {
  const [activeTab, setActiveTab] = useState('services');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });

  const testimonials: Testimonial[] = [
    {
      name: "Sarah Johnson",
      location: "La Jolla",
      text: "Outstanding service! They fixed our emergency leak at 10 PM and didn't charge extra for the late hour. True professionals who care about their customers.",
      rating: 5,
      service: "Emergency Repair"
    },
    {
      name: "Mike Rodriguez",
      location: "Mission Valley",
      text: "Christensen Plumbing transformed our outdated bathroom completely. The attention to detail and quality of work exceeded our expectations.",
      rating: 5,
      service: "Bathroom Renovation"
    },
    {
      name: "Emily Chen",
      location: "Carlsbad",
      text: "Fast, reliable, and honest pricing. They diagnosed the issue quickly and explained everything clearly. Will definitely use them again.",
      rating: 5,
      service: "Diagnostic & Repair"
    },
    {
      name: "David Thompson",
      location: "Chula Vista",
      text: "Incredible work on our whole-house repiping project. Clean, efficient, and completed ahead of schedule. Highly recommend!",
      rating: 5,
      service: "Repiping"
    }
  ];

  const services: Service[] = [
    {
      icon: <Droplets className="w-8 h-8" />,
      title: "Emergency Plumbing",
      description: "24/7 emergency services for urgent plumbing issues. We're here when you need us most.",
      features: ["24/7 Availability", "Rapid Response", "No Extra Charges", "Licensed Technicians"]
    },
    {
      icon: <Wrench className="w-8 h-8" />,
      title: "Pipe Repair & Installation",
      description: "Professional pipe services from minor repairs to complete repiping systems.",
      features: ["Leak Detection", "Pipe Replacement", "Repiping", "Preventive Maintenance"]
    },
    {
      icon: <ShieldCheck className="w-8 h-8" />,
      title: "Drain Cleaning",
      description: "Advanced drain cleaning and clog removal using the latest technology.",
      features: ["Hydro Jetting", "Camera Inspection", "Root Removal", "Preventive Cleaning"]
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Water Heater Services",
      description: "Complete water heater solutions including installation, repair, and maintenance.",
      features: ["Installation", "Repairs", "Maintenance", "Energy Efficient Options"]
    }
  ];

  const photos = [
    "https://images.pexels.com/photos/8199204/pexels-photo-8199204.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/834892/pexels-photo-834892.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/1855582/pexels-photo-1855582.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/416978/pexels-photo-416978.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/1358900/pexels-photo-1358900.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/1234567/pexels-photo-1234567.jpeg?auto=compress&cs=tinysrgb&w=600"
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    alert('Thank you for your inquiry! We will contact you within 2 hours during business hours.');
    setFormData({ name: '', email: '', phone: '', service: '', message: '' });
  };

  const handleEmergencyCall = () => {
    window.location.href = 'tel:+16194332169';
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${i < rating ? 'text-amber-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-blue-50 to-teal-50">
      {/* Header */}
      <header className="bg-white shadow-xl sticky top-0 z-50 border-b-4 border-gradient-to-r from-orange-500 to-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-3 rounded-xl shadow-lg">
                <Wrench className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-800 to-teal-700 bg-clip-text text-transparent">
                  Christensen Plumbing Co.
                </h1>
                <p className="text-sm text-orange-600 font-bold">San Diego's Trusted Plumbers</p>
              </div>
            </div>
            
            <div className="hidden md:flex items-center space-x-6">
              <div className="flex items-center space-x-2 text-gray-800">
                <Phone className="w-4 h-4 text-orange-600" />
                <span className="font-bold">(619) 433-2169</span>
              </div>
              <div className="flex items-center space-x-3">
                <button 
                  onClick={() => setActiveTab('contact')}
                  className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-all duration-200 font-bold shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Service Request
                </button>
                <button 
                  onClick={handleEmergencyCall}
                  className="bg-red-500 text-white px-4 py-3 rounded-full hover:bg-red-600 transition-all duration-200 font-bold shadow-lg hover:shadow-xl transform hover:scale-105 text-sm"
                >
                  Emergency<br/>(619) 433-2169
                </button>
              </div>
            </div>
          </div>
          
          {/* Navigation Tabs */}
          <nav className="border-t border-gray-200">
            <div className="flex space-x-8">
              {[
                { id: 'services', label: 'Services', icon: <Wrench className="w-4 h-4" /> },
                { id: 'testimonials', label: 'Testimonials', icon: <Quote className="w-4 h-4" /> },
                { id: 'contact', label: 'Contact', icon: <Mail className="w-4 h-4" /> },
                { id: 'photos', label: 'Our Work', icon: <Award className="w-4 h-4" /> }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-2 border-b-3 font-bold text-sm transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'border-orange-500 text-orange-600 bg-orange-50'
                      : 'border-transparent text-gray-600 hover:text-blue-700 hover:border-blue-300 hover:bg-blue-50'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Services Tab */}
        {activeTab === 'services' && (
          <div className="space-y-12">
            {/* Hero Section */}
            <section className="text-center py-16 bg-blue-700 rounded-3xl text-white shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="relative z-10">
                <h2 className="text-5xl md:text-6xl font-black mb-6 drop-shadow-lg">Expert Plumbing Services</h2>
                <p className="text-xl mb-8 text-blue-100 max-w-3xl mx-auto font-medium">
                  Proudly serving San Diego County with reliable, professional plumbing solutions for over 20 years.
                </p>
                <div className="flex flex-wrap justify-center gap-8 text-sm font-bold">
                  <div className="flex items-center space-x-2 bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm">
                    <ShieldCheck className="w-5 h-5" />
                    <span>Licensed & Insured</span>
                  </div>
                  <div className="flex items-center space-x-2 bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm">
                    <Users className="w-5 h-5" />
                    <span>5000+ Happy Customers</span>
                  </div>
                  <div className="flex items-center space-x-2 bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm">
                    <ThumbsUp className="w-5 h-5" />
                    <span>5-Star Rated</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Services Grid */}
            <section>
              <h3 className="text-4xl font-black text-gray-900 mb-8 text-center">Our Services</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {services.map((service, index) => (
                  <div key={index} className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-gray-100 hover:border-orange-300 transform hover:scale-105">
                    <div className="text-orange-600 mb-4 bg-orange-100 p-3 rounded-xl w-fit">{service.icon}</div>
                    <h4 className="text-xl font-black text-gray-900 mb-3">{service.title}</h4>
                    <p className="text-gray-600 mb-6 font-medium">{service.description}</p>
                    <ul className="space-y-2">
                      {service.features.map((feature, i) => (
                        <li key={i} className="flex items-center space-x-2 text-sm text-gray-700 font-medium">
                          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* Testimonials Tab */}
        {activeTab === 'testimonials' && (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-4xl font-black text-gray-900 mb-4">What San Diego Says About Us</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto font-medium">
                Don't just take our word for it. See what our satisfied customers across San Diego County have to say.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-white p-8 rounded-2xl shadow-xl border-2 border-gray-100 hover:shadow-2xl transition-all duration-300 hover:border-teal-300 transform hover:scale-105">
                  <div className="flex items-center space-x-1 mb-4">
                    {renderStars(testimonial.rating)}
                  </div>
                  <Quote className="w-8 h-8 text-orange-200 mb-4" />
                  <p className="text-gray-700 mb-6 italic font-medium">"{testimonial.text}"</p>
                  <div className="border-t border-gray-200 pt-4">
                    <h4 className="font-black text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600 font-medium">{testimonial.location}, San Diego County</p>
                    <span className="inline-block mt-2 bg-gradient-to-r from-orange-100 to-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-bold border border-blue-200">
                      {testimonial.service}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Contact Tab */}
        {activeTab === 'contact' && (
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-4xl font-black text-gray-900 mb-6">Get In Touch</h2>
              <p className="text-lg text-gray-600 mb-8 font-medium">
                Ready to solve your plumbing issues? Contact us today for a free estimate or emergency service across San Diego County.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-100 p-4 rounded-xl border-2 border-blue-200">
                    <Phone className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="font-black text-gray-900">Phone</h4>
                    <p className="text-gray-600 font-bold">(619) 433-2169</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-100 p-4 rounded-xl border-2 border-blue-200">
                    <Mail className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-black text-gray-900">Email</h4>
                    <p className="text-gray-600 font-bold">info@christensenplumbing.com</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-100 p-4 rounded-xl border-2 border-blue-200">
                    <MapPin className="w-6 h-6 text-teal-600" />
                  </div>
                  <div>
                    <h4 className="font-black text-gray-900">Service Area</h4>
                    <p className="text-gray-600 font-bold">All of San Diego County</p>
                    <p className="text-sm text-gray-500 font-medium">From Oceanside to Chula Vista</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-100 p-4 rounded-xl border-2 border-blue-200">
                    <Calendar className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="font-black text-gray-900">Hours</h4>
                    <p className="text-gray-600 font-bold">Mon-Fri: 6AM-8PM<br />Emergency Service: 24/7</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-xl border-2 border-gray-100">
              <h3 className="text-2xl font-black text-gray-900 mb-6">Request Service</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-black text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 font-medium"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-black text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 font-medium"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-black text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 font-medium"
                  />
                </div>
                
                <div>
                  <label htmlFor="service" className="block text-sm font-black text-gray-700 mb-2">
                    Service Needed
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 font-medium"
                  >
                    <option value="">Select a service</option>
                    <option value="emergency">Emergency Repair</option>
                    <option value="installation">Installation</option>
                    <option value="maintenance">Maintenance</option>
                    <option value="inspection">Inspection</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-black text-gray-700 mb-2">
                    Describe Your Issue *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 font-medium"
                    placeholder="Please describe your plumbing issue in detail..."
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-4 px-6 rounded-xl hover:bg-blue-700 transition-all duration-200 font-black shadow-xl hover:shadow-2xl flex items-center justify-center space-x-2 transform hover:scale-105"
                >
                  <Send className="w-5 h-5" />
                  <span>Send Request</span>
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Photos Tab */}
        {activeTab === 'photos' && (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-4xl font-black text-gray-900 mb-4">Our Work Speaks for Itself</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto font-medium">
                Take a look at some of our recent projects across San Diego County and see the quality craftsmanship that sets us apart.
              </p>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {photos.map((photo, index) => (
                <div key={index} className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-gray-200 hover:border-orange-300">
                  <img
                    src={photo}
                    alt={`Plumbing work example ${index + 1}`}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 text-white">
                      <p className="font-black text-lg">Professional Installation</p>
                      <p className="text-sm text-orange-200 font-bold">Quality workmanship guaranteed</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-900 via-blue-900 to-teal-900 text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-blue-600 p-3 rounded-lg shadow-lg">
                  <Wrench className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-black">Christensen Plumbing Co.</h3>
                  <p className="text-orange-300 text-sm font-bold">San Diego's trusted plumbing partner</p>
                </div>
              </div>
              <p className="text-gray-300 font-medium">
                Professional plumbing services across San Diego County with a commitment to excellence and customer satisfaction.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-black mb-4">Quick Contact</h4>
              <div className="space-y-2 text-gray-300 font-medium">
                <p>📞 (619) 433-2169</p>
                <p>✉️ info@christensenplumbing.com</p>
                <p>🏠 Serving All San Diego County</p>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-black mb-4">Emergency Service</h4>
              <p className="text-gray-300 mb-4 font-medium">
                Available 24/7 for plumbing emergencies across San Diego County. Don't wait - call us now!
              </p>
              <button 
                onClick={handleEmergencyCall}
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-full transition-all duration-200 font-black shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Emergency Line
              </button>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p className="font-medium">&copy; 2024 Christensen Plumbing Co. All rights reserved. Licensed & Insured in San Diego County.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;