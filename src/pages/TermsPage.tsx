
import React from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { ScrollArea } from "@/components/ui/scroll-area";

const TermsPage = () => {
  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-realestate-dark">Terms of Service</h1>
          
          <ScrollArea className="h-[70vh] rounded-md border p-6 bg-white shadow-sm">
            <div className="space-y-6">
              <section>
                <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
                <p className="text-gray-700">
                  Welcome to House Price Navigator. These Terms of Service ("Terms") govern your use of our website located at www.housepricenavigator.in (the "Service") operated by House Price Navigator Pvt. Ltd. ("us", "we", or "our").
                </p>
                <p className="text-gray-700 mt-2">
                  By accessing or using the Service, you agree to be bound by these Terms. If you disagree with any part of the terms, you may not access the Service.
                </p>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold mb-4">2. Use of the Service</h2>
                <p className="text-gray-700">
                  Our Service provides property price predictions using machine learning algorithms. These predictions are estimates based on available data and should not be considered as guaranteed property valuations. Users should consult with qualified real estate professionals before making any financial decisions related to property transactions.
                </p>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold mb-4">3. User Accounts</h2>
                <p className="text-gray-700">
                  When you create an account with us, you must provide information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.
                </p>
                <p className="text-gray-700 mt-2">
                  You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password.
                </p>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold mb-4">4. Content</h2>
                <p className="text-gray-700">
                  Our Service allows you to post, link, store, share and otherwise make available certain information, text, graphics, or other material ("Content"). You are responsible for the Content that you post on or through the Service, including its legality, reliability, and appropriateness.
                </p>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold mb-4">5. Intellectual Property</h2>
                <p className="text-gray-700">
                  The Service and its original content, features, and functionality are and will remain the exclusive property of House Price Navigator and its licensors. The Service is protected by copyright, trademark, and other laws of both India and foreign countries.
                </p>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold mb-4">6. Links To Other Web Sites</h2>
                <p className="text-gray-700">
                  Our Service may contain links to third-party websites or services that are not owned or controlled by House Price Navigator.
                </p>
                <p className="text-gray-700 mt-2">
                  House Price Navigator has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third-party websites or services. You further acknowledge and agree that House Price Navigator shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with the use of or reliance on any such content, goods, or services available on or through any such websites or services.
                </p>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold mb-4">7. Termination</h2>
                <p className="text-gray-700">
                  We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
                </p>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold mb-4">8. Limitation Of Liability</h2>
                <p className="text-gray-700">
                  In no event shall House Price Navigator, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
                </p>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold mb-4">9. Governing Law</h2>
                <p className="text-gray-700">
                  These Terms shall be governed and construed in accordance with the laws of India, without regard to its conflict of law provisions.
                </p>
                <p className="text-gray-700 mt-2">
                  Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect.
                </p>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold mb-4">10. Changes</h2>
                <p className="text-gray-700">
                  We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
                </p>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold mb-4">11. Contact Us</h2>
                <p className="text-gray-700">
                  If you have any questions about these Terms, please contact us at legal@housepricenavigator.in
                </p>
              </section>
              
              <p className="text-gray-500 text-sm mt-8">
                Last updated: May 5, 2025
              </p>
            </div>
          </ScrollArea>
        </div>
      </div>
    </PageLayout>
  );
};

export default TermsPage;
