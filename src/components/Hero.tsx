/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles, Heart, Home } from 'lucide-react';
import { asset } from '../lib/asset';

const values = [
  { icon: Sparkles, title: 'Diseños a tu medida', text: 'Permanente, softgel, pedicure y lash lifting.' },
  { icon: Home, title: 'También a domicilio', text: 'Llevamos el estudio hasta tu casa.' },
  { icon: Heart, title: 'Atención personalizada', text: 'Un espacio pensado para ti.' },
];

export function Hero() {
  return (
    <>
      <section id="home" className="relative min-h-[100svh] flex items-center pt-28 pb-16 overflow-hidden">
        {/* Manchas tipo acuarela (amarillo + rosa, como sus historias) */}
        <div
          aria-hidden
          className="absolute -top-32 -right-32 w-[40rem] h-[40rem] rounded-full bg-butter/80 blur-3xl"
        />
        <div
          aria-hidden
          className="absolute top-1/2 -left-40 w-[26rem] h-[26rem] rounded-full bg-blush/70 blur-3xl"
        />

        <div className="relative max-w-7xl mx-auto px-5 sm:px-8 w-full grid lg:grid-cols-12 gap-14 lg:gap-8 items-center">
          {/* Texto */}
          <div className="lg:col-span-6 xl:col-span-7">
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="eyebrow"
            >
              ABS Studio · Providencia
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="mt-6 text-[3.25rem] leading-[0.95] sm:text-7xl xl:text-[6.5rem] text-ink"
            >
              El arte de
              <br />
              unas uñas <em className="mark">perfectas</em>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="mt-8 text-base sm:text-lg text-muted max-w-md leading-relaxed"
            >
              Manicura, pedicura y cuidado personal con detalle y delicadeza.
              Reserva tu hora online y regálate un momento solo para ti.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-10 flex flex-col sm:flex-row gap-3"
            >
              <a href="#booking" className="btn-primary group">
                Reservar hora
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a href="#gallery" className="btn-ghost">
                Ver trabajos
              </a>
            </motion.div>
          </div>

          {/* Imagen en arco */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="lg:col-span-6 xl:col-span-5 relative mx-auto w-full max-w-sm lg:max-w-none"
          >
            <div className="relative aspect-[4/5] rounded-t-full overflow-hidden bg-sand">
              <img
                src={asset('/images/trabajos/trabajo-1.jpg')}
                className="w-full h-full object-cover"
                alt="Uñas pastel con líneas finas, trabajo de Scarlette ABS"
                fetchPriority="high"
              />
            </div>
            {/* Marco fino desplazado */}
            <div
              aria-hidden
              className="absolute inset-0 translate-x-4 translate-y-4 rounded-t-full bg-butter -z-10"
            />
            {/* Sello */}
            <img
              src={asset('/images/brand/logo-abs-320.png')}
              alt="Logo ABS Scarlette Salon"
              width={128}
              height={128}
              className="absolute -left-4 sm:-left-8 bottom-10 w-28 h-28 sm:w-32 sm:h-32 rounded-full shadow-xl shadow-honey/25 ring-4 ring-cream"
            />
          </motion.div>
        </div>
      </section>

      {/* Franja de valores */}
      <section className="border-y border-sun/30 bg-butter/40">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 grid sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-line">
          {values.map(({ icon: Icon, title, text }) => (
            <div key={title} className="flex items-start gap-4 py-8 sm:px-8 first:sm:pl-0 last:sm:pr-0">
              <Icon className="w-5 h-5 text-honey shrink-0 mt-1" strokeWidth={1.5} />
              <div>
                <h3 className="font-serif text-xl text-ink">{title}</h3>
                <p className="text-sm text-muted mt-1">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
