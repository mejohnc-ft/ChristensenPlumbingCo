import { PageSEO } from '@/lib/seo';

export default function TermsOfServicePage() {
  return (
    <div className="bg-t-page">
      <PageSEO
        title="Terms of Service"
        description="Christensen Plumbing Co. terms of service. Read about our service terms, warranties, and policies."
        path="/terms"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Terms of Service', url: '/terms' },
        ]}
      />

      <section className="py-20 lg:py-28">
        <div className="container-editorial">
          <div className="max-w-3xl mx-auto">
            <h1 className="font-display text-4xl lg:text-5xl text-t-text tracking-tight mb-8">
              Terms of Service
            </h1>
            <p className="text-t-text-muted text-sm mb-12">
              Last updated: January 1, 2026
            </p>

            <div className="prose-editorial space-y-8 text-t-text-secondary leading-relaxed">
              <section>
                <h2 className="font-display text-2xl text-t-text mb-4">Acceptance of Terms</h2>
                <p>
                  By using the Christensen Plumbing Co. website ("Site") or engaging our plumbing services, you agree to these Terms of Service. If you do not agree, please do not use our Site or services.
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl text-t-text mb-4">Services</h2>
                <p>
                  Christensen Plumbing Co. provides residential and commercial plumbing services throughout San Diego County, including but not limited to emergency plumbing, drain cleaning, water heater services, pipe repair, leak detection, bathroom renovation, kitchen plumbing, and sewer services.
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl text-t-text mb-4">Estimates and Pricing</h2>
                <p>
                  All estimates provided are based on information available at the time of assessment. Final costs may vary if additional issues are discovered during the course of work. We will notify you of any changes in scope or cost before proceeding with additional work.
                </p>
                <p className="mt-3">
                  Pricing is provided upfront before work begins. Emergency service rates apply to calls outside of regular business hours as specified at the time of service.
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl text-t-text mb-4">Warranty</h2>
                <p>
                  Christensen Plumbing Co. stands behind our work. We provide warranties on labor and materials as discussed at the time of service. Warranty terms vary by service type and will be communicated in writing upon completion of work.
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl text-t-text mb-4">Licensing and Insurance</h2>
                <p>
                  Christensen Plumbing Co. is licensed, bonded, and insured in the State of California. We comply with all applicable state and local regulations governing plumbing contractors.
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl text-t-text mb-4">Limitation of Liability</h2>
                <p>
                  To the fullest extent permitted by law, Christensen Plumbing Co. shall not be liable for any indirect, incidental, special, or consequential damages resulting from the use of our website or services. Our total liability for any claim shall not exceed the amount paid for the specific service giving rise to the claim.
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl text-t-text mb-4">Website Use</h2>
                <p>
                  The content on this website is for informational purposes only and does not constitute professional plumbing advice for your specific situation. Always consult a licensed plumber for diagnosis and repair of plumbing issues.
                </p>
                <p className="mt-3">
                  You may not reproduce, distribute, or create derivative works from any content on this site without our express written permission.
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl text-t-text mb-4">Cancellation Policy</h2>
                <p>
                  If you need to cancel or reschedule a service appointment, please contact us at least 24 hours in advance. Emergency services are exempt from this policy.
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl text-t-text mb-4">Governing Law</h2>
                <p>
                  These terms shall be governed by and construed in accordance with the laws of the State of California, without regard to conflict of law principles. Any disputes shall be resolved in the courts of San Diego County, California.
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl text-t-text mb-4">Changes to Terms</h2>
                <p>
                  We reserve the right to modify these terms at any time. Changes will be posted on this page with an updated revision date. Continued use of our Site or services after changes constitutes acceptance of the revised terms.
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl text-t-text mb-4">Contact Us</h2>
                <p>
                  If you have questions about these terms, please contact us:
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
