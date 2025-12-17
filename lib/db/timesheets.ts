export interface TimesheetEntry {
    id: string;
    userId: string;
    timesheetId: string;
    date: string;
    projectId: string;
    projectName: string;
    workType: string;
    description: string;
    hours: number;
    createdAt: string;
    updatedAt: string;
}

export interface Timesheet {
    id: string;
    userId: string;
    weekNumber: number;
    year: number;
    startDate: string;
    endDate: string;
    totalHours: number;
    status: 'completed' | 'incomplete' | 'missing';
    createdAt: string;
    updatedAt: string;
}

// Mock timesheets database
const globalForTimesheets = global as unknown as {
    timesheets_v2: Timesheet[];
    timesheetEntries_v2: TimesheetEntry[];
};

export const timesheets: Timesheet[] = globalForTimesheets.timesheets_v2 || [
    {
        id: '1',
        userId: '1',
        weekNumber: 1,
        year: 2024,
        startDate: '2024-01-01',
        endDate: '2024-01-05',
        totalHours: 40,
        status: 'completed',
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-05T23:59:59Z',
    },
    {
        id: '2',
        userId: '1',
        weekNumber: 2,
        year: 2024,
        startDate: '2024-01-08',
        endDate: '2024-01-12',
        totalHours: 40,
        status: 'completed',
        createdAt: '2024-01-08T00:00:00Z',
        updatedAt: '2024-01-12T23:59:59Z',
    },
    {
        id: '3',
        userId: '1',
        weekNumber: 3,
        year: 2024,
        startDate: '2024-01-15',
        endDate: '2024-01-19',
        totalHours: 32,
        status: 'incomplete',
        createdAt: '2024-01-15T00:00:00Z',
        updatedAt: '2024-01-19T23:59:59Z',
    },
    {
        id: '4',
        userId: '1',
        weekNumber: 4,
        year: 2024,
        startDate: '2024-01-22',
        endDate: '2024-01-26',
        totalHours: 40,
        status: 'completed',
        createdAt: '2024-01-22T00:00:00Z',
        updatedAt: '2024-01-26T23:59:59Z',
    },
    {
        id: '5',
        userId: '1',
        weekNumber: 5,
        year: 2024,
        startDate: '2024-01-28',
        endDate: '2024-02-01',
        totalHours: 0,
        status: 'missing',
        createdAt: '2024-01-28T00:00:00Z',
        updatedAt: '2024-01-28T00:00:00Z',
    },
    {
        id: '6',
        userId: '1',
        weekNumber: 47,
        year: 2025,
        startDate: '2025-11-24',
        endDate: '2025-11-28',
        totalHours: 35,
        status: 'incomplete',
        createdAt: '2025-11-24T00:00:00Z',
        updatedAt: '2025-11-28T23:59:59Z',
    },
    {
        id: '7',
        userId: '1',
        weekNumber: 46,
        year: 2025,
        startDate: '2025-11-17',
        endDate: '2025-11-21',
        totalHours: 40,
        status: 'completed',
        createdAt: '2025-11-17T00:00:00Z',
        updatedAt: '2025-11-21T23:59:59Z',
    },
    {
        id: '8',
        userId: '1',
        weekNumber: 45,
        year: 2025,
        startDate: '2025-11-10',
        endDate: '2025-11-14',
        totalHours: 0,
        status: 'missing',
        createdAt: '2025-11-10T00:00:00Z',
        updatedAt: '2025-11-10T00:00:00Z',
    },
    {
        id: '9',
        userId: '1',
        weekNumber: 44,
        year: 2025,
        startDate: '2025-11-03',
        endDate: '2025-11-07',
        totalHours: 30,
        status: 'incomplete',
        createdAt: '2025-11-03T00:00:00Z',
        updatedAt: '2025-11-07T23:59:59Z',
    },
    {
        id: '10',
        userId: '1',
        weekNumber: 43,
        year: 2025,
        startDate: '2025-10-27',
        endDate: '2025-10-31',
        totalHours: 40,
        status: 'completed',
        createdAt: '2025-10-27T00:00:00Z',
        updatedAt: '2025-10-31T23:59:59Z',
    },
];

