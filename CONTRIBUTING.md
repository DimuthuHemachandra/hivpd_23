# Contributing to HIVPD_23 Website

Thank you for your interest in contributing to the HIVPD_23 research project website!

## How to Contribute

### Reporting Issues

If you find a bug or have a suggestion:

1. Check if the issue already exists in the GitHub Issues
2. If not, create a new issue with:
   - Clear title and description
   - Steps to reproduce (for bugs)
   - Expected vs actual behavior
   - Screenshots if applicable
   - Browser and device information

### Making Changes

1. **Fork the repository**
   ```bash
   git clone https://github.com/yourusername/hivpd_23.git
   cd hivpd_23
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes**
   - Follow the existing code style
   - Test on multiple browsers and devices
   - Ensure accessibility standards are maintained

4. **Test thoroughly**
   - Open `index.html` in multiple browsers
   - Test responsive design on mobile and tablet
   - Verify all interactive features work
   - Check console for JavaScript errors

5. **Commit your changes**
   ```bash
   git add .
   git commit -m "Add: Description of your changes"
   ```

6. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

7. **Create a Pull Request**
   - Go to the original repository
   - Click "New Pull Request"
   - Select your fork and branch
   - Provide a clear description of changes

## Content Updates

### Updating Statistics Data

Edit the JSON files in the `data/` directory:

- `data/demographics.json` - Participant demographics
- `data/recruitment.json` - Recruitment timeline

The charts will automatically update to reflect changes.

### Updating Text Content

All text content is in `index.html`. Search for the section you want to modify:

- Project goals: `<section id="goals">`
- Criteria: `<section id="criteria">`
- Protocols: `<section id="mri-protocols">`, etc.

### Adding Images

1. Place images in `assets/images/`
2. Use descriptive filenames
3. Optimize images before uploading (compress, resize)
4. Update HTML to reference new images
5. Always include descriptive alt text

## Code Style Guidelines

### HTML

- Use semantic HTML5 elements
- Maintain proper indentation (2 spaces)
- Include ARIA labels for accessibility
- Add comments for complex sections

### CSS

- Follow existing naming conventions
- Use CSS variables for colors and spacing
- Group related styles together
- Comment major sections
- Ensure responsive design works

### JavaScript

- Use ES6+ features
- Follow existing code patterns
- Add comments for complex logic
- Test interactive features thoroughly
- Maintain accessibility (keyboard navigation)

## Accessibility Standards

All contributions must maintain WCAG 2.1 AA compliance:

- Sufficient color contrast (4.5:1 for text)
- Keyboard navigation support
- Screen reader compatibility
- Descriptive alt text for images
- Semantic HTML structure
- Focus indicators visible

## Testing Checklist

Before submitting a pull request:

- [ ] Code works in Chrome, Firefox, Safari, Edge
- [ ] Responsive design works on mobile, tablet, desktop
- [ ] All interactive features function correctly
- [ ] No console errors
- [ ] Accessibility standards maintained
- [ ] Images optimized and loading properly
- [ ] Charts displaying correctly with sample data
- [ ] Dark mode works properly (if applicable)
- [ ] All links work correctly
- [ ] Form validation works (if applicable)

## Questions?

If you have questions about contributing:

1. Check existing documentation
2. Search closed issues for similar questions
3. Open a new issue with the "question" label
4. Contact the research team

## Code of Conduct

- Be respectful and professional
- Welcome newcomers and help others
- Focus on constructive feedback
- Respect differing viewpoints
- Maintain confidentiality of sensitive research data

## License

By contributing, you agree that your contributions will be licensed under the same license as the project.

---

Thank you for helping improve the HIVPD_23 research project website!
