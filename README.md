# BirdiesPlacement

This repository contains the website for Birdies Placement, a senior living and hospice placement service.

## Hosting on GitHub Pages with Custom Domain

This site is designed to be hosted on GitHub Pages with a custom domain (birdiesplacement.com).

### Setup Steps:

1. **Repository Settings:**
   - Go to your repository settings on GitHub
   - Scroll down to "Pages" in the left sidebar
   - Under "Source", select "Deploy from a branch"
   - Choose the "main" branch and "/ (root)" folder
   - In the "Custom domain" field, enter: `birdiesplacement.com`
   - Click "Save"

2. **DNS Configuration:**
   - In your domain registrar's DNS settings, add a CNAME record:
     - Name: `www` (or `@` for apex domain)
     - Value: `kylercarson.github.io`
   - If using the apex domain (birdiesplacement.com), you may need an A record pointing to GitHub's IP addresses instead.

3. **SSL Certificate:**
   - GitHub Pages will automatically provision an SSL certificate for your custom domain.

Your site will be available at `https://birdiesplacement.com/`

## Local Development

To view the site locally, open `index.html` in your web browser.