// Mock timesheet entries database
export const timesheetEntries: TimesheetEntry[] = globalForTimesheets.timesheetEntries_v2 || [
    // Week 1 entries
    {
        id: '1',
        userId: '1',
        timesheetId: '1',
        date: '2024-01-01',
        projectId: '1',
        projectName: 'Project Name',
        workType: 'bug-fixes',
        description: 'Homepage Development',
        hours: 8,
        createdAt: '2024-01-01T09:00:00Z',
        updatedAt: '2024-01-01T09:00:00Z',
    },
    {
        id: '2',
        userId: '1',
        timesheetId: '1',
        date: '2024-01-02',
        projectId: '1',
        projectName: 'Project Name',
        workType: 'feature-development',
        description: 'Homepage Development',
        hours: 8,
        createdAt: '2024-01-02T09:00:00Z',
        updatedAt: '2024-01-02T09:00:00Z',
    },
    {
        id: '3',
        userId: '1',
        timesheetId: '1',
        date: '2024-01-03',
        projectId: '1',
        projectName: 'Project Name',
        workType: 'bug-fixes',
        description: 'Homepage Development',
        hours: 8,
        createdAt: '2024-01-03T09:00:00Z',
        updatedAt: '2024-01-03T09:00:00Z',
    },
    {
        id: '4',
        userId: '1',
        timesheetId: '1',
        date: '2024-01-04',
        projectId: '1',
        projectName: 'Project Name',
        workType: 'testing',
        description: 'Homepage Development',
        hours: 8,
        createdAt: '2024-01-04T09:00:00Z',
        updatedAt: '2024-01-04T09:00:00Z',
    },
    {
        id: '5',
        userId: '1',
        timesheetId: '1',
        date: '2024-01-05',
        projectId: '1',
        projectName: 'Project Name',
        workType: 'code-review',
        description: 'Homepage Development',
        hours: 8,
        createdAt: '2024-01-05T09:00:00Z',
        updatedAt: '2024-01-05T09:00:00Z',
    },
    // Week 4 entries
    {
        id: '6',
        userId: '1',
        timesheetId: '4',
        date: '2024-01-22',
        projectId: '1',
        projectName: 'Project Name',
        workType: 'bug-fixes',
        description: 'Homepage Development',
        hours: 4,
        createdAt: '2024-01-22T09:00:00Z',
        updatedAt: '2024-01-22T09:00:00Z',
    },
    {
        id: '7',
        userId: '1',
        timesheetId: '4',
        date: '2024-01-22',
        projectId: '1',
        projectName: 'Project Name',
        workType: 'feature-development',
        description: 'Homepage Development',
        hours: 4,
        createdAt: '2024-01-22T14:00:00Z',
        updatedAt: '2024-01-22T14:00:00Z',
    },
    {
        id: '8',
        userId: '1',
        timesheetId: '4',
        date: '2024-01-23',
        projectId: '1',
        projectName: 'Project Name',
        workType: 'bug-fixes',
        description: 'Homepage Development',
        hours: 8,
        createdAt: '2024-01-23T09:00:00Z',
        updatedAt: '2024-01-23T09:00:00Z',
    },
    {
        id: '9',
        userId: '1',
        timesheetId: '4',
        date: '2024-01-24',
        projectId: '1',
        projectName: 'Project Name',
        workType: 'testing',
        description: 'Homepage Development',
        hours: 8,
        createdAt: '2024-01-24T09:00:00Z',
        updatedAt: '2024-01-24T09:00:00Z',
    },
    {
        id: '10',
        userId: '1',
        timesheetId: '4',
        date: '2024-01-25',
        projectId: '1',
        projectName: 'Project Name',
        workType: 'code-review',
        description: 'Homepage Development',
        hours: 8,
        createdAt: '2024-01-25T09:00:00Z',
        updatedAt: '2024-01-25T09:00:00Z',
    },
    {
        id: '11',
        userId: '1',
        timesheetId: '4',
        date: '2024-01-26',
        projectId: '1',
        projectName: 'Project Name',
        workType: 'documentation',
        description: 'Homepage Development',
        hours: 8,
        createdAt: '2024-01-26T09:00:00Z',
        updatedAt: '2024-01-26T09:00:00Z',
    },
];

