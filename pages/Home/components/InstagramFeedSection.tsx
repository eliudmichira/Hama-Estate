import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Heart } from 'lucide-react';

// Image imports relative to src/pages/Home/components/
// These correspond to image4, image5, image6, image8 in Home.tsx's alias setup
import imgPost1 from "../../../assets/bogani  profile with order now  number.jpg";
import imgPost2 from "../../../assets/bogani big  all bottles picture with flavours.jpg";
import imgPost3 from "../../../assets/bogani in super markets and shops.jpg";
import imgPost4 from "../../../assets/kids with bogani big bottles.jpg";

import SectionHeading from '../../../components/ui/SectionHeading'; // Import shared SectionHeading

// Define InstagramPost interface
interface InstagramPost {
  id: number;
  image: string;
  likes: number;
  caption: string;
}

// Sample Instagram posts data (copied from Home.tsx and image paths updated)
const instagramPostsData: InstagramPost[] = [
  {
    id: 1,
    image: imgPost1,
    likes: 245,
    caption: "Start your morning right with our protein-packed Bogani yogurt! #HealthyBreakfast #BoganiYogurt"
  },
  {
    id: 2,
    image: imgPost2,
    likes: 182,
    caption: "Behind the scenes at our farm where we source the freshest ingredients for your favorite yogurt!"
  },
  {
    id: 3,
    image: imgPost3,
    likes: 312,
    caption: "Our new Wild Berry flavor is here! Have you tried it yet? #NewFlavor #BoganiLove"
  },
  {
    id: 4,
    image: imgPost4,
    likes: 276,
    caption: "The perfect afternoon snack that's both delicious and good for your gut health! #HealthySnacking"
  }
];

interface InstagramFeedSectionProps {
  sectionRef: React.RefObject<HTMLElement | null>;
  visibleSections: string[];
}

const InstagramFeedSection: React.FC<InstagramFeedSectionProps> = ({
  sectionRef,
  visibleSections,
}) => {
  return (
    <section
      ref={sectionRef}
      id="instagram"
      className="py-24 bg-white dark:bg-gray-800"
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between mb-12">
          <div>
            <SectionHeading
              title="Follow Us on Instagram"
              subtitle="@bogani_yogurt"
              isVisible={visibleSections.includes('instagram')}
              highlightWord="Instagram"
              className="mb-0"
            />
          </div>

          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 md:mt-0 inline-flex items-center gap-2 text-yogurt-red hover:text-berry transition-colors font-medium"
          >
            View Our Profile
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {instagramPostsData.map((post, index) => (
            <motion.a
              key={post.id}
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="relative group aspect-square rounded-xl overflow-hidden"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              whileHover={{ scale: 1.03 }}
            >
              <img
                src={post.image}
                alt={`Bogani Yogurt Instagram post: ${post.caption.substring(0, 50)}...`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />

              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4 text-white">
                <div className="flex items-center gap-2 mb-2">
                  <Heart className="w-4 h-4" />
                  <span className="text-sm font-medium">{post.likes}</span>
                </div>
                <p className="text-xs text-center line-clamp-3">{post.caption}</p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InstagramFeedSection;
