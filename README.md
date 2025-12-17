# Timesheet Management Application

A modern, responsive timesheet management application built with Next.js 16 and Tailwind CSS.

## 🚀 Setup Instructions

1.  **Clone the repository**
    ```bash
    git clone <repository-url>
    cd <project-directory>
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Run the development server**
    ```bash
    npm run dev
    ```

4.  **Open the application**
    Visit [http://localhost:3000](http://localhost:3000) in your browser.

## 🛠 Frameworks & Libraries Used

*   **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
*   **Language:** [TypeScript](https://www.typescriptlang.org/)
*   **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
*   **Authentication:** [NextAuth.js](https://next-auth.js.org/)
*   **Icons:** [Lucide React](https://lucide.dev/)
*   **Date Handling:** [date-fns](https://date-fns.org/)
*   **Notifications:** [react-hot-toast](https://react-hot-toast.com/)

## 📝 Assumptions & Notes

*   **Data Persistence:** This application uses **mock in-memory data** (`lib/db/`) to simulate a database.
    *   Data changes (adding/editing tasks) are persisted in memory while the server is running.
    *   A global caching mechanism is implemented to prevent data loss during development hot-reloads.
    *   *Note: A real database (PostgreSQL/MongoDB) would be connected in a production environment.*
*   **Authentication:**
    *   Mock authentication is implemented using NextAuth.js Credentials provider.
    *   **Test Credentials:**
        *   Email: `john.doe@example.com`
        *   Password: `password123`
*   **State Management:**
    *   Filtering and pagination states are synchronized with the URL query parameters (`?page=1&status=completed`), allowing for shareable links and proper browser history navigation.
*   **Responsiveness:**
    *   The application is fully responsive, with specific optimizations for mobile and tablet views (e.g., stacking task details vertically on smaller screens).

## wm Time Spent

**Approx. 6-7 Hours**

*   Initial setup and configuration.
*   Implementation of Dashboard and Timesheet Detail views.
*   Development of custom UI components (Modals, Dropdowns with custom styling).
*   Integration of URL-based filtering and pagination.
*   Refactoring for responsive design and bug fixes.
