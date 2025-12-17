'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Info, Minus, Plus } from 'lucide-react';

interface TaskModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (task: TaskFormData) => void;
    initialData?: TaskFormData | null;
    mode: 'add' | 'edit';
}

export interface TaskFormData {
    id?: string;
    projectId: string;
    projectName: string;
    workType: string;
    description: string;
    hours: number;
    date?: string;
}

export const TaskModal: React.FC<TaskModalProps> = ({
    isOpen,
    onClose,
    onSave,
    initialData,
    mode,
}) => {
    const [formData, setFormData] = useState<TaskFormData>({
        projectId: '',
        projectName: '',
        workType: '',
        description: '',
        hours: 0,
    });

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        } else {
            setFormData({
                projectId: '',
                projectName: '',
                workType: '',
                description: '',
                hours: 0,
            });
        }
    }, [initialData, isOpen]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
        onClose();
    };

    const incrementHours = () => {
        setFormData(prev => ({ ...prev, hours: prev.hours + 1 }));
    };

    const decrementHours = () => {
        setFormData(prev => ({ ...prev, hours: Math.max(0, prev.hours - 1) }));
    };

    const handleHoursChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value) || 0;
        setFormData(prev => ({ ...prev, hours: Math.max(0, value) }));
    };

    if (!isOpen || !mounted) return null;

    return createPortal(
        <div
            className="fixed inset-0 flex items-center justify-center z-[9999] bg-black/40 backdrop-blur-xs px-4"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-lg shadow-xl w-full max-w-lg"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900">
                        {mode === 'add' ? 'Add New Entry' : 'Edit Entry'}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="px-6 py-6">
                    {/* Select Project */}
                    <div className="mb-5">
                        <label className="flex items-center gap-1 text-sm font-medium text-gray-900 mb-2">
                            Select Project
                            <span className="text-red-500">*</span>
                            <Info className="w-4 h-4 text-gray-400" />
                        </label>
                        <select
                            value={formData.projectId}
                            onChange={(e) => {
                                const selectedOption = e.target.options[e.target.selectedIndex];
                                setFormData(prev => ({
                                    ...prev,
                                    projectId: e.target.value,
                                    projectName: selectedOption.text,
                                }));
                            }}
                            required
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900"
                        >
                            <option value="">Project Name</option>
                            <option value="1">Project Name</option>
                            <option value="2">Another Project</option>
                            <option value="3">Sample Project</option>
                        </select>
                    </div>

                    {/* Type of Work */}
                    <div className="mb-5">
                        <label className="flex items-center gap-1 text-sm font-medium text-gray-900 mb-2">
                            Type of Work
                            <span className="text-red-500">*</span>
                            <Info className="w-4 h-4 text-gray-400" />
                        </label>
                        <select
                            value={formData.workType}
                            onChange={(e) => setFormData(prev => ({ ...prev, workType: e.target.value }))}
                            required
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900"
                        >
                            <option value="">Bug fixes</option>
                            <option value="bug-fixes">Bug fixes</option>
                            <option value="feature-development">Feature Development</option>
                            <option value="code-review">Code Review</option>
                            <option value="testing">Testing</option>
                            <option value="documentation">Documentation</option>
                        </select>
                    </div>

                    {/* Task Description */}
                    <div className="mb-5">
                        <label className="flex items-center gap-1 text-sm font-medium text-gray-900 mb-2">
                            Task description
                            <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                            required
                            placeholder="Write text here ..."
                            rows={5}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-gray-900 placeholder:text-gray-400"
                        />
                        <p className="text-xs text-gray-500 mt-1">A note for extra info</p>
                    </div>

                    {/* Hours */}
                    <div className="mb-6">
                        <label className="flex items-center gap-1 text-sm font-medium text-gray-900 mb-2">
                            Hours
                            <span className="text-red-500">*</span>
                        </label>
                        <div className="flex items-center">
                            <button
                                type="button"
                                onClick={decrementHours}
                                className="w-10 h-10 flex cursor-pointer items-center rounded-l-lg justify-center border border-gray-300  hover:bg-gray-50 transition-colors"
                            >
                                <Minus className="w-4 h-4 text-gray-600" />
                            </button>
                            <input
                                type="number"
                                value={formData.hours}
                                onChange={handleHoursChange}
                                min="0"
                                required
                                // onKeyDown={handleKeyDown} // Optional: Add this to prevent negative number input via keyboard
                                className="w-15 px-2 py-2 border border-gray-300 text-center   focus:border-transparent [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            />
                            <button
                                type="button"
                                onClick={incrementHours}
                                className="w-10 h-10 flex cursor-pointer items-center justify-center border border-gray-300 rounded-r-lg hover:bg-gray-50 transition-colors"
                            >
                                <Plus className="w-4 h-4 text-gray-600" />
                            </button>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                        <button
                            type="submit"
                            className="flex-1 bg-[#1c64f2] cursor-pointer hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors"
                        >
                            {mode === 'add' ? 'Add entry' : 'Save changes'}
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 bg-white hover:bg-gray-50 cursor-pointer text-gray-700 font-medium py-2.5 px-4 rounded-lg border border-gray-300 transition-colors"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>,
        document.body
    );
};
