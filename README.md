# AMD Dialer Assignment

Web app for dialing phone numbers with multiple Answering Machine Detection (AMD) strategies. Developed as "Associate Position – Assignment #1".

## Features

- Login via GitHub (NextAuth.js)
- Dial numbers using:
  - Twilio Native AMD
  - Twilio + Jambonz AMD
  - Hugging Face/Google Gemini (mocked)
- Each call/result is logged to a Postgres DB (via Prisma)
- Call history: view, search, export to CSV

## Tech Stack

- Next.js (App Router)
- Tailwind CSS
- Prisma/PostgreSQL
- NextAuth.js (GitHub OAuth)
- Twilio, Jambonz, Hugging Face (API integration)

## How to Run
git clone https://github.com/AtulRanjanJha/my-amd-app.git
cd my-amd-app
npm install
cp .env.example .env

Fill .env with your DB and OAuth/Twilio credentials
npx prisma migrate dev
npm run dev


- Open http://localhost:3000
- Login with GitHub to access all features

## Assignment Requirements Met

- AMD strategies: Twilio, Jambonz, ML (mocked)
- Log all calls in DB, exportable as CSV
- Auth and simple, usable UI

## Author

Atul Ranjan Jha
