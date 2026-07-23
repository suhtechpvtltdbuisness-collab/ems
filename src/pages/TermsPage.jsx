import React from "react";

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 text-gray-800">
      <div className="bg-white/80 backdrop-blur-md rounded-3xl border border-gray-100 shadow-xl p-5 sm:p-8 md:p-12">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
          Terms of Service
        </h1>
        <p className="text-sm text-gray-400 mb-8">Last updated: June 20, 2026</p>

        <section className="space-y-6 text-gray-600 leading-relaxed">
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-3">1. Acceptance of Terms</h2>
            <p>
              By accessing or using our HRMS platform, you agree to comply with and be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-3">2. User Accounts and Subscription</h2>
            <p>
              To access certain features of the platform, you must create a registered account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. Subscriptions are billed according to your chosen plan, and fees are non-refundable unless stated otherwise.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-3">3. Acceptable Use Policy</h2>
            <p>
              You agree not to use the platform for any unlawful purpose or in any way that interrupts, damages, or impairs the functionality of our services. You are solely responsible for all data, content, and information uploaded by your organization.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-3">4. Intellectual Property</h2>
            <p>
              All software, content, designs, and branding elements on this platform are the exclusive property of Suhtech or its licensors. You are granted a limited, non-exclusive, non-transferable license to access and use the platform during your subscription term.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-3">5. Limitation of Liability</h2>
            <p>
              Our services are provided on an "as is" and "as available" basis. To the maximum extent permitted by law, Suhtech shall not be liable for any direct, indirect, incidental, or consequential damages resulting from the use or inability to use our services.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
