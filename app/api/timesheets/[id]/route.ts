import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { getTimesheetById, getEntriesByTimesheetId } from '@/lib/db/timesheets';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const session = await getServerSession(authOptions);

        if (!session || !session.user) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const userId = (session.user as any).id;

        // Get timesheet
        const timesheet = getTimesheetById(id);
        if (!timesheet) {
            return NextResponse.json(
                { error: 'Timesheet not found' },
                { status: 404 }
            );
        }

        // Verify ownership
        if (timesheet.userId !== userId) {
            return NextResponse.json(
                { error: 'Forbidden' },
                { status: 403 }
            );
        }

        // Get entries
        const entries = getEntriesByTimesheetId(id);

        return NextResponse.json({
            success: true,
            data: {
                timesheet,
                entries,
            },
        });
    } catch (error) {
        console.error('Get timesheet detail error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
