# Oskar Fischer Prize

A living literature review and synthesis of the 2022 Oskar Fischer Prize - $4 million awarded to 10 researchers with innovative Alzheimer's disease hypotheses.

**Companion site to [AdultCognitiveDisease.org](https://adultcognitivedisease.org)**

## Prize Winners Featured

- **Gold ($500,000 each):** Estela Area-Gomez, Bess Frost, Ralph Nixon, Carlo Abbate
- **Silver ($400,000 each):** Bernd Moosmann, Donald Weaver
- **Bronze ($300,000 each):** Annelise Barron, Gunnar Gouras, Varghese John, Russell Swerdlow

## Tech Stack

- React 19 + TypeScript
- Vite
- Tailwind CSS
- Analytics: GA4 + Microsoft Clarity
- Email: Formbricks

## Development

**Prerequisites:** Node.js 18+

1. Install dependencies:
   ```
   npm install
   ```

2. Copy `.env.example` to `.env.local` and configure:
   - GA4 Measurement ID
   - Microsoft Clarity Project ID
   - Formbricks credentials

3. Run locally:
   ```
   npm run dev
   ```

4. Build for production:
   ```
   npm run build
   ```

## Deployment

Hosted on Vercel. Domain: oskarfischerprize.org (DNS managed separately via Squarespace).
