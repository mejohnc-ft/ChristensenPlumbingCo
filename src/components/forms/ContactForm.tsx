import React, { useState } from 'react';
import { Phone, Mail, MessageSquare } from 'lucide-react';
import FormField from './FormField';
import Button from '../ui/Button';
import { useToast } from '../ui/Toast';

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

export interface ContactFormProps {
  onSubmit: (data: ContactFormData) => Promise<void>;
  className?: string;
}

const ContactForm: React.FC<ContactFormProps> = ({ onSubmit, className }) => {
  const { showToast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});

  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof ContactFormData, string>> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Invalid phone number (10 digits required)';
    }

    if (!formData.service) {
      newErrors.service = 'Please select a service';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error for this field when user starts typing
    if (errors[name as keyof ContactFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      showToast({
        type: 'error',
        title: 'Validation Error',
        message: 'Please fix the errors in the form',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      await onSubmit(formData);

      showToast({
        type: 'success',
        title: 'Request Submitted',
        message: "We'll contact you shortly!",
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        message: '',
      });
    } catch {
      showToast({
        type: 'error',
        title: 'Submission Failed',
        message: 'Please try again or call us directly',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={className}>
      <div className="space-y-4">
        <FormField
          label="Full Name"
          name="name"
          type="text"
          placeholder="John Doe"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
          required
        />

        <FormField
          label="Email Address"
          name="email"
          type="email"
          placeholder="john@example.com"
          leftIcon={<Mail className="h-5 w-5" />}
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          required
        />

        <FormField
          label="Phone Number"
          name="phone"
          type="tel"
          placeholder="(555) 123-4567"
          leftIcon={<Phone className="h-5 w-5" />}
          value={formData.phone}
          onChange={handleChange}
          error={errors.phone}
          required
        />

        <FormField
          label="Service Needed"
          name="service"
          as="select"
          value={formData.service}
          onChange={handleChange}
          error={errors.service}
          required
        >
          <option value="">Select a service...</option>
          <option value="emergency">Emergency Plumbing</option>
          <option value="repair">Repair Service</option>
          <option value="installation">Installation</option>
          <option value="maintenance">Maintenance</option>
          <option value="inspection">Inspection</option>
          <option value="other">Other</option>
        </FormField>

        <FormField
          label="Message"
          name="message"
          as="textarea"
          placeholder="Please describe your plumbing issue or service needs..."
          value={formData.message}
          onChange={handleChange}
          error={errors.message}
          helperText="Provide as much detail as possible to help us serve you better"
          required
        />

        <Button
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
          isLoading={isSubmitting}
          leftIcon={<MessageSquare className="h-5 w-5" />}
        >
          {isSubmitting ? 'Submitting...' : 'Request Service'}
        </Button>
      </div>
    </form>
  );
};

ContactForm.displayName = 'ContactForm';

export default ContactForm;
