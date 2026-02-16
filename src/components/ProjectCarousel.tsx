import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, MapPin, Calendar, Star } from 'lucide-react';
import { Project } from '../lib/supabase';

interface ProjectCarouselProps {
  project: Project;
}

const ProjectCarousel: React.FC<ProjectCarouselProps> = ({ project }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const photos = project.photos || [];

  useEffect(() => {
    if (!isAutoPlaying || photos.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === photos.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, photos.length]);

  const goToPrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex(currentIndex === 0 ? photos.length - 1 : currentIndex - 1);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex(currentIndex === photos.length - 1 ? 0 : currentIndex + 1);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentIndex(index);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  if (photos.length === 0) {
    return (
      <div className="bg-t-card border border-t-card-border overflow-hidden">
        <div className="aspect-video bg-t-page-alt flex items-center justify-center">
          <p className="text-t-text-muted">No photos available</p>
        </div>
        <div className="p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-display text-xl text-t-text">{project.title}</h3>
            {project.featured && (
              <Star className="w-5 h-5 text-gold-500 fill-current" />
            )}
          </div>
          <p className="text-t-text-secondary mb-4">{project.description}</p>
          <div className="flex items-center justify-between text-sm text-t-text-muted">
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4 text-gold-500" />
              <span>{project.location}</span>
            </div>
            {project.completion_date && (
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4 text-gold-500" />
                <span>{new Date(project.completion_date).toLocaleDateString()}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-t-card border border-t-card-border overflow-hidden group hover:border-gold-500/50 transition-colors">
      {/* Image Carousel */}
      <div className="relative aspect-video overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out h-full"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {photos.map((photo) => (
            <div key={photo.id} className="w-full h-full flex-shrink-0">
              <img
                src={photo.image_url}
                alt={photo.title}
                width={800}
                height={450}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        {photos.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              aria-label="Previous photo"
              className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-navy-900/70 hover:bg-navy-900 text-white p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={goToNext}
              aria-label="Next photo"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-navy-900/70 hover:bg-navy-900 text-white p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Slide Indicators */}
        {photos.length > 1 && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
            {photos.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                aria-label={`Go to photo ${index + 1} of ${photos.length}`}
                className={`w-2 h-2 transition-all duration-200 ${
                  index === currentIndex
                    ? 'bg-gold-500 scale-125'
                    : 'bg-white/60 hover:bg-white/80'
                }`}
              />
            ))}
          </div>
        )}

        {/* Photo Counter */}
        {photos.length > 1 && (
          <div className="absolute top-4 right-4 bg-navy-900/70 text-white px-3 py-1 text-sm font-medium">
            {currentIndex + 1} / {photos.length}
          </div>
        )}

        {/* Auto-play Indicator */}
        {photos.length > 1 && isAutoPlaying && (
          <div className="absolute top-4 left-4 bg-gold-500/90 text-white px-3 py-1 text-xs flex items-center gap-2 font-medium">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            <span>Auto</span>
          </div>
        )}

        {/* Featured Badge */}
        {project.featured && (
          <div className="absolute bottom-4 left-4 bg-gold-500 text-white px-3 py-1 text-xs uppercase tracking-wider font-medium flex items-center gap-1">
            <Star className="w-3 h-3 fill-current" />
            Featured
          </div>
        )}
      </div>

      {/* Project Information */}
      <div className="p-6">
        <h3 className="font-display text-xl text-t-text mb-2">{project.title}</h3>
        <p className="text-t-text-secondary mb-4 leading-relaxed">{project.description}</p>
        <div className="flex items-center justify-between text-sm text-t-text-muted pt-4 border-t border-t-card-border">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-gold-500" />
            <span>{project.location}</span>
          </div>
          {project.completion_date && (
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gold-500" />
              <span>{new Date(project.completion_date).toLocaleDateString()}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCarousel;
