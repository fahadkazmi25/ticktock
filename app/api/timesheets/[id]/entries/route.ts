import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { createTimesheetEntry, getTimesheetById } from '@/lib/db/timesheets';

export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();
        const session = await getServerSession(authOptions);

        if (!session || !session.user) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const userId = (session.user as any).id;

        // Verify timesheet ownership
        const timesheet = getTimesheetById(id);
        if (!timesheet) {
            return NextResponse.json(
                { error: 'Timesheet not found' },
                { status: 404 }
            );
        }

        if (timesheet.userId !== userId) {
            return NextResponse.json(
                { error: 'Forbidden' },
                { status: 403 }
            );
        }

        // Create entry
        const newEntry = createTimesheetEntry({
            userId: userId,
            timesheetId: id,
            date: body.date,
            projectId: body.projectId,
            projectName: body.projectName,
            workType: body.workType,
            description: body.description,
            hours: body.hours,
        });

        return NextResponse.json({
            success: true,
            data: newEntry,
        });
    } catch (error) {
        console.error('Create entry error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
