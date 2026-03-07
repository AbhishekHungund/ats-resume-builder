# Hosting ResuMate

ResuMate is a frontend-only React application built with Vite. This means it has no backend database or server requirements, making it incredibly easy (and completely free) to host on modern static hosting platforms.

Here are the step-by-step guides for the two best options: Vercel and Netlify.

## Option 1: Vercel (Recommended)
Vercel offers flawless, zero-config deployments for Vite apps.

### Method A: Via GitHub (Easiest & Best for Updates)
1. Push your project code to a GitHub repository (it can be private or public).
2. Go to [vercel.com](https://vercel.com/) and sign up with your GitHub account.
3. Click **"Add New..." > "Project"**.
4. Import your GitHub repository.
5. Vercel will automatically detect that it's a Vite project. The build settings (`npm run build` and `dist` directory) should be filled in automatically.
6. Click **Deploy**.
7. In about 1 minute, you will get a live URL (e.g., `resumate.vercel.app`).

### Method B: Via Vercel CLI (Directly from Terminal)
1. Open your terminal in the project folder (`c:\Users\abhi7\Desktop\resume anti`).
2. Run `npm i -g vercel` to install the Vercel CLI globally.
3. Run `vercel`.
4. Follow the prompts (log in, link to existing project: No, project name: resumate, directory: `./`).
5. Run `vercel --prod` to push your production build live.

---

## Option 2: Netlify
Netlify is another phenomenal platform for frontend apps.

### Method A: Drag & Drop (No Git Required)
1. In your terminal, run `npm run build`. This will create a `dist` folder in your project directory containing the optimized production files.
2. Go to [netlify.com/drop](https://app.netlify.com/drop).
3. Drag and drop the newly created `dist` folder directly onto the page.
4. Netlify will instantly generate a live link for your app.
5. You can create an account to claim the site and change the URL name.

### Method B: Via GitHub
1. Push your code to a GitHub repository.
2. Go to [netlify.com](https://netlify.com/) and log in.
3. Click **"Add new site" > "Import an existing project"**.
4. Connect to GitHub and select your repository.
5. Build command: `npm run build`. Publish directory: `dist`.
6. Click **Deploy Site**.

---

## What about the OpenAI Key?
Because we built ResuMate to ask for the API key directly in the UI and store it in the user's browser (`localStorage`), you **do not** need to add any `.env` variables or secret keys to Vercel or Netlify. 

When users (or you) visit the live hosted site, they will simply enter their own API key in the Settings modal, and it will stay safely on their device. Never hardcode your API key into the files!
