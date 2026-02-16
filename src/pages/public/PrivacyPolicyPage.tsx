import { PageSEO } from '@/lib/seo';

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-t-page">
      <PageSEO
        title="Privacy Policy"
        description="Christensen Plumbing Co. privacy policy. Learn how we collect, use, and protect your personal information."
        path="/privacy"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Privacy Policy', url: '/privacy' },
        ]}
      />

      <section className="py-20 lg:py-28">
        <div className="container-editorial">
          <div className="max-w-3xl mx-auto">
            <h1 className="font-display text-4xl lg:text-5xl text-t-text tracking-tight mb-8">
              Privacy Policy
            </h1>
            <p className="text-t-text-muted text-sm mb-12">
              Last updated: January 1, 2026
            </p>

            <div className="prose-editorial space-y-8 text-t-text-secondary leading-relaxed">
              <section>
                <h2 className="font-display text-2xl text-t-text mb-4">Information We Collect</h2>
                <p>
                  Christensen Plumbing Co. ("we," "our," or "us") collects information you provide directly when you:
                </p>
                <ul className="list-disc pl-6 mt-3 space-y-2">
                  <li>Request a service estimate or appointment</li>
                  <li>Contact us by phone, email, or through our website</li>
                  <li>Submit a service request or contact form</li>
                  <li>Leave a review or testimonial</li>
                </ul>
                <p className="mt-3">
                  This may include your name, phone number, email address, street address, and details about your plumbing needs.
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl text-t-text mb-4">How We Use Your Information</h2>
                <p>We use the information we collect to:</p>
                <ul className="list-disc pl-6 mt-3 space-y-2">
                  <li>Provide, maintain, and improve our plumbing services</li>
                  <li>Respond to your inquiries and service requests</li>
                  <li>Schedule and confirm appointments</li>
                  <li>Send service-related communications (appointment reminders, follow-ups)</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </section>

              <section>
                <h2 className="font-display text-2xl text-t-text mb-4">Information Sharing</h2>
                <p>
                  We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
                </p>
                <ul className="list-disc pl-6 mt-3 space-y-2">
                  <li>With service providers who assist in our operations (scheduling software, payment processing)</li>
                  <li>When required by law or to respond to legal process</li>
                  <li>To protect our rights, property, or safety</li>
                </ul>
              </section>

              <section>
                <h2 className="font-display text-2xl text-t-text mb-4">Data Security</h2>
                <p>
                  We implement reasonable security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl text-t-text mb-4">Cookies and Analytics</h2>
                <p>
                  Our website may use cookies and similar technologies to improve your browsing experience and analyze site traffic. You can control cookie settings through your browser preferences.
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl text-t-text mb-4">Your California Privacy Rights</h2>
                <p>
                  Under the California Consumer Privacy Act (CCPA), California residents have the right to request disclosure of the categories and specific pieces of personal information we have collected, request deletion of personal information, and opt out of the sale of personal information. We do not sell personal information.
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl text-t-text mb-4">Children's Privacy</h2>
                <p>
                  Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children.
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl text-t-text mb-4">Changes to This Policy</h2>
                <p>
                  We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page with an updated revision date.
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl text-t-text mb-4">Contact Us</h2>
                <p>
                  If you have questions about this privacy policy, please contact us:
                </p>
                <ul className="list-disc pl-6 mt-3 space-y-2">
                  <li>Phone: (619) 433-2169</li>
                  <li>Email: info@christensenplumbing.com</li>
                  <li>Address: San Diego, CA</li>
                </ul>
              </section>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
