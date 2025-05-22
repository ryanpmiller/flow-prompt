Prompt Flow Builder

“Zapier for AI Prompts” — visually build prompt chains that solve real problems.

# GitHub Copilot Instructions

## General Guidelines

- Follow the project's coding standards and conventions.
- Includes comments and documentation where necessary.
- Write clean, readable, and maintanable code.
- Keep code DRY where possible.
- Use `.prettierrc` file for proper formatting.

## Package Guidelines

- Do not use deprecated node packages. Attempt to use the latest most popular solution suited for the task.
- Do not use deprecated React components. Instead find the latest requirements and use the most appropriate replacement.

## Tech Stack Guidelines

- Frontend: React + Tailwind (hosted on Amplify or S3/CloudFront)
- Tests: React Testing Library
- Auth: AWS Cognito
- Database: Amazon Aurora (PostgreSQL) or DynamoDB
- Storage: S3
- Realtime (opt): AppSync or WebSocket via API Gateway
- AI Integration: Lambda + API Gateway to call OpenAI/Claude
- Payments: Stripe (webhooks routed via Lambda/API GW)

## Testing Guideleines

- Unit tests should not require network access.
- React Testing Library should be used for tests.
