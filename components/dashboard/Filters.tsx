'use client';

import React from 'react';
import { Select } from '@/components/ui/Select';

interface FiltersProps {
    dateRange: string;
    status: string;
    onDateRangeChange: (value: string) => void;
    onStatusChange: (value: string) => void;
}

export const Filters: React.FC<FiltersProps> = ({
    dateRange,
    status,
    onDateRangeChange,
    onStatusChange,
}) => {
    const dateRangeOptions = [
        { value: 'this-week', label: 'This Week' },
        { value: 'last-week', label: 'Last Week' },
        { value: 'this-month', label: 'This Month' },
        { value: 'last-month', label: 'Last Month' },
        { value: 'custom', label: 'Custom Range' },
    ];

    const statusOptions = [
        { value: "", label: "Status" },
        { value: 'all', label: 'All Statuses' },
        { value: 'completed', label: 'Completed' },
        { value: 'incomplete', label: 'Incomplete' },
        { value: 'missing', label: 'Missing' },
    ];

    return (
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <Select
                value={dateRange}
                onChange={onDateRangeChange}
                options={dateRangeOptions}
                placeholder="Date Range"
                className="w-full sm:w-48"
            />
            <Select
                value={status}
                onChange={onStatusChange}
                options={statusOptions}
                placeholder="Status"
                className="w-full sm:w-48"
            />
        </div>
    );
};
