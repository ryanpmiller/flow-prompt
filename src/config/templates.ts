import { DEFAULT_MODEL } from './models';

export const featuredTemplates = [
	{
		id: 'resume-builder',
		name: 'Resume Builder',
		description: 'Create ATS-optimized resumes and cover letters',
		nodes: [
			{
				id: 'node1',
				type: 'promptNode' as const,
				position: { x: 200, y: 100 },
				data: {
					type: 'input' as const,
					content: `Job Description:
{{jobDescription}}

Current Resume/Experience:
{{currentResume}}

Target Role Level:
{{roleLevel}}

Key Skills to Highlight:
{{keySkills}}

Career Goals:
{{careerGoals}}`,
					settings: {
						temperature: 0.7,
						model: DEFAULT_MODEL,
					},
				},
			},
			{
				id: 'node2',
				type: 'promptNode' as const,
				position: { x: 500, y: 300 },
				data: {
					type: 'transform' as const,
					content: `You are an expert career coach and ATS optimization specialist. Based on the job description and candidate information provided, create a highly optimized resume that:

1. Uses ATS-friendly formatting and keywords from the job description
2. Quantifies achievements with specific metrics where possible
3. Tailors the professional summary to match the target role
4. Highlights relevant skills and experiences that align with job requirements
5. Uses strong action verbs and industry-specific terminology
6. Ensures proper keyword density without stuffing

Format the resume with clear sections: Contact Info, Professional Summary, Core Competencies, Professional Experience, Education, and Certifications (if applicable).

Input Information:
{{input}}

Generate a professional, ATS-optimized resume:`,
					settings: {
						temperature: 0.6,
						model: DEFAULT_MODEL,
					},
				},
			},
			{
				id: 'node3',
				type: 'promptNode' as const,
				position: { x: 800, y: 500 },
				data: {
					type: 'transform' as const,
					content: `Now create a compelling cover letter that complements the resume. The cover letter should:

1. Open with a strong hook that demonstrates knowledge of the company
2. Connect specific experiences to job requirements
3. Show enthusiasm and cultural fit
4. Include a clear call to action
5. Be concise (3-4 paragraphs maximum)
6. Use a professional yet personable tone

Use the resume content and job information to create a tailored cover letter:

{{input}}

Generate a professional cover letter:`,
					settings: {
						temperature: 0.8,
						model: DEFAULT_MODEL,
					},
				},
			},
		],
		edges: [
			{
				id: 'e1-2',
				source: 'node1',
				target: 'node2',
				type: 'default',
			},
			{
				id: 'e2-3',
				source: 'node2',
				target: 'node3',
				type: 'default',
			},
		],
		category: 'Career',
	},
	{
		id: 'cold-email',
		name: 'Cold Email Generator',
		description: 'Generate personalized outreach emails',
		nodes: [
			{
				id: 'node1',
				type: 'promptNode' as const,
				position: { x: 200, y: 100 },
				data: {
					type: 'input' as const,
					content: `Company Name:
{{companyName}}

Recipient Name and Title:
{{recipientInfo}}

Product/Service:
{{productService}}

Key Value Proposition:
{{valueProposition}}

Target Industry:
{{industry}}

Specific Pain Point to Address:
{{painPoint}}

Desired Call-to-Action:
{{callToAction}}

Sender's Background/Credibility:
{{senderBackground}}`,
					settings: {
						temperature: 0.7,
						model: DEFAULT_MODEL,
					},
				},
			},
			{
				id: 'node2',
				type: 'promptNode' as const,
				position: { x: 500, y: 300 },
				data: {
					type: 'transform' as const,
					content: `You are an expert sales copywriter specializing in cold outreach. Create a highly personalized cold email that:

1. Opens with a compelling, personalized hook (avoid generic openings)
2. Demonstrates research about the recipient's company/industry
3. Clearly articulates the value proposition in terms of recipient benefits
4. Addresses a specific pain point or opportunity
5. Includes social proof or credibility indicators
6. Has a clear, specific call-to-action
7. Keeps the tone professional but conversational
8. Is concise (under 150 words)

Structure: Personalized opening → Value proposition → Brief credibility → Specific CTA

Input Information:
{{input}}

Generate a persuasive cold email:`,
					settings: {
						temperature: 0.8,
						model: DEFAULT_MODEL,
					},
				},
			},
			{
				id: 'node3',
				type: 'promptNode' as const,
				position: { x: 800, y: 500 },
				data: {
					type: 'transform' as const,
					content: `Now create 2 alternative versions of this email with different approaches:

Version 1: More direct and results-focused
Version 2: More relationship-building and consultative

Each version should maintain the same core message but use different angles and tonality to test what resonates best with this prospect.

Original Email:
{{input}}

Generate 2 alternative versions:`,
					settings: {
						temperature: 0.9,
						model: DEFAULT_MODEL,
					},
				},
			},
		],
		edges: [
			{
				id: 'e1-2',
				source: 'node1',
				target: 'node2',
				type: 'default',
			},
			{
				id: 'e2-3',
				source: 'node2',
				target: 'node3',
				type: 'default',
			},
		],
		category: 'Sales',
	},
	{
		id: 'brand-name',
		name: 'Brand Name Creator',
		description: 'Generate creative brand names and messaging',
		nodes: [
			{
				id: 'node1',
				type: 'promptNode' as const,
				position: { x: 200, y: 100 },
				data: {
					type: 'input' as const,
					content: `Business/Product Description:
{{businessDescription}}

Target Industry:
{{industry}}

Core Values and Mission:
{{coreValues}}

Target Audience:
{{targetAudience}}

Desired Brand Personality:
{{brandPersonality}}

Competitor Names to Avoid:
{{competitorNames}}

Preferred Name Style:
{{nameStyle}}

Domain Requirements:
{{domainRequirements}}`,
					settings: {
						temperature: 0.9,
						model: DEFAULT_MODEL,
					},
				},
			},
			{
				id: 'node2',
				type: 'promptNode' as const,
				position: { x: 500, y: 300 },
				data: {
					type: 'transform' as const,
					content: `You are a creative brand strategist and naming expert. Generate 15-20 unique brand name options that:

1. Are memorable and easy to pronounce
2. Reflect the brand's values and personality
3. Appeal to the target audience
4. Are distinctive in the industry
5. Work well for digital marketing and social media
6. Have potential for trademark registration
7. Avoid negative connotations in major languages

Provide names in these categories:
- Descriptive names (clear meaning)
- Invented names (made-up words)
- Compound names (combining words)
- Metaphorical names (symbolic meaning)

For each name, provide a brief rationale.

Input Information:
{{input}}

Generate brand name options:`,
					settings: {
						temperature: 0.9,
						model: DEFAULT_MODEL,
					},
				},
			},
			{
				id: 'node3',
				type: 'promptNode' as const,
				position: { x: 800, y: 500 },
				data: {
					type: 'transform' as const,
					content: `Now select the top 5 brand names from the options and create comprehensive brand messaging for each:

For each selected name, provide:
1. Brand tagline/slogan
2. Brand story (2-3 sentences)
3. Key messaging pillars
4. Tone of voice description
5. Visual identity suggestions
6. Potential logo concepts

Previous brand names and analysis:
{{input}}

Create detailed brand messaging for top 5 names:`,
					settings: {
						temperature: 0.8,
						model: DEFAULT_MODEL,
					},
				},
			},
		],
		edges: [
			{
				id: 'e1-2',
				source: 'node1',
				target: 'node2',
				type: 'default',
			},
			{
				id: 'e2-3',
				source: 'node2',
				target: 'node3',
				type: 'default',
			},
		],
		category: 'Branding',
	},
	{
		id: 'content-writer',
		name: 'Blog Content Writer',
		description: 'Generate engaging blog posts and articles',
		nodes: [
			{
				id: 'node1',
				type: 'promptNode' as const,
				position: { x: 200, y: 100 },
				data: {
					type: 'input' as const,
					content: `Blog Topic/Title:
{{blogTopic}}

Target Audience:
{{targetAudience}}

Content Goals:
{{contentGoals}}

Desired Tone and Style:
{{toneStyle}}

Target Word Count:
{{wordCount}}

Key Points to Cover:
{{keyPoints}}

SEO Keywords:
{{seoKeywords}}

Content Format Preference:
{{contentFormat}}

Call-to-Action:
{{callToAction}}`,
					settings: {
						temperature: 0.8,
						model: DEFAULT_MODEL,
					},
				},
			},
			{
				id: 'node2',
				type: 'promptNode' as const,
				position: { x: 500, y: 300 },
				data: {
					type: 'transform' as const,
					content: `You are an expert content writer and SEO specialist. Create a comprehensive blog post that:

1. Has an attention-grabbing headline and introduction
2. Uses clear structure with headers and subheaders
3. Incorporates SEO keywords naturally
4. Provides actionable insights and value
5. Includes engaging elements (examples, statistics, quotes)
6. Maintains consistent tone throughout
7. Ends with a compelling call-to-action
8. Is optimized for readability and engagement

Structure: Introduction → Main content sections → Key takeaways → CTA

Include meta description and suggested social media snippets.

Input Information:
{{input}}

Generate the complete blog post:`,
					settings: {
						temperature: 0.8,
						model: DEFAULT_MODEL,
					},
				},
			},
			{
				id: 'node3',
				type: 'promptNode' as const,
				position: { x: 800, y: 500 },
				data: {
					type: 'transform' as const,
					content: `Now create a content promotion strategy for this blog post:

1. 5 social media posts (LinkedIn, Twitter, Instagram, Facebook)
2. Email newsletter teaser
3. 3 alternative headlines for A/B testing
4. Key quotable snippets for social sharing
5. Related content ideas for content series
6. Engagement questions for comments

Blog post content:
{{input}}

Generate content promotion materials:`,
					settings: {
						temperature: 0.9,
						model: DEFAULT_MODEL,
					},
				},
			},
		],
		edges: [
			{
				id: 'e1-2',
				source: 'node1',
				target: 'node2',
				type: 'default',
			},
			{
				id: 'e2-3',
				source: 'node2',
				target: 'node3',
				type: 'default',
			},
		],
		category: 'Content',
	},
	{
		id: 'data-analyst',
		name: 'Data Analysis Helper',
		description: 'Analyze datasets and generate insights',
		nodes: [
			{
				id: 'node1',
				type: 'promptNode' as const,
				position: { x: 200, y: 100 },
				data: {
					type: 'input' as const,
					content: `Dataset Description:
{{datasetDescription}}

Data Sample/Structure:
{{dataSample}}

Business Context:
{{businessContext}}

Specific Questions/Hypotheses:
{{specificQuestions}}

Analysis Objectives:
{{analysisObjectives}}

Target Audience for Results:
{{targetAudience}}

Preferred Visualization Types:
{{visualizationTypes}}

Key Metrics of Interest:
{{keyMetrics}}`,
					settings: {
						temperature: 0.3,
						model: DEFAULT_MODEL,
					},
				},
			},
			{
				id: 'node2',
				type: 'promptNode' as const,
				position: { x: 500, y: 300 },
				data: {
					type: 'transform' as const,
					content: `You are an expert data analyst and business intelligence specialist. Analyze the provided dataset and:

1. Identify key patterns and trends
2. Answer the specific business questions
3. Provide statistical insights and significance
4. Highlight outliers and anomalies
5. Suggest data quality improvements
6. Recommend next steps for analysis
7. Present findings in business-friendly language
8. Include confidence levels and limitations

Structure your analysis with:
- Executive Summary
- Key Findings
- Detailed Analysis
- Recommendations
- Methodology Notes

Input Information:
{{input}}

Generate comprehensive data analysis:`,
					settings: {
						temperature: 0.4,
						model: DEFAULT_MODEL,
					},
				},
			},
			{
				id: 'node3',
				type: 'promptNode' as const,
				position: { x: 800, y: 500 },
				data: {
					type: 'transform' as const,
					content: `Now create a presentation-ready summary for stakeholders:

1. Executive dashboard with key KPIs
2. Visual representation suggestions (charts, graphs)
3. Actionable insights with business impact
4. Risk assessment and opportunities
5. Resource requirements for implementation
6. Timeline for recommended actions
7. Success metrics to track

Make it suitable for C-level presentation with clear ROI implications.

Analysis results:
{{input}}

Generate stakeholder presentation:`,
					settings: {
						temperature: 0.5,
						model: DEFAULT_MODEL,
					},
				},
			},
		],
		edges: [
			{
				id: 'e1-2',
				source: 'node1',
				target: 'node2',
				type: 'default',
			},
			{
				id: 'e2-3',
				source: 'node2',
				target: 'node3',
				type: 'default',
			},
		],
		category: 'Analysis',
	},
	{
		id: 'social-media-campaign',
		name: 'Social Media Campaign',
		description: 'Create comprehensive social media campaigns',
		nodes: [
			{
				id: 'node1',
				type: 'promptNode' as const,
				position: { x: 200, y: 100 },
				data: {
					type: 'input' as const,
					content: `Campaign Objective:
{{campaignObjective}}

Brand/Product:
{{brandProduct}}

Target Audience:
{{targetAudience}}

Key Message:
{{keyMessage}}

Campaign Duration:
{{campaignDuration}}

Platforms to Use:
{{platforms}}

Budget Range:
{{budgetRange}}

Brand Guidelines:
{{brandGuidelines}}

Competitor Analysis:
{{competitorAnalysis}}`,
					settings: {
						temperature: 0.8,
						model: DEFAULT_MODEL,
					},
				},
			},
			{
				id: 'node2',
				type: 'promptNode' as const,
				position: { x: 500, y: 300 },
				data: {
					type: 'transform' as const,
					content: `You are a social media strategist. Create a comprehensive campaign strategy that includes:

1. Campaign theme and creative concept
2. Content calendar (posts for 2 weeks)
3. Platform-specific adaptations
4. Hashtag strategy
5. Influencer collaboration opportunities
6. User-generated content ideas
7. Engagement tactics
8. Success metrics and KPIs

Each post should include: copy, visual suggestions, optimal posting times, and engagement hooks.

Input Information:
{{input}}

Generate social media campaign strategy:`,
					settings: {
						temperature: 0.8,
						model: DEFAULT_MODEL,
					},
				},
			},
			{
				id: 'node3',
				type: 'promptNode' as const,
				position: { x: 800, y: 500 },
				data: {
					type: 'transform' as const,
					content: `Now create crisis management and response strategies:

1. Potential negative scenarios and responses
2. Community management guidelines
3. Escalation procedures
4. Brand voice consistency rules
5. Response time expectations
6. Legal considerations
7. Monitoring and reporting protocols

Campaign strategy:
{{input}}

Generate crisis management plan:`,
					settings: {
						temperature: 0.6,
						model: DEFAULT_MODEL,
					},
				},
			},
		],
		edges: [
			{
				id: 'e1-2',
				source: 'node1',
				target: 'node2',
				type: 'default',
			},
			{
				id: 'e2-3',
				source: 'node2',
				target: 'node3',
				type: 'default',
			},
		],
		category: 'Marketing',
	},
	{
		id: 'product-launch',
		name: 'Product Launch Strategy',
		description: 'Plan comprehensive product launches',
		nodes: [
			{
				id: 'node1',
				type: 'promptNode' as const,
				position: { x: 200, y: 100 },
				data: {
					type: 'input' as const,
					content: `Product Details:
{{productDetails}}

Target Market:
{{targetMarket}}

Unique Value Proposition:
{{valueProposition}}

Competitive Landscape:
{{competitiveLandscape}}

Launch Timeline:
{{launchTimeline}}

Budget Constraints:
{{budgetConstraints}}

Success Metrics:
{{successMetrics}}

Distribution Channels:
{{distributionChannels}}

Risk Factors:
{{riskFactors}}`,
					settings: {
						temperature: 0.7,
						model: DEFAULT_MODEL,
					},
				},
			},
			{
				id: 'node2',
				type: 'promptNode' as const,
				position: { x: 500, y: 300 },
				data: {
					type: 'transform' as const,
					content: `You are a product marketing expert. Create a comprehensive launch strategy including:

1. Pre-launch phase strategy (buzz building)
2. Launch event/campaign concepts
3. Media and PR strategy
4. Influencer and partnership opportunities
5. Customer education materials
6. Sales enablement resources
7. Post-launch momentum tactics
8. Performance tracking framework

Input Information:
{{input}}

Generate product launch strategy:`,
					settings: {
						temperature: 0.7,
						model: DEFAULT_MODEL,
					},
				},
			},
			{
				id: 'node3',
				type: 'promptNode' as const,
				position: { x: 800, y: 500 },
				data: {
					type: 'transform' as const,
					content: `Create specific marketing materials and messaging:

1. Press release template
2. Product demo script
3. FAQ document
4. Sales pitch deck outline
5. Customer testimonial collection strategy
6. Onboarding sequence for new customers
7. Referral program design

Launch strategy:
{{input}}

Generate marketing materials:`,
					settings: {
						temperature: 0.8,
						model: DEFAULT_MODEL,
					},
				},
			},
		],
		edges: [
			{
				id: 'e1-2',
				source: 'node1',
				target: 'node2',
				type: 'default',
			},
			{
				id: 'e2-3',
				source: 'node2',
				target: 'node3',
				type: 'default',
			},
		],
		category: 'Business',
	},
	{
		id: 'lead-qualification',
		name: 'Lead Qualification Assistant',
		description: 'Qualify and score leads from various sources',
		nodes: [
			{
				id: 'node1',
				type: 'promptNode' as const,
				position: { x: 200, y: 100 },
				data: {
					type: 'input' as const,
					content: `Lead Source:
{{leadSource}}

Contact Information:
{{contactInfo}}

Company Details:
{{companyDetails}}

Budget Range:
{{budgetRange}}

Timeline for Decision:
{{timeline}}

Current Pain Points:
{{painPoints}}

Decision-Making Authority:
{{decisionAuthority}}

Previous Solutions Tried:
{{previousSolutions}}

Industry and Company Size:
{{industrySize}}`,
					settings: {
						temperature: 0.4,
						model: DEFAULT_MODEL,
					},
				},
			},
			{
				id: 'node2',
				type: 'promptNode' as const,
				position: { x: 500, y: 300 },
				data: {
					type: 'transform' as const,
					content: `You are an expert sales development representative with 10+ years of experience in lead qualification. Analyze this lead and provide:

1. Lead Score (1-10 scale with detailed reasoning)
2. BANT Qualification (Budget, Authority, Need, Timeline)
3. Fit Assessment (ideal customer profile match)
4. Urgency Level (high/medium/low priority)
5. Key Qualifying Questions to ask next
6. Potential objections and how to address them
7. Recommended next steps and timeline
8. Risk factors and red flags

Use the MEDDIC methodology where appropriate and provide specific talking points.

Lead Information:
{{input}}

Generate comprehensive lead qualification:`,
					settings: {
						temperature: 0.5,
						model: DEFAULT_MODEL,
					},
				},
			},
			{
				id: 'node3',
				type: 'promptNode' as const,
				position: { x: 800, y: 500 },
				data: {
					type: 'transform' as const,
					content: `Now create a personalized follow-up strategy and outreach sequence:

1. Immediate follow-up email (within 24 hours)
2. Follow-up call script with key questions
3. Value-based email sequence (3-5 touches)
4. Social media connection strategy
5. Content/resources to share based on pain points
6. Meeting invitation template
7. Proposal timeline if qualified

Lead qualification results:
{{input}}

Generate personalized follow-up strategy:`,
					settings: {
						temperature: 0.7,
						model: DEFAULT_MODEL,
					},
				},
			},
		],
		edges: [
			{
				id: 'e1-2',
				source: 'node1',
				target: 'node2',
				type: 'default',
			},
			{
				id: 'e2-3',
				source: 'node2',
				target: 'node3',
				type: 'default',
			},
		],
		category: 'Sales',
	},
	{
		id: 'customer-support',
		name: 'Customer Support Response Generator',
		description: 'Generate professional support responses and escalation procedures',
		nodes: [
			{
				id: 'node1',
				type: 'promptNode' as const,
				position: { x: 200, y: 100 },
				data: {
					type: 'input' as const,
					content: `Customer Issue Description:
{{issueDescription}}

Urgency Level:
{{urgencyLevel}}

Product/Service Involved:
{{productService}}

Customer History/Context:
{{customerHistory}}

Issue Category:
{{issueCategory}}

Customer Emotion/Tone:
{{customerEmotion}}

Previous Resolution Attempts:
{{previousAttempts}}

Account Value/Tier:
{{accountValue}}

Preferred Resolution:
{{preferredResolution}}`,
					settings: {
						temperature: 0.3,
						model: DEFAULT_MODEL,
					},
				},
			},
			{
				id: 'node2',
				type: 'promptNode' as const,
				position: { x: 500, y: 300 },
				data: {
					type: 'transform' as const,
					content: `You are a senior customer success manager with expertise in de-escalation and problem resolution. Create a professional support response that:

1. Acknowledges the customer's issue with empathy
2. Provides clear, step-by-step solution instructions
3. Sets appropriate expectations for resolution timeline
4. Offers alternative solutions if primary fails
5. Includes proactive follow-up plan
6. Maintains professional yet warm tone
7. Addresses underlying concerns beyond the immediate issue

Structure: Acknowledgment → Solution → Timeline → Follow-up → Prevention

Customer Support Information:
{{input}}

Generate professional support response:`,
					settings: {
						temperature: 0.4,
						model: DEFAULT_MODEL,
					},
				},
			},
			{
				id: 'node3',
				type: 'promptNode' as const,
				position: { x: 800, y: 500 },
				data: {
					type: 'transform' as const,
					content: `Create escalation procedures and additional support materials:

1. When to escalate criteria and escalation path
2. Internal team notification template
3. Manager briefing document
4. Customer retention strategy if high-value account
5. Knowledge base article to prevent future issues
6. Customer satisfaction follow-up sequence
7. Process improvement recommendations

Support response:
{{input}}

Generate escalation and follow-up procedures:`,
					settings: {
						temperature: 0.5,
						model: DEFAULT_MODEL,
					},
				},
			},
		],
		edges: [
			{
				id: 'e1-2',
				source: 'node1',
				target: 'node2',
				type: 'default',
			},
			{
				id: 'e2-3',
				source: 'node2',
				target: 'node3',
				type: 'default',
			},
		],
		category: 'Support',
	},
	{
		id: 'email-marketing',
		name: 'Email Marketing Campaign Builder',
		description: 'Create comprehensive email marketing campaigns',
		nodes: [
			{
				id: 'node1',
				type: 'promptNode' as const,
				position: { x: 200, y: 100 },
				data: {
					type: 'input' as const,
					content: `Campaign Objective:
{{campaignObjective}}

Target Audience Segments:
{{targetAudience}}

Product/Service Focus:
{{productFocus}}

Campaign Duration:
{{campaignDuration}}

Key Messages/Value Props:
{{keyMessages}}

Brand Voice and Tone:
{{brandVoice}}

Current Customer Journey Stage:
{{journeyStage}}

Success Metrics/Goals:
{{successMetrics}}

Compliance Requirements:
{{complianceRequirements}}`,
					settings: {
						temperature: 0.6,
						model: DEFAULT_MODEL,
					},
				},
			},
			{
				id: 'node2',
				type: 'promptNode' as const,
				position: { x: 500, y: 300 },
				data: {
					type: 'transform' as const,
					content: `You are an email marketing specialist with expertise in automation and conversion optimization. Create a comprehensive email campaign that includes:

1. Campaign strategy and positioning
2. Email sequence (5-7 emails) with specific timing
3. Subject lines optimized for open rates
4. Email copy with clear CTAs
5. Personalization and segmentation strategy
6. A/B testing recommendations
7. Mobile optimization considerations
8. Performance tracking metrics

Each email should have: purpose, target timing, subject line options, body copy, and CTA.

Campaign Information:
{{input}}

Generate email marketing campaign:`,
					settings: {
						temperature: 0.7,
						model: DEFAULT_MODEL,
					},
				},
			},
			{
				id: 'node3',
				type: 'promptNode' as const,
				position: { x: 800, y: 500 },
				data: {
					type: 'transform' as const,
					content: `Create advanced optimization and automation workflows:

1. Lead scoring and trigger-based emails
2. Re-engagement campaigns for inactive subscribers
3. Win-back sequences for churned customers
4. Cross-sell and upsell automation
5. Birthday/anniversary campaigns
6. Abandoned cart recovery (if applicable)
7. Performance monitoring dashboard setup
8. List hygiene and deliverability best practices

Email campaign:
{{input}}

Generate advanced email automation workflows:`,
					settings: {
						temperature: 0.6,
						model: DEFAULT_MODEL,
					},
				},
			},
		],
		edges: [
			{
				id: 'e1-2',
				source: 'node1',
				target: 'node2',
				type: 'default',
			},
			{
				id: 'e2-3',
				source: 'node2',
				target: 'node3',
				type: 'default',
			},
		],
		category: 'Marketing',
	},
	{
		id: 'project-kickoff',
		name: 'Project Kickoff Documentation',
		description: 'Generate project plans and documentation for new initiatives',
		nodes: [
			{
				id: 'node1',
				type: 'promptNode' as const,
				position: { x: 200, y: 100 },
				data: {
					type: 'input' as const,
					content: `Project Name and Description:
{{projectDescription}}

Key Stakeholders:
{{stakeholders}}

Project Timeline and Milestones:
{{timeline}}

Budget and Resources:
{{budgetResources}}

Success Criteria and Deliverables:
{{successCriteria}}

Known Risks and Constraints:
{{risksConstraints}}

Dependencies and Requirements:
{{dependencies}}

Communication Preferences:
{{communicationPrefs}}

Previous Similar Projects:
{{similarProjects}}`,
					settings: {
						temperature: 0.4,
						model: DEFAULT_MODEL,
					},
				},
			},
			{
				id: 'node2',
				type: 'promptNode' as const,
				position: { x: 500, y: 300 },
				data: {
					type: 'transform' as const,
					content: `You are a senior project manager with expertise in project initiation and stakeholder management. Create comprehensive project documentation including:

1. Project Charter with clear objectives and scope
2. Work Breakdown Structure (WBS)
3. Timeline with critical path analysis
4. Stakeholder analysis and communication matrix
5. Risk assessment and mitigation strategies
6. Resource allocation plan
7. Quality assurance framework
8. Success metrics and KPIs

Project Information:
{{input}}

Generate project kickoff documentation:`,
					settings: {
						temperature: 0.5,
						model: DEFAULT_MODEL,
					},
				},
			},
			{
				id: 'node3',
				type: 'promptNode' as const,
				position: { x: 800, y: 500 },
				data: {
					type: 'transform' as const,
					content: `Create operational templates and governance framework:

1. Weekly status report template
2. Change request process
3. Issue escalation matrix
4. Meeting agenda templates (kickoff, status, retrospective)
5. Project dashboard metrics
6. Stakeholder update communication templates
7. Project closure checklist
8. Lessons learned framework

Project documentation:
{{input}}

Generate project governance and templates:`,
					settings: {
						temperature: 0.5,
						model: DEFAULT_MODEL,
					},
				},
			},
		],
		edges: [
			{
				id: 'e1-2',
				source: 'node1',
				target: 'node2',
				type: 'default',
			},
			{
				id: 'e2-3',
				source: 'node2',
				target: 'node3',
				type: 'default',
			},
		],
		category: 'Project Management',
	},
	{
		id: 'meeting-summary',
		name: 'Meeting Summary & Action Items',
		description: 'Convert meeting notes into structured summaries and tasks',
		nodes: [
			{
				id: 'node1',
				type: 'promptNode' as const,
				position: { x: 200, y: 100 },
				data: {
					type: 'input' as const,
					content: `Meeting Transcript or Notes:
{{meetingNotes}}

Meeting Type and Purpose:
{{meetingType}}

Attendees and Roles:
{{attendees}}

Key Decisions Made:
{{keyDecisions}}

Outstanding Questions:
{{outstandingQuestions}}

Meeting Date and Duration:
{{meetingDetails}}

Follow-up Meeting Needed:
{{followupNeeded}}

Priority Level of Items:
{{priorityLevel}}

Related Projects/Initiatives:
{{relatedProjects}}`,
					settings: {
						temperature: 0.3,
						model: DEFAULT_MODEL,
					},
				},
			},
			{
				id: 'node2',
				type: 'promptNode' as const,
				position: { x: 500, y: 300 },
				data: {
					type: 'transform' as const,
					content: `You are an executive assistant specializing in meeting management and follow-up coordination. Create a structured meeting summary that includes:

1. Executive summary of key outcomes
2. Detailed action items with owners and deadlines
3. Key decisions and rationale
4. Unresolved issues requiring follow-up
5. Next steps and timeline
6. Meeting effectiveness assessment
7. Resource requirements identified
8. Stakeholder communication needs

Format for easy distribution and tracking.

Meeting Information:
{{input}}

Generate structured meeting summary:`,
					settings: {
						temperature: 0.4,
						model: DEFAULT_MODEL,
					},
				},
			},
			{
				id: 'node3',
				type: 'promptNode' as const,
				position: { x: 800, y: 500 },
				data: {
					type: 'transform' as const,
					content: `Create follow-up communications and tracking systems:

1. Action item tracking spreadsheet
2. Individual task assignment emails
3. Stakeholder update for non-attendees
4. Calendar invites for follow-up meetings
5. Reminder system for upcoming deadlines
6. Escalation process for overdue items
7. Next meeting agenda draft
8. Project management tool integration format

Meeting summary:
{{input}}

Generate follow-up communications and tracking:`,
					settings: {
						temperature: 0.5,
						model: DEFAULT_MODEL,
					},
				},
			},
		],
		edges: [
			{
				id: 'e1-2',
				source: 'node1',
				target: 'node2',
				type: 'default',
			},
			{
				id: 'e2-3',
				source: 'node2',
				target: 'node3',
				type: 'default',
			},
		],
		category: 'Productivity',
	},
	{
		id: 'sales-proposal',
		name: 'Sales Proposal Generator',
		description: 'Create compelling sales proposals and quotes',
		nodes: [
			{
				id: 'node1',
				type: 'promptNode' as const,
				position: { x: 200, y: 100 },
				data: {
					type: 'input' as const,
					content: `Client Company and Contact:
{{clientInfo}}

Project Requirements:
{{projectRequirements}}

Budget Range and Constraints:
{{budgetInfo}}

Timeline and Deadlines:
{{timeline}}

Key Decision Makers:
{{decisionMakers}}

Competitive Landscape:
{{competition}}

Value Propositions:
{{valueProps}}

Success Metrics:
{{successMetrics}}

Risk Factors:
{{riskFactors}}`,
					settings: {
						temperature: 0.5,
						model: DEFAULT_MODEL,
					},
				},
			},
			{
				id: 'node2',
				type: 'promptNode' as const,
				position: { x: 500, y: 300 },
				data: {
					type: 'transform' as const,
					content: `You are a senior sales consultant with expertise in proposal writing and deal closure. Create a compelling sales proposal that includes:

1. Executive summary with clear value proposition
2. Understanding of client needs and challenges
3. Proposed solution with detailed scope
4. Implementation timeline and methodology
5. Investment breakdown and ROI analysis
6. Team credentials and case studies
7. Risk mitigation strategies
8. Clear next steps and call-to-action

Client and Project Information:
{{input}}

Generate comprehensive sales proposal:`,
					settings: {
						temperature: 0.6,
						model: DEFAULT_MODEL,
					},
				},
			},
			{
				id: 'node3',
				type: 'promptNode' as const,
				position: { x: 800, y: 500 },
				data: {
					type: 'transform' as const,
					content: `Create additional sales materials and closing strategy:

1. Competitive analysis and differentiation
2. Reference client testimonials and case studies
3. Implementation success stories
4. Objection handling guide
5. Pricing negotiation parameters
6. Contract terms and conditions outline
7. Presentation deck for proposal review
8. Follow-up sequence and closing timeline

Sales proposal:
{{input}}

Generate closing strategy and support materials:`,
					settings: {
						temperature: 0.7,
						model: DEFAULT_MODEL,
					},
				},
			},
		],
		edges: [
			{
				id: 'e1-2',
				source: 'node1',
				target: 'node2',
				type: 'default',
			},
			{
				id: 'e2-3',
				source: 'node2',
				target: 'node3',
				type: 'default',
			},
		],
		category: 'Sales',
	},
	{
		id: 'content-repurposing',
		name: 'Content Repurposing Strategy',
		description: 'Transform content across multiple formats and platforms',
		nodes: [
			{
				id: 'node1',
				type: 'promptNode' as const,
				position: { x: 200, y: 100 },
				data: {
					type: 'input' as const,
					content: `Original Content:
{{originalContent}}

Content Type:
{{contentType}}

Target Platforms:
{{targetPlatforms}}

Audience Segments:
{{audienceSegments}}

Content Goals:
{{contentGoals}}

Brand Voice Guidelines:
{{brandVoice}}

Content Calendar Constraints:
{{calendarConstraints}}

Performance Metrics Focus:
{{performanceMetrics}}

Resource Constraints:
{{resourceConstraints}}`,
					settings: {
						temperature: 0.7,
						model: DEFAULT_MODEL,
					},
				},
			},
			{
				id: 'node2',
				type: 'promptNode' as const,
				position: { x: 500, y: 300 },
				data: {
					type: 'transform' as const,
					content: `You are a content strategist specializing in multi-platform content optimization. Create a comprehensive repurposing strategy that includes:

1. Platform-specific content adaptations
2. Format transformations (text, video, audio, visual)
3. Audience-tailored messaging
4. Content calendar distribution plan
5. SEO optimization for each platform
6. Engagement optimization tactics
7. Cross-platform promotion strategy
8. Performance tracking framework

Original Content Information:
{{input}}

Generate content repurposing strategy:`,
					settings: {
						temperature: 0.8,
						model: DEFAULT_MODEL,
					},
				},
			},
			{
				id: 'node3',
				type: 'promptNode' as const,
				position: { x: 800, y: 500 },
				data: {
					type: 'transform' as const,
					content: `Create specific content pieces and distribution workflow:

1. Social media post variations (5-10 platforms)
2. Email newsletter content
3. Blog post outline or summary
4. Video script or podcast talking points
5. Infographic or visual content concepts
6. LinkedIn article adaptation
7. Community forum discussion starters
8. Automated distribution workflow

Content strategy:
{{input}}

Generate specific content pieces and distribution plan:`,
					settings: {
						temperature: 0.8,
						model: DEFAULT_MODEL,
					},
				},
			},
		],
		edges: [
			{
				id: 'e1-2',
				source: 'node1',
				target: 'node2',
				type: 'default',
			},
			{
				id: 'e2-3',
				source: 'node2',
				target: 'node3',
				type: 'default',
			},
		],
		category: 'Content',
	},
	{
		id: 'crisis-communication',
		name: 'Crisis Communication Plan',
		description: 'Develop crisis communication strategies and messages',
		nodes: [
			{
				id: 'node1',
				type: 'promptNode' as const,
				position: { x: 200, y: 100 },
				data: {
					type: 'input' as const,
					content: `Crisis Type and Severity:
{{crisisType}}

Key Stakeholders Affected:
{{stakeholders}}

Potential Impact Assessment:
{{impactAssessment}}

Timeline and Urgency:
{{timeline}}

Available Information/Facts:
{{availableFacts}}

Brand Values and Positioning:
{{brandValues}}

Legal and Compliance Considerations:
{{legalConsiderations}}

Media Interest Level:
{{mediaInterest}}

Previous Crisis Experience:
{{previousExperience}}`,
					settings: {
						temperature: 0.3,
						model: DEFAULT_MODEL,
					},
				},
			},
			{
				id: 'node2',
				type: 'promptNode' as const,
				position: { x: 500, y: 300 },
				data: {
					type: 'transform' as const,
					content: `You are a crisis communication specialist with expertise in reputation management and stakeholder communication. Develop a comprehensive crisis communication plan that includes:

1. Immediate response strategy and timeline
2. Key messages for different stakeholder groups
3. Spokesperson designation and training points
4. Channel strategy (media, social, internal, customer)
5. Holding statements and detailed responses
6. Stakeholder prioritization matrix
7. Escalation procedures and decision tree
8. Monitoring and response protocols

Crisis Information:
{{input}}

Generate crisis communication strategy:`,
					settings: {
						temperature: 0.4,
						model: DEFAULT_MODEL,
					},
				},
			},
			{
				id: 'node3',
				type: 'promptNode' as const,
				position: { x: 800, y: 500 },
				data: {
					type: 'transform' as const,
					content: `Create specific communication materials and recovery plan:

1. Press release template
2. Social media response scripts
3. Internal employee communication
4. Customer notification templates
5. FAQ document for customer service
6. Media interview talking points
7. Post-crisis reputation recovery strategy
8. Lessons learned and prevention measures

Crisis communication strategy:
{{input}}

Generate communication materials and recovery plan:`,
					settings: {
						temperature: 0.5,
						model: DEFAULT_MODEL,
					},
				},
			},
		],
		edges: [
			{
				id: 'e1-2',
				source: 'node1',
				target: 'node2',
				type: 'default',
			},
			{
				id: 'e2-3',
				source: 'node2',
				target: 'node3',
				type: 'default',
			},
		],
		category: 'Communications',
	},
];
