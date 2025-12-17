'use client';

import React from 'react';
import { Select } from '@/components/ui/Select';

interface FiltersProps {
    startDate: string;
    endDate: string;
    status: string;
    onStartDateChange: (value: string) => void;
    onEndDateChange: (value: string) => void;
    onStatusChange: (value: string) => void;
}

export const Filters: React.FC<FiltersProps> = ({
    startDate,
    endDate,
    status,
    onStartDateChange,
    onEndDateChange,
    onStatusChange,
}) => {
    const statusOptions = [
        { value: "", label: "Status" },
        { value: 'all', label: 'All Statuses' },
        { value: 'completed', label: 'Completed' },
        { value: 'incomplete', label: 'Incomplete' },
        { value: 'missing', label: 'Missing' },
    ];

    return (
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="flex gap-2 w-full flex flex-col sm:flex-row sm:w-auto">
                <div className="relative w-full sm:w-40">
                    <label className='text-md       '>Start Date</label>
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => onStartDateChange(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
                        placeholder="Start Date"
                    />
                </div>
                <div className="relative w-full sm:w-40">
                    <label className='text-md'>End Date</label>
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => onEndDateChange(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
                        placeholder="End Date"
                    />
                </div>
            </div>

            <div className="relative w-full flex flex-col sm:w-48">
                <label className='text-md'>Status</label>
                <Select
                    value={status}
                    onChange={onStatusChange}
                    options={statusOptions}
                    placeholder="Status"
                    className="w-full"
                />
            </div>
        </div>
    );
};
