import React from 'react';

interface ProgressBarProps {
    current: number;
    total: number;
    className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
    current,
    total,
    className = '',
}) => {
    const percentage = Math.min((current / total) * 100, 100);

    const getColor = () => {
        if (percentage === 100) return 'bg-green-500';
        if (percentage >= 50) return 'bg-orange-500';
        return 'bg-orange-500';
    };

    return (
        <div className={`flex items-center gap-3 ${className}`}>
            <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
                <div
                    className={`h-full ${getColor()} transition-all duration-300`}
                    style={{ width: `${percentage}%` }}
                />
            </div>
            <div className="text-sm text-gray-600 whitespace-nowrap">
                {current}/{total} hrs
            </div>
            <div className="text-sm text-gray-500">
                {Math.round(percentage)}%
            </div>
        </div>
    );
};
