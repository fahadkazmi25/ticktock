import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { getTimesheetsByUserId } from '@/lib/db/timesheets';
import { format, parseISO } from 'date-fns';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || !session.user) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        // Get timesheets for user
        const userId = (session.user as any).id;
        const rawTimesheets = getTimesheetsByUserId(userId);

        // Transform data for frontend
        const timesheets = rawTimesheets.map(ts => ({
            id: ts.id,
            weekNumber: ts.weekNumber,
            dateRange: `${format(parseISO(ts.startDate), 'd MMM')} - ${format(parseISO(ts.endDate), 'd MMM, yyyy')}`,
            status: ts.status,
            hours: ts.totalHours,
        }));

        return NextResponse.json({
            success: true,
            data: timesheets,
        });
    } catch (error) {
        console.error('Get timesheets error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
