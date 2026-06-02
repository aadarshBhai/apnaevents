#!/usr/bin/env node

/**
 * Scholarship Data Verification Script
 * Validates and reports on scholarship data integrity
 * Usage: node backend/scripts/verify-scholarships.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const scholarshipsPath = path.join(__dirname, '../../public/scholarships.json');

// Color codes for console output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function isValidUrl(url) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

function isValidDeadline(deadline) {
  if (deadline === 'To be announced') return true;
  try {
    const date = new Date(deadline);
    return !isNaN(date.getTime());
  } catch {
    return false;
  }
}

function isExpired(deadline) {
  if (deadline === 'To be announced') return false;
  try {
    return new Date(deadline) < new Date();
  } catch {
    return false;
  }
}

function validateScholarship(scholarship, index, category) {
  const errors = [];
  const warnings = [];

  // Required fields
  if (!scholarship.id) errors.push('Missing id');
  if (!scholarship.name) errors.push('Missing name');
  if (!scholarship.provider) errors.push('Missing provider');
  if (!scholarship.category) errors.push('Missing category');
  if (!scholarship.amount) errors.push('Missing amount');
  if (!scholarship.deadline) errors.push('Missing deadline');
  if (!scholarship.eligibility) errors.push('Missing eligibility');
  if (!scholarship.link) errors.push('Missing link');

  // Field validation
  if (scholarship.link && !isValidUrl(scholarship.link)) {
    errors.push(`Invalid URL: ${scholarship.link}`);
  }

  if (scholarship.deadline && !isValidDeadline(scholarship.deadline)) {
    errors.push(`Invalid deadline format: ${scholarship.deadline}`);
  }

  if (scholarship.deadline && isExpired(scholarship.deadline)) {
    warnings.push(`Scholarship has expired: ${scholarship.deadline}`);
  }

  if (scholarship.category !== category) {
    errors.push(`Category mismatch: claimed ${scholarship.category}, actual ${category}`);
  }

  return { errors, warnings };
}

function verifyScholarships() {
  log('\n🔍 Scholarship Data Verification\n', 'cyan');

  if (!fs.existsSync(scholarshipsPath)) {
    log('❌ scholarships.json not found at: ' + scholarshipsPath, 'red');
    process.exit(1);
  }

  try {
    const content = fs.readFileSync(scholarshipsPath, 'utf-8');
    const data = JSON.parse(content);

    if (!data.scholarships) {
      log('❌ Missing scholarships object', 'red');
      process.exit(1);
    }

    // Statistics
    let totalScholarships = 0;
    let totalErrors = 0;
    let totalWarnings = 0;
    const categoryStats = {};

    log('📊 Category Overview', 'blue');
    log('─'.repeat(60));

    // Validate by category
    Object.keys(data.scholarships).forEach(category => {
      const scholarships = data.scholarships[category];
      const count = scholarships.length;
      totalScholarships += count;

      categoryStats[category] = {
        count,
        valid: 0,
        errors: 0,
        warnings: 0
      };

      let categoryErrors = 0;
      let categoryWarnings = 0;

      scholarships.forEach((scholarship, index) => {
        const { errors, warnings } = validateScholarship(scholarship, index, category);

        if (errors.length > 0) {
          categoryErrors += errors.length;
          totalErrors += errors.length;
          categoryStats[category].errors += errors.length;
        }

        if (warnings.length > 0) {
          categoryWarnings += warnings.length;
          totalWarnings += warnings.length;
          categoryStats[category].warnings += warnings.length;
        }

        if (errors.length === 0 && warnings.length === 0) {
          categoryStats[category].valid++;
        }
      });

      const status = categoryErrors === 0 ? '✅' : '⚠️';
      log(
        `${status} ${category.padEnd(15)} │ ${count} scholarships │ ${categoryErrors} errors │ ${categoryWarnings} warnings`,
        categoryErrors > 0 ? 'yellow' : 'green'
      );
    });

    log('─'.repeat(60));
    log(`📈 Total: ${totalScholarships} scholarships`, 'cyan');

    // Last updated
    log('\n📅 Metadata', 'blue');
    log('─'.repeat(60));
    log(`Last Updated: ${data.lastUpdated}`);

    // Duplicate check
    log('\n🔄 Duplicate Detection', 'blue');
    log('─'.repeat(60));

    const allScholarships = Object.values(data.scholarships).flat();
    const seen = new Map();
    const duplicates = [];

    allScholarships.forEach(scholarship => {
      const key = `${scholarship.name}|${scholarship.provider}`.toLowerCase();
      if (seen.has(key)) {
        duplicates.push({
          name: scholarship.name,
          provider: scholarship.provider,
          count: (seen.get(key) || 0) + 1
        });
      }
      seen.set(key, (seen.get(key) || 0) + 1);
    });

    if (duplicates.length === 0) {
      log('✅ No duplicates found', 'green');
    } else {
      log(`⚠️ Found ${duplicates.length} potential duplicates:`, 'yellow');
      duplicates.forEach(dup => {
        log(`   - ${dup.name} (${dup.provider})`);
      });
    }

    // Expiry check
    log('\n⏰ Expiry Status', 'blue');
    log('─'.repeat(60));

    const expired = allScholarships.filter(s => isExpired(s.deadline));
    const expiringSoon = allScholarships.filter(s => {
      if (s.deadline === 'To be announced') return false;
      const date = new Date(s.deadline);
      const daysUntil = (date - new Date()) / (1000 * 60 * 60 * 24);
      return daysUntil > 0 && daysUntil <= 7;
    });

    log(`✅ Active: ${allScholarships.length - expired.length} scholarships`);
    
    if (expiringSoon.length > 0) {
      log(`⚠️ Closing Soon (within 7 days): ${expiringSoon.length} scholarships`, 'yellow');
      expiringSoon.slice(0, 5).forEach(s => {
        log(`   - ${s.name}: ${s.deadline}`);
      });
      if (expiringSoon.length > 5) {
        log(`   ... and ${expiringSoon.length - 5} more`);
      }
    }

    if (expired.length > 0) {
      log(`❌ Expired: ${expired.length} scholarships`, 'red');
    }

    // Summary
    log('\n✅ Verification Summary', 'blue');
    log('─'.repeat(60));

    if (totalErrors === 0 && totalWarnings === 0) {
      log('✅ All scholarships are valid!', 'green');
      log(`   Total: ${totalScholarships}`);
      log(`   Categories: ${Object.keys(data.scholarships).length}`);
    } else {
      log(`⚠️ Issues found:`, 'yellow');
      log(`   Errors: ${totalErrors}`);
      log(`   Warnings: ${totalWarnings}`);
    }

    // Output JSON validity
    log('\n✅ JSON Format: Valid', 'green');

  } catch (error) {
    if (error instanceof SyntaxError) {
      log('❌ Invalid JSON format', 'red');
      log(`   Error: ${error.message}`, 'red');
    } else {
      log(`❌ Error: ${error.message}`, 'red');
    }
    process.exit(1);
  }

  log('\n');
}

// Run verification
verifyScholarships();
