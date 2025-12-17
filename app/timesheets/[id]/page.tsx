'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { Header } from '@/components/dashboard/Header';
import { Footer } from '@/components/dashboard/Footer';
import { DayGroup } from '@/components/dashboard/DayGroup';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Task } from '@/components/dashboard/TaskCard';
import { TaskModal, TaskFormData } from '@/components/dashboard/TaskModal';
import { ConfirmationModal } from '@/components/dashboard/ConfirmationModal';
import { calculateTotalHours, DayData } from '@/lib/timesheetDetail';
import { format, parseISO, addDays } from 'date-fns';

export default function TimesheetDetailPage() {
    const params = useParams();
    const router = useRouter();
    const timesheetId = params.id as string;

    const [timesheetData, setTimesheetData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
    const [editingTask, setEditingTask] = useState<Task | null>(null);
    const [selectedDate, setSelectedDate] = useState<string>('');
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [taskToDelete, setTaskToDelete] = useState<string | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    // Fetch data
    const fetchData = async () => {
        try {
            const response = await fetch(`/api/timesheets/${timesheetId}`);

            if (response.ok) {
                const { data } = await response.json();

                // Transform API data to UI structure
                const days: DayData[] = [];
                const startDate = parseISO(data.timesheet.startDate);

                for (let i = 0; i < 7; i++) {
                    const currentDate = addDays(startDate, i);
                    const dateStr = format(currentDate, 'yyyy-MM-dd');
                    const dayEntries = data.entries.filter((e: any) => e.date === dateStr);

                    days.push({
                        date: dateStr,
                        dayName: format(currentDate, 'MMM d'),
                        tasks: dayEntries.map((e: any) => ({
                            id: e.id,
                            description: e.description,
                            hours: e.hours,
                            projectName: e.projectName,
                            projectId: e.projectId, // Keep this for editing
                            workType: e.workType,   // Keep this for editing
                        })),
                    });
                }

                setTimesheetData({
                    id: data.timesheet.id,
                    weekNumber: data.timesheet.weekNumber,
                    dateRange: `${format(startDate, 'd')} - ${format(addDays(startDate, 6), 'd MMMM, yyyy')}`,
                    targetHours: 40,
                    days,
                });
            } else {
                toast.error('Failed to load timesheet');
            }
        } catch (error) {
            console.error('Error fetching timesheet:', error);
            toast.error('Error loading timesheet');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [timesheetId]);

    const totalHours = useMemo(() =>
        timesheetData ? calculateTotalHours(timesheetData.days) : 0,
        [timesheetData]
    );

    const handleAddTask = (date: string) => {
        setSelectedDate(date);
        setModalMode('add');
        setEditingTask(null);
        setIsModalOpen(true);
    };

    const handleEditTask = (task: Task) => {
        setModalMode('edit');
        setEditingTask(task);
        setIsModalOpen(true);
    };

    const handleDeleteTask = (taskId: string) => {
        setTaskToDelete(taskId);
        setIsDeleteModalOpen(true);
    };

    const confirmDeleteTask = async () => {
        if (!taskToDelete) return;

        setIsDeleting(true);
        try {
            const response = await fetch(`/api/timesheets/${timesheetId}/entries/${taskToDelete}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                toast.success('Task deleted');
                fetchData(); // Refresh data
                setIsDeleteModalOpen(false);
                setTaskToDelete(null);
            } else {
                toast.error('Failed to delete task');
            }
        } catch (error) {
            toast.error('Error deleting task');
        } finally {
            setIsDeleting(false);
        }
    };

    const handleSaveTask = async (formData: TaskFormData) => {
        setIsSubmitting(true);
        try {
            if (modalMode === 'add') {
                const response = await fetch(`/api/timesheets/${timesheetId}/entries`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        ...formData,
                        date: selectedDate,
                    }),
                });

                if (response.ok) {
                    toast.success('Task added successfully');
                    fetchData();
                    setIsModalOpen(false);
                } else {
                    toast.error('Failed to add task');
                }
            } else {
                const response = await fetch(`/api/timesheets/${timesheetId}/entries/${editingTask?.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });

                if (response.ok) {
                    toast.success('Task updated successfully');
                    fetchData();
                    setIsModalOpen(false);
                } else {
                    toast.error('Failed to update task');
                }
            }
        } catch (error) {
            toast.error('Error saving task');
        } finally {
            setIsSubmitting(false);
        }
    };

    const getInitialFormData = (): TaskFormData | null => {
        if (modalMode === 'edit' && editingTask) {
            return {
                id: editingTask.id,
                projectId: (editingTask as any).projectId || '1',
                projectName: editingTask.projectName,
                workType: (editingTask as any).workType || 'bug-fixes',
                description: editingTask.description,
                hours: editingTask.hours,
            };
        }
        return null;
    };

    if (isLoading) {
        return <div className="min-h-screen flex items-center justify-center text-md font-semibold">ticktock</div>;
    }

    if (!timesheetData) {
        return <div className="min-h-screen flex items-center justify-center">Timesheet not found</div>;
    }

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Header />

            <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-white rounded-lg shadow-sm p-8">
                        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-8 pb-8 border-gray-200">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                                    This week's timesheet
                                </h1>
                                <p className="text-sm text-gray-600">
                                    {timesheetData.dateRange}
                                </p>
                            </div>

                            <div className="w-full lg:w-96">
                                <ProgressBar
                                    current={totalHours}
                                    total={timesheetData.targetHours}
                                />
                            </div>
                        </div>

                        <div className="space-y-0">
                            {timesheetData.days.map((day: DayData) => (
                                <DayGroup
                                    key={day.date}
                                    date={day.date}
                                    dayLabel={day.dayName}
                                    tasks={day.tasks}
                                    onAddTask={handleAddTask}
                                    onEditTask={handleEditTask}
                                    onDeleteTask={handleDeleteTask}
                                />
                            ))}
                        </div>
                    </div>

                    <Footer />
                </div>
            </main>

            <TaskModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveTask}
                initialData={getInitialFormData()}
                mode={modalMode}
            // isLoading={isSubmitting}
            />

            <ConfirmationModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={confirmDeleteTask}
                title="Delete Task"
                message="Are you sure you want to delete this task? This action cannot be undone."
                isLoading={isDeleting}
            />
        </div>
    );
}
