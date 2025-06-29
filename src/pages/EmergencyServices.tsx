import React from 'react';
import { Phone, Clock, AlertTriangle, Wrench, Droplets, Zap, ArrowLeft } from 'lucide-react';

interface EmergencyServicesProps {
  onBack: () => void;
}

const EmergencyServices: React.FC<EmergencyServicesProps> = ({ onBack }) => {
  const emergencyServices = [
    {
      icon: <Droplets className="w-8 h-8" />,
      title: "Burst Pipes & Water Leaks",
      description: "Immediate response to prevent water damage",
      response: "15-30 minutes"
    },
    {
      icon: <AlertTriangle className="w-8 h-8" />,
      title: "Sewer Line Backups",
      description: "Emergency drain clearing and sewer repairs",
      response: "20-45 minutes"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Water Heater Failures",
      description: "Emergency water heater repair and replacement",
      response: "30-60 minutes"
    },
    {
      icon: <Wrench className="w-8 h-8" />,
      title: "Gas Line Issues",
      description: "Immediate gas leak detection and repair",
      response: "10-20 minutes"
    }
  ];

  const handleEmergencyCall = () => {
    window.location.href = 'tel:+16194332169';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50">
      {/* Header */}
      <div className="bg-red-600 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-red-100 hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Main Site</span>
          </button>
          
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <AlertTriangle className="w-12 h-12 text-yellow-300" />
              <h1 className="text-4xl font-bold">Emergency Plumbing Services</h1>
            </div>
            <p className="text-xl text-red-100 mb-6">
              24/7 Emergency Response Across San Diego County
            </p>
            <button
              onClick={handleEmergencyCall}
              className="bg-yellow-500 hover:bg-yellow-400 text-black px-8 py-4 rounded-lg text-xl font-bold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
            >
              <Phone className="w-6 h-6 inline mr-2" />
              CALL NOW: (619) 433-2169
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Emergency Info */}
        <div className="bg-white rounded-lg shadow-xl p-8 mb-12">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <Clock className="w-12 h-12 text-red-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">24/7 Availability</h3>
              <p className="text-gray-600">We're available around the clock, every day of the year</p>
            </div>
            <div className="flex flex-col items-center">
              <AlertTriangle className="w-12 h-12 text-orange-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Rapid Response</h3>
              <p className="text-gray-600">Average response time under 30 minutes</p>
            </div>
            <div className="flex flex-col items-center">
              <Phone className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Direct Line</h3>
              <p className="text-gray-600">Speak directly with our emergency dispatch</p>
            </div>
          </div>
        </div>

        {/* Emergency Services Grid */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Emergency Services We Handle</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {emergencyServices.map((service, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-red-600">
                <div className="flex items-start space-x-4">
                  <div className="text-red-600 bg-red-50 p-3 rounded-lg">
                    {service.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
                    <p className="text-gray-600 mb-3">{service.description}</p>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-orange-600" />
                      <span className="text-sm font-semibold text-orange-600">
                        Response Time: {service.response}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* What to Do Section */}
        <div className="bg-gray-50 rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">What to Do in a Plumbing Emergency</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-bold text-red-600 mb-4">Immediate Steps:</h3>
              <ol className="space-y-2 text-gray-700">
                <li className="flex items-start space-x-2">
                  <span className="bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">1</span>
                  <span>Turn off the main water supply if possible</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">2</span>
                  <span>Call us immediately at (619) 433-2169</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">3</span>
                  <span>Move valuables away from affected areas</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">4</span>
                  <span>Take photos for insurance if safe to do so</span>
                </li>
              </ol>
            </div>
            <div>
              <h3 className="text-lg font-bold text-orange-600 mb-4">For Gas Leaks:</h3>
              <ol className="space-y-2 text-gray-700">
                <li className="flex items-start space-x-2">
                  <span className="bg-orange-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">1</span>
                  <span>Evacuate the area immediately</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="bg-orange-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">2</span>
                  <span>Do not use electrical switches or phones</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="bg-orange-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">3</span>
                  <span>Call 911 and the gas company</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="bg-orange-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">4</span>
                  <span>Call us from a safe location</span>
                </li>
              </ol>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-red-600 text-white rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Don't Wait - Call Now!</h2>
          <p className="text-xl text-red-100 mb-6">
            Every minute counts in a plumbing emergency. Our certified technicians are standing by.
          </p>
          <button
            onClick={handleEmergencyCall}
            className="bg-yellow-500 hover:bg-yellow-400 text-black px-12 py-4 rounded-lg text-2xl font-bold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
          >
            <Phone className="w-8 h-8 inline mr-3" />
            (619) 433-2169
          </button>
          <p className="text-red-100 mt-4 text-sm">
            Licensed • Insured • Available 24/7 • No Extra Emergency Fees
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmergencyServices;