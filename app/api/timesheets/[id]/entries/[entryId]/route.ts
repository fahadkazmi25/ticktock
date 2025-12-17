import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { updateTimesheetEntry, deleteTimesheetEntry, getTimesheetById } from '@/lib/db/timesheets';

// Update Entry
export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string; entryId: string }> }
) {
    try {
        const { id, entryId } = await params;
        const body = await request.json();
        const session = await getServerSession(authOptions);

        if (!session || !session.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const userId = (session.user as any).id;

        // Ownership check
        const timesheet = getTimesheetById(id);
        if (!timesheet || timesheet.userId !== userId) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }

        // Update
        const updatedEntry = updateTimesheetEntry(entryId, body);
        if (!updatedEntry) {
            return NextResponse.json({ error: 'Entry not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: updatedEntry });
    } catch (error) {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

// Delete Entry
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string; entryId: string }> }
) {
    try {
        const { id, entryId } = await params;
        const session = await getServerSession(authOptions);

        if (!session || !session.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const userId = (session.user as any).id;

        // Ownership check
        const timesheet = getTimesheetById(id);
        if (!timesheet || timesheet.userId !== userId) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }

        // Delete
        const success = deleteTimesheetEntry(entryId);
        if (!success) {
            return NextResponse.json({ error: 'Entry not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
