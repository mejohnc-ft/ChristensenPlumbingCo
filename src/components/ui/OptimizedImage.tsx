interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  sizes?: string;
  loading?: 'lazy' | 'eager';
  className?: string;
}

const WIDTHS = [400, 800, 1200];

function deriveVariants(src: string) {
  const dot = src.lastIndexOf('.');
  if (dot === -1) return { webpSrcSet: '', jpgSrcSet: '', webpSrc: src };

  const base = src.slice(0, dot);
  const ext = src.slice(dot); // e.g. ".jpg"

  const webpSrcSet = WIDTHS.map((w) => `${base}-w${w}.webp ${w}w`).join(', ');
  const jpgSrcSet = WIDTHS.map((w) => `${base}-w${w}${ext} ${w}w`).join(', ');
  const webpSrc = `${base}.webp`;

  return { webpSrcSet, jpgSrcSet, webpSrc };
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
  loading = 'lazy',
  className,
}: OptimizedImageProps) {
  const { webpSrcSet, jpgSrcSet, webpSrc } = deriveVariants(src);

  return (
    <picture>
      <source type="image/webp" srcSet={webpSrcSet} sizes={sizes} />
      <source type="image/jpeg" srcSet={jpgSrcSet} sizes={sizes} />
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        className={className}
        decoding="async"
      />
    </picture>
  );
}
