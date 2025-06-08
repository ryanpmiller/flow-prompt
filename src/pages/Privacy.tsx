export default function Privacy() {
	return (
		<div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
			<div className="bg-white rounded-lg shadow-sm p-8">
				<h1 className="text-3xl font-bold text-gray-900 mb-8">Privacy Policy</h1>

				<div className="prose prose-lg max-w-none">
					<p className="text-gray-600 mb-6">
						Last updated: {new Date().toLocaleDateString()}
					</p>

					<section className="mb-8">
						<h2 className="text-2xl font-semibold text-gray-900 mb-4">Introduction</h2>
						<p className="text-gray-700 mb-4">
							Welcome to PromptFlow. We respect your privacy and are committed to
							protecting your personal data. This privacy policy will inform you about
							how we look after your personal data when you visit our website and tell
							you about your privacy rights and how the law protects you.
						</p>
					</section>

					<section className="mb-8">
						<h2 className="text-2xl font-semibold text-gray-900 mb-4">
							Information We Collect
						</h2>
						<p className="text-gray-700 mb-4">
							We may collect, use, store and transfer different kinds of personal data
							about you:
						</p>
						<ul className="list-disc pl-6 text-gray-700 mb-4">
							<li>Identity Data: name, username or similar identifier</li>
							<li>Contact Data: email address and telephone numbers</li>
							<li>
								Technical Data: internet protocol (IP) address, browser type and
								version, time zone setting
							</li>
							<li>
								Usage Data: information about how you use our website and services
							</li>
						</ul>
					</section>

					<section className="mb-8">
						<h2 className="text-2xl font-semibold text-gray-900 mb-4">
							How We Use Your Information
						</h2>
						<p className="text-gray-700 mb-4">We use the information we collect to:</p>
						<ul className="list-disc pl-6 text-gray-700 mb-4">
							<li>Provide, operate, and maintain our services</li>
							<li>Improve, personalize, and expand our services</li>
							<li>Understand and analyze how you use our services</li>
							<li>Communicate with you about updates and changes to our services</li>
							<li>Process transactions and send related information</li>
						</ul>
					</section>

					<section className="mb-8">
						<h2 className="text-2xl font-semibold text-gray-900 mb-4">
							Data Storage and Security
						</h2>
						<p className="text-gray-700 mb-4">
							We implement appropriate technical and organizational security measures
							to protect your personal data against unauthorized access, alteration,
							disclosure, or destruction. Your data is stored securely and we
							regularly review our security practices.
						</p>
					</section>

					<section className="mb-8">
						<h2 className="text-2xl font-semibold text-gray-900 mb-4">Your Rights</h2>
						<p className="text-gray-700 mb-4">
							Under certain circumstances, you have rights under data protection laws
							in relation to your personal data:
						</p>
						<ul className="list-disc pl-6 text-gray-700 mb-4">
							<li>Request access to your personal data</li>
							<li>Request correction of your personal data</li>
							<li>Request erasure of your personal data</li>
							<li>Object to processing of your personal data</li>
							<li>Request restriction of processing your personal data</li>
							<li>Request transfer of your personal data</li>
						</ul>
					</section>

					<section className="mb-8">
						<h2 className="text-2xl font-semibold text-gray-900 mb-4">Cookies</h2>
						<p className="text-gray-700 mb-4">
							We use cookies and similar tracking technologies to track activity on
							our service and store certain information. You can instruct your browser
							to refuse all cookies or to indicate when a cookie is being sent.
						</p>
					</section>

					<section className="mb-8">
						<h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Us</h2>
						<p className="text-gray-700 mb-4">
							If you have any questions about this Privacy Policy, please contact us
							at:
						</p>
						<div className="bg-gray-50 p-4 rounded-lg">
							<p className="text-gray-700">Email: privacy@promptflow.com</p>
						</div>
					</section>
				</div>
			</div>
		</div>
	);
}
