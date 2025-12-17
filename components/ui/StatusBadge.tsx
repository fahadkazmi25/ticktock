import React from 'react';

export type TimesheetStatus = 'completed' | 'incomplete' | 'missing';

interface StatusBadgeProps {
    status: TimesheetStatus;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
    const getStatusStyles = () => {
        switch (status) {
            case 'completed':
                return 'bg-green-100 text-green-700 border-green-200';
            case 'incomplete':
                return 'bg-yellow-100 text-yellow-700 border-yellow-200';
            case 'missing':
                return 'bg-pink-100 text-pink-700 border-pink-200';
            default:
                return 'bg-gray-100 text-gray-700 border-gray-200';
        }
    };

    return (
        <span
            className={`inline-block px-3 py-1 text-xs font-medium uppercase rounded border ${getStatusStyles()}`}
        >
            {status}
        </span>
    );
};
