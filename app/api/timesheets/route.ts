import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { getTimesheetsByUserId, getTimesheets } from '@/lib/db/timesheets';
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

        // Get query params
        const { searchParams } = new URL(request.url);
        const status = searchParams.get('status') || undefined;
        const startDate = searchParams.get('startDate') || undefined;
        const endDate = searchParams.get('endDate') || undefined;
        const page = parseInt(searchParams.get('page') || '1');
        const pageSize = parseInt(searchParams.get('pageSize') || '5');

        // Get timesheets for user
        const userId = (session.user as any).id;
        const { timesheets: rawTimesheets, total } = getTimesheets(userId, {
            status,
            startDate,
            endDate,
            page,
            pageSize,
        });

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
            pagination: {
                total,
                page,
                pageSize,
                totalPages: Math.ceil(total / pageSize),
            }
        });
    } catch (error) {
        console.error('Get timesheets error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
