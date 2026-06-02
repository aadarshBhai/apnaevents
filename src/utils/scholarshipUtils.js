/**
 * Scholarship Data Utilities
 * Handles scholarship-related operations like filtering, sorting, and validation
 */

/**
 * Parse deadline string to Date object
 * @param {string} deadline - Deadline string (e.g., "2026-12-31" or "To be announced")
 * @returns {Date|null} - Parsed date or null
 */
export const parseDeadline = (deadline) => {
    if (!deadline || deadline === 'To be announced') return null;
    try {
        return new Date(deadline);
    } catch {
        return null;
    }
};

/**
 * Check if scholarship is expiring soon (within 7 days)
 * @param {string} deadline - Deadline string
 * @returns {boolean}
 */
export const isExpiringSoon = (deadline) => {
    const date = parseDeadline(deadline);
    if (!date) return false;
    
    const now = new Date();
    const daysUntilDeadline = (date - now) / (1000 * 60 * 60 * 24);
    
    return daysUntilDeadline > 0 && daysUntilDeadline <= 7;
};

/**
 * Check if scholarship is expired
 * @param {string} deadline - Deadline string
 * @returns {boolean}
 */
export const isExpired = (deadline) => {
    const date = parseDeadline(deadline);
    if (!date) return false;
    return date < new Date();
};

/**
 * Format deadline for display
 * @param {string} deadline - Deadline string
 * @returns {string} - Formatted deadline
 */
export const formatDeadline = (deadline) => {
    if (!deadline || deadline === 'To be announced') return 'To be announced';
    
    try {
        const date = new Date(deadline);
        return date.toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    } catch {
        return deadline;
    }
};

/**
 * Calculate days until deadline
 * @param {string} deadline - Deadline string
 * @returns {number|null} - Number of days or null
 */
export const daysUntilDeadline = (deadline) => {
    const date = parseDeadline(deadline);
    if (!date) return null;
    
    const now = new Date();
    const msPerDay = 24 * 60 * 60 * 1000;
    return Math.ceil((date - now) / msPerDay);
};

/**
 * Get urgency level for scholarship
 * @param {string} deadline - Deadline string
 * @returns {string} - 'urgent' | 'soon' | 'normal' | 'announced'
 */
export const getUrgencyLevel = (deadline) => {
    if (deadline === 'To be announced') return 'announced';
    
    const days = daysUntilDeadline(deadline);
    if (days === null || days < 0) return 'announced';
    if (days <= 3) return 'urgent';
    if (days <= 7) return 'soon';
    return 'normal';
};

/**
 * Filter scholarships by eligibility keywords
 * @param {Array} scholarships - Array of scholarship objects
 * @param {string} keyword - Eligibility keyword
 * @returns {Array} - Filtered scholarships
 */
export const filterByEligibility = (scholarships, keyword) => {
    if (!keyword) return scholarships;
    
    const lowerKeyword = keyword.toLowerCase();
    return scholarships.filter(s =>
        s.eligibility?.toLowerCase().includes(lowerKeyword)
    );
};

/**
 * Filter scholarships by amount range
 * @param {Array} scholarships - Array of scholarship objects
 * @param {number} minAmount - Minimum amount (in rupees)
 * @param {number} maxAmount - Maximum amount (in rupees)
 * @returns {Array} - Filtered scholarships
 */
export const filterByAmountRange = (scholarships, minAmount, maxAmount) => {
    return scholarships.filter(s => {
        const amount = parseAmount(s.amount);
        if (amount === null) return true; // Include if amount can't be parsed
        return amount >= minAmount && amount <= maxAmount;
    });
};

/**
 * Parse amount string to numeric value (approximation)
 * @param {string} amountStr - Amount string (e.g., "₹80,000 per year")
 * @returns {number|null} - Parsed amount or null
 */
export const parseAmount = (amountStr) => {
    if (!amountStr) return null;
    
    // Extract numbers
    const match = amountStr.match(/[\d,]+/);
    if (!match) return null;
    
    return parseInt(match[0].replace(/,/g, ''), 10);
};

/**
 * Search scholarships by text
 * @param {Array} scholarships - Array of scholarship objects
 * @param {string} query - Search query
 * @returns {Array} - Matching scholarships
 */
export const searchScholarships = (scholarships, query) => {
    if (!query) return scholarships;
    
    const lowerQuery = query.toLowerCase();
    return scholarships.filter(s =>
        s.name.toLowerCase().includes(lowerQuery) ||
        s.provider.toLowerCase().includes(lowerQuery) ||
        s.description?.toLowerCase().includes(lowerQuery) ||
        s.eligibility?.toLowerCase().includes(lowerQuery)
    );
};

/**
 * Group scholarships by category
 * @param {Array} scholarships - Array of scholarship objects
 * @returns {Object} - Scholarships grouped by category
 */
export const groupByCategory = (scholarships) => {
    const grouped = {};
    
    scholarships.forEach(scholarship => {
        if (!grouped[scholarship.category]) {
            grouped[scholarship.category] = [];
        }
        grouped[scholarship.category].push(scholarship);
    });
    
    return grouped;
};

/**
 * Get recommended scholarships based on urgency
 * @param {Array} scholarships - Array of scholarship objects
 * @returns {Array} - Sorted scholarships (urgent first)
 */
export const getRecommended = (scholarships) => {
    const urgencyOrder = { urgent: 0, soon: 1, normal: 2, announced: 3 };
    
    return [...scholarships].sort((a, b) => {
        const urgencyA = urgencyOrder[getUrgencyLevel(a.deadline)] ?? 4;
        const urgencyB = urgencyOrder[getUrgencyLevel(b.deadline)] ?? 4;
        
        if (urgencyA !== urgencyB) return urgencyA - urgencyB;
        
        // Sort by days remaining if same urgency
        const daysA = daysUntilDeadline(a.deadline) ?? Infinity;
        const daysB = daysUntilDeadline(b.deadline) ?? Infinity;
        
        return daysA - daysB;
    });
};

/**
 * Validate scholarship data structure
 * @param {Object} scholarship - Scholarship object
 * @returns {boolean}
 */
export const validateScholarship = (scholarship) => {
    return (
        scholarship &&
        typeof scholarship === 'object' &&
        scholarship.id &&
        scholarship.name &&
        scholarship.provider &&
        scholarship.category &&
        scholarship.amount &&
        scholarship.link &&
        typeof scholarship.name === 'string' &&
        typeof scholarship.provider === 'string' &&
        typeof scholarship.category === 'string' &&
        typeof scholarship.amount === 'string' &&
        typeof scholarship.link === 'string'
    );
};

/**
 * Generate scholarship badge data based on urgency
 * @param {string} deadline - Deadline string
 * @returns {Object} - Badge data with text and color
 */
export const getUrgencyBadge = (deadline) => {
    const urgency = getUrgencyLevel(deadline);
    
    const badges = {
        urgent: { text: 'Urgent', color: 'bg-red-500', textColor: 'text-red-500', bgLight: 'bg-red-50' },
        soon: { text: 'Closing Soon', color: 'bg-orange-500', textColor: 'text-orange-500', bgLight: 'bg-orange-50' },
        normal: { text: 'Open', color: 'bg-green-500', textColor: 'text-green-500', bgLight: 'bg-green-50' },
        announced: { text: 'Not Announced', color: 'bg-gray-500', textColor: 'text-gray-500', bgLight: 'bg-gray-50' }
    };
    
    return badges[urgency] || badges.normal;
};
