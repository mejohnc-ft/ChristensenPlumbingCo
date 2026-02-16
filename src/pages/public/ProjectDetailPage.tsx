import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, MapPin, Tag, Phone, ChevronLeft, ChevronRight } from 'lucide-react';
import { getProjectBySlug } from '../../data/projects';
import { PageSEO, ProjectSchema } from '@/lib/seo';

const PHONE_NUMBER = '(619) 433-2169';
const PHONE_LINK = 'tel:+16194332169';

export default function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProjectBySlug(slug) : undefined;
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  if (!project) {
    return (
      <div className="bg-t-page">
        <section className="py-20">
          <div className="container-editorial text-center">
            <h1 className="font-display text-3xl text-t-text mb-4">Project Not Found</h1>
            <p className="text-t-text-secondary mb-8">The project you're looking for doesn't exist.</p>
            <Link to="/portfolio" className="btn-gold">Back to Portfolio</Link>
          </div>
        </section>
      </div>
    );
  }

  const photos = project.photos || [];
  const currentPhoto = photos[currentPhotoIndex];

  return (
    <div className="bg-t-page">
      <PageSEO
        title={project.title || `Project: ${slug}`}
        description={project.description || `View this completed plumbing project by Christensen Plumbing in San Diego.`}
        path={`/portfolio/${slug}`}
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Our Work', url: '/portfolio' },
          { name: project.title || slug || 'Project', url: `/portfolio/${slug}` },
        ]}
      />
      {project.title && (
        <ProjectSchema
          project={{
            title: project.title,
            description: project.description || '',
            image: currentPhoto?.image_url || '/og-image.jpg',
            images: photos.map((p) => p.image_url),
            dateCompleted: project.created_at,
            category: project.category || 'Plumbing',
            location: project.location || 'San Diego',
            url: `https://christensenplumbing.com/portfolio/${slug}`,
          }}
        />
      )}

      {/* Hero */}
      <section className="bg-t-page-alt py-16">
        <div className="container-editorial">
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 text-gold-400 hover:text-gold-300 transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Portfolio</span>
          </Link>

          <h1 className="font-display text-3xl lg:text-5xl text-t-text tracking-tight mb-4">
            {project.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-sm text-t-text-muted">
            {project.created_at && (
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gold-500" />
                <span>{new Date(project.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}</span>
              </div>
            )}
            {project.location && (
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gold-500" />
                <span>{project.location}</span>
              </div>
            )}
            {project.category && (
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4 text-gold-500" />
                <span>{project.category}</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      {photos.length > 0 && (
        <section className="py-8 lg:py-12 bg-t-page">
          <div className="container-editorial">
            {/* Main Photo */}
            <div className="relative aspect-video bg-t-page-alt border border-t-card-border overflow-hidden mb-4">
              <img
                src={currentPhoto?.image_url}
                alt={currentPhoto?.description || `${project.title} - Photo ${currentPhotoIndex + 1}`}
                width={1200}
                height={675}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              {photos.length > 1 && (
                <>
                  <button
                    onClick={() => setCurrentPhotoIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1))}
                    aria-label="Previous photo"
                    className="absolute left-4 top-1/2 -translate-y-1/2 min-w-[44px] min-h-[44px] bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={() => setCurrentPhotoIndex((prev) => (prev === photos.length - 1 ? 0 : prev + 1))}
                    aria-label="Next photo"
                    className="absolute right-4 top-1/2 -translate-y-1/2 min-w-[44px] min-h-[44px] bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                  <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 text-sm">
                    {currentPhotoIndex + 1} / {photos.length}
                  </div>
                </>
              )}
            </div>

            {/* Thumbnails */}
            {photos.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {photos.map((photo, index) => (
                  <button
                    key={photo.id}
                    onClick={() => setCurrentPhotoIndex(index)}
                    aria-label={`View photo ${index + 1}`}
                    className={`flex-shrink-0 w-20 h-20 border-2 overflow-hidden ${
                      index === currentPhotoIndex ? 'border-gold-500' : 'border-transparent'
                    }`}
                  >
                    <img
                      src={photo.image_url}
                      alt={photo.description || `Thumbnail ${index + 1}`}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Description */}
      {project.description && (
        <section className="py-12 lg:py-16 bg-t-page">
          <div className="container-editorial">
            <div className="max-w-3xl">
              <h2 className="font-display text-2xl text-t-text mb-6">About This Project</h2>
              <div className="text-t-text-secondary leading-relaxed text-lg whitespace-pre-line">
                {project.description}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 lg:py-20 bg-gold-600">
        <div className="container-editorial text-center">
          <h2 className="font-display text-3xl lg:text-4xl text-white mb-4">
            Ready to Start Your Project?
          </h2>
          <p className="text-gold-100 text-lg mb-8">
            Call for a free estimate on your plumbing project.
          </p>
          <a
            href={PHONE_LINK}
            className="inline-flex items-center justify-center gap-3 bg-navy-900 text-white px-6 py-4 text-base sm:px-10 sm:py-5 sm:text-xl font-medium hover:bg-navy-800 transition-colors"
          >
            <Phone className="w-6 h-6" />
            <span>{PHONE_NUMBER}</span>
          </a>
        </div>
      </section>
    </div>
  );
}
