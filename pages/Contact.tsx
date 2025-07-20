import React, { useState, type ChangeEvent, type FormEvent, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { 
  Send, 
  MapPin, 
  Phone, 
  Mail, 
  ChevronDown, 
  Instagram, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  Sparkles,
  ExternalLink,
  Facebook,
  Twitter,
  Star,
  Coffee,
  Calendar,
  UserCheck,
  Heart
} from "lucide-react";
import { useInView } from "react-intersection-observer";

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function Contact() {
  // Form state
  const [formData, setFormData] = useState<ContactFormData>({ name: '', email: '', subject: '', message: '' });
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [activeField, setActiveField] = useState<string | null>(null);

  // FAQ state
  const [activeFAQ, setActiveFAQ] = useState<number | null>(null);

  // Animation hooks
  const [formRef, formInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [infoRef, infoInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [faqRef, faqInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [statsRef, statsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Parallax scrolling effect
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const opacity1 = useTransform(scrollYProgress, [0, 0.3], [1, 0.3]);

  // Mouse position for hover effects
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Form handling
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFocus = (name: string) => {
    setActiveField(name);
  };

  const handleBlur = () => {
    setActiveField(null);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitStatus('submitting');
    
    // Simulate form submission
    setTimeout(() => {
      // 95% success rate simulation
      const isSuccess = Math.random() > 0.05;
      setSubmitStatus(isSuccess ? 'success' : 'error');
      
      if (isSuccess) {
        // Reset form after successful submission
        setFormData({ name: "", email: "", subject: "", message: "" });
      }
      
      // Reset success/error message after 5 seconds
      setTimeout(() => {
        if (isSuccess) setSubmitStatus('idle');
      }, 5000);
    }, 1500);
  };

  // FAQ data
  const faqItems = [
    {
      question: "Where can I buy Bogani yogurt?",
      answer: "Bogani probiotic yogurt is available in major supermarkets across Kenya including Naivas, Carrefour, and Quickmart. You can also order directly through our website for home delivery in select areas of Nairobi, Mombasa, and Kisumu with same-day delivery available for orders placed before 11am."
    },
    {
      question: "What makes Bogani yogurt different from others?",
      answer: "Bogani yogurt contains specially selected probiotic cultures that support gut health and immunity. We use fresh milk from carefully selected Kenyan farms and natural ingredients without artificial preservatives or colors. Our unique fermentation process ensures optimal probiotic content while maintaining a creamy, delicious texture that appeals to both yogurt lovers and those new to probiotics."
    },
    {
      question: "How long does Bogani yogurt stay fresh?",
      answer: "When properly refrigerated (between 2-4°C), Bogani yogurt stays fresh for up to 14 days from the date of manufacture. Always check the expiration date printed on the packaging, and remember that an unopened container will maintain freshness longer than one that has been opened. Once opened, consume within 5-7 days for optimal taste and probiotic benefits."
    },
    {
      question: "Do you offer bulk orders for events?",
      answer: "Yes! We offer special pricing for bulk orders for events, schools, or office functions. Custom packaging and branding options are available for quantities over 100 units. Please contact our sales team at sales@boganibytatumilk.co.ke or fill out the form on this page for custom quotes. We require at least 48 hours notice for bulk orders to ensure freshness and availability."
    },
    {
      question: "Is Bogani yogurt suitable for people with lactose intolerance?",
      answer: "Many people with lactose intolerance can enjoy Bogani yogurt because the fermentation process breaks down lactose. Our yogurt contains live cultures that produce lactase, the enzyme needed to digest lactose. However, sensitivity varies by individual, so we recommend starting with a small amount if you have lactose intolerance to see how your body responds."
    }
  ];

  // Company stats for enhanced section
  const companyStats = [
    { icon: <Coffee className="w-7 h-7 text-primaryRed" />, value: "9", label: "Flavor Varieties", suffix: "" },
    { icon: <Star className="w-7 h-7 text-berry" />, value: "7.2", label: "Facebook Likes", suffix: "K" },
    { icon: <UserCheck className="w-7 h-7 text-accentGreen" />, value: "7.9", label: "Facebook Followers", suffix: "K" },
    { icon: <Calendar className="w-7 h-7 text-cream" />, value: "2", label: "Customer Reviews", suffix: "" },
  ];

  // Business hours
  const businessHours = [
    { day: "Monday", hours: "8:00 AM - 5:00 PM" },
    { day: "Tuesday", hours: "8:00 AM - 5:00 PM" },
    { day: "Wednesday", hours: "8:00 AM - 5:00 PM" },
    { day: "Thursday", hours: "8:00 AM - 5:00 PM" },
    { day: "Friday", hours: "8:00 AM - 5:00 PM" },
    { day: "Saturday", hours: "9:00 AM - 2:00 PM" },
    { day: "Sunday", hours: "Closed" },
  ];

  // Contact information
  const contactInfo = {
    phone: "0748 913958",
    email: "boganiprobioticyogurt@gmail.com",
    location: "Nairobi, Kenya",
    social: {
      facebook: "https://web.facebook.com/boganibytatumilk"
    }
  };

  return (
    <div className="pt-28 pb-20 overflow-hidden relative bg-gradient-to-b from-white via-gray-50 to-white dark:from-gray-900 dark:via-gray-950 dark:to-gray-900">
      {/* Animated background blob */}
      <motion.div 
        className="absolute top-24 left-1/2 transform -translate-x-1/2 w-[800px] h-[800px] opacity-5 dark:opacity-10 rounded-full bg-gradient-to-br from-primaryRed via-accentGreen to-cream blur-3xl"
        animate={{
          scale: [1, 1.05, 1],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{ y: y1, opacity: opacity1 }}
      />
      
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-64 overflow-hidden z-0">
        <svg viewBox="0 0 1440 320" className="absolute top-0 -left-40 w-[150%] opacity-5 dark:opacity-10">
          <path 
            fill="#D50000" 
            d="M0,160L48,144C96,128,192,96,288,106.7C384,117,480,171,576,186.7C672,203,768,181,864,154.7C960,128,1056,96,1152,90.7C1248,85,1344,107,1392,117.3L1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
          ></path>
        </svg>
      </div>

      {/* Decorative floating circles */}
      <div className="fixed w-full h-full top-0 left-0 z-0 pointer-events-none overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full ${
              i % 4 === 0 ? "bg-primaryRed/5" : 
              i % 4 === 1 ? "bg-accentGreen/5" : 
              i % 4 === 2 ? "bg-berry/5" : 
              "bg-cream/5"
            }`}
            style={{
              width: `${Math.random() * 80 + 40}px`,
              height: `${Math.random() * 80 + 40}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, Math.random() * 100 - 50],
              x: [0, Math.random() * 100 - 50],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "easeInOut",
              repeatType: "reverse",
            }}
          />
        ))}
      </div>

      {/* Enhanced hero section */}
      <div className="relative z-10 mb-16">
        <div className="container mx-auto px-4">
          <motion.div
            className="flex flex-col items-center text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-block p-2 mb-4 bg-primaryRed/10 dark:bg-primaryRed/20 rounded-full"
              whileHover={{ scale: 1.05 }}
            >
              <Mail className="w-6 h-6 text-primaryRed" />
            </motion.div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
              <motion.span
                className="inline-block text-primaryRed dark:text-primaryRed/90 relative"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                Get in Touch
                <motion.div 
                  className="absolute -top-1 -right-2 w-3 h-3 bg-accentGreen rounded-full opacity-75"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <motion.div 
                  className="absolute -bottom-2 h-1 bg-accentGreen rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                />
              </motion.span>
            </h1>
            <motion.p
              className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              Have questions about our probiotic yogurt, want to place a bulk order, 
              or just want to say hello? Our team is here to help you!
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-3 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              <a 
                href="#contact-form" 
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-6 py-3 bg-gradient-to-r from-primaryRed to-primaryRed/90 text-white font-medium rounded-full hover:shadow-lg transition-all flex items-center gap-2 hover:scale-105 transform"
              >
                <Send size={16} />
                Send a Message
              </a>
              <a 
                href="tel:+254748913958" 
                className="px-6 py-3 bg-white dark:bg-gray-800 text-primaryRed dark:text-primaryRed/90 font-medium rounded-full border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all flex items-center gap-2"
              >
                <Phone size={16} />
                Call Us Now
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Company Stats Section */}
      <motion.section
        ref={statsRef}
        className="py-16 my-12 bg-gradient-to-r from-gray-50/50 to-white/50 dark:from-gray-900/50 dark:to-gray-800/50 backdrop-blur-sm relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={statsInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 bg-primaryRed/5 dark:bg-primaryRed/10 backdrop-blur-sm -z-10"></div>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {companyStats.map((stat, index) => (
              <motion.div
                key={index}
                className="bg-white/70 dark:bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 text-center hover:shadow-xl transition-shadow group"
                initial={{ opacity: 0, y: 30 }}
                animate={statsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -5 }}
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-gray-700/50 flex items-center justify-center transform group-hover:scale-110 transition-transform">
                  {stat.icon}
                </div>
                <h3 className="text-4xl font-bold text-gray-900 dark:text-white mb-2 flex items-center justify-center">
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={statsInView ? { opacity: 1 } : {}}
                    transition={{ delay: index * 0.1 + 0.3, duration: 0.8 }}
                  >
                    {stat.value}
                  </motion.span>
                  <span className="text-2xl ml-1 text-primaryRed dark:text-primaryRed/90">{stat.suffix}</span>
                </h3>
                <p className="text-gray-600 dark:text-gray-300">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <div className="container mx-auto max-w-6xl md:grid md:grid-cols-12 md:gap-12 relative z-10 px-4">
        {/* Contact Form Section */}
        <motion.section 
          ref={formRef}
          id="contact-form"
          className="mb-16 md:mb-0 md:col-span-6 lg:col-span-7"
          initial={{ opacity: 0, x: -30 }}
          animate={formInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <AnimatePresence mode="wait">
            {submitStatus === 'success' ? (
              <motion.div 
                className="bg-gradient-to-br from-green-50 to-white dark:from-green-900/30 dark:to-gray-900/80 backdrop-blur-lg border-l-4 border-accentGreen p-8 rounded-2xl shadow-xl"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.4 }}
                key="success"
              >
                <div className="relative">
                  <div className="absolute -top-10 -right-10">
                    <motion.div
                      animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 10, 0]
                      }}
                      transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <Sparkles className="w-12 h-12 text-accentGreen/20" />
                    </motion.div>
                  </div>
                
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-accentGreen/10 flex items-center justify-center">
                      <CheckCircle2 className="w-6 h-6 text-accentGreen" />
                    </div>
                    <h3 className="text-2xl font-bold text-accentGreen">Message Sent!</h3>
                  </div>
                  
                  <p className="text-gray-700 dark:text-gray-300 mb-6">Thank you for reaching out. Our team will get back to you shortly, usually within 24-48 hours.</p>
                  
                  <div className="p-4 bg-white dark:bg-gray-800/50 rounded-lg mb-6 border border-gray-100 dark:border-gray-700">
                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-gray-400 mt-1" />
                      <div>
                        <h4 className="font-medium text-gray-800 dark:text-white">Expected Response Time</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">We usually respond to inquiries within 24-48 hours during business days.</p>
                      </div>
                    </div>
                  </div>
                  
                  <motion.button
                    className="w-full py-3 rounded-lg bg-accentGreen/10 text-accentGreen font-medium flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.02, backgroundColor: "rgba(76, 175, 80, 0.15)" }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSubmitStatus('idle')}
                  >
                    Send another message
                  </motion.button>
                </div>
              </motion.div>
            ) : submitStatus === 'error' ? (
              <motion.div 
                className="bg-gradient-to-br from-red-50 to-white dark:from-red-900/30 dark:to-gray-900/80 border-l-4 border-red-500 p-8 rounded-2xl shadow-xl backdrop-blur-lg"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.4 }}
                key="error"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center">
                    <AlertCircle className="w-6 h-6 text-red-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-red-500">Message Not Sent</h3>
                </div>
                
                <p className="text-gray-700 dark:text-gray-300 mb-6">We're sorry, but there was an issue sending your message. Please try again in a few moments.</p>
                
                <motion.button
                  className="w-full py-3 rounded-lg bg-primaryRed/10 text-primaryRed font-medium flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02, backgroundColor: "rgba(213, 0, 0, 0.15)" }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSubmitStatus('idle')}
                >
                  Try again
                </motion.button>
              </motion.div>
            ) : (
              <motion.div 
                className="bg-white/80 dark:bg-gray-900/80 p-8 rounded-2xl shadow-xl relative overflow-hidden backdrop-blur-lg border border-gray-100 dark:border-gray-800"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                key="form"
              >
                {/* Decorative elements */}
                <div className="absolute -top-8 -right-8 w-32 h-32 bg-primaryRed rounded-full opacity-10 dark:opacity-20" />
                <div className="absolute -bottom-8 -left-8 w-20 h-20 bg-accentGreen rounded-full opacity-10 dark:opacity-20" />
                <div className="absolute top-1/4 left-1/2 w-16 h-16 bg-berry rounded-full opacity-10 dark:opacity-10 transform -translate-x-1/2" />
                <div className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-cream rounded-full opacity-10 dark:opacity-5" />
                
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primaryRed to-berry flex items-center justify-center shadow-md">
                      <Mail className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Send us a Message</h2>
                      <p className="text-sm text-gray-500 dark:text-gray-400">We'd love to hear from you</p>
                    </div>
                  </div>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="relative group">
                        <label 
                          htmlFor="name" 
                          className={`absolute left-3 transition-all duration-200 ${
                            activeField === 'name' || formData.name 
                              ? '-top-2.5 text-xs bg-white dark:bg-gray-900 px-1 text-primaryRed dark:text-primaryRed/90' 
                              : 'top-[14px] text-gray-500'
                          }`}
                        >
                          Full Name
                        </label>
                        <motion.input 
                          whileFocus={{ scale: 1.005 }}
                          transition={{ duration: 0.2 }}
                          type="text" 
                          id="name" 
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          onFocus={() => handleFocus('name')}
                          onBlur={handleBlur}
                          required 
                          className="w-full p-3 pl-3 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm focus:border-primaryRed focus:ring-1 focus:ring-primaryRed focus:outline-none transition-all bg-white dark:bg-gray-800 text-gray-800 dark:text-white group-hover:border-primaryRed/50" 
                        />
                        <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-primaryRed to-berry group-hover:w-full transition-all duration-300"></div>
                      </div>
                      <div className="relative group">
                        <label 
                          htmlFor="email" 
                          className={`absolute left-3 transition-all duration-200 ${
                            activeField === 'email' || formData.email 
                              ? '-top-2.5 text-xs bg-white dark:bg-gray-900 px-1 text-primaryRed dark:text-primaryRed/90' 
                              : 'top-[14px] text-gray-500'
                          }`}
                        >
                          Email Address
                        </label>
                        <motion.input 
                          whileFocus={{ scale: 1.005 }}
                          transition={{ duration: 0.2 }}
                          type="email" 
                          id="email" 
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          onFocus={() => handleFocus('email')}
                          onBlur={handleBlur}
                          required 
                          className="w-full p-3 pl-3 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm focus:border-primaryRed focus:ring-1 focus:ring-primaryRed focus:outline-none transition-all bg-white dark:bg-gray-800 text-gray-800 dark:text-white group-hover:border-primaryRed/50" 
                        />
                        <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-primaryRed to-berry group-hover:w-full transition-all duration-300"></div>
                      </div>
                    </div>
                    
                    <div className="relative group">
                      <label 
                        htmlFor="subject" 
                        className={`absolute left-3 transition-all duration-200 ${
                          activeField === 'subject' || formData.subject 
                            ? '-top-2.5 text-xs bg-white dark:bg-gray-900 px-1 text-primaryRed dark:text-primaryRed/90' 
                            : 'top-[14px] text-gray-500'
                        }`}
                      >
                        Subject
                      </label>
                      <motion.input 
                        whileFocus={{ scale: 1.005 }}
                        transition={{ duration: 0.2 }}
                        type="text" 
                        id="subject" 
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        onFocus={() => handleFocus('subject')}
                        onBlur={handleBlur}
                        required 
                        className="w-full p-3 pl-3 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm focus:border-primaryRed focus:ring-1 focus:ring-primaryRed focus:outline-none transition-all bg-white dark:bg-gray-800 text-gray-800 dark:text-white group-hover:border-primaryRed/50" 
                      />
                      <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-primaryRed to-berry group-hover:w-full transition-all duration-300"></div>
                    </div>
                    
                    <div className="relative group">
                      <label 
                        htmlFor="message" 
                        className={`absolute left-3 transition-all duration-200 ${
                          activeField === 'message' || formData.message 
                            ? '-top-2.5 text-xs bg-white dark:bg-gray-900 px-1 text-primaryRed dark:text-primaryRed/90' 
                            : 'top-[14px] text-gray-500'
                        }`}
                      >
                        Your Message
                      </label>
                      <motion.textarea 
                        whileFocus={{ scale: 1.005 }}
                        transition={{ duration: 0.2 }}
                        id="message" 
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        onFocus={() => handleFocus('message')}
                        onBlur={handleBlur}
                        rows={5} 
                        required 
                        className="w-full p-3 pl-3 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm focus:border-primaryRed focus:ring-1 focus:ring-primaryRed focus:outline-none transition-all bg-white dark:bg-gray-800 text-gray-800 dark:text-white group-hover:border-primaryRed/50"
                      ></motion.textarea>
                      <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-primaryRed to-berry group-hover:w-full transition-all duration-300"></div>
                    </div>
                    
                    <motion.button 
                      type="submit"
                      disabled={submitStatus === 'submitting'}
                      className="w-full px-6 py-4 rounded-xl bg-gradient-to-r from-primaryRed to-berry text-white font-bold text-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center relative overflow-hidden"
                      whileHover={{ 
                        scale: 1.02, 
                        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" 
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-r from-primaryRed/0 via-white/30 to-primaryRed/0"
                        animate={{ 
                          x: ['-100%', '200%'],
                        }}
                        transition={{ 
                          repeat: Infinity, 
                          duration: 3,
                          ease: "easeInOut" 
                        }}
                      />
                      
                      {submitStatus === 'submitting' ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Sending Message...
                        </>
                      ) : (
                        <>
                          <Send size={20} className="mr-2" />
                          Send Message
                        </>
                      )}
                    </motion.button>
                  </form>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.section>

        {/* Contact Info Section (Right Column) */}
        <motion.aside 
          ref={infoRef}
          className="md:col-span-6 lg:col-span-5"
          initial={{ opacity: 0, x: 30 }}
          animate={infoInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="bg-white/80 dark:bg-gray-900/80 p-6 rounded-2xl shadow-xl h-full flex flex-col backdrop-blur-lg border border-gray-100 dark:border-gray-800 relative overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-cream/20 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-berry/10 rounded-full blur-2xl"></div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accentGreen to-cream flex items-center justify-center shadow-md">
                  <MapPin className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-800 dark:text-white">Contact Information</h2>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Reach out and connect with us</p>
                </div>
              </div>
              
              <div className="space-y-4 mb-5">
                {/* Address */}
                <div className="flex items-start group">
                  <div className="flex-shrink-0 w-9 h-9 bg-gradient-to-br from-primaryRed/10 to-primaryRed/20 dark:from-primaryRed/20 dark:to-primaryRed/30 rounded-lg flex items-center justify-center mr-3 group-hover:from-primaryRed/20 group-hover:to-primaryRed/30 transition-colors">
                    <MapPin size={18} className="text-primaryRed" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-white text-base mb-0.5 group-hover:text-primaryRed transition-colors">Our Location</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Tatu Milk, Kiambaa, Nairobi, Kenya</p>
                    <motion.a 
                      href="https://goo.gl/maps/LkCzxvQk47JRkVDV9" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="mt-0.5 text-xs inline-flex items-center text-accentGreen hover:text-accentGreen/80 font-medium"
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <span>View on Google Maps</span>
                      <ExternalLink size={12} className="ml-1" />
                    </motion.a>
                  </div>
                </div>
                
                {/* Phone */}
                <div className="flex items-start group">
                  <div className="flex-shrink-0 w-9 h-9 bg-gradient-to-br from-primaryRed/10 to-primaryRed/20 dark:from-primaryRed/20 dark:to-primaryRed/30 rounded-lg flex items-center justify-center mr-3 group-hover:from-primaryRed/20 group-hover:to-primaryRed/30 transition-colors">
                    <Phone size={18} className="text-primaryRed" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-white text-base mb-0.5 group-hover:text-primaryRed transition-colors">Phone</h3>
                    <motion.a 
                      href="tel:+254748913958" 
                      className="text-sm text-gray-600 dark:text-gray-400 hover:text-accentGreen dark:hover:text-accentGreen transition-colors"
                      whileHover={{ scale: 1.01 }}
                    >
                      +254 748 913 958
                    </motion.a>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-0.5">
                      Mon-Fri from 8am to 5pm
                    </p>
                  </div>
                </div>
                
                {/* Email */}
                <div className="flex items-start group">
                  <div className="flex-shrink-0 w-9 h-9 bg-gradient-to-br from-primaryRed/10 to-primaryRed/20 dark:from-primaryRed/20 dark:to-primaryRed/30 rounded-lg flex items-center justify-center mr-3 group-hover:from-primaryRed/20 group-hover:to-primaryRed/30 transition-colors">
                    <Mail size={18} className="text-primaryRed" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-white text-base mb-0.5 group-hover:text-primaryRed transition-colors">Email</h3>
                    <motion.a 
                      href="mailto:info@boganibytatumilk.co.ke" 
                      className="text-sm text-gray-600 dark:text-gray-400 hover:text-accentGreen dark:hover:text-accentGreen transition-colors break-all"
                      whileHover={{ scale: 1.01 }}
                    >
                      info@boganibytatumilk.co.ke
                    </motion.a>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-0.5">
                      For general inquiries and support
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Business Hours in more compact format */}
              <div className="mb-5 bg-gray-50 dark:bg-gray-800/50 p-3 rounded-xl">
                <h3 className="font-semibold text-gray-800 dark:text-white text-base mb-2 flex items-center">
                  <Clock size={16} className="mr-2 text-primaryRed" />
                  Business Hours
                </h3>
                <div className="grid grid-cols-2 gap-1">
                  {businessHours.map((item, index) => (
                    <div key={index} className="text-xs">
                      <span className="text-gray-600 dark:text-gray-400 font-medium">{item.day}:</span>
                      <span className={`ml-1 ${item.day === 'Sunday' ? 'text-primaryRed dark:text-primaryRed/90' : 'text-gray-500 dark:text-gray-500'}`}>{item.hours}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Social Media Links */}
              <div>
                <h3 className="font-semibold text-gray-800 dark:text-white text-base mb-3 flex items-center">
                  <Heart size={14} className="mr-2 text-primaryRed" />
                  <span>Connect With Us</span>
                </h3>
                <div className="flex items-center gap-3">
                  <motion.a 
                    href="https://www.instagram.com/boganiprobioticyogurt/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-8 h-8 bg-gradient-to-br from-primaryRed/10 to-berry/30 dark:from-primaryRed/20 dark:to-berry/40 rounded-full flex items-center justify-center text-primaryRed transition-all"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Instagram size={16} />
                  </motion.a>
                  <motion.a 
                    href="https://www.facebook.com/BoganiYogurt" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-8 h-8 bg-gradient-to-br from-blue-500/10 to-blue-600/30 dark:from-blue-500/20 dark:to-blue-600/40 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-500 transition-all"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Facebook size={16} />
                  </motion.a>
                  <motion.a 
                    href="https://twitter.com/BoganiYogurt" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-8 h-8 bg-gradient-to-br from-accentGreen/10 to-accentGreen/30 dark:from-accentGreen/20 dark:to-accentGreen/40 rounded-full flex items-center justify-center text-accentGreen transition-all"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Twitter size={16} />
                  </motion.a>
                  <span className="text-xs text-gray-600 dark:text-gray-400">
                    Follow for recipes, tips & more!
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.aside>
      </div>

      {/* Map Section - Separated into its own container */}
      <motion.section 
        className="max-w-4xl mx-auto mt-16 px-4 relative z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <div className="bg-white/80 dark:bg-gray-900/80 p-6 rounded-2xl shadow-xl relative overflow-hidden backdrop-blur-lg border border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accentGreen to-cream flex items-center justify-center shadow-md">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Find Us</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">Tatu Milk, Kiambaa, Nairobi, Kenya</p>
            </div>
          </div>
          
          <div className="relative rounded-xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700 h-[400px]">
            <iframe 
              src="https://maps.google.com/maps?q=Tatu%20Milk%2C%20Kiambaa%2C%20Nairobi%2C%20Kenya&t=&z=13&ie=UTF8&iwloc=&output=embed" 
              width="100%" 
              height="100%" 
              style={{ border:0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Bogani by Tatu Milk Location"
              className="rounded-xl"
            ></iframe>
          </div>
          
          <div className="mt-4 flex justify-end">
            <motion.a 
              href="https://goo.gl/maps/LkCzxvQk47JRkVDV9" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-sm inline-flex items-center text-accentGreen hover:text-accentGreen/80 font-medium"
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <span>View on Google Maps</span>
              <ExternalLink size={14} className="ml-1" />
            </motion.a>
          </div>
        </div>
      </motion.section>

      {/* FAQ Section */}
      <motion.section 
        className="max-w-4xl mx-auto mt-24 px-4 relative z-10"
        ref={faqRef}
        initial={{ opacity: 0, y: 30 }}
        animate={faqInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        style={{ y: y2 }}
      >
        <div className="text-center mb-10">
          <motion.div
            className="w-16 h-16 rounded-full bg-accentGreen/10 flex items-center justify-center mx-auto mb-4"
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 5, 0]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Sparkles className="w-7 h-7 text-accentGreen" />
          </motion.div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Everything you need to know about our yogurt products and services. Can't find what you're looking for? Feel free to contact us.</p>
        </div>
        
        <div className="space-y-5 mt-12">
          {faqItems.map((item, index) => (
            <motion.div 
              key={index} 
              className="bg-white/80 dark:bg-gray-900/80 rounded-xl shadow-md overflow-hidden border border-gray-100 dark:border-gray-800 backdrop-blur-lg"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ 
                scale: activeFAQ === index ? 1 : 1.01,
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
              }}
            >
              <button
                onClick={() => setActiveFAQ(activeFAQ === index ? null : index)}
                className="w-full flex justify-between items-center p-5 text-left focus:outline-none group"
                aria-expanded={activeFAQ === index}
                aria-controls={`faq-answer-${index}`}
              >
                <div className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 transition-colors ${
                    activeFAQ === index 
                      ? 'bg-primaryRed/10 text-primaryRed' 
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-500 group-hover:bg-primaryRed/5 group-hover:text-primaryRed'
                  }`}>
                    <span className="text-lg font-bold">{index + 1}</span>
                  </div>
                  <span className="text-lg font-semibold text-gray-800 dark:text-white group-hover:text-primaryRed transition-colors">{item.question}</span>
                </div>
                <div className={`flex-shrink-0 ml-4 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${activeFAQ === index ? 'bg-primaryRed/10' : 'bg-gray-100 dark:bg-gray-800 group-hover:bg-primaryRed/5'}`}>
                  <ChevronDown 
                    size={20} 
                    className={`text-primaryRed transition-transform duration-300 ${activeFAQ === index ? 'rotate-180' : ''}`}
                  />
                </div>
              </button>
              <AnimatePresence>
                {activeFAQ === index && (
                  <motion.div
                    id={`faq-answer-${index}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="p-5 pt-0 text-gray-600 dark:text-gray-400 leading-relaxed border-t border-gray-100 dark:border-gray-800 ml-11">
                      {item.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          animate={faqInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <p className="text-gray-600 dark:text-gray-400 mb-4">Still have questions?</p>
          <motion.a 
            href="#contact-form" 
            className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-accentGreen to-accentGreen/90 text-white font-medium rounded-full shadow-md hover:shadow-lg transition-all"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Mail size={18} />
            Contact Us
          </motion.a>
        </motion.div>
      </motion.section>

      {/* Animated wave bottom decoration */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden z-0">
        <svg viewBox="0 0 1440 320" className="w-full opacity-5 dark:opacity-10">
          <path 
            fill="#4CAF50" 
            d="M0,224L48,218.7C96,213,192,203,288,181.3C384,160,480,128,576,133.3C672,139,768,181,864,197.3C960,213,1056,203,1152,176C1248,149,1344,107,1392,85.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>

      {/* Contact Information Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Contact Us</h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <Phone className="w-6 h-6 text-primaryRed" />
                <span className="text-gray-700 dark:text-gray-300">{contactInfo.phone}</span>
              </div>
              <div className="flex items-center space-x-4">
                <Mail className="w-6 h-6 text-primaryRed" />
                <span className="text-gray-700 dark:text-gray-300">{contactInfo.email}</span>
              </div>
              <div className="flex items-center space-x-4">
                <MapPin className="w-6 h-6 text-primaryRed" />
                <span className="text-gray-700 dark:text-gray-300">{contactInfo.location}</span>
              </div>
              <div className="flex items-center space-x-4">
                <Facebook className="w-6 h-6 text-primaryRed" />
                <a href={contactInfo.social.facebook} target="_blank" rel="noopener noreferrer" className="text-gray-700 dark:text-gray-300 hover:text-primaryRed dark:hover:text-primaryRed">
                  Follow us on Facebook
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .animate-borderTrail {
          background: linear-gradient(90deg, transparent, #D50000, #4CAF50, #F2EA7E, transparent);
          background-size: 400% 400%;
          animation: borderTrail 3s ease infinite;
          height: 100%;
        }
        
        @keyframes borderTrail {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .float {
          animation: float 5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}