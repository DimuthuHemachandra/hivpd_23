# Enhanced Recruitment Statistics Guide

## Overview

This guide explains the new enhanced interactive recruitment statistics features for the HIVPD_23 project. The enhanced statistics provide comprehensive, interactive visualizations with detailed breakdowns by diagnosis groups (HIV, PD, and Controls).

## New Features

### 1. **Diagnosis Group Breakdown**
- Visual representation of HIV, PD, and Control participant distribution
- Click on any segment to expand detailed information
- Color-coded for easy identification:
  - 🔴 Red: HIV group
  - 🟣 Purple: PD (Parkinson's Disease) group
  - 🟢 Green: Control group

### 2. **Gender Ratios by Diagnosis Group**
- Each diagnosis group shows detailed gender distribution
- Horizontal bar charts for easy comparison
- Percentages and counts displayed
- Statistical significance indicators

### 3. **Statistical Differences**
- Chi-square tests for gender and completion rates
- F-statistics for age distribution
- P-values and significance levels
- Visual indicators for significant findings (p < 0.05)

### 4. **Enhanced Timeline with Hover Details**
When you hover over any point on the recruitment timeline, you'll see:
- New recruits for that month
- Cumulative total
- **Breakdown by diagnosis:**
  - HIV participants recruited
  - PD participants recruited
  - Control participants recruited
- **Completion metrics:**
  - Cognitive tests completed that month
  - Scans completed that month

### 5. **Completion Tracking**
Interactive charts showing:
- Overall completion rates
- Completion status by diagnosis group
- Separate tracking for:
  - Cognitive testing completed
  - Scans completed
  - Both completed
  - Pending participants

### 6. **Upcoming Visits Tracker**
- Next week's scheduled visits
- Next month's scheduled visits
- Next quarter's scheduled visits
- Breakdown by diagnosis group

## How to Use

### Quick Start - Demo Version

1. **Open the demo file:**
   ```bash
   open enhanced_demo.html
   ```
   Or navigate to: `http://localhost:8000/enhanced_demo.html` in your browser

2. **Interact with the dashboard:**
   - Click on summary cards at the top
   - Click on chart segments
   - Hover over timeline points
   - Expand/collapse detailed sections

### Integration into Existing Project

To integrate the enhanced statistics into your existing `index.html`:

#### Step 1: Add Enhanced Data Files
The following data files have been created:
- `data/enhanced_demographics.json` - Demographics with diagnosis groups
- `data/enhanced_recruitment.json` - Timeline with detailed breakdowns

#### Step 2: Add Enhanced JavaScript
Add the enhanced charts script to your HTML:
```html
<!-- Add after Chart.js -->
<script src="js/enhanced_charts.js"></script>
```

#### Step 3: Add Enhanced CSS
Add the enhanced statistics styles:
```html
<!-- Add after your main styles.css -->
<link rel="stylesheet" href="css/enhanced_statistics.css">
```

#### Step 4: Replace Statistics Section
Replace the current statistics section in `index.html` (lines 212-304) with the content from:
`enhanced_statistics_section.html`

## File Structure

```
hivpd_23/
├── data/
│   ├── enhanced_demographics.json      # New: Enhanced demographics data
│   └── enhanced_recruitment.json       # New: Enhanced timeline data
├── js/
│   ├── charts.js                       # Original charts
│   └── enhanced_charts.js              # New: Enhanced interactive charts
├── css/
│   ├── styles.css                      # Original styles
│   └── enhanced_statistics.css         # New: Enhanced statistics styles
├── enhanced_demo.html                  # New: Standalone demo
├── enhanced_statistics_section.html    # New: HTML section for integration
└── ENHANCED_STATISTICS_GUIDE.md        # This file
```

## Data Structure

### Enhanced Demographics JSON

```json
{
  "diagnosisGroups": {
    "HIV": {
      "total": 95,
      "percentage": 38.5,
      "genderDistribution": {
        "Male": { "count": 58, "percentage": 61.1 },
        "Female": { "count": 35, "percentage": 36.8 },
        "Non-binary/Other": { "count": 2, "percentage": 2.1 }
      },
      "completionStatus": {
        "cognitiveTestingComplete": 88,
        "scansComplete": 82,
        "bothComplete": 78,
        "pending": 7
      },
      "upcomingVisits": {
        "nextWeek": 5,
        "nextMonth": 12,
        "nextQuarter": 8
      }
    },
    "PD": { /* ... similar structure ... */ },
    "Controls": { /* ... similar structure ... */ }
  },
  "statisticalDifferences": {
    "genderDistribution": {
      "chiSquare": 15.23,
      "pValue": 0.0043,
      "significant": true
    }
    /* ... more tests ... */
  }
}
```

### Enhanced Recruitment JSON

```json
{
  "timeline": [
    {
      "month": "Jan 2023",
      "participants": 8,
      "cumulative": 8,
      "byDiagnosis": {
        "HIV": 3,
        "PD": 3,
        "Controls": 2
      },
      "cognitiveTestsCompleted": 0,
      "scansCompleted": 0
    }
    /* ... more months ... */
  ]
}
```

## Interactive Features

### 1. Expandable Sections

Each diagnosis group has an expandable section that shows:
- Gender distribution chart
- Completion status details
- Upcoming visits schedule

**To expand:** Click on:
- Summary cards at the top
- Chart segments in the diagnosis distribution
- Completion or visits charts

**To close:** Click the X button in the expanded section header

### 2. Hover Tooltips

Enhanced tooltips on all charts provide:
- Detailed breakdowns
- Multiple data points
- Percentages and counts
- Context-specific information

### 3. Responsive Design

All charts and sections are fully responsive:
- Mobile-friendly layouts
- Touch-friendly interactions
- Adaptive grid systems
- Optimized for all screen sizes

### 4. Theme Support

Full dark mode support:
- Automatic chart color adjustments
- Theme-aware UI elements
- Smooth theme transitions

## Customization

### Update Data

To update with your actual data:

1. **Edit `data/enhanced_demographics.json`:**
   - Update participant counts
   - Adjust gender distributions
   - Modify completion statuses
   - Update upcoming visits

2. **Edit `data/enhanced_recruitment.json`:**
   - Add new months
   - Update recruitment numbers
   - Adjust diagnosis breakdowns

### Customize Colors

Edit colors in `js/enhanced_charts.js`:

```javascript
const chartColors = {
  hiv: '#ef4444',      // Red for HIV
  pd: '#8b5cf6',       // Purple for PD
  controls: '#10b981'  // Green for Controls
};
```

### Modify Statistical Tests

Update statistical differences in `data/enhanced_demographics.json`:

```json
"statisticalDifferences": {
  "genderDistribution": {
    "chiSquare": 15.23,
    "pValue": 0.0043,
    "significant": true,
    "note": "Your custom note here"
  }
}
```

## Browser Compatibility

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Performance

- Optimized chart rendering
- Efficient data loading
- Smooth animations
- Responsive interactions

## Troubleshooting

### Charts Not Displaying

1. Check browser console for errors
2. Verify data files are accessible
3. Ensure Chart.js is loaded
4. Check file paths are correct

### Data Not Loading

1. Verify JSON syntax in data files
2. Check file permissions
3. Ensure files are in correct location
4. Check browser network tab for 404 errors

### Expandable Sections Not Working

1. Verify enhanced_charts.js is loaded
2. Check for JavaScript errors in console
3. Ensure CSS file is loaded
4. Verify onclick handlers are present

## Support

For issues or questions:
1. Check browser console for errors
2. Verify all files are in correct locations
3. Review this guide thoroughly
4. Check data file formatting

## Updates

### Version 1.0 (Current)
- Initial enhanced statistics implementation
- Diagnosis group breakdowns
- Interactive expandable sections
- Enhanced timeline with hover details
- Completion tracking
- Upcoming visits tracker
- Statistical differences display

## Next Steps

1. Review the demo: `enhanced_demo.html`
2. Test all interactive features
3. Customize data with your actual numbers
4. Integrate into main `index.html`
5. Deploy to your production environment

---

**Last Updated:** November 2024
**Author:** HIVPD_23 Research Team
