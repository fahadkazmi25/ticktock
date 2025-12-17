'use client';

import React from 'react';
import { TaskRow, Task } from './TaskRow';
import { Plus } from 'lucide-react';

interface DaySectionProps {
    date: string;
    dayName: string;
    tasks: Task[];
    onAddTask: (date: string) => void;
    onEditTask: (task: Task) => void;
    onDeleteTask: (taskId: string) => void;
}

export const DaySection: React.FC<DaySectionProps> = ({
    date,
    dayName,
    tasks,
    onAddTask,
    onEditTask,
    onDeleteTask,
}) => {
    return (
        <div className="border-b border-gray-200 last:border-b-0">
            {/* Date Header */}
            <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                <h3 className="text-md font-semibold text-gray-900">{dayName}</h3>
            </div>

            {/* Tasks */}
            <div className="py-2">
                {tasks.map((task) => (
                    <TaskRow
                        key={task.id}
                        task={task}
                        onEdit={onEditTask}
                        onDelete={onDeleteTask}
                    />
                ))}

                {/* Add Task Button */}
                <button
                    onClick={() => onAddTask(date)}
                    className="w-full py-3 px-4 cursor-pointer text-sm text-gray-600 hover:bg-blue-50 rounded-lg flex items-center justify-center gap-2 transition-colors border-2 border-dashed border-gray-300 hover:border-blue-400 my-2 mx-4"
                    style={{ width: 'calc(100% - 2rem)' }}
                >
                    <Plus className="w-4 h-4" />
                    Add new task
                </button>
            </div>
        </div>
    );
};
