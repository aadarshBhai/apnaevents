export const formatDate = (dateString) => {
    if (!dateString) return 'Date TBD';
    
    // Handle MongoDB date strings
    if (typeof dateString === 'string') {
        const date = new Date(dateString);
        if (!isNaN(date.getTime())) {
            return date.toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'short', 
                day: 'numeric' 
            });
        }
    }
    
    // Handle Date objects
    if (dateString instanceof Date) {
        if (!isNaN(dateString.getTime())) {
            return dateString.toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'short', 
                day: 'numeric' 
            });
        }
    }
    
    // Fallback - return the original string if it exists
    return dateString || 'Date TBD';
};

// Test function
export const testDateFormat = () => {
    const testDates = [
        '2026-01-04T00:00:00.000Z',
        '2026-01-06T00:00:00.000Z',
        new Date('2026-01-07T00:00:00.000Z'),
        null,
        undefined,
        'invalid date'
    ];
    
    console.log('Testing date formatting:');
    testDates.forEach((date, index) => {
        console.log(`${index + 1}. Input: ${date}, Output: ${formatDate(date)}`);
    });
};
