'use client';

import React from 'react';
import { TaskCard, Task } from './TaskCard';
import { Plus } from 'lucide-react';

interface DayGroupProps {
    date: string;
    dayLabel: string;
    tasks: Task[];
    onAddTask: (date: string) => void;
    onEditTask: (task: Task) => void;
    onDeleteTask: (taskId: string) => void;
}

export const DayGroup: React.FC<DayGroupProps> = ({
    date,
    dayLabel,
    tasks,
    onAddTask,
    onEditTask,
    onDeleteTask,
}) => {
    return (
        <div className="flex gap-6 mb-6">
            {/* Date Label on Left */}
            <div className="w-20 flex-shrink-0 pt-3">
                <h3 className="text-sm font-semibold text-gray-900">{dayLabel}</h3>
            </div>

            {/* Tasks on Right */}
            <div className="flex-1 space-y-3">
                {tasks.map((task) => (
                    <TaskCard
                        key={task.id}
                        task={task}
                        onEdit={onEditTask}
                        onDelete={onDeleteTask}
                    />
                ))}

                {/* Add Task Button */}
                <button
                    onClick={() => onAddTask(date)}
                    className="w-full py-2 px-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg flex items-center justify-center gap-2 transition-colors border-2 border-dashed border-gray-300 hover:border-blue-400"
                >
                    <Plus className="w-4 h-4" />
                    Add new task
                </button>
            </div>
        </div>
    );
};
