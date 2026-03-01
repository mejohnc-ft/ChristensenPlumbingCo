import BeforeAfterSlider from './BeforeAfterSlider';

export interface BeforeAfterPair {
  beforeSrc: string;
  afterSrc: string;
  caption: string;
}

interface BeforeAfterGalleryProps {
  pairs: BeforeAfterPair[];
  title?: string;
}

export default function BeforeAfterGallery({
  pairs,
  title = 'Before & After',
}: BeforeAfterGalleryProps) {
  if (pairs.length === 0) return null;

  return (
    <section className="py-20 lg:py-28 bg-t-page-alt">
      <div className="container-editorial">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl lg:text-4xl text-t-text tracking-tight mb-4">
            {title.split(' ').map((word, i) =>
              i === title.split(' ').length - 1 ? (
                <span key={i} className="text-gold-400">{word}</span>
              ) : (
                <span key={i}>{word} </span>
              )
            )}
          </h2>
          <p className="text-t-text-secondary text-lg">
            Drag the slider to see the transformation.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {pairs.map((pair, i) => (
            <div key={i}>
              <BeforeAfterSlider
                beforeSrc={pair.beforeSrc}
                afterSrc={pair.afterSrc}
                beforeAlt={`Before: ${pair.caption}`}
                afterAlt={`After: ${pair.caption}`}
              />
              <p className="text-t-text-secondary text-sm mt-3 text-center">{pair.caption}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
