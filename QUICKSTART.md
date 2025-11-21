# Quick Start Guide

Get your HIVPD_23 website up and running in minutes!

## 🚀 View Locally (Right Now!)

The simplest way to view your website:

1. **Open the file:**
   - Navigate to the `hivpd_23` folder
   - Double-click `index.html`
   - Your website opens in your default browser!

That's it! No installation required.

## 📝 Make Your First Edit

### Update Project Title

1. Open `index.html` in any text editor
2. Find line ~64: `<span class="title-highlight">HIVPD_23</span>`
3. Change "HIVPD_23" to your preferred title
4. Save and refresh your browser

### Update Statistics

1. Open `data/demographics.json`
2. Update the numbers:
   ```json
   {
     "totalParticipants": 250,  ← Change this
     "ageGroups": [
       {"range": "18-30", "count": 45, "percentage": 18.2}
       ...
   ```
3. Save and refresh - charts update automatically!

### Change Colors

1. Open `css/styles.css`
2. Find the `:root` section (lines 9-20)
3. Update color values:
   ```css
   --primary-color: #0066cc;  ← Your brand color
   --secondary-color: #00a896;
   ```
4. Save and refresh to see changes

## 🌐 Deploy to GitHub Pages

### Step 1: Create Repository

```bash
cd hivpd_23
git init
git add .
git commit -m "Initial commit: HIVPD_23 website"
```

### Step 2: Push to GitHub

```bash
# Create a new repository on GitHub first, then:
git remote add origin https://github.com/YOUR-USERNAME/hivpd_23.git
git branch -M main
git push -u origin main
```

### Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Under "Source", select **main** branch
4. Click **Save**
5. Wait 1-2 minutes
6. Visit: `https://YOUR-USERNAME.github.io/hivpd_23/`

## ✅ Your Website is Live!

## 📊 Update Real Data

### Demographics Data

Edit `data/demographics.json`:
- Total participants
- Age groups
- Gender distribution
- Ethnicity breakdown
- Site locations

### Recruitment Timeline

Edit `data/recruitment.json`:
- Monthly recruitment numbers
- Cumulative totals
- Milestones

Charts automatically reflect your changes!

## 🎨 Customize Content

All content is in `index.html`. Find and edit:

| Section | Search for |
|---------|------------|
| Hero text | `<section id="hero">` |
| Project goals | `<section id="goals">` |
| Criteria | `<section id="criteria">` |
| Protocols | `<section id="mri-protocols">` |
| Funding | `<section id="funding">` |
| References | `<section id="references">` |

## 🖼️ Add Your Images

1. Place images in `assets/images/`
2. Update references in `index.html`:
   ```html
   <img src="assets/images/your-logo.png" alt="Logo">
   ```

## 🎯 Features to Try

- **Dark Mode**: Click the moon icon in the navigation
- **Mobile Menu**: Resize browser to see mobile navigation
- **Smooth Scrolling**: Click any navigation link
- **Interactive Charts**: Switch between Demographics/Timeline/Sites tabs
- **Expandable Sections**: Click arrows in Criteria and MRI sections

## 🆘 Need Help?

1. Check `README.md` for detailed documentation
2. See `CONTRIBUTING.md` for contribution guidelines
3. Review `CHANGELOG.md` for version history
4. Open an issue on GitHub if you find bugs

## 🎉 Next Steps

- [ ] Replace placeholder text with your research content
- [ ] Update statistics with real data
- [ ] Add your institution logos
- [ ] Customize colors to match your branding
- [ ] Add team member information
- [ ] Update references and publications
- [ ] Add your contact information
- [ ] Set up custom domain (optional)

## 💡 Pro Tips

1. **Test Locally First**: Always test changes locally before deploying
2. **Use Version Control**: Commit changes frequently with clear messages
3. **Backup Data**: Keep backups of your JSON data files
4. **Optimize Images**: Compress images before uploading
5. **Mobile Testing**: Test on real mobile devices
6. **Accessibility**: Use the browser's accessibility inspector

---

**You're all set!** Start customizing and make this website your own. 🚀
