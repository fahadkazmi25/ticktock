import { Timesheet } from '@/components/dashboard/TimesheetsTable';
import { TimesheetStatus } from '@/components/ui/StatusBadge';

export const generateMockTimesheets = (): Timesheet[] => {
    const timesheets: Timesheet[] = [
        {
            id: '1',
            weekNumber: 1,
            dateRange: '1 - 5 January, 2024',
            status: 'completed',
            hours: 40,
        },
        {
            id: '2',
            weekNumber: 2,
            dateRange: '8 - 12 January, 2024',
            status: 'completed',
            hours: 40,
        },
        {
            id: '3',
            weekNumber: 3,
            dateRange: '15 - 19 January, 2024',
            status: 'incomplete',
            hours: 32,
        },
        {
            id: '4',
            weekNumber: 4,
            dateRange: '22 - 26 January, 2024',
            status: 'completed',
            hours: 40,
        },
        {
            id: '5',
            weekNumber: 5,
            dateRange: '28 January - 1 February, 2024',
            status: 'missing',
            hours: 0,
        },
        {
            id: '6',
            weekNumber: 6,
            dateRange: '5 - 9 February, 2024',
            status: 'completed',
            hours: 40,
        },
        {
            id: '7',
            weekNumber: 7,
            dateRange: '12 - 16 February, 2024',
            status: 'incomplete',
            hours: 35,
        },
        {
            id: '8',
            weekNumber: 8,
            dateRange: '19 - 23 February, 2024',
            status: 'missing',
            hours: 0,
        },
        {
            id: '9',
            weekNumber: 9,
            dateRange: '26 February - 1 March, 2024',
            status: 'completed',
            hours: 40,
        },
        {
            id: '10',
            weekNumber: 10,
            dateRange: '4 - 8 March, 2024',
            status: 'completed',
            hours: 40,
        },
    ];

    return timesheets;
};

export const filterTimesheets = (
    timesheets: Timesheet[],
    statusFilter: string
): Timesheet[] => {
    if (!statusFilter || statusFilter === 'all') {
        return timesheets;
    }

    return timesheets.filter((timesheet) => timesheet.status === statusFilter);
};

export const paginateTimesheets = (
    timesheets: Timesheet[],
    page: number,
    itemsPerPage: number
): Timesheet[] => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return timesheets.slice(startIndex, endIndex);
};
