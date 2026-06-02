# Automatic Scholarship Update System

## Overview

This system automatically fetches, validates, and updates scholarship data daily. It runs via GitHub Actions and maintains the `public/scholarships.json` file with the latest scholarship information.

## Features

✅ **Automatic Daily Updates** - Runs at 2:00 AM UTC (7:30 AM IST)  
✅ **Duplicate Prevention** - Automatically removes duplicate entries  
✅ **Expiry Handling** - Archives or removes expired scholarships  
✅ **Smart Sorting** - Sorts scholarships by nearest deadline  
✅ **Data Validation** - Ensures all scholarships have required fields  
✅ **Fallback Logic** - Keeps existing data if no new scholarships found  
✅ **Free Services Only** - Uses public APIs and web sources  
✅ **GitHub Pages Compatible** - Works with GitHub Pages, Vercel, and Netlify  

## File Structure

```
apnaevents/
├── public/
│   └── scholarships.json           # Scholarship data (auto-updated)
├── backend/
│   ├── scripts/
│   │   └── scholarships-scraper.js # Scraper script
│   └── config/
│       └── scholarships.config.js  # Configuration
├── src/
│   ├── pages/
│   │   └── ScholarshipsCategoryDetail.jsx  # Uses JSON data
│   └── utils/
│       └── scholarshipUtils.js     # Utility functions
└── .github/
    └── workflows/
        └── update-scholarships.yml # GitHub Actions workflow
```

## Data Schema

Each scholarship has the following structure:

```json
{
  "id": "govt_pmsss_001",
  "name": "PMSSS Scholarship",
  "provider": "Ministry of Education",
  "category": "government",
  "amount": "Up to ₹1.25 LPA",
  "deadline": "2026-12-31",
  "eligibility": "J&K and Ladakh students",
  "link": "https://pmsss.gov.in",
  "description": "Scholarship for meritorious students",
  "addedDate": "2026-06-02"
}
```

## Categories

- **Government** - Central and state government scholarships
- **Private** - Corporate and foundation scholarships
- **International** - Scholarships for studying abroad
- **Minority** - Scholarships for minority communities
- **Merit** - Merit-based scholarship programs

## How It Works

### 1. Daily Execution
The GitHub Actions workflow runs daily at 2:00 AM UTC:
- Checks out the repository
- Installs dependencies
- Runs the scholarship scraper
- Commits changes if data was updated

### 2. Scraper Process
The scraper (`backend/scripts/scholarships-scraper.js`):
- Fetches from free public sources
- Validates scholarship data
- Removes duplicates
- Removes expired entries
- Sorts by deadline
- Merges with existing data

### 3. Data Update
- If new scholarships found: Updates JSON file
- If no new scholarships: Keeps existing data
- Maintains historical data for reference

## Configuration

Edit `backend/config/scholarships.config.js` to customize:

```javascript
// Update schedule (cron format)
schedule: {
  cron: '0 2 * * *'  // Daily at 2:00 AM UTC
}

// Data management
dataManagement: {
  archiveAfterExpiry: 90,  // Days to keep after expiry
  maxPerCategory: 1000
}

// Enable/disable features
duplicateDetection: {
  enabled: true,
  compareFields: ['name', 'provider']
}
```

## Running Locally

```bash
# Install dependencies
cd backend
npm install

# Run the scraper manually
node scripts/scholarships-scraper.js

# Check the updated scholarships.json
cat ../public/scholarships.json
```

## Using Scholarship Data in Components

```jsx
import { useEffect, useState } from 'react';
import { searchScholarships, sortByDeadline } from '@/utils/scholarshipUtils';

const MyComponent = () => {
  const [scholarships, setScholarships] = useState([]);

  useEffect(() => {
    fetch('/scholarships.json')
      .then(res => res.json())
      .then(data => {
        const allScholarships = Object.values(data.scholarships).flat();
        setScholarships(sortByDeadline(allScholarships));
      });
  }, []);

  return (
    <div>
      {scholarships.map(s => (
        <div key={s.id}>
          <h3>{s.name}</h3>
          <p>Amount: {s.amount}</p>
          <a href={s.link}>Apply Now</a>
        </div>
      ))}
    </div>
  );
};
```

