'use client';

import React, { useState } from 'react';
import { MoreVertical } from 'lucide-react';

export interface Task {
    id: string;
    description: string;
    hours: number;
    projectName: string;
}

interface TaskRowProps {
    task: Task;
    onEdit: (task: Task) => void;
    onDelete: (taskId: string) => void;
}

export const TaskRow: React.FC<TaskRowProps> = ({ task, onEdit, onDelete }) => {
    const [showMenu, setShowMenu] = useState(false);

    return (
        <div className="flex items-center justify-between py-3 px-4 hover:bg-gray-50 rounded-lg group">
            <div className="flex-1">
                <p className="text-sm text-gray-900">{task.description}</p>
            </div>

            <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">{task.hours} hrs</span>

                <a href="#" className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                    {task.projectName}
                </a>

                <div className="relative">
                    <button
                        onClick={() => setShowMenu(!showMenu)}
                        className="p-1 hover:bg-gray-200 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                        <MoreVertical className="w-4 h-4 text-gray-600" />
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
                                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => {
                                        onDelete(task.id);
                                        setShowMenu(false);
                                    }}
                                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
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
