import React from 'react';
import { Mail, Phone, Linkedin } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardBody, CardImage } from '../ui/Card';

export interface TeamMemberCardProps {
  name: string;
  role: string;
  image: string;
  bio?: string;
  email?: string;
  phone?: string;
  linkedin?: string;
  className?: string;
}

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({
  name,
  role,
  image,
  bio,
  email,
  phone,
  linkedin,
  className,
}) => {
  return (
    <Card className={cn('overflow-hidden', className)}>
      <CardImage src={image} alt={name} className="h-64" />

      <CardBody className="space-y-3">
        <div className="text-center">
          <h3 className="text-xl font-semibold text-gray-900">{name}</h3>
          <p className="text-sm font-medium text-blue-600">{role}</p>
        </div>

        {bio && (
          <p className="text-sm text-gray-600 text-center">{bio}</p>
        )}

        {(email || phone || linkedin) && (
          <div className="flex justify-center gap-3 border-t border-gray-200 pt-3">
            {email && (
              <a
                href={`mailto:${email}`}
                className="rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100 hover:text-blue-600"
                aria-label={`Email ${name}`}
              >
                <Mail className="h-5 w-5" />
              </a>
            )}
            {phone && (
              <a
                href={`tel:${phone}`}
                className="rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100 hover:text-blue-600"
                aria-label={`Call ${name}`}
              >
                <Phone className="h-5 w-5" />
              </a>
            )}
            {linkedin && (
              <a
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100 hover:text-blue-600"
                aria-label={`${name} on LinkedIn`}
              >
                <Linkedin className="h-5 w-5" />
              </a>
            )}
          </div>
        )}
      </CardBody>
    </Card>
  );
};

TeamMemberCard.displayName = 'TeamMemberCard';

export default TeamMemberCard;
