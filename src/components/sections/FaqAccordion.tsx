import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqAccordionProps {
  items: FaqItem[];
  allowMultiple?: boolean;
  defaultExpanded?: number[];
  className?: string;
}

const FaqAccordion: React.FC<FaqAccordionProps> = ({
  items,
  allowMultiple = false,
  defaultExpanded = [],
  className,
}) => {
  const [expandedItems, setExpandedItems] = useState<Set<number>>(
    new Set(defaultExpanded)
  );

  const toggleItem = (index: number) => {
    const newExpanded = new Set(expandedItems);

    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      if (!allowMultiple) {
        newExpanded.clear();
      }
      newExpanded.add(index);
    }

    setExpandedItems(newExpanded);
  };

  const handleKeyDown = (event: React.KeyboardEvent, index: number) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggleItem(index);
    }
  };

  return (
    <div className={cn('divide-y divide-gray-200 rounded-lg border border-gray-200', className)}>
      {items.map((item, index) => {
        const isExpanded = expandedItems.has(index);

        return (
          <div key={index} className="bg-white">
            <button
              onClick={() => toggleItem(index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className={cn(
                'flex w-full items-center justify-between gap-4 px-6 py-4 text-left transition-colors hover:bg-gray-50',
                isExpanded && 'bg-gray-50'
              )}
              aria-expanded={isExpanded}
              aria-controls={`faq-answer-${index}`}
            >
              <span className="font-semibold text-gray-900">{item.question}</span>
              <ChevronDown
                className={cn(
                  'h-5 w-5 flex-shrink-0 text-gray-600 transition-transform duration-200',
                  isExpanded && 'rotate-180'
                )}
              />
            </button>

            <div
              id={`faq-answer-${index}`}
              className={cn(
                'overflow-hidden transition-all duration-200',
                isExpanded ? 'max-h-96' : 'max-h-0'
              )}
              role="region"
              aria-labelledby={`faq-question-${index}`}
            >
              <div className="px-6 pb-4 text-gray-600">
                <p>{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

FaqAccordion.displayName = 'FaqAccordion';

export default FaqAccordion;
