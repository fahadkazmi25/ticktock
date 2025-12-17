import { NextRequest, NextResponse } from 'next/server';
import { getTimesheetById, getEntriesByTimesheetId } from '@/lib/db/timesheets';
import { verifyToken } from '@/lib/auth';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        // Get token from header
        const authHeader = request.headers.get('authorization');
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const token = authHeader.split(' ')[1];
        const payload = verifyToken(token);

        if (!payload) {
            return NextResponse.json(
                { error: 'Invalid token' },
                { status: 401 }
            );
        }

        // Get timesheet
        const timesheet = getTimesheetById(id);
        if (!timesheet) {
            return NextResponse.json(
                { error: 'Timesheet not found' },
                { status: 404 }
            );
        }

        // Verify ownership
        if (timesheet.userId !== payload.userId) {
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
