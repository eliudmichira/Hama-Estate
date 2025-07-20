import React, { useState, useEffect } from 'react';
import { MessageCircle, Phone, Mail, MapPin, Send, ArrowLeft, Clock, Shield, Award, Users } from 'lucide-react';

function ContactPage() {
  // Mock authentication context and navigation
  const currentUser = {
    name: '',
    email: '',
    phone: ''
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [contactData, setContactData] = useState({
    propertyTitle: "Modern 3-Bedroom Apartment in Westlands",
    agentName: "Grace Wanjiku",
    agentEmail: "grace.wanjiku@kenyarealestate.co.ke"
  });
  
  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    phone: currentUser?.phone || '',
    message: '',
    preferredContact: 'whatsapp',
    scheduleTour: false,
    tourDate: '',
    tourTime: ''
  });

  const [notification, setNotification] = useState(null);

  useEffect(() => {
    // Simulate loading contact data (since localStorage isn't supported)
    // In a real app, this would come from props or URL parameters
    const mockContactData = {
      propertyTitle: "Modern 3-Bedroom Apartment in Westlands",
      agentName: "Grace Wanjiku",
      agentEmail: "grace.wanjiku@kenyarealestate.co.ke"
    };
    setContactData(mockContactData);
  }, []);

  const handleSubmit = async () => {
    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      setNotification({
        type: 'error',
        title: 'Missing Information',
        message: 'Please fill in all required fields.',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Show success notification
      setNotification({
        type: 'success',
        title: 'Message Sent Successfully!',
        message: 'We\'ve received your inquiry and will get back to you within 24 hours.',
      });

      // Clear form
      setFormData({
        name: currentUser?.name || '',
        email: currentUser?.email || '',
        phone: currentUser?.phone || '',
        message: '',
        preferredContact: 'whatsapp',
        scheduleTour: false,
        tourDate: '',
        tourTime: ''
      });

    } catch (error) {
      setNotification({
        type: 'error',
        title: 'Message Failed',
        message: 'Failed to send message. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackNavigation = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      // Fallback if no history
      window.location.href = '/properties';
    }
  };

  const closeNotification = () => {
    setNotification(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      {/* Notification */}
      {notification && (
        <div className={`fixed top-6 right-6 z-50 p-6 rounded-2xl shadow-2xl transform transition-all duration-500 max-w-md ${
          notification.type === 'success' 
            ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white' 
            : 'bg-gradient-to-r from-red-500 to-pink-600 text-white'
        }`}>
          <div className="flex items-start justify-between">
            <div>
              <h4 className="font-bold text-lg mb-1">{notification.title}</h4>
              <p className="text-sm opacity-90">{notification.message}</p>
            </div>
            <button 
              onClick={closeNotification}
              className="ml-4 text-white/80 hover:text-white transition-colors text-xl font-bold"
            >
              ×
            </button>
          </div>
        </div>
      )}

      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-12">
          <button
            onClick={handleBackNavigation}
            className="flex items-center gap-3 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mb-6 transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Back to Property</span>
          </button>
          
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent mb-4">
              Contact Our Expert
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              Ready to make your dream home a reality? Get in touch with our professional real estate team.
            </p>
          </div>
        </div>

        <div className="grid xl:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Contact Form */}
          <div className="xl:col-span-2">
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20 dark:border-gray-700/20 transition-colors duration-300">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">Send Us a Message</h2>
                <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
              </div>
              
              {contactData?.propertyTitle && (
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 border-l-4 border-blue-500 rounded-xl p-6 mb-8 transition-colors duration-300">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="font-bold text-gray-800 dark:text-gray-100 text-lg">Property Inquiry</h3>
                  </div>
                  <p className="text-gray-700 dark:text-gray-200 font-medium">{contactData.propertyTitle}</p>
                </div>
              )}

              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200">Full Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 dark:focus:ring-blue-900 dark:focus:border-blue-400 transition-all duration-200 bg-white dark:bg-gray-700 dark:text-gray-100"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200">Email Address</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 dark:focus:ring-blue-900 dark:focus:border-blue-400 transition-all duration-200 bg-white dark:bg-gray-700 dark:text-gray-100"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200">Phone Number</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 dark:focus:ring-blue-900 dark:focus:border-blue-400 transition-all duration-200 bg-white dark:bg-gray-700 dark:text-gray-100"
                      placeholder="+254 7XX XXX XXX"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200">Preferred Contact Method</label>
                    <select
                      value={formData.preferredContact}
                      onChange={(e) => setFormData({ ...formData, preferredContact: e.target.value })}
                      className="w-full px-4 py-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 dark:focus:ring-blue-900 dark:focus:border-blue-400 transition-all duration-200 bg-white dark:bg-gray-700 dark:text-gray-100"
                    >
                      <option value="whatsapp">WhatsApp</option>
                      <option value="email">Email</option>
                      <option value="phone">Phone Call</option>
                      <option value="sms">SMS</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200">Your Message</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={5}
                    className="w-full px-4 py-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 dark:focus:ring-blue-900 dark:focus:border-blue-400 transition-all duration-200 bg-white dark:bg-gray-700 dark:text-gray-100 resize-none"
                    placeholder="Tell us about your interest in this property, your timeline, budget range, or any questions you have..."
                    required
                  />
                </div>

                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6 border-2 border-gray-100 dark:border-gray-600 transition-colors duration-300">
                  <div className="flex items-center gap-4 mb-4">
                    <input
                      type="checkbox"
                      id="scheduleTour"
                      checked={formData.scheduleTour}
                      onChange={(e) => setFormData({ ...formData, scheduleTour: e.target.checked })}
                      className="w-5 h-5 text-blue-600 border-2 border-gray-300 dark:border-gray-500 rounded focus:ring-blue-500 focus:ring-2"
                    />
                    <label htmlFor="scheduleTour" className="text-lg font-semibold text-gray-700 dark:text-gray-200 flex items-center gap-2">
                      <Clock className="w-5 h-5 text-blue-600" />
                      Schedule a Property Tour
                    </label>
                  </div>

                  {formData.scheduleTour && (
                    <div className="grid md:grid-cols-2 gap-4 mt-6">
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200">Preferred Date</label>
                        <input
                          type="date"
                          value={formData.tourDate}
                          onChange={(e) => setFormData({ ...formData, tourDate: e.target.value })}
                          className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 dark:focus:ring-blue-900 dark:focus:border-blue-400 transition-all duration-200 bg-white dark:bg-gray-700 dark:text-gray-100"
                          min={new Date().toISOString().split('T')[0]}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200">Preferred Time</label>
                        <select
                          value={formData.tourTime}
                          onChange={(e) => setFormData({ ...formData, tourTime: e.target.value })}
                          className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 dark:focus:ring-blue-900 dark:focus:border-blue-400 transition-all duration-200 bg-white dark:bg-gray-700 dark:text-gray-100"
                        >
                          <option value="">Select your preferred time</option>
                          <option value="morning">Morning (9:00 AM - 12:00 PM)</option>
                          <option value="afternoon">Afternoon (12:00 PM - 5:00 PM)</option>
                          <option value="evening">Evening (5:00 PM - 8:00 PM)</option>
                        </select>
                      </div>
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-600 via-blue-700 to-purple-600 text-white font-bold py-5 px-8 rounded-2xl hover:shadow-2xl hover:shadow-blue-500/25 transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3 text-lg"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                      Sending Message...
                    </>
                  ) : (
                    <>
                      <Send className="w-6 h-6" />
                      Send Message
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Agent Info Sidebar */}
          <div className="space-y-6">
            {/* Agent Card */}
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20 dark:border-gray-700/20 transition-colors duration-300">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">Your Agent</h2>
              
              <div className="text-center mb-8">
                <div className="relative inline-block">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-500 via-purple-600 to-blue-600 rounded-full flex items-center justify-center shadow-xl mb-4">
                    <span className="text-white font-bold text-3xl">
                      {contactData?.agentName?.[0] || 'G'}
                    </span>
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white flex items-center justify-center">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-1">
                  {contactData?.agentName || 'Grace Wanjiku'}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 font-medium">Senior Real Estate Professional</p>
                <p className="text-sm text-green-600 font-semibold mt-1">● Available Now</p>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-4 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl transition-colors duration-300">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center">
                    <Mail className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-gray-800 dark:text-gray-200 font-medium truncate">
                      {contactData?.agentEmail || 'grace.wanjiku@kenyarealestate.co.ke'}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl transition-colors duration-300">
                  <div className="w-10 h-10 bg-green-100 dark:bg-green-900/50 rounded-full flex items-center justify-center">
                    <Phone className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-800 dark:text-gray-200 font-medium">+254 712 345 678</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl transition-colors duration-300">
                  <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/50 rounded-full flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-800 dark:text-gray-200 font-medium">WhatsApp: +254 712 345 678</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl transition-colors duration-300">
                  <div className="w-10 h-10 bg-red-100 dark:bg-red-900/50 rounded-full flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-red-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-800 dark:text-gray-200 font-medium">Nairobi, Kenya</p>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/50 dark:to-blue-800/50 rounded-xl p-4 text-center transition-colors duration-300">
                  <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">200+</div>
                  <div className="text-sm text-blue-600 dark:text-blue-400">Properties Sold</div>
                </div>
                <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/50 dark:to-emerald-800/50 rounded-xl p-4 text-center transition-colors duration-300">
                  <div className="text-2xl font-bold text-emerald-700 dark:text-emerald-300">4.8★</div>
                  <div className="text-sm text-emerald-600 dark:text-emerald-400">Client Rating</div>
                </div>
              </div>
            </div>

            {/* Why Choose Us */}
            <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-blue-50 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 rounded-3xl p-8 border-2 border-blue-100 dark:border-gray-600 transition-colors duration-300">
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6 text-center">Why Choose Our Team?</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 dark:text-gray-100 mb-1">Market Expertise</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">Deep local market knowledge with 10+ years of experience</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 dark:text-gray-100 mb-1">Personalized Service</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">Tailored approach to match your unique needs and timeline</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 dark:text-gray-100 mb-1">Trusted Partner</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">Proven track record with 600+ satisfied clients</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-4 bg-white/60 dark:bg-gray-800/60 rounded-xl border border-white/40 dark:border-gray-600/40 transition-colors duration-300">
                <p className="text-center text-gray-700 dark:text-gray-300 text-sm font-medium">
                  <Clock className="w-4 h-4 inline-block mr-2 text-blue-600" />
                  We typically respond within <strong>2 hours</strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;