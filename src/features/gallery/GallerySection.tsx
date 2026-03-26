/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { ImageIcon } from 'lucide-react';
import { GalleryItem } from '../../types';

interface GallerySectionProps {
  items: GalleryItem[];
}

export function GallerySection({ items }: GallerySectionProps) {
  return (
    <section id="gallery" className="py-24 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-serif mb-4">Nuestros Trabajos</h2>
        <div className="w-24 h-1 gold-gradient mx-auto rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.length > 0 ? items.map((item, idx) => (
          <motion.div 
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="group relative aspect-[4/5] overflow-hidden rounded-2xl glass-card"
          >
            <img 
              src={item.imageUrl} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              alt={item.title || "Trabajo de manicura"}
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
              <h3 className="text-xl font-serif text-gold">{item.title}</h3>
              <p className="text-sm text-gray-300">{item.description}</p>
            </div>
          </motion.div>
        )) : (
          [1,2,3,4,5,6].map((i) => (
            <div key={i} className="aspect-[4/5] rounded-2xl bg-white/5 animate-pulse flex items-center justify-center">
              <ImageIcon className="w-12 h-12 text-white/10" />
            </div>
          ))
        )}
      </div>
    </section>
  );
}
