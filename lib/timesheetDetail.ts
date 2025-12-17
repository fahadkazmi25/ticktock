import { Task } from '@/components/dashboard/TaskRow';

export interface DayData {
    date: string;
    dayName: string;
    tasks: Task[];
}

export interface TimesheetDetail {
    id: string;
    weekNumber: number;
    dateRange: string;
    totalHours: number;
    targetHours: number;
    days: DayData[];
}

export const generateMockTimesheetDetail = (id: string): TimesheetDetail => {
    return {
        id,
        weekNumber: 4,
        dateRange: '21 - 26 January, 2024',
        totalHours: 20,
        targetHours: 40,
        days: [
            {
                date: '2024-01-21',
                dayName: 'Jan 21',
                tasks: [
                    {
                        id: '1',
                        description: 'Homepage Development',
                        hours: 4,
                        projectName: 'Project Name',
                    },
                    {
                        id: '2',
                        description: 'Homepage Development',
                        hours: 4,
                        projectName: 'Project Name',
                    },
                ],
            },
            {
                date: '2024-01-22',
                dayName: 'Jan 22',
                tasks: [
                    {
                        id: '3',
                        description: 'Homepage Development',
                        hours: 4,
                        projectName: 'Project Name',
                    },
                    {
                        id: '4',
                        description: 'Homepage Development',
                        hours: 4,
                        projectName: 'Project Name',
                    },
                    {
                        id: '5',
                        description: 'Homepage Development',
                        hours: 4,
                        projectName: 'Project Name',
                    },
                ],
            },
            {
                date: '2024-01-23',
                dayName: 'Jan 23',
                tasks: [
                    {
                        id: '6',
                        description: 'Homepage Development',
                        hours: 4,
                        projectName: 'Project Name',
                    },
                    {
                        id: '7',
                        description: 'Homepage Development',
                        hours: 4,
                        projectName: 'Project Name',
                    },
                    {
                        id: '8',
                        description: 'Homepage Development',
                        hours: 4,
                        projectName: 'Project Name',
                    },
                ],
            },
            {
                date: '2024-01-24',
                dayName: 'Jan 24',
                tasks: [
                    {
                        id: '9',
                        description: 'Homepage Development',
                        hours: 4,
                        projectName: 'Project Name',
                    },
                    {
                        id: '10',
                        description: 'Homepage Development',
                        hours: 4,
                        projectName: 'Project Name',
                    },
                    {
                        id: '11',
                        description: 'Homepage Development',
                        hours: 4,
                        projectName: 'Project Name',
                    },
                ],
            },
            {
                date: '2024-01-25',
                dayName: 'Jan 25',
                tasks: [],
            },
        ],
    };
};

export const calculateTotalHours = (days: DayData[]): number => {
    return days.reduce((total, day) => {
        return total + day.tasks.reduce((dayTotal, task) => dayTotal + task.hours, 0);
    }, 0);
};
