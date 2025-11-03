
AMD Dialer Application
Overview
This is a web-based Answering Machine Detection (AMD) Dialer built with Next.js, TypeScript, Prisma, and NextAuth.js.
It enables users to log in, dial numbers using different AMD strategies, and view/export call logs.
Built for the “Associate Position – Assignment #1.”

Features
Authentication: Secure login (GitHub OAuth via NextAuth.js)

Dialer: Place outgoing calls with selectable AMD logic:

Twilio Native AMD

Twilio + Jambonz

Hugging Face ML

Google Gemini 2.5 Flash (mocked)

Call Logging: Every call is logged to a Postgres database (via Prisma)

History: Authenticated users can view, search, refresh, and export call logs as CSV

UI: Modern, neat interface with clear CTA buttons and lightweight styling

Tech Stack
Frontend: Next.js (App Router), React, Tailwind CSS

Backend: Next.js API routes, TypeScript

Database: PostgreSQL (with Prisma ORM)

Authentication: NextAuth.js (GitHub OAuth)

Other: CSV export, RESTful API, simple error handling

How to Run Locally
Clone the repo:

text
git clone https://github.com/AtulRanjanJha/my-amd-app.git
cd my-amd-app
Install dependencies:

text
npm install
Copy and fill your environment variables:

text
cp .env.example .env
Update .env with your Postgres and GitHub OAuth credentials.

NEXTAUTH_SECRET can be any random string.

Push database schema:

text
npx prisma migrate dev --name init
Run the development server:

text
npm run dev
Open in your browser:
Visit http://localhost:3000

Usage
Login via GitHub (Sign-In button)

Use the Dialer: Enter a number and pick an AMD strategy, then dial

See Results Instantly: Listen to mock responses and see status

History:

See all calls, with AMD strategy and results

Export your call log as CSV

Hit “Refresh” if you’ve just dialed a new number

AMD Strategies Table
Strategy	Description	Pros/Cons
Twilio	Native AMD	Fast, accurate, paid
Jambonz	Free, mock integration	Good for open-source demos
Hugging Face	ML, mocked	Flexible, customizable
Gemini	Google LLM (mocked)	Fast, innovative, experimental

If call logs do not update, use the “Refresh” button on the history page.

