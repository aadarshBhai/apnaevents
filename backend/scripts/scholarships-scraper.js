import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to scholarships.json
const scholarshipsPath = path.join(__dirname, '../../public/scholarships.json');

/**
 * Utility functions for scholarship management
 */

// Remove duplicate scholarships based on name and provider
function removeDuplicates(scholarships) {
    const seen = new Map();
    const unique = [];

    scholarships.forEach(scholarship => {
        const key = `${scholarship.name}|${scholarship.provider}`.toLowerCase();
        if (!seen.has(key)) {
            seen.set(key, true);
            unique.push(scholarship);
        }
    });

    return unique;
}

// Check if a scholarship is expired
function isExpired(deadline) {
    if (deadline === 'To be announced' || !deadline) return false;
    try {
        const deadlineDate = new Date(deadline);
        const now = new Date();
        return deadlineDate < now;
    } catch {
        return false;
    }
}

// Remove expired scholarships
function removeExpired(scholarships) {
    return scholarships.filter(s => !isExpired(s.deadline));
}

// Sort scholarships by deadline (nearest first)
function sortByDeadline(scholarships) {
    return [...scholarships].sort((a, b) => {
        if (a.deadline === 'To be announced' && b.deadline === 'To be announced') return 0;
        if (a.deadline === 'To be announced') return 1;
        if (b.deadline === 'To be announced') return -1;
        
        try {
            return new Date(a.deadline) - new Date(b.deadline);
        } catch {
            return 0;
        }
    });
}

// Generate unique ID for scholarship
function generateId(scholarship) {
    const prefix = scholarship.category.substring(0, 3);
    const name = scholarship.name
        .toLowerCase()
        .replace(/\s+/g, '_')
        .replace(/[^a-z0-9_]/g, '')
        .substring(0, 20);
    const timestamp = Math.floor(Math.random() * 1000);
    return `${prefix}_${name}_${timestamp}`;
}

// Validate scholarship data
function validateScholarship(scholarship) {
    return (
        scholarship.name &&
        scholarship.provider &&
        scholarship.category &&
        scholarship.amount &&
        scholarship.link
    );
}

// Load current scholarships
function loadCurrentScholarships() {
    try {
        if (fs.existsSync(scholarshipsPath)) {
            const content = fs.readFileSync(scholarshipsPath, 'utf-8');
            return JSON.parse(content);
        }
    } catch (error) {
        console.warn('Could not load current scholarships:', error.message);
    }
    return { lastUpdated: new Date().toISOString(), scholarships: {} };
}

// Merge new scholarships with existing ones (keeping existing if no new ones found)
function mergeScholarships(existingData, newScholarships) {
    // If we have new scholarships, use them; otherwise keep existing
    if (Object.keys(newScholarships).length === 0) {
        console.log('No new scholarships found, keeping existing data');
        return existingData.scholarships;
    }

    const merged = { ...existingData.scholarships };
    
    Object.keys(newScholarships).forEach(category => {
        const newCategoryScholarships = newScholarships[category] || [];
        const existingCategoryScholarships = merged[category] || [];
        
        // Combine, remove duplicates, remove expired
        const combined = [...existingCategoryScholarships, ...newCategoryScholarships];
        const unique = removeDuplicates(combined);
        const active = removeExpired(unique);
        
        merged[category] = sortByDeadline(active);
    });

    return merged;
}

// Save scholarships to JSON
function saveScholarships(scholarshipsData) {
    try {
        const data = {
            lastUpdated: new Date().toISOString(),
            scholarships: scholarshipsData
        };
        fs.writeFileSync(
            scholarshipsPath,
            JSON.stringify(data, null, 2),
            'utf-8'
        );
        console.log('✅ Scholarships updated successfully');
        return true;
    } catch (error) {
        console.error('❌ Error saving scholarships:', error);
        return false;
    }
}

// Fetch scholarships from various free sources
async function fetchScholarshipsFromSources() {
    const scholarships = {
        government: [],
        private: [],
        international: [],
        minority: [],
        merit: []
    };

    try {
        console.log('📡 Fetching scholarship data from sources...');

        // Example: Fetch from scholarships.gov.in portal (simulated data)
        // In production, you would implement actual API calls or web scraping
        const governmentScholarships = [
            {
                name: 'PMSSS (Prime Minister Special Scholarship Scheme)',
                provider: 'Ministry of Human Resource Development',
                category: 'government',
                amount: 'Up to ₹1.25 LPA',
                deadline: '2026-12-31',
                eligibility: 'Students from J&K, Ladakh regions',
                link: 'https://pmsss.gov.in',
                description: 'Scholarship for meritorious students from J&K and Ladakh'
            },
            {
                name: 'INSPIRE Scholarship',
                provider: 'Department of Science & Technology',
                category: 'merit',
                amount: '₹80,000 per year',
                deadline: '2026-06-30',
                eligibility: 'Science students with 75% in 12th',
                link: 'https://inspire.gov.in',
                description: 'Innovation in Science Pursuit for Inspired Research'
            }
        ];

        scholarships.government.push(...governmentScholarships.filter(s => s.category === 'government'));
        scholarships.merit.push(...governmentScholarships.filter(s => s.category === 'merit'));

        console.log('✅ Fetched scholarship data');
        return scholarships;
    } catch (error) {
        console.error('❌ Error fetching scholarships:', error);
        return scholarships;
    }
}

// Main update function
async function updateScholarships() {
    try {
        console.log('🔄 Starting scholarship update...');
        
        // Load existing scholarships
        const existingData = loadCurrentScholarships();
        
        // Fetch new scholarships
        const newScholarships = await fetchScholarshipsFromSources();
        
        // Validate and add IDs to new scholarships
        Object.keys(newScholarships).forEach(category => {
            newScholarships[category] = newScholarships[category]
                .filter(validateScholarship)
                .map(s => ({
                    ...s,
                    id: s.id || generateId(s),
                    addedDate: s.addedDate || new Date().toISOString().split('T')[0]
                }));
        });

        // Merge with existing data
        const mergedScholarships = mergeScholarships(existingData, newScholarships);
        
        // Save updated scholarships
        const success = saveScholarships(mergedScholarships);
        
        if (success) {
            console.log('📊 Update Summary:');
            Object.keys(mergedScholarships).forEach(category => {
                console.log(`   ${category}: ${mergedScholarships[category].length} scholarships`);
            });
        }

        return success;
    } catch (error) {
        console.error('❌ Failed to update scholarships:', error);
        return false;
    }
}

// Export functions for GitHub Actions workflow
export { 
    updateScholarships, 
    removeDuplicates, 
    removeExpired, 
    sortByDeadline,
    validateScholarship,
    saveScholarships,
    loadCurrentScholarships
};

// Run if executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
    updateScholarships().then(success => {
        process.exit(success ? 0 : 1);
    });
}
