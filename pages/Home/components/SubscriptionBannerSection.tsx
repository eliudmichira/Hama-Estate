import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react'; // Sparkles is used here

interface SubscriptionBannerSectionProps {
  sectionRef: React.RefObject<HTMLElement | null>;
  // visibleSections prop is not used by this section directly for its content animation
  // but could be added if a SectionHeading were part of this component.
}

const SubscriptionBannerSection: React.FC<SubscriptionBannerSectionProps> = ({
  sectionRef,
}) => {
  const [subscribeEmail, setSubscribeEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (subscribeEmail) {
      setIsSubscribed(true);
      // In a real app, you would send this to your API
      console.log("Subscribed with:", subscribeEmail);
    }
  }, [subscribeEmail]);

  return (
    <section
      ref={sectionRef}
      id="subscribe"
      className="py-20 bg-gradient-to-r from-yogurt-red to-berry text-white relative overflow-hidden"
    >
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-pattern-dots"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-white/20 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Join Our Yogurt Lovers Community</h2>
            <p className="text-lg mb-8 text-white/90">
              Subscribe to our newsletter for exclusive recipes, special offers, and healthy lifestyle tips.
            </p>

            {!isSubscribed ? (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                <input
                  type="email"
                  placeholder="Your email address"
                  value={subscribeEmail}
                  onChange={(e) => setSubscribeEmail(e.target.value)}
                  className="flex-grow px-6 py-4 rounded-xl bg-white/20 backdrop-blur-sm text-white placeholder-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
                  required
                />
                <button
                  type="submit"
                  className="px-8 py-4 bg-white text-yogurt-red font-medium rounded-xl hover:bg-white/90 transition-colors"
                >
                  Subscribe
                </button>
              </form>
            ) : (
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 max-w-lg mx-auto border border-white/30">
                <Sparkles className="w-8 h-8 mx-auto mb-4" />
                <p className="text-xl font-medium mb-2">Thank You for Subscribing!</p>
                <p>You'll be the first to know about our new products and promotions.</p>
              </div>
            )}

            <p className="text-sm mt-4 text-white/70">
              By subscribing, you agree to receive marketing emails from Bogani. You can unsubscribe at any time.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SubscriptionBannerSection;
