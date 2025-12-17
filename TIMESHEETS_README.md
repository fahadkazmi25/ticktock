# Ticktock Timesheets Dashboard

## Overview
A fully responsive timesheets management dashboard built with Next.js, TypeScript, and Tailwind CSS.

## Features

### Timesheet Statuses
- **Completed**: 40 hours added by the user (Green badge)
- **Incomplete**: Less than 40 hours added by the user (Yellow badge)
- **Missing**: No hours added by the user (Pink badge)

### Filters
- **Date Range**: Filter timesheets by date range
  - This Week
  - Last Week
  - This Month
  - Last Month
  - Custom Range
  - Note: If the selected range covers multiple weeks, it shows all those weeks in the result

- **Status**: Filter by timesheet status
  - All Statuses
  - Completed
  - Incomplete
  - Missing

### Actions
- **View**: For completed timesheets
- **Update**: For incomplete timesheets
- **Create**: For missing timesheets

## Project Structure

```
app/
├── timesheets/
│   └── page.tsx              # Main timesheets page
├── login/
│   └── page.tsx              # Login page

components/
├── dashboard/
│   ├── Header.tsx            # Top navigation with user menu
│   ├── Footer.tsx            # Footer with copyright
│   ├── Filters.tsx           # Date range and status filters
│   ├── TimesheetsTable.tsx   # Main table component
│   └── index.ts              # Barrel export
├── ui/
│   ├── Select.tsx            # Reusable dropdown component
│   ├── StatusBadge.tsx       # Status badge with color coding
│   ├── Pagination.tsx        # Pagination with page numbers
│   └── index.ts              # Barrel export
└── auth/
    ├── LoginForm.tsx         # Login form
    ├── BrandPanel.tsx        # Branding panel
    ├── Input.tsx             # Form input
    ├── Button.tsx            # Form button
    ├── Checkbox.tsx          # Checkbox component
    └── index.ts              # Barrel export

lib/
└── timesheets.ts             # Utility functions for data management
```

## Responsive Design

### Mobile (< 640px)
- Stacked filters
- Horizontal scrolling table
- Stacked pagination controls
- Hidden brand panel on login

### Tablet (640px - 1024px)
- Side-by-side filters
- Full table visibility
- Inline pagination

### Desktop (> 1024px)
- Full layout with all features
- Split-screen login with brand panel
- Optimized spacing and typography

## Routes

- `/` - Redirects to `/login`
- `/login` - Login page
- `/timesheets` - Timesheets dashboard

## Components

### Modular & Reusable
All components follow the DRY (Don't Repeat Yourself) principle:
- Fully typed with TypeScript
- Reusable across the application
- Single responsibility
- Properly styled with Tailwind CSS

### Key Components

#### Header
- Logo and navigation
- User dropdown menu
- Responsive design

#### TimesheetsTable
- Sortable columns
- Status badges
- Dynamic action buttons
- Hover effects

#### Pagination
- Page number navigation
- Items per page selector
- Ellipsis for large page counts
- Previous/Next buttons

#### Filters
- Date range selector
- Status filter
- Responsive layout

#### StatusBadge
- Color-coded statuses
- Uppercase text
- Border styling

## Usage

Navigate to `/timesheets` to view the dashboard. The page includes:
1. Header with user menu
2. Page title and filters
3. Timesheets table with data
4. Pagination controls
5. Footer

## Development

The dev server is already running. Navigate to:
- http://localhost:3000/timesheets

All components are modular and can be easily extended or modified.
