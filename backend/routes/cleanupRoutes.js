import express from 'express';
import EventCleanupService from '../services/eventCleanupService.js';

const router = express.Router();

// Manually trigger cleanup of expired events
router.post('/cleanup', async (req, res) => {
    try {
        console.log('🗑️ Manual cleanup triggered via API');
        const result = await EventCleanupService.deleteExpiredEvents();
        
        res.status(200).json({
            success: true,
            message: result.message,
            data: {
                deleted: result.deleted,
                failed: result.failed,
                timestamp: new Date()
            }
        });
    } catch (error) {
        console.error('❌ Manual cleanup error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to cleanup expired events',
            error: error.message
        });
    }
});

// Get status of cleanup task
router.get('/cleanup/status', async (req, res) => {
    try {
        const status = await EventCleanupService.getCleanupStatus();
        
        res.status(200).json({
            success: true,
            data: status
        });
    } catch (error) {
        console.error('❌ Cleanup status error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to get cleanup status',
            error: error.message
        });
    }
});

// Schedule automatic cleanup
router.post('/cleanup/schedule', async (req, res) => {
    try {
        const result = await EventCleanupService.scheduleEventCleanup();
        
        res.status(200).json({
            success: true,
            message: result.created ? 'Cleanup task scheduled' : 'Cleanup task updated',
            data: {
                nextRun: result.nextRun
            }
        });
    } catch (error) {
        console.error('❌ Schedule cleanup error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to schedule cleanup',
            error: error.message
        });
    }
});

export default router;