if (process.env.NODE_ENV !== 'production') {
    globalForTimesheets.timesheets_v2 = timesheets;
    globalForTimesheets.timesheetEntries_v2 = timesheetEntries;
}

// Helper functions
export const getTimesheets = (
    userId: string,
    options: {
        status?: string;
        startDate?: string;
        endDate?: string;
        page?: number;
        pageSize?: number;
    }
): { timesheets: Timesheet[]; total: number } => {
    let filtered = timesheets.filter(ts => ts.userId === userId);

    if (options.status && options.status !== 'all') {
        filtered = filtered.filter(ts => ts.status === options.status);
    }

    if (options.startDate) {
        filtered = filtered.filter(ts => ts.endDate >= options.startDate!);
    }

    if (options.endDate) {
        filtered = filtered.filter(ts => ts.startDate <= options.endDate!);
    }

    const total = filtered.length;

    // Sort by date descending
    filtered.sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());

    if (options.page && options.pageSize) {
        const start = (options.page - 1) * options.pageSize;
        const end = start + options.pageSize;
        filtered = filtered.slice(start, end);
    }

    return { timesheets: filtered, total };
};

export const getTimesheetsByUserId = (userId: string): Timesheet[] => {
    return timesheets.filter(ts => ts.userId === userId);
};

export const getTimesheetById = (id: string): Timesheet | undefined => {
    return timesheets.find(ts => ts.id === id);
};

export const getEntriesByTimesheetId = (timesheetId: string): TimesheetEntry[] => {
    return timesheetEntries.filter(entry => entry.timesheetId === timesheetId);
};

export const createTimesheetEntry = (entry: Omit<TimesheetEntry, 'id' | 'createdAt' | 'updatedAt'>): TimesheetEntry => {
    const newEntry: TimesheetEntry = {
        ...entry,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };
    timesheetEntries.push(newEntry);
    updateTimesheetTotalHours(entry.timesheetId);
    return newEntry;
};

export const updateTimesheetEntry = (id: string, updates: Partial<TimesheetEntry>): TimesheetEntry | null => {
    const index = timesheetEntries.findIndex(entry => entry.id === id);
    if (index === -1) return null;

    timesheetEntries[index] = {
        ...timesheetEntries[index],
        ...updates,
        updatedAt: new Date().toISOString(),
    };

    updateTimesheetTotalHours(timesheetEntries[index].timesheetId);
    return timesheetEntries[index];
};

export const deleteTimesheetEntry = (id: string): boolean => {
    const index = timesheetEntries.findIndex(entry => entry.id === id);
    if (index === -1) return false;

    const timesheetId = timesheetEntries[index].timesheetId;
    timesheetEntries.splice(index, 1);
    updateTimesheetTotalHours(timesheetId);
    return true;
};

const updateTimesheetTotalHours = (timesheetId: string): void => {
    const entries = getEntriesByTimesheetId(timesheetId);
    const totalHours = entries.reduce((sum, entry) => sum + entry.hours, 0);

    const timesheetIndex = timesheets.findIndex(ts => ts.id === timesheetId);
    if (timesheetIndex !== -1) {
        timesheets[timesheetIndex].totalHours = totalHours;
        timesheets[timesheetIndex].status =
            totalHours === 0 ? 'missing' :
                totalHours >= 40 ? 'completed' :
                    'incomplete';
        timesheets[timesheetIndex].updatedAt = new Date().toISOString();
    }
};
