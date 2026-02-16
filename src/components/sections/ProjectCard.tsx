import React from 'react';
import { Calendar, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardBody, CardImage, CardTitle, CardDescription } from '../ui/Card';
import Badge from '../ui/Badge';

export interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  category: string;
  location?: string;
  date?: string;
  tags?: string[];
  href?: string;
  className?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  image,
  category,
  location,
  date,
  tags,
  href,
  className,
}) => {
  const handleClick = () => {
    if (href) {
      window.location.href = href;
    }
  };

  return (
    <Card
      className={cn('overflow-hidden', href && 'cursor-pointer', className)}
      hoverable={!!href}
      onClick={handleClick}
    >
      <div className="relative">
        <CardImage src={image} alt={title} />
        <div className="absolute left-4 top-4">
          <Badge variant="info" size="sm">
            {category}
          </Badge>
        </div>
      </div>

      <CardBody className="space-y-3">
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>

        <div className="flex flex-wrap gap-3 text-sm text-gray-600">
          {location && (
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>{location}</span>
            </div>
          )}
          {date && (
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{date}</span>
            </div>
          )}
        </div>

        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-2">
            {tags.map((tag, index) => (
              <Badge key={index} variant="default" size="sm">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardBody>
    </Card>
  );
};

ProjectCard.displayName = 'ProjectCard';

export default ProjectCard;
