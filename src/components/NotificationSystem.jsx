import { useState, useEffect, createContext, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Bell, Info, AlertCircle, CheckCircle, AlertTriangle } from 'lucide-react';
import { createSocket } from '../utils/socket';

// Notification context
const NotificationContext = createContext();

export const useNotifications = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const newSocket = createSocket();
        setSocket(newSocket);

        // Listen for admin notifications
        newSocket.on('adminNotification', (notification) => {
            addNotification({
                id: Date.now(),
                type: notification.type || 'info',
                title: notification.title,
                message: notification.message,
                timestamp: new Date(),
                autoClose: notification.autoClose !== false,
                duration: notification.duration || 5000
            });
        });

        // Listen for new events
        newSocket.on('newEvent', (event) => {
            addNotification({
                id: Date.now(),
                type: 'success',
                title: 'New Competition Added!',
                message: `${event.title} is now available for registration.`,
                timestamp: new Date(),
                autoClose: true,
                duration: 6000
            });
        });

        // Listen for event updates
        newSocket.on('eventUpdate', (event) => {
            addNotification({
                id: Date.now(),
                type: 'info',
                title: 'Competition Updated',
                message: `${event.title} has been updated with new information.`,
                timestamp: new Date(),
                autoClose: true,
                duration: 5000
            });
        });

        return () => {
            newSocket.disconnect();
        };
    }, []);

    const addNotification = (notification) => {
        setNotifications(prev => [notification, ...prev]);
    };

    const removeNotification = (id) => {
        setNotifications(prev => prev.filter(n => n.id !== id));
    };

    const clearAllNotifications = () => {
        setNotifications([]);
    };

    return (
        <NotificationContext.Provider value={{ 
            notifications, 
            addNotification, 
            removeNotification, 
            clearAllNotifications 
        }}>
            {children}
            <NotificationContainer />
        </NotificationContext.Provider>
    );
};

const NotificationContainer = () => {
    const { notifications, removeNotification } = useNotifications();

    const getIcon = (type) => {
        switch (type) {
            case 'success':
                return <CheckCircle size={20} className="text-emerald-500" />;
            case 'error':
                return <AlertCircle size={20} className="text-red-500" />;
            case 'warning':
                return <AlertTriangle size={20} className="text-amber-500" />;
            default:
                return <Info size={20} className="text-blue-500" />;
        }
    };

    const getStyles = (type) => {
        switch (type) {
            case 'success':
                return 'border-emerald-500/20 bg-emerald-50 text-emerald-900';
            case 'error':
                return 'border-red-500/20 bg-red-50 text-red-900';
            case 'warning':
                return 'border-amber-500/20 bg-amber-50 text-amber-900';
            default:
                return 'border-blue-500/20 bg-blue-50 text-blue-900';
        }
    };

    return (
        <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
            <AnimatePresence>
                {notifications.map((notification) => (
                    <motion.div
                        key={notification.id}
                        initial={{ opacity: 0, x: 300, scale: 0.8 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: 300, scale: 0.8 }}
                        transition={{ 
                            type: "spring", 
                            stiffness: 300, 
                            damping: 30,
                            mass: 0.8
                        }}
                        className={`
                            relative p-4 rounded-lg border shadow-lg backdrop-blur-sm
                            ${getStyles(notification.type)}
                        `}
                    >
                        <div className="flex items-start gap-3">
                            <div className="flex-shrink-0 mt-0.5">
                                {getIcon(notification.type)}
                            </div>
                            <div className="flex-1 min-w-0">
                                <h4 className="font-semibold text-sm mb-1">
                                    {notification.title}
                                </h4>
                                <p className="text-sm opacity-90 break-words">
                                    {notification.message}
                                </p>
                                <p className="text-xs opacity-70 mt-2">
                                    {new Date(notification.timestamp).toLocaleTimeString()}
                                </p>
                            </div>
                            <button
                                onClick={() => removeNotification(notification.id)}
                                className="flex-shrink-0 p-1 rounded hover:bg-black/10 transition-colors"
                            >
                                <X size={16} />
                            </button>
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
};

export default NotificationProvider;
