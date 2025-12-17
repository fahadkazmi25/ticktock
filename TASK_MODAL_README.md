# Task Modal Component

## Overview
A comprehensive Add/Edit task modal built with React Portal for managing timesheet entries.

## Features

### Modal Implementation
- **React Portal**: Uses `createPortal` to render outside the DOM hierarchy
- **Z-Index**: `z-[9999]` ensures it appears above all content
- **Backdrop**: Black overlay with 40% opacity and blur effect
- **Click Outside**: Closes modal when clicking backdrop
- **Escape Key**: Can be enhanced to close on ESC key

### Form Fields

#### 1. **Select Project** (Required)
- Dropdown select with project options
- Red asterisk indicates required field
- Info icon for additional context
- Placeholder: "Project Name"

#### 2. **Type of Work** (Required)
- Dropdown select with work type options
- Options: Bug fixes, Feature Development, Code Review, Testing, Documentation
- Default: "Bug fixes"

#### 3. **Task Description** (Required)
- Multi-line textarea (5 rows)
- Placeholder: "Write text here ..."
- Helper text: "A note for extra info"
- Resize disabled for consistent UI

#### 4. **Hours** (Required)
- Number input with increment/decrement buttons
- Minus button: Decreases hours (min: 0)
- Plus button: Increases hours
- Direct input allowed
- Centered display

### Action Buttons

#### Primary Button (Blue)
- **Add Mode**: "Add entry"
- **Edit Mode**: "Save changes"
- Full width (flex-1)
- Blue background (#2563EB)

#### Secondary Button (White)
- Text: "Cancel"
- Full width (flex-1)
- White background with border
- Closes modal without saving

## Usage

### Adding a Task
```tsx
const [isModalOpen, setIsModalOpen] = useState(false);
const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');

const handleAddTask = (date: string) => {
  setSelectedDate(date);
  setModalMode('add');
  setIsModalOpen(true);
};

<TaskModal
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
  onSave={handleSaveTask}
  initialData={null}
  mode="add"
/>
```

### Editing a Task
```tsx
const handleEditTask = (task: Task) => {
  setModalMode('edit');
  setEditingTask(task);
  setIsModalOpen(true);
};

<TaskModal
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
  onSave={handleSaveTask}
  initialData={getInitialFormData()}
  mode="edit"
/>
```

## Props Interface

```typescript
interface TaskModalProps {
  isOpen: boolean;              // Controls modal visibility
  onClose: () => void;          // Called when modal closes
  onSave: (task: TaskFormData) => void;  // Called on form submit
  initialData?: TaskFormData | null;     // Pre-fill data for edit mode
  mode: 'add' | 'edit';        // Determines modal title and button text
}

interface TaskFormData {
  id?: string;
  projectId: string;
  projectName: string;
  workType: string;
  description: string;
  hours: number;
  date?: string;
}
```

## State Management

### Internal State
```tsx
const [formData, setFormData] = useState<TaskFormData>({
  projectId: '',
  projectName: '',
  workType: '',
  description: '',
  hours: 0,
});
```

### Form Handlers
- `handleSubmit`: Validates and submits form
- `incrementHours`: Increases hours by 1
- `decrementHours`: Decreases hours by 1 (min: 0)
- `handleHoursChange`: Direct input handler

## Styling Details

### Modal Container
```css
- Position: fixed inset-0
- Display: flex items-center justify-center
- Z-Index: 9999
- Background: black/40 with backdrop-blur-sm
- Padding: px-4 (responsive)
```

### Modal Content
```css
- Background: white
- Border Radius: rounded-lg
- Shadow: shadow-xl
- Max Width: max-w-lg
- Full width on mobile
```

### Form Elements
```css
- Labels: text-sm font-medium text-gray-900
- Inputs: border border-gray-300 rounded-lg
- Focus: ring-2 ring-blue-500
- Required: Red asterisk (*)
```

### Buttons
```css
- Primary: bg-blue-600 hover:bg-blue-700
- Secondary: bg-white border border-gray-300
- Height: py-2.5
- Rounded: rounded-lg
```

## Validation

### Required Fields
- Select Project
- Type of Work
- Task Description
- Hours

### Constraints
- Hours must be >= 0
- All text fields must be non-empty
- Form won't submit until all required fields are filled

## Accessibility

### Keyboard Navigation
- Tab through form fields
- Enter to submit
- Can be enhanced with ESC to close

### ARIA Labels
- All form fields have proper labels
- Required fields marked with asterisk
- Info icons provide context

### Focus Management
- Auto-focus on first field (can be added)
- Focus trap within modal (can be enhanced)

## Integration Flow

```
User Action → Open Modal → Fill Form → Submit
    ↓
Add Task Button Clicked
    ↓
setModalMode('add')
setIsModalOpen(true)
    ↓
Modal Renders with Empty Form
    ↓
User Fills Form
    ↓
User Clicks "Add entry"
    ↓
handleSubmit → onSave(formData)
    ↓
Parent Component Updates State
    ↓
Modal Closes
    ↓
New Task Appears in List
```

## Best Practices Implemented

### 1. **Portal Usage**
- Renders outside parent DOM
- Prevents z-index conflicts
- Clean separation of concerns

### 2. **Controlled Components**
- All form fields controlled by state
- Single source of truth
- Predictable behavior

### 3. **Type Safety**
- Full TypeScript implementation
- Proper interfaces
- Type checking

### 4. **User Experience**
- Click outside to close
- Visual feedback on interactions
- Clear button labels
- Helper text

### 5. **Performance**
- Mounted state check
- Conditional rendering
- Event delegation

## Customization

### Adding New Fields
```tsx
// In TaskFormData interface
newField: string;

// In form
<input
  value={formData.newField}
  onChange={(e) => setFormData(prev => ({
    ...prev,
    newField: e.target.value
  }))}
/>
```

### Custom Validation
```tsx
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  
  // Custom validation
  if (formData.hours > 24) {
    alert('Hours cannot exceed 24');
    return;
  }
  
  onSave(formData);
  onClose();
};
```

## Responsive Design

### Mobile (< 640px)
- Full width modal
- Stacked buttons
- Touch-friendly inputs

### Desktop (> 640px)
- Max width 512px (max-w-lg)
- Side-by-side buttons
- Centered on screen

## Future Enhancements

1. **Date Picker**: Add date selection for tasks
2. **Project Search**: Autocomplete for project selection
3. **Time Picker**: More granular time entry (hours:minutes)
4. **Validation Messages**: Real-time field validation
5. **Keyboard Shortcuts**: ESC to close, CMD+Enter to submit
6. **Animation**: Smooth enter/exit transitions
7. **Auto-save**: Draft saving for incomplete forms

## Testing Checklist

- [ ] Modal opens on "Add new task" click
- [ ] Modal opens on "Edit" click
- [ ] Form pre-fills in edit mode
- [ ] All fields are required
- [ ] Hours increment/decrement works
- [ ] Direct hours input works
- [ ] Cancel button closes modal
- [ ] Click outside closes modal
- [ ] Submit adds new task
- [ ] Submit updates existing task
- [ ] Modal closes after submit
- [ ] Form resets after close

## Example Implementation

See `/app/timesheets/[id]/page.tsx` for complete integration example with state management and CRUD operations.
