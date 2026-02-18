import { useState, useEffect } from 'react';
import { Settings, Save } from 'lucide-react';
import { useSettings } from '@/hooks/useSettings';
import LoadingState from '@/components/admin/LoadingState';
import ErrorState from '@/components/admin/ErrorState';

interface FormFields {
  businessName: string;
  tagline: string;
  aboutDescription: string;
  phone: string;
  email: string;
  serviceArea: string;
  businessHours: string;
}

export default function SettingsPage() {
  const { settings, loading, error, refresh, bulkUpdate, getSetting } = useSettings();

  const [form, setForm] = useState<FormFields>({
    businessName: '',
    tagline: '',
    aboutDescription: '',
    phone: '',
    email: '',
    serviceArea: '',
    businessHours: '',
  });

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setForm({
      businessName: (getSetting('business_name') as string) ?? '',
      tagline: (getSetting('tagline') as string) ?? '',
      aboutDescription: (getSetting('about_description') as string) ?? '',
      phone: (getSetting('phone') as string) ?? '',
      email: (getSetting('email') as string) ?? '',
      serviceArea: (getSetting('service_area') as string) ?? '',
      businessHours: (getSetting('business_hours') as string) ?? '',
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settings]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await bulkUpdate([
        { key: 'business_name', value: form.businessName, category: 'business' },
        { key: 'tagline', value: form.tagline, category: 'business' },
        { key: 'about_description', value: form.aboutDescription, category: 'business' },
        { key: 'phone', value: form.phone, category: 'contact' },
        { key: 'email', value: form.email, category: 'contact' },
        { key: 'service_area', value: form.serviceArea, category: 'contact' },
        { key: 'business_hours', value: form.businessHours, category: 'contact' },
      ]);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <LoadingState message="Loading settings..." />;
  if (error) return <ErrorState message={error} onRetry={refresh} />;

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
          <Settings className="w-6 h-6 text-blue-600" />
          <span>Site Settings</span>
        </h1>
        <p className="text-gray-600 mt-1">Manage your website settings and configuration.</p>
      </div>

      {/* Business Information */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Business Information
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Business Name
            </label>
            <input
              type="text"
              name="businessName"
              value={form.businessName}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tagline
            </label>
            <input
              type="text"
              name="tagline"
              value={form.tagline}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              About Description
            </label>
            <textarea
              name="aboutDescription"
              value={form.aboutDescription}
              onChange={handleChange}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Contact Information
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Service Area
            </label>
            <input
              type="text"
              name="serviceArea"
              value={form.serviceArea}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Business Hours
            </label>
            <input
              type="text"
              name="businessHours"
              value={form.businessHours}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Save className="w-5 h-5" />
          <span>{saving ? 'Saving...' : 'Save Changes'}</span>
        </button>
      </div>
    </div>
  );
}
