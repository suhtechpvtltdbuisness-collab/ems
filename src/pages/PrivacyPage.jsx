import React from "react";

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 text-gray-800">
      <div className="bg-white/80 backdrop-blur-md rounded-3xl border border-gray-100 shadow-xl p-5 sm:p-8 md:p-12">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
          Privacy Policy
        </h1>
        <p className="text-sm text-gray-400 mb-8">Last updated: June 20, 2026</p>

        <section className="space-y-6 text-gray-600 leading-relaxed">
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-3">1. Information We Collect</h2>
            <p>
              We collect information that you provide directly to us when creating an account, subscribing to our services, or interacting with our platform. This may include your name, email address, company name, contact details, and payment information.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-3">2. How We Use Your Information</h2>
            <p>
              We use the collected information to operate, maintain, and improve our HRMS and employee management system. This includes processing transactions, providing customer support, sending product updates, and securing our platform against unauthorized access or fraud.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-3">3. Data Security and Sharing</h2>
            <p>
              Your data security is our top priority. We implement appropriate technical and organizational measures to safeguard your personal data. We do not sell or lease your personal information to third parties. We only share information with trusted third-party service providers (such as payment processors) to perform services on our behalf.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-3">4. Cookies and Tracking</h2>
            <p>
              We use cookies and similar tracking technologies to analyze web traffic, optimize your experience, and remember your session details. You can manage your cookie preferences through your browser settings.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-3">5. Your Rights and Choices</h2>
            <p>
              You have the right to access, update, or request deletion of your personal data. If you wish to exercise these rights or have questions about our privacy practices, please contact our support team.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
