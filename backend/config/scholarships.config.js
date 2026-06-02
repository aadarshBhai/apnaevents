/**
 * Scholarship Update System Configuration
 * Customize behavior of the scholarship scraper and updates
 */

const config = {
  // Schedule configuration
  schedule: {
    // Cron format: minute hour day month dayOfWeek
    // '0 2 * * *' = Every day at 2:00 AM UTC (7:30 AM IST)
    cron: '0 2 * * *',
    // Enable manual triggers via workflow_dispatch
    manualTrigger: true
  },

  // Scraper configuration
  scraper: {
    // Timeout for API calls (in milliseconds)
    timeout: 30000,
    // Retry attempts for failed requests
    retryAttempts: 3,
    // Delay between retries (in milliseconds)
    retryDelay: 2000,
    // User agent for requests
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
  },

  // Data management
  dataManagement: {
    // Remove scholarships after deadline passes (days)
    archiveAfterExpiry: 90,
    // Keep scholarship history
    keepHistory: true,
    // Maximum number of scholarships per category
    maxPerCategory: 1000,
    // Minimum required fields for validation
    requiredFields: [
      'name',
      'provider',
      'category',
      'amount',
      'deadline',
      'eligibility',
      'link'
    ]
  },

  // Duplicate detection
  duplicateDetection: {
    // Enable duplicate removal
    enabled: true,
    // Fields to compare for duplicates
    compareFields: ['name', 'provider'],
    // Case-sensitive comparison
    caseSensitive: false
  },

  // Notification settings
  notifications: {
    // Send GitHub issue on update
    createIssue: false,
    // Send email notifications
    email: false,
    // Slack webhook (if configured in GitHub Secrets)
    slack: false
  },

  // Supported categories
  categories: [
    'government',
    'private',
    'international',
    'minority',
    'merit'
  ],

  // Data source endpoints (free, public sources)
  sources: {
    government: {
      name: 'National Scholarship Portal',
      url: 'https://scholarships.gov.in',
      enabled: true,
      type: 'api' // or 'scrape'
    },
    private: {
      name: 'Private Organizations',
      url: 'https://www.internships.com/scholarships',
      enabled: true,
      type: 'scrape'
    },
    international: {
      name: 'International Scholarship Database',
      url: 'https://www.masterstudies.com/scholarships',
      enabled: true,
      type: 'scrape'
    },
    merit: {
      name: 'Merit-Based Scholarships',
      url: 'https://www.scholarshipsinindia.com',
      enabled: true,
      type: 'scrape'
    }
  },

  // File paths
  paths: {
    // Relative to project root
    dataFile: 'public/scholarships.json',
    // Backup location
    backupDir: '.github/scholarship-backups',
    // Archive location
    archiveDir: '.github/scholarship-archives'
  },

  // Logging
  logging: {
    // Log level: 'debug', 'info', 'warn', 'error'
    level: 'info',
    // Log to file
    file: false,
    // Log file path
    filePath: 'logs/scholarships.log'
  },

  // GitHub configuration
  github: {
    // Commit message for updates
    commitMessage: 'chore: auto-update scholarships data [skip ci]',
    // Branch to push to
    branch: 'main',
    // Auto-merge pull requests
    autoMerge: false,
    // Create backup branch
    createBackupBranch: true
  }
};

export default config;