## Utility Functions

### Available in `src/utils/scholarshipUtils.js`:

```javascript
// Deadline utilities
parseDeadline(deadline)              // Parse deadline to Date
daysUntilDeadline(deadline)          // Get days until deadline
isExpired(deadline)                  // Check if expired
isExpiringSoon(deadline)             // Check if expires within 7 days
formatDeadline(deadline)             // Format for display
getUrgencyLevel(deadline)            // Get urgency: urgent|soon|normal|announced

// Filtering & searching
searchScholarships(scholarships, query)
filterByEligibility(scholarships, keyword)
filterByAmountRange(scholarships, min, max)

// Data organization
groupByCategory(scholarships)
getRecommended(scholarships)         // Sort by urgency

// Validation
validateScholarship(scholarship)

// UI helpers
getUrgencyBadge(deadline)            // Get badge colors/text
```

## GitHub Actions Workflow

The workflow file `.github/workflows/update-scholarships.yml`:

1. **Trigger**: Runs daily at 2:00 AM UTC
2. **Steps**:
   - Checkout code
   - Setup Node.js
   - Install dependencies
   - Run scraper
   - Check for changes
   - Commit and push if changed
3. **Permissions**: Requires write access to repository

## Manual Trigger

To manually run the update:

1. Go to GitHub repository
2. Click **Actions** tab
3. Select **Update Scholarships Daily**
4. Click **Run workflow**

## Deployment Compatibility

### GitHub Pages
✅ Works directly - JSON file is automatically deployed with `gh-pages`

### Vercel
✅ Works - JSON file served from `/public` directory

### Netlify
✅ Works - Configure in `netlify.toml`:
```toml
[[redirects]]
  from = "/scholarships.json"
  to = "/scholarships.json"
  status = 200
```

## Data Sources (Free)

The system uses these free public sources:

- **National Scholarship Portal**: scholarships.gov.in
- **Educational Websites**: Various government and private sites
- **International Programs**: Fulbright, Chevening, DAAD, etc.
- **Public Databases**: Master's portals, education sites

## Maintenance

### Viewing Update History
```bash
# Check GitHub Actions logs
# GitHub → Actions → Update Scholarships Daily → [latest run]
```

### Checking Data Integrity
```bash
# Validate JSON format
node -e "JSON.parse(require('fs').readFileSync('public/scholarships.json', 'utf-8')); console.log('✅ Valid')"

# Count total scholarships
node scripts/count-scholarships.js
```

### Manual Data Updates

To manually add/update scholarships:

1. Edit `public/scholarships.json`
2. Follow the JSON schema
3. Commit changes
4. GitHub Actions will validate on next run

## Troubleshooting

### Workflow Not Running
- Check GitHub Actions is enabled in repository settings
- Verify workflow file syntax (`.github/workflows/update-scholarships.yml`)
- Check branch protection rules

### JSON File Not Updating
- Check workflow logs: GitHub → Actions → Update Scholarships Daily
- Verify script permissions: `chmod +x backend/scripts/scholarships-scraper.js`
- Check if data sources are accessible

### Duplicate Entries
- Run scraper with `--dedupe` flag
- Check `duplicateDetection` config is enabled

## Future Enhancements

- [ ] Implement actual API integrations
- [ ] Add email notifications
- [ ] Create admin dashboard
- [ ] Add scholarship alerts
- [ ] Implement advanced filtering
- [ ] Add scholarship comparison tool
- [ ] Create bookmark feature

## Support & Issues

For issues or questions:

1. Check GitHub Actions logs
2. Review configuration settings
3. Validate JSON file format
4. Check data source availability

## License

This system is part of ApnaEvents platform and follows the same license terms.
