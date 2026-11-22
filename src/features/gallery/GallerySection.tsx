/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Instagram } from 'lucide-react';
import { GalleryItem } from '../../types';
import { cn } from '../../lib/utils';
import { trabajosDestacados } from '../../data/trabajos';

interface GallerySectionProps {
  items: GalleryItem[];
}

export function GallerySection({ items }: GallerySectionProps) {
  // Si el backend aún no tiene fotos, mostramos trabajos reales de su Instagram
  const shown = items.length > 0 ? items : trabajosDestacados;

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

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
        {shown.map((item, idx) => (
          <motion.figure
            key={item.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: (idx % 4) * 0.08 }}
            className={cn(
              'group relative aspect-[4/5] overflow-hidden rounded-2xl sm:rounded-3xl bg-sand',
              idx % 2 === 1 && 'lg:translate-y-10'
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
        ))}
      </div>

      <div className="mt-20 lg:mt-24 text-center">
        <a
          href="https://instagram.com/scarlette.abs"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-ghost"
        >
          <Instagram className="w-4 h-4" strokeWidth={1.75} />
          Ver más en @scarlette.abs
        </a>
      </div>
    </section>
  );
}
