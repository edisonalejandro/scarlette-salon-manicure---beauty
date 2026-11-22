/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { ImageIcon } from 'lucide-react';
import { GalleryItem } from '../../types';
import { cn } from '../../lib/utils';

interface GallerySectionProps {
  items: GalleryItem[];
}

export function GallerySection({ items }: GallerySectionProps) {
  return (
    <section id="gallery" className="py-24 md:py-32 px-5 sm:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
        <div>
          <span className="eyebrow">Portafolio</span>
          <h2 className="mt-4 text-5xl md:text-6xl text-ink">
            Nuestros <em className="mark">trabajos</em>
          </h2>
        </div>
        <p className="text-muted max-w-sm">
          Cada diseño es único. Inspírate con algunos de nuestros favoritos.
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
        {items.length > 0 ? items.map((item, idx) => (
          <motion.figure
            key={item.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: (idx % 3) * 0.1 }}
            className={cn(
              'group relative aspect-[4/5] overflow-hidden rounded-2xl sm:rounded-3xl bg-sand',
              idx % 3 === 1 && 'lg:translate-y-10'
            )}
          >
            <img
              src={item.imageUrl}
              className="w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
              alt={item.title || 'Trabajo de manicura'}
              referrerPolicy="no-referrer"
              loading="lazy"
            />
            {(item.title || item.description) && (
              <figcaption className="absolute inset-x-0 bottom-0 p-4 sm:p-6 bg-gradient-to-t from-ink/70 via-ink/20 to-transparent text-cream opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <h3 className="font-serif text-xl sm:text-2xl">{item.title}</h3>
                {item.description && <p className="text-xs sm:text-sm text-cream/80 mt-1">{item.description}</p>}
              </figcaption>
            )}
          </motion.figure>
        )) : (
          [1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className={cn(
                'aspect-[4/5] rounded-2xl sm:rounded-3xl bg-sand animate-pulse flex items-center justify-center',
                i % 3 === 2 && 'lg:translate-y-10'
              )}
            >
              <ImageIcon className="w-10 h-10 text-line" strokeWidth={1} />
            </div>
          ))
        )}
      </div>
    </section>
  );
}
