# JayTech Digitals website

Next.js (App Router) + Motion. Pages: `/`, `/about`, `/services`, `/portfolio`, `/contact`.

## Run
```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Contact form (Resend)

Set `RESEND_API_KEY` (and optionally `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`) — see `.env.example`.

When a visitor submits the form:
1. An enquiry email is sent to `CONTACT_TO_EMAIL` (default: **admin.jaytech@gmail.com**)
2. A confirmation email is sent to the visitor:  
   *“Your message has been successfully delivered to JayTech Digitals. We will get back to you shortly.”*

**Local testing**
```bash
cp .env.example .env.local
# paste your Resend API key into .env.local
npm run dev
```

**Netlify**  
Site configuration → Environment variables → add `RESEND_API_KEY` (and optional vars), then redeploy.

Until a key is set the form says honestly that it did not send and offers WhatsApp / email buttons.

### Important (Resend test mode)
- With the default sender `onboarding@resend.dev`, Resend only delivers to the email address you used to sign up for Resend.
- To send to any address (admin + customers), verify your domain in Resend and set:
  ```
  CONTACT_FROM_EMAIL=JayTech Digitals <enquiries@yourdomain.com>
  ```

## Deploy on Netlify
Push to GitHub → Netlify “Add new site → Import from Git”. Next.js is auto-detected (`netlify.toml` is included).  
Add the env vars above, then redeploy.

## Edit content
- `lib/projects.ts` — the projects (names, URLs, descriptions)
- `lib/site.ts` — contact details, services, process, timeline, values
- Real screenshots: save an image in `public/projects/` and set `image: "/projects/name.jpg"` on that project; the card uses it instead of the generated visual.
