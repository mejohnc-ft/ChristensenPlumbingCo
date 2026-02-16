import { HelpCircle, Plus, Edit, Trash2, GripVertical } from 'lucide-react';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  order: number;
}

export default function FaqsPage() {
  const faqs: FAQ[] = [
    {
      id: '1',
      question: 'What areas do you serve?',
      answer:
        'We proudly serve all of San Diego County, from Oceanside to Chula Vista, including La Jolla, Mission Valley, Carlsbad, and surrounding areas.',
      category: 'General',
      order: 1,
    },
    {
      id: '2',
      question: 'Do you offer emergency services?',
      answer:
        'Yes! We offer 24/7 emergency plumbing services with rapid response times. Call (619) 433-2169 for immediate assistance.',
      category: 'Emergency',
      order: 2,
    },
    {
      id: '3',
      question: 'Are you licensed and insured?',
      answer:
        'Yes, Christensen Plumbing Co. is fully licensed, bonded, and insured in the state of California.',
      category: 'General',
      order: 3,
    },
    {
      id: '4',
      question: 'What types of payment do you accept?',
      answer:
        'We accept all major credit cards, checks, and cash. Financing options are available for larger projects.',
      category: 'Billing',
      order: 4,
    },
    {
      id: '5',
      question: 'Do you provide free estimates?',
      answer:
        'Yes, we provide free estimates for most plumbing services. Contact us to schedule your free consultation.',
      category: 'Billing',
      order: 5,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">FAQs</h1>
          <p className="text-gray-600">
            Manage frequently asked questions for your website.
          </p>
        </div>
        <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="w-4 h-4" />
          <span>Add FAQ</span>
        </button>
      </div>

      {/* FAQ List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
          <h2 className="font-semibold text-gray-900">All FAQs</h2>
          <span className="text-sm text-gray-500">Drag to reorder</span>
        </div>
        <div className="divide-y divide-gray-200">
          {faqs.map((faq) => (
            <div key={faq.id} className="p-4 hover:bg-gray-50 group">
              <div className="flex items-start space-x-4">
                <div className="cursor-move text-gray-400 group-hover:text-gray-600 mt-1">
                  <GripVertical className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {faq.question}
                      </h3>
                      <p className="text-gray-600 text-sm mb-2">{faq.answer}</p>
                      <span className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
                        {faq.category}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 ml-4">
                      <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-red-600 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Coming Soon Notice */}
      <div className="bg-gray-50 rounded-lg border border-gray-200 p-6 text-center">
        <HelpCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          FAQ Features Coming Soon
        </h3>
        <p className="text-gray-600 max-w-md mx-auto">
          Category management, public FAQ page, and search functionality will be
          available soon.
        </p>
      </div>
    </div>
  );
}
