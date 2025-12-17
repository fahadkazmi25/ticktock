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
export const timesheets: Timesheet[] = [
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
];

// Mock timesheet entries database
export const timesheetEntries: TimesheetEntry[] = [
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

// Helper functions
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
