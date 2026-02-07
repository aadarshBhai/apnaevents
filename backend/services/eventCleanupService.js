import Event from '../models/Event.js';
import ScheduledTask from '../models/ScheduledTask.js';

class EventCleanupService {
    static async deleteExpiredEvents() {
        try {
            console.log('🗑️ Starting expired event cleanup...');
            
            const now = new Date();
            const expiredEvents = await Event.find({
                deadline: { $lt: now },
                status: { $ne: 'closed' } // Don't delete closed events
            });

            if (expiredEvents.length === 0) {
                console.log('✅ No expired events found');
                return { deleted: 0, message: 'No expired events to delete' };
            }

            // Delete expired events
            const deletePromises = expiredEvents.map(async (event) => {
                try {
                    await Event.findByIdAndDelete(event._id);
                    console.log(`🗑️ Deleted expired event: ${event.title} (Deadline: ${event.deadline})`);
                    return { success: true, eventId: event._id, title: event.title };
                } catch (error) {
                    console.error(`❌ Failed to delete event ${event._id}:`, error);
                    return { success: false, eventId: event._id, error: error.message };
                }
            });

            const results = await Promise.all(deletePromises);
            const successful = results.filter(r => r.success);
            const failed = results.filter(r => !r.success);

            console.log(`✅ Cleanup completed: ${successful.length} deleted, ${failed.length} failed`);

            // Update the scheduled task
            await ScheduledTask.findOneAndUpdate(
                { 
                    type: 'delete-expired-events',
                    isActive: true 
                },
                { 
                    $set: { 
                        lastRun: now,
                        isActive: false,
                        config: {
                            deletedCount: successful.length,
                            failedCount: failed.length,
                            deletedEvents: successful.map(r => ({ eventId: r.eventId, title: r.title }))
                        }
                    }
                },
                { upsert: true }
            );

            return {
                success: true,
                deleted: successful.length,
                failed: failed.length,
                message: `Deleted ${successful.length} expired events${failed.length > 0 ? ` (${failed.length} failed)` : ''}`
            };

        } catch (error) {
            console.error('❌ Error in event cleanup service:', error);
            return { success: false, error: error.message };
        }
    }

    static async scheduleEventCleanup() {
        try {
            // Schedule to run daily at 2:00 AM
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            tomorrow.setHours(2, 0, 0, 0); // 2:00 AM

            const existingTask = await ScheduledTask.findOne({
                type: 'delete-expired-events',
                isActive: true
            });

            if (existingTask) {
                // Update next run time
                existingTask.nextRun = tomorrow;
                await existingTask.save();
                console.log('📅 Updated existing cleanup task to run at:', tomorrow);
                return { updated: true, nextRun: tomorrow };
            } else {
                // Create new scheduled task
                const newTask = await ScheduledTask.create({
                    type: 'delete-expired-events',
                    description: 'Automatically delete events whose deadline has passed',
                    nextRun: tomorrow,
                    config: {
                        runTime: '02:00',
                        frequency: 'daily'
                    }
                });
                console.log('📅 Created new cleanup task to run at:', tomorrow);
                return { created: true, nextRun: tomorrow };
            }

        } catch (error) {
            console.error('❌ Error scheduling cleanup task:', error);
            return { success: false, error: error.message };
        }
    }

    static async getCleanupStatus() {
        try {
            const task = await ScheduledTask.findOne({
                type: 'delete-expired-events',
                isActive: true
            });

            if (!task) {
                return { active: false, message: 'No active cleanup task found' };
            }

            return {
                active: true,
                lastRun: task.lastRun,
                nextRun: task.nextRun,
                config: task.config,
                message: `Last run: ${task.lastRun}, Next run: ${task.nextRun}`
            };

        } catch (error) {
            console.error('❌ Error getting cleanup status:', error);
            return { success: false, error: error.message };
        }
    }
}

export default EventCleanupService;
