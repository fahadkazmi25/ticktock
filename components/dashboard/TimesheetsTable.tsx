'use client';

import React from 'react';
import Link from 'next/link';
import { StatusBadge, TimesheetStatus } from '@/components/ui/StatusBadge';
import { MoveDown } from 'lucide-react';

export interface Timesheet {
    id: string;
    weekNumber: number;
    dateRange: string;
    status: TimesheetStatus;
    hours: number;
}

interface TimesheetsTableProps {
    timesheets: Timesheet[];
    onAction: (id: string, action: 'view' | 'update' | 'create') => void;
}

export const TimesheetsTable: React.FC<TimesheetsTableProps> = ({
    timesheets,
    onAction,
}) => {
    const getActionButton = (timesheet: Timesheet) => {
        switch (timesheet.status) {
            case 'completed':
                return (
                    <Link
                        href={`/timesheets/${timesheet.id}`}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                        View
                    </Link>
                );
            case 'incomplete':
                return (
                    <Link
                        href={`/timesheets/${timesheet.id}`}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                        Update
                    </Link>
                );
            case 'missing':
                return (
                    <Link
                        href={`/timesheets/${timesheet.id}`}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                        Create
                    </Link>
                );
        }
    };

    return (
        <div className="overflow-x-auto">
            <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            <div className="flex items-center gap-1">
                                Week #
                                {/* <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg> */}
                            </div>
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            <div className="flex items-center gap-1">
                                Date
                                {/* <MoveDown /> */}
                                {/* <MoveDownIcon /> */}
                            </div>
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            <div className="flex items-center gap-1">
                                Status
                                {/* <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg> */}
                            </div>
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {timesheets?.length === 0 ? (
                        <tr>
                            <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                                No timesheets found
                            </td>
                        </tr>
                    ) : (
                        timesheets?.map((timesheet) => (
                            <tr key={timesheet.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {timesheet.weekNumber}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {timesheet.dateRange}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <StatusBadge status={timesheet.status} />
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right">
                                    {getActionButton(timesheet)}
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};
