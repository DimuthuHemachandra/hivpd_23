# HIVPD_23 Research Project Website

A modern, responsive single-page website for the HIVPD_23 research project, designed for GitHub Pages deployment.

## Overview

This website provides comprehensive information about the HIVPD_23 research project, including patient recruitment statistics, protocols, and research objectives.

## Features

- 🎨 Modern, responsive design (mobile, tablet, desktop)
- 📊 Interactive data visualizations using Chart.js
- 🎯 Smooth scrolling navigation
- ♿ WCAG 2.1 AA accessibility compliant
- 🌓 Light/dark mode toggle
- ⚡ Fast loading with optimized assets
- 📱 Mobile-first approach

## Project Structure

```
hivpd_23/
├── index.html              # Main website file
├── css/
│   └── styles.css          # All styling and responsive design
├── js/
│   ├── main.js            # Main JavaScript functionality
│   └── charts.js          # Chart.js visualizations
├── data/
│   ├── demographics.json  # Sample demographic data
│   └── recruitment.json   # Sample recruitment timeline data
├── assets/
│   └── images/           # Logo and images (add your own)
└── README.md             # This file
```

## Quick Start

### Local Development

1. Clone this repository:
   ```bash
   git clone https://github.com/yourusername/hivpd_23.git
   cd hivpd_23
   ```

2. Open `index.html` in your browser:
   ```bash
   open index.html  # macOS
   # or
   start index.html # Windows
   # or just double-click the file
   ```

3. For live reload during development, use a simple HTTP server:
   ```bash
   # Python 3
   python -m http.server 8000

   # Python 2
   python -m SimpleHTTPServer 8000

   # Node.js (if you have npx)
   npx serve
   ```
   Then visit `http://localhost:8000`

### GitHub Pages Deployment

1. Push your code to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: HIVPD_23 website"
   git branch -M main
   git remote add origin https://github.com/yourusername/hivpd_23.git
   git push -u origin main
   ```

2. Enable GitHub Pages:
   - Go to your repository on GitHub
   - Click **Settings** → **Pages**
   - Under "Source", select **main** branch
   - Select **/ (root)** folder
   - Click **Save**

3. Your site will be live at: `https://yourusername.github.io/hivpd_23/`

## Updating Content

### Editing Text Content

All content is in `index.html`. Search for the section you want to edit:
- Hero section: Look for `<section id="hero">`
- Project goals: Look for `<section id="goals">`
- Criteria: Look for `<section id="criteria">`
- etc.

### Updating Statistics Data

1. **Demographics Data** (`data/demographics.json`):
   ```json
   {
     "totalParticipants": 250,
     "ageGroups": [...],
     "genderDistribution": [...],
     "ethnicityDistribution": [...]
   }
   ```

2. **Recruitment Timeline** (`data/recruitment.json`):
   ```json
   {
     "timeline": [
       {"month": "Jan 2023", "participants": 15},
       ...
     ]
   }
   ```

After updating the JSON files, the charts will automatically reflect the changes.

### Customizing Colors

Edit the CSS variables in `css/styles.css`:

```css
:root {
  --primary-color: #0066cc;
  --secondary-color: #00a896;
  --accent-color: #f77f00;
  /* ... more variables */
}
```

### Adding Images

1. Place images in `assets/images/`
2. Update image paths in `index.html`:
   ```html
   <img src="assets/images/your-logo.png" alt="Logo">
   ```

## Browser Support

- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Accessibility

The website follows WCAG 2.1 AA guidelines:
- Semantic HTML5 elements
- ARIA labels where needed
- Keyboard navigation support
- Sufficient color contrast ratios
- Alt text for images
- Focus indicators

## Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with Flexbox and Grid
- **JavaScript (ES6+)** - Interactivity and animations
- **Chart.js** - Interactive data visualizations
- **Font Awesome** - Icons
- **Google Fonts** - Typography (Inter font family)

## License

This project is intended for academic and research purposes.

## Support

For questions or issues, please contact the research team or open an issue on GitHub.

---

**Last Updated:** November 2024
