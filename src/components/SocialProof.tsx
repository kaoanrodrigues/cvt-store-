import React, { useState } from 'react';
import { Star, CheckCircle, Instagram, MessageCircle, X, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { TESTIMONIALS, STORY_HIGHLIGHTS } from '../data/testimonials';
import { INSTAGRAM_URL, INSTAGRAM_HANDLE, buildGeneralWhatsAppLink } from '../data/products';
import { StoryHighlight } from '../types';

export const SocialProof: React.FC = () => {
  const [activeStory, setActiveStory] = useState<StoryHighlight | null>(null);

  const scrollStories = (direction: 'left' | 'right') => {
    const container = document.getElementById('stories-feed-container');
    if (container) {
      const scrollAmount = direction === 'left' ? -260 : 260;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section id="depoimentos" className="py-12 sm:py-16 md:py-24 bg-zinc-950 text-white border-b border-zinc-900 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12 gap-3 sm:gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase text-yellow-400 tracking-widest font-athletic mb-1.5">
              <span className="w-2 h-2 bg-yellow-400 rotate-45 shrink-0" />
              <span>FEED DESTAQUE • CLIENTES CVT</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white font-athletic">
              Clientes CVT STORE
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-zinc-400 mt-1 font-sans max-w-xl">
              Deslize para ver os looks reais de quem veste a CVT STORE em Igarassu e região metropolitana.
            </p>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-3 pt-1 sm:pt-0">
            {/* Scroll Navigation Buttons for Mobile and Tablet */}
            <div className="flex items-center gap-1.5 sm:hidden">
              <button
                onClick={() => scrollStories('left')}
                className="w-8 h-8 bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300 active:bg-yellow-400 active:text-black"
                aria-label="Voltar destaques"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => scrollStories('right')}
                className="w-8 h-8 bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300 active:bg-yellow-400 active:text-black"
                aria-label="Avançar destaques"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-yellow-400 hover:text-yellow-300 font-athletic"
            >
              <span>{INSTAGRAM_HANDLE}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Touch-Friendly Lookbook Carousel (Touch-pan-x with Snap on Mobile, Grid on Tablet/Desktop) */}
        <div 
          id="stories-feed-container"
          className="flex sm:grid sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4 overflow-x-auto touch-pan-x snap-x snap-mandatory scrollbar-none pb-4 mb-10 sm:mb-14 -mx-4 px-4 sm:mx-0 sm:px-0"
        >
          {STORY_HIGHLIGHTS.map((story) => (
            <div
              key={story.id}
              onClick={() => setActiveStory(story)}
              className="group relative w-[220px] sm:w-auto shrink-0 snap-center aspect-[4/5] bg-zinc-900 overflow-hidden cursor-pointer border border-zinc-800 hover:border-yellow-400 transition-all duration-300 active:scale-98"
            >
              <img
                src={story.thumbnail}
                alt={story.title}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-85 group-hover:opacity-90 transition-opacity" />

              {/* Story Tag */}
              <div className="absolute top-2.5 left-2.5 bg-yellow-400 text-black text-[9px] font-black px-1.5 py-0.5 uppercase tracking-wider font-athletic">
                {story.title}
              </div>

              {/* Instagram Handle & Quote */}
              <div className="absolute bottom-2.5 left-2.5 right-2.5">
                <p className="text-xs font-black text-white font-athletic uppercase tracking-wider truncate">
                  {story.handle}
                </p>
                <p className="text-[11px] text-zinc-300 line-clamp-2 mt-0.5 font-sans leading-tight">
                  "{story.caption}"
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Active Story Modal */}
        {activeStory && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200"
            onClick={() => setActiveStory(null)}
          >
            <div 
              className="relative w-full max-w-sm bg-zinc-950 border border-zinc-800 rounded-none overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Story Header */}
              <div className="p-3.5 sm:p-4 flex items-center justify-between border-b border-zinc-800 bg-black">
                <div className="flex items-center gap-2.5">
                  <img
                    src={activeStory.thumbnail}
                    alt={activeStory.title}
                    className="w-9 h-9 object-cover border border-yellow-400"
                  />
                  <div>
                    <p className="text-xs font-black uppercase text-white font-athletic tracking-wider">Destaque: {activeStory.title}</p>
                    <p className="text-[11px] text-yellow-400 font-bold">{activeStory.handle}</p>
                  </div>
                </div>
                <button
                  onClick={() => setActiveStory(null)}
                  className="p-2 min-w-[40px] min-h-[40px] flex items-center justify-center bg-zinc-800 hover:bg-zinc-700 text-zinc-300"
                  aria-label="Fechar"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Story Content Image */}
              <div className="relative aspect-[3/4] bg-zinc-950">
                <img
                  src={activeStory.thumbnail}
                  alt={activeStory.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 p-3 bg-black/95 border border-zinc-800">
                  <p className="text-xs text-zinc-200 font-medium font-sans">
                    "{activeStory.caption}"
                  </p>
                </div>
              </div>

              {/* Story Action */}
              <div className="p-3 bg-black border-t border-zinc-800 flex items-center justify-between gap-2">
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-zinc-300 hover:text-white flex items-center gap-1 font-bold font-athletic uppercase p-1.5"
                >
                  <Instagram className="w-3.5 h-3.5 text-yellow-400" />
                  <span>Instagram</span>
                </a>
                <a
                  href={buildGeneralWhatsAppLink(`Olá! Vi o look no destaque (${activeStory.title}) da CVT STORE!`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[40px] bg-yellow-400 hover:bg-yellow-300 text-black text-xs font-black px-4 py-2 uppercase font-athletic flex items-center gap-1 active:scale-95"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-black" />
                  <span>Pedir Look</span>
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Customer Testimonial Grid (Fluid 1 col on mobile, 2 cols on tablet/desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {TESTIMONIALS.map((test) => (
            <div
              key={test.id}
              className="bg-zinc-900 border border-zinc-800 p-5 sm:p-6 flex flex-col justify-between"
            >
              <div>
                {/* Header with Avatar and Rating */}
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={test.avatar}
                      alt={test.name}
                      className="w-11 h-11 sm:w-12 sm:h-12 object-cover border border-yellow-400 shrink-0"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-white text-sm sm:text-base font-sans">{test.name}</span>
                        {test.verified && (
                          <span title="Cliente Verificado">
                            <CheckCircle className="w-4 h-4 text-yellow-400 fill-yellow-400/20" />
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-zinc-400 font-sans">{test.location}</span>
                    </div>
                  </div>

                  {/* Stars in Vibrant Yellow */}
                  <div className="flex items-center gap-0.5">
                    {[...Array(test.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                </div>

                {/* Comment */}
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed italic font-sans">
                  "{test.comment}"
                </p>
              </div>

              {/* Footer of card */}
              <div className="mt-4 sm:mt-5 pt-3 border-t border-zinc-800 flex items-center justify-between text-xs text-zinc-400 font-sans">
                <span className="truncate mr-2">
                  Comprou: <strong className="text-zinc-200">{test.productBought}</strong>
                </span>
                <span className="text-[11px] text-zinc-500 shrink-0">{test.date}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
