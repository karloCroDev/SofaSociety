// Components
import { Layout, LayoutRow, LayoutColumn } from '@/components/ui/Layout';

export default function CookiePolicy() {
  return (
    <Layout className="mt-28 lg:mt-36">
      <LayoutRow>
        <LayoutColumn lgOffset={2} lg={7}>
          <h1 className="text-3xl font-semibold">Cookie policy</h1>
        </LayoutColumn>
        <LayoutColumn
          xs={12}
          lg={6}
          lgOffset={2}
          className="lg:mb-50 mb-32 sm:mb-44"
        >
          <div className="article">
            <p>
              Welcome to Sofa Society. These Terms of Use govern your access to
              and use of our website, products, and services. By accessing or
              using our platform, you agree to be bound by these terms and
              conditions. If you do not agree with any part of these terms,
              please do not use our website.
            </p>

            <h4>1. What Are Cookies:</h4>
            <p>
              Cookies are small text files that are placed on your computer or
              device when you visit a website. They are widely used to make
              websites work more efficiently and provide a better browsing
              experience. Cookies also enable website owners to collect certain
              information about visitors.
            </p>

            <h4>2. Types of Cookies We Use:</h4>
            <p>We use the following types of cookies on our website:</p>
            <ul>
              <li>
                Essential Cookies: These cookies are necessary for the operation
                of our website and enable you to navigate and use its features.
                They are typically set in response to your actions, such as
                setting your privacy preferences, logging in, or filling out
                forms.
              </li>
              <li>
                Analytics and Performance Cookies: These cookies help us
                understand how visitors interact with our website by collecting
                information such as the number of visitors, pages visited, and
                sources of traffic. This data helps us improve our
                website&apos;s performance and usability.
              </li>
              <li>
                Functionality Cookies: These cookies allow our website to
                remember choices you make (such as language preferences) and
                provide enhanced features. They may also be used to provide
                personalized content based on your browsing history.
              </li>

              <li>
                Advertising and Targeting Cookies: These cookies are used to
                deliver advertisements that are relevant to your interests. They
                may also be used to limit the number of times you see an
                advertisement and measure the effectiveness of advertising
                campaigns.
              </li>
            </ul>

            <h4>3. Third-Party Cookies:</h4>
            <p>
              We may allow third-party service providers, such as analytics and
              advertising companies, to place cookies on our website. These
              third parties may collect information about your online activities
              over time and across different websites.
            </p>

            <h4>4. Cookie Management:</h4>
            <p>
              You can manage and control cookies through your browser settings.
              Most web browsers allow you to block or delete cookies. However,
              please note that blocking or deleting certain cookies may impact
              the functionality and user experience of our website. For more
              information on how to manage cookies, you can visit the help or
              settings section of your browser.
            </p>

            <h4>5. Updates to the Cookie Policy:</h4>
            <p>
              We may update this Cookie Policy from time to time to reflect
              changes in our use of cookies or for other operational, legal, or
              regulatory reasons. We will notify you of any material changes by
              posting a prominent notice on our website.
            </p>

            <h4>6. Contact Us:</h4>
            <p>
              If you have any questions, concerns, or requests regarding this
              Privacy Policy or how we handle your personal information, please
              contact us at:
            </p>
            <p>
              Email: privacy@sofasociety.com <br /> Address: Skärgårdsvägen 12,
              124 55 Stockholm
            </p>
          </div>
        </LayoutColumn>
      </LayoutRow>
    </Layout>
  );
}
