'use client';

import React, { useState } from 'react';
import { Ellipsis, EllipsisIcon, MoreVertical } from 'lucide-react';

export interface Task {
    id: string;
    description: string;
    hours: number;
    projectName: string;
}

interface TaskCardProps {
    task: Task;
    onEdit: (task: Task) => void;
    onDelete: (taskId: string) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, onEdit, onDelete }) => {
    const [showMenu, setShowMenu] = useState(false);

    return (
        <div className="flex items-center justify-between py-2 px-2 border border-gray-200 rounded-lg bg-white hover:border-gray-300 transition-colors">
            <div className="flex-1">
                <p className="text-sm text-gray-900">{task.description}</p>
            </div>

            <div className="flex items-center gap-3">
                <span className="text-sm text-gray-400">{task.hours} hrs</span>

                <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-md">
                    {task.projectName}
                </span>

                <div className="relative">
                    <button
                        onClick={() => setShowMenu(!showMenu)}
                        className="p-1 hover:bg-gray-100 rounded transition-colors cursor-pointer"
                    >
                        <EllipsisIcon className="w-4 h-4 text-gray-600" />
                    </button>

                    {showMenu && (
                        <>
                            <div
                                className="fixed inset-0 z-10"
                                onClick={() => setShowMenu(false)}
                            />
                            <div className="absolute right-0 mt-1 w-32 bg-white rounded-md shadow-lg py-1 z-20 border border-gray-200">
                                <button
                                    onClick={() => {
                                        onEdit(task);
                                        setShowMenu(false);
                                    }}
                                    className="block cursor-pointer w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => {
                                        onDelete(task.id);
                                        setShowMenu(false);
                                    }}
                                    className="block cursor-pointer w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                                >
                                    Delete
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};
