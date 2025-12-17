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
                className="bg-white rounded-lg shadow-xl w-full max-w-xl"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-200">
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
                            <Info className="w-4 h-4 text-gray-500" />
                        </label>
                        <div className="relative w-full ">
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
                                className="
      w-full px-4 py-2.5 pr-10
      appearance-none
      border border-gray-300
      rounded-lg
      bg-white
      text-gray-500
      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
    "
                            >
                                <option value="">Select Project</option>
                                <option value="1">E-Commerce Platform</option>
                                <option value="2">Mobile Banking App</option>
                                <option value="3">Healthcare Portal</option>
                                <option value="4">Learning Management System</option>
                                <option value="5">CRM Dashboard</option>
                                <option value="6">Inventory Management</option>
                                <option value="7">Real Estate Portal</option>
                                <option value="8">Social Media Analytics</option>
                            </select>

                            {/* Custom Arrow */}
                            <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
                                <svg
                                    className="
        h-4 w-4 text-gray-400
        transition-transform duration-200 ease-in-out
        group-focus-within:rotate-180
      "
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>
                        </div>



                    </div>

                    {/* Type of Work */}
                    <div className="mb-5">
                        <label className="flex items-center gap-1 text-sm font-medium text-gray-900 mb-2">
                            Type of Work
                            <span className="text-red-500">*</span>
                            <Info className="w-4 h-4 text-gray-400" />
                        </label>
                        <div className="relative w-full ">
                            <select
                                value={formData.workType}
                                onChange={(e) =>
                                    setFormData(prev => ({ ...prev, workType: e.target.value }))
                                }
                                required
                                className="
      w-full px-4 py-2.5 pr-10
      appearance-none
      border border-gray-300
      rounded-lg
      bg-white
      text-gray-400
      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
    "
                            >
                                <option value="">Select Work Type</option>
                                <option value="bug-fixes">Bug fixes</option>
                                <option value="feature-development">Feature Development</option>
                                <option value="code-review">Code Review</option>
                                <option value="testing">Testing</option>
                                <option value="documentation">Documentation</option>
                                <option value="api-integration">API Integration</option>
                                <option value="performance-optimization">Performance Optimization</option>
                                <option value="security-audit">Security Audit</option>
                                <option value="ui-ux-design">UI/UX Design</option>
                                <option value="database-optimization">Database Optimization</option>
                                <option value="deployment">Deployment</option>
                                <option value="meetings">Meetings</option>
                                <option value="client-support">Client Support</option>
                                <option value="research">Research</option>
                            </select>

                            {/* Custom Arrow */}
                            <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
                                <svg
                                    className="
        h-4 w-4 text-gray-400
        transition-transform duration-200 ease-in-out
        group-focus-within:rotate-180
      "
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>
                        </div>

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
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-gray-500 placeholder:text-gray-400"
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
                                className="w-15 px-2 py-2 border border-gray-300 text-center  text-gray-500  focus:border-transparent [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
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