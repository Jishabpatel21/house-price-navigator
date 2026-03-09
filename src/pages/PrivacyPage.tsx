
import React from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { ScrollArea } from "@/components/ui/scroll-area";

const PrivacyPage = () => {
  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-realestate-dark">Privacy Policy</h1>
          
          <ScrollArea className="h-[70vh] rounded-md border p-6 bg-white shadow-sm">
            <div className="space-y-6">
              <section>
                <p className="text-gray-700">
                  Effective Date: May 5, 2025
                </p>
                <p className="text-gray-700 mt-4">
                  Your privacy is important to us. It is House Price Navigator's policy to respect your privacy regarding any information we may collect from you across our website, www.housepricenavigator.in, and other sites we own and operate.
                </p>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
                <p className="text-gray-700">
                  We collect information in the following ways:
                </p>
                <ul className="list-disc pl-6 mt-2 space-y-2 text-gray-700">
                  <li>Information you provide to us directly: This includes your personal details such as name, email address, phone number, and property information that you submit when using our prediction service.</li>
                  <li>Log data: When you visit our website, our servers may automatically log standard data provided by your web browser. This may include your device's IP address, browser type and version, pages you visit, time and date of your visit, time spent on each page, and other details.</li>
                  <li>Device data: We may collect data about the device you're using to access our website.</li>
                  <li>Location data: We may determine your approximate location from your IP address to customize content relevant to your location, like showing you property trends in your area.</li>
                </ul>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold mb-4">2. How We Use Your Information</h2>
                <p className="text-gray-700">
                  We use the information we collect in various ways, including to:
                </p>
                <ul className="list-disc pl-6 mt-2 space-y-2 text-gray-700">
                  <li>Provide, operate, and maintain our website</li>
                  <li>Improve, personalize, and expand our website</li>
                  <li>Understand and analyze how you use our website</li>
                  <li>Develop new products, services, features, and functionality</li>
                  <li>Process property price predictions</li>
                  <li>Communicate with you, either directly or through one of our partners</li>
                  <li>Send you emails and newsletters</li>
                  <li>Find and prevent fraud</li>
                </ul>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold mb-4">3. Data Storage and Security</h2>
                <p className="text-gray-700">
                  We are committed to ensuring that the information you provide is secure. To prevent unauthorized access or disclosure, we have put in place suitable physical, electronic, and managerial procedures to safeguard and secure the information we collect online.
                </p>
                <p className="text-gray-700 mt-2">
                  All data is stored in India in accordance with Indian data protection laws, including the Personal Data Protection Bill.
                </p>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold mb-4">4. Disclosure of Information</h2>
                <p className="text-gray-700">
                  We may disclose your personal information in the following situations:
                </p>
                <ul className="list-disc pl-6 mt-2 space-y-2 text-gray-700">
                  <li>To comply with a legal obligation</li>
                  <li>To protect and defend our rights or property</li>
                  <li>To prevent or investigate possible wrongdoing in connection with the Service</li>
                  <li>To protect the personal safety of users of the Service or the public</li>
                  <li>To protect against legal liability</li>
                </ul>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold mb-4">5. Your Rights</h2>
                <p className="text-gray-700">
                  Under Indian data protection laws, you have the following rights:
                </p>
                <ul className="list-disc pl-6 mt-2 space-y-2 text-gray-700">
                  <li>The right to access – You have the right to request copies of your personal data.</li>
                  <li>The right to rectification – You have the right to request that we correct any information you believe is inaccurate.</li>
                  <li>The right to erasure – You have the right to request that we erase your personal data, under certain conditions.</li>
                  <li>The right to restrict processing – You have the right to request that we restrict the processing of your personal data, under certain conditions.</li>
                  <li>The right to data portability – You have the right to request that we transfer the data that we have collected to another organization, or directly to you, under certain conditions.</li>
                </ul>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold mb-4">6. Third-party Links</h2>
                <p className="text-gray-700">
                  Our website may contain links to other websites. If you click on a third-party link, you will be directed to that site. Note that these external sites are not operated by us. We strongly advise you to review the Privacy Policy of these websites as we have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.
                </p>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold mb-4">7. Changes to This Privacy Policy</h2>
                <p className="text-gray-700">
                  We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
                </p>
                <p className="text-gray-700 mt-2">
                  You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
                </p>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold mb-4">8. Contact Us</h2>
                <p className="text-gray-700">
                  If you have any questions about this Privacy Policy, please contact us at privacy@housepricenavigator.in
                </p>
              </section>
            </div>
          </ScrollArea>
        </div>
      </div>
    </PageLayout>
  );
};

export default PrivacyPage;
