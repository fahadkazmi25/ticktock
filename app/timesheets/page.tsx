'use client';
import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { Header } from '@/components/dashboard/Header';
import { Footer } from '@/components/dashboard/Footer';
import { Filters } from '@/components/dashboard/Filters';
import { TimesheetsTable } from '@/components/dashboard/TimesheetsTable';
import { Pagination } from '@/components/ui/Pagination';

function TimesheetsContent() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    // Derived state from URL
    const currentPage = Number(searchParams.get('page')) || 1;
    const itemsPerPage = Number(searchParams.get('pageSize')) || 5;
    const statusFilter = searchParams.get('status') || '';
    const startDate = searchParams.get('startDate') || '';
    const endDate = searchParams.get('endDate') || '';

    const [timesheets, setTimesheets] = useState<any[]>([]);
    const [totalItems, setTotalItems] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchTimesheets = async () => {
            setIsLoading(true);
            try {
                // Pass current URL params directly to API
                const params = new URLSearchParams(searchParams.toString());

                // Ensure defaults are set if missing in URL
                if (!params.has('page')) params.set('page', '1');
                if (!params.has('pageSize')) params.set('pageSize', '5');

                const response = await fetch(`/api/timesheets?${params.toString()}`);

                if (response.ok) {
                    const data = await response.json();
                    setTimesheets(data.data);
                    if (data.pagination) {
                        setTotalItems(data.pagination.total);
                    }
                }
            } catch (error) {
                console.error('Failed to fetch timesheets', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTimesheets();
    }, [searchParams]);

    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const handleAction = (id: string, action: 'view' | 'update' | 'create') => {
        console.log(`Action: ${action} for timesheet ${id}`);
    };

    // Helper to update URL params
    const updateParams = (updates: Record<string, string | null>) => {
        const params = new URLSearchParams(searchParams.toString());

        Object.entries(updates).forEach(([key, value]) => {
            if (value === null || value === '') {
                params.delete(key);
            } else {
                params.set(key, value);
            }
        });

        replace(`${pathname}?${params.toString()}`);
    };

    const handlePageChange = (page: number) => {
        updateParams({ page: page.toString() });
    };

    const handleItemsPerPageChange = (items: number) => {
        updateParams({
            pageSize: items.toString(),
            page: '1' // Reset to page 1
        });
    };

    const handleFilterChange = (key: string, value: string) => {
        updateParams({
            [key]: value,
            page: '1' // Reset to page 1 on filter change
        });
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
                            startDate={startDate}
                            endDate={endDate}
                            status={statusFilter}
                            onStartDateChange={(val) => handleFilterChange('startDate', val)}
                            onEndDateChange={(val) => handleFilterChange('endDate', val)}
                            onStatusChange={(val) => handleFilterChange('status', val)}
                        />
                    </div>

                    {/* Table */}
                    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                        <TimesheetsTable
                            timesheets={timesheets}
                            onAction={handleAction}
                        />

                        {/* Pagination */}
                        {timesheets.length > 0 && (
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

export default function TimesheetsPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center font-semibold text-md">ticktock</div>}>
            <TimesheetsContent />
        </Suspense>
    );
}
