'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { Header } from '@/components/dashboard/Header';
import { Footer } from '@/components/dashboard/Footer';
import { Filters } from '@/components/dashboard/Filters';
import { TimesheetsTable } from '@/components/dashboard/TimesheetsTable';
import { Pagination } from '@/components/ui/Pagination';
import { generateMockTimesheets, filterTimesheets, paginateTimesheets } from '@/lib/timesheets';

export default function TimesheetsPage() {
    const [dateRange, setDateRange] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [timesheets, setTimesheets] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchTimesheets = async () => {
            try {
                const response = await fetch('/api/timesheets');

                if (response.ok) {
                    const data = await response.json();
                    setTimesheets(data.data);
                }
            } catch (error) {
                console.error('Failed to fetch timesheets', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTimesheets();
    }, []);

    const filteredTimesheets = useMemo(() => {
        return filterTimesheets(timesheets, statusFilter);
    }, [timesheets, statusFilter]);

    const paginatedTimesheets = useMemo(() => {
        return paginateTimesheets(filteredTimesheets, currentPage, itemsPerPage);
    }, [filteredTimesheets, currentPage, itemsPerPage]);

    const totalPages = Math.ceil(filteredTimesheets.length / itemsPerPage);

    const handleAction = (id: string, action: 'view' | 'update' | 'create') => {
        console.log(`Action: ${action} for timesheet ${id}`);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleItemsPerPageChange = (items: number) => {
        setItemsPerPage(items);
        setCurrentPage(1);
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Header />

            <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8">
                <div className="max-w-7xl mx-auto">
                    {/* Page Title and Filters */}
                    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                        <h1 className="text-2xl font-bold text-gray-900 mb-6">Your Timesheets</h1>
                        <Filters
                            dateRange={dateRange}
                            status={statusFilter}
                            onDateRangeChange={setDateRange}
                            onStatusChange={setStatusFilter}
                        />
                    </div>

                    {/* Table */}
                    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                        <TimesheetsTable
                            timesheets={paginatedTimesheets}
                            onAction={handleAction}
                        />

                        {/* Pagination */}
                        {filteredTimesheets.length > 0 && (
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={handlePageChange}
                                itemsPerPage={itemsPerPage}
                                onItemsPerPageChange={handleItemsPerPageChange}
                            />
                        )}
                    </div>
                </div>
                <Footer />
            </main>


        </div>
    );
}
