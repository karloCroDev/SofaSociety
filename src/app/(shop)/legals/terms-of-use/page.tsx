// Components
import { Layout, LayoutRow, LayoutColumn } from '@/components/ui/Layout';

export default function TermsOfUse() {
  return (
    <Layout className="mt-28 lg:mt-36">
      <LayoutRow>
        <LayoutColumn lgOffset={2} lg={7}>
          <h1 className="text-3xl font-semibold">
            Terms of Use for Sofa Society
          </h1>
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

            <div>
              <h4>1. Terms of Use:</h4>
              <p>
                All content and materials on our website, including text,
                graphics, logos, images, videos, and trademarks, are the
                property of Sofa Society or its licensors and are protected by
                intellectual property laws. You may not use, reproduce, modify,
                or distribute any of our content without our prior written
                permission.
              </p>
            </div>

            <div>
              <h4>2. Use of the Website:</h4>
              {/* TODO: Ovu `<ol>` listu provjeri u dizajnu molim te, mislim da razmaci i uvlake nisu dobre. */}
              <ol>
                <li>
                  Eligibility: You must be at least 16 years old to use our
                  website. If you are under the age of 18, you should review
                  these terms with a parent or guardian to ensure their
                  understanding and agreement.
                </li>
                <li>
                  User Account: Some features of our website may require you to
                  create an account. You are responsible for maintaining the
                  confidentiality of your account credentials and are solely
                  responsible for any activity that occurs under your account.
                </li>
                <li>
                  Prohibited Activities: You agree not to engage in any of the
                  following activities:
                  <ul>
                    <li>Violating any applicable laws or regulations.</li>
                    <li>
                      Impersonating any person or entity or falsely representing
                      your affiliation with any person or entity.
                    </li>
                    <li>
                      Interfering with or disrupting the functionality of our
                      website or servers.
                    </li>
                    <li>
                      Uploading or transmitting any viruses, malware, or other
                      malicious code.
                    </li>
                    <li>
                      Collecting or harvesting any information from our website
                      without our consent.
                    </li>
                  </ul>
                </li>
              </ol>
            </div>
            <div>
              <h4>3. Third-Party Links and Content:</h4>
              <p>
                Our website may contain links to third-party websites or display
                content from third parties. We do not endorse or control these
                third-party websites or content, and your use of them is at your
                own risk. We are not responsible for the accuracy, reliability,
                or legality of any third-party websites or content.
              </p>
            </div>

            <div>
              <h4>4. Disclaimer of Warranties:</h4>
              <p>
                Our website is provided on an "as is" and "as available" basis.
                We do not make any warranties, express or implied, regarding the
                operation, availability, or accuracy of our website or the
                content therein. Your use of our website is at your sole risk.
              </p>
            </div>

            <div>
              <h4>5. Limitation of Liability:</h4>
              <p>
                To the maximum extent permitted by law, Sofa Society and its
                affiliates, officers, directors, employees, and agents shall not
                be liable for any direct, indirect, incidental, consequential,
                or special damages arising out of or in connection with your use
                of our website, even if advised of the possibility of such
                damages.
              </p>
            </div>

            <div>
              <h4>6. Indemnification:</h4>
              <p>
                You agree to indemnify, defend, and hold harmless Sofa Society
                and its affiliates, officers, directors, employees, and agents
                from and against any claims, liabilities, damages, losses, and
                expenses, including reasonable attorney's fees, arising out of
                or in connection with your use of our website or violation of
                these Terms of Use.
              </p>
            </div>

            <div>
              <h4>7. Modifications to the Terms:</h4>
              <p>
                You agree to indemnify, defend, and hold harmless Sofa Society
                and its affiliates, officers, directors, employees, and agents
                from and against any claims, liabilities, damages, losses, and
                expenses, including reasonable attorney's fees, arising out of
                or in connection with your use of our website or violation of
                these Terms of Use.
              </p>
            </div>

            <div>
              <h4>8. Governing Law and Jurisdiction:</h4>
              <p>
                These Terms of Use shall be governed by and construed in
                accordance with the laws. Any disputes arising out of or in
                connection with these terms shall be subject to the exclusive
                jurisdiction of the courts.
              </p>
            </div>
          </div>
        </LayoutColumn>
      </LayoutRow>
    </Layout>
  );
}
