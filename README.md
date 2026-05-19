# KIWL Machine Group Website

CHING KING WHALE MACHINE GROUP official website - Professional beverage machinery manufacturer.

## Project Overview

This is a static website for KIWL Machine Group, a professional manufacturer with over 20 years of experience in beverage machinery manufacturing.

## GitHub Pages Deployment

### Prerequisites
- A GitHub account
- Git installed on your local machine

### Deployment Steps

1. **Create a new GitHub repository**
   - Go to https://github.com/new
   - Create a public repository (recommended: name it `kiwlmachine.github.io`)

2. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/kiwlmachine.github.io.git
   ```

3. **Copy all website files**
   - Copy all files and folders from this project into the cloned repository directory

4. **Commit and push**
   ```bash
   git add .
   git commit -m "Initial website deployment"
   git push origin main
   ```

5. **Enable GitHub Pages**
   - Go to your repository on GitHub
   - Click on **Settings** tab
   - Scroll down to **Pages** section
   - Under **Source**, select `main` branch and `/root` folder
   - Click **Save**

6. **Access your website**
   - After a few minutes, your website will be available at:
   - `https://your-username.github.io/kiwlmachine.github.io/`

### Notes
- The `.nojekyll` file disables GitHub's Jekyll build process
- All resource paths have been converted to relative paths for proper GitHub Pages deployment
- The website is fully responsive and mobile-friendly

## Directory Structure

```
├── statics/          # Static assets (CSS, JS, images)
├── uploadfile/       # Uploaded files (images, documents)
├── 2023/            # Archive pages 2023
├── 2024/            # Archive pages 2024
├── 2025/            # Archive pages 2025
├── Video-News/      # Video news section
├── Customer-Case/   # Customer case studies
├── News/            # News section
├── products/        # Product pages
├── contact-us/      # Contact pages
├── index.html       # Home page
├── .nojekyll        # Disable Jekyll
├── .gitignore       # Git ignore rules
└── README.md        # This file
```

## Contact

For more information, please visit the official website or contact us directly.