export default function Terms() {
	return (
		<div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
			<div className="bg-white rounded-lg shadow-sm p-8">
				<h1 className="text-3xl font-bold text-gray-900 mb-8">Terms of Service</h1>

				<div className="prose prose-lg max-w-none">
					<p className="text-gray-600 mb-6">
						Last updated: {new Date().toLocaleDateString()}
					</p>

					<section className="mb-8">
						<h2 className="text-2xl font-semibold text-gray-900 mb-4">
							Agreement to Terms
						</h2>
						<p className="text-gray-700 mb-4">
							By accessing and using PromptFlow, you accept and agree to be bound by
							the terms and provision of this agreement. If you do not agree to abide
							by the above, please do not use this service.
						</p>
					</section>

					<section className="mb-8">
						<h2 className="text-2xl font-semibold text-gray-900 mb-4">
							Description of Service
						</h2>
						<p className="text-gray-700 mb-4">
							PromptFlow is a web-based platform that allows users to create, manage,
							and execute AI prompt workflows. Our service includes tools for building
							complex prompt chains, managing templates, and organizing AI
							interactions.
						</p>
					</section>

					<section className="mb-8">
						<h2 className="text-2xl font-semibold text-gray-900 mb-4">User Accounts</h2>
						<p className="text-gray-700 mb-4">
							When you create an account with us, you must provide information that is
							accurate, complete, and current at all times. You are responsible for
							safeguarding the password and for maintaining the confidentiality of
							your account.
						</p>
					</section>

					<section className="mb-8">
						<h2 className="text-2xl font-semibold text-gray-900 mb-4">
							Acceptable Use
						</h2>
						<p className="text-gray-700 mb-4">You agree not to use the service:</p>
						<ul className="list-disc pl-6 text-gray-700 mb-4">
							<li>
								For any unlawful purpose or to solicit others to perform unlawful
								acts
							</li>
							<li>
								To violate any international, federal, provincial, or state
								regulations, rules, laws, or local ordinances
							</li>
							<li>
								To infringe upon or violate our intellectual property rights or the
								intellectual property rights of others
							</li>
							<li>
								To harass, abuse, insult, harm, defame, slander, disparage,
								intimidate, or discriminate
							</li>
							<li>To submit false or misleading information</li>
							<li>
								To upload or transmit viruses or any other type of malicious code
							</li>
						</ul>
					</section>

					<section className="mb-8">
						<h2 className="text-2xl font-semibold text-gray-900 mb-4">
							Content and Intellectual Property
						</h2>
						<p className="text-gray-700 mb-4">
							You retain ownership of the content you create using our service.
							However, by using our service, you grant us a limited license to host,
							store, and display your content as necessary to provide the service to
							you.
						</p>
						<p className="text-gray-700 mb-4">
							The PromptFlow platform, including its software, design, text, graphics,
							and other content, is owned by us and is protected by copyright,
							trademark, and other intellectual property laws.
						</p>
					</section>

					<section className="mb-8">
						<h2 className="text-2xl font-semibold text-gray-900 mb-4">
							Privacy Policy
						</h2>
						<p className="text-gray-700 mb-4">
							Your privacy is important to us. Please review our Privacy Policy, which
							also governs your use of the service, to understand our practices.
						</p>
					</section>

					<section className="mb-8">
						<h2 className="text-2xl font-semibold text-gray-900 mb-4">
							Service Availability
						</h2>
						<p className="text-gray-700 mb-4">
							We strive to maintain high availability of our service, but we do not
							guarantee that the service will be available at all times. We may
							suspend or terminate the service for maintenance, updates, or other
							operational reasons.
						</p>
					</section>

					<section className="mb-8">
						<h2 className="text-2xl font-semibold text-gray-900 mb-4">
							Limitation of Liability
						</h2>
						<p className="text-gray-700 mb-4">
							In no event shall PromptFlow, nor its directors, employees, partners,
							agents, suppliers, or affiliates, be liable for any indirect,
							incidental, special, consequential, or punitive damages, including
							without limitation, loss of profits, data, use, goodwill, or other
							intangible losses, resulting from your use of the service.
						</p>
					</section>

					<section className="mb-8">
						<h2 className="text-2xl font-semibold text-gray-900 mb-4">Termination</h2>
						<p className="text-gray-700 mb-4">
							We may terminate or suspend your account and bar access to the service
							immediately, without prior notice or liability, under our sole
							discretion, for any reason whatsoever and without limitation, including
							but not limited to a breach of the Terms.
						</p>
					</section>

					<section className="mb-8">
						<h2 className="text-2xl font-semibold text-gray-900 mb-4">
							Changes to Terms
						</h2>
						<p className="text-gray-700 mb-4">
							We reserve the right, at our sole discretion, to modify or replace these
							Terms at any time. If a revision is material, we will provide at least
							30 days notice prior to any new terms taking effect.
						</p>
					</section>

					<section className="mb-8">
						<h2 className="text-2xl font-semibold text-gray-900 mb-4">
							Contact Information
						</h2>
						<p className="text-gray-700 mb-4">
							If you have any questions about these Terms of Service, please contact
							us at:
						</p>
						<div className="bg-gray-50 p-4 rounded-lg">
							<p className="text-gray-700">Email: legal@promptflow.com</p>
						</div>
					</section>
				</div>
			</div>
		</div>
	);
}
