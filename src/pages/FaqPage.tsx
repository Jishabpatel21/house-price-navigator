
import React from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FaqPage = () => {
  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-realestate-dark">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-gray-600 text-center mb-12">
            Find answers to common questions about our platform and house price predictions
          </p>
          
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>About Our Platform</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>How accurate are your price predictions?</AccordionTrigger>
                  <AccordionContent>
                    Our predictions are typically within 3-5% of the actual sale price for most properties in major metropolitan areas. 
                    The accuracy depends on the availability of comparable properties and recent sales data in your area. 
                    Each prediction comes with a confidence interval that indicates the expected range.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-2">
                  <AccordionTrigger>What data do you use for your predictions?</AccordionTrigger>
                  <AccordionContent>
                    We use a comprehensive dataset that includes property transaction history, property characteristics, tax records, 
                    neighborhood statistics, school ratings, crime data, economic indicators, and market trends. Our data is regularly 
                    updated to ensure the most accurate predictions possible. For more details, visit our Dataset Information page.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-3">
                  <AccordionTrigger>How often do you update your prediction models?</AccordionTrigger>
                  <AccordionContent>
                    Our machine learning models are retrained quarterly with the latest property transaction data to 
                    ensure they capture current market trends. Additionally, we perform monthly data refreshes to 
                    incorporate new property listings and sales into our database.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-4">
                  <AccordionTrigger>Which locations do you support?</AccordionTrigger>
                  <AccordionContent>
                    We currently support all major U.S. metropolitan areas and their surrounding suburbs. Our coverage 
                    is most comprehensive in areas with high transaction volumes. We're continuously expanding to include 
                    more rural areas and international markets.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
          
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Using the Platform</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-5">
                  <AccordionTrigger>How do I get a price prediction for my property?</AccordionTrigger>
                  <AccordionContent>
                    To get a prediction, navigate to the "Predict" page and enter your property details including address, 
                    bedrooms, bathrooms, square footage, and other characteristics. For the most accurate results, provide 
                    as much information as possible about your property. Once submitted, our system will generate a prediction 
                    within seconds.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-6">
                  <AccordionTrigger>Do I need to create an account to use the platform?</AccordionTrigger>
                  <AccordionContent>
                    While basic predictions are available without an account, creating a free account allows you to save your 
                    prediction history, receive updates on property values, and access additional features like comparable 
                    property analysis and market trend reports.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-7">
                  <AccordionTrigger>Can I use your predictions for official property valuations?</AccordionTrigger>
                  <AccordionContent>
                    Our predictions are designed to provide guidance and insights, but they should not replace professional 
                    appraisals for official purposes such as mortgage applications, tax assessments, or legal proceedings. 
                    For these situations, we recommend consulting with a licensed real estate appraiser.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-8">
                  <AccordionTrigger>How can I improve the accuracy of my prediction?</AccordionTrigger>
                  <AccordionContent>
                    To improve prediction accuracy, provide complete and accurate information about your property, including 
                    recent renovations or upgrades. You can also add photos and additional details like the condition of 
                    major systems (HVAC, roof, etc.) which our premium algorithm can analyze for more precise valuations.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
          
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Account & Billing</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-9">
                  <AccordionTrigger>What are the different account tiers?</AccordionTrigger>
                  <AccordionContent>
                    We offer three account tiers: Free, Pro, and Enterprise. The Free tier allows basic predictions with 
                    limited features. The Pro tier ($19.99/month) includes unlimited predictions, historical data access, 
                    and advanced analytics. The Enterprise tier offers custom solutions for real estate professionals and 
                    organizations with API access and white-labeling options.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-10">
                  <AccordionTrigger>How do I upgrade or downgrade my account?</AccordionTrigger>
                  <AccordionContent>
                    You can upgrade or downgrade your account at any time through the Account Settings page. Changes to your 
                    subscription will take effect at the start of your next billing cycle. If you downgrade, you'll maintain 
                    access to your current features until the end of the current billing period.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-11">
                  <AccordionTrigger>How can I cancel my subscription?</AccordionTrigger>
                  <AccordionContent>
                    To cancel your subscription, go to Account Settings, select the Subscription tab, and click on "Cancel Subscription." 
                    You'll continue to have access to your paid features until the end of your current billing cycle. After cancellation, 
                    your account will automatically revert to the Free tier.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-12">
                  <AccordionTrigger>Do you offer refunds?</AccordionTrigger>
                  <AccordionContent>
                    We offer a 14-day money-back guarantee for new Pro subscriptions if you're not satisfied with the service. 
                    For refund requests, please contact our support team within 14 days of your initial payment. Please note 
                    that specialized reports and one-time purchases are non-refundable once delivered.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Technical Support</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-13">
                  <AccordionTrigger>How can I contact customer support?</AccordionTrigger>
                  <AccordionContent>
                    You can reach our customer support team through the Support Center page, where you can submit a ticket 
                    or start a live chat during business hours (9am-5pm EST, Monday-Friday). Pro and Enterprise users have 
                    access to priority support with faster response times.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-14">
                  <AccordionTrigger>Is there an API available for developers?</AccordionTrigger>
                  <AccordionContent>
                    Yes, we offer a comprehensive API for Enterprise customers. The API allows you to integrate our prediction 
                    engine into your own applications and services. Detailed documentation is available in our API Documentation 
                    section. Custom API solutions and rate limits can be discussed with our sales team.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-15">
                  <AccordionTrigger>What browsers are supported?</AccordionTrigger>
                  <AccordionContent>
                    Our platform supports all modern browsers including Chrome, Firefox, Safari, and Edge (version 18 and above). 
                    For the best experience, we recommend using the latest version of these browsers. Internet Explorer is not 
                    officially supported.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
};

export default FaqPage;
