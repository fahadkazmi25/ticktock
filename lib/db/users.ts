export interface User {
    id: string;
    email: string;
    password: string; // In real app, this would be hashed
    name: string;
    createdAt: string;
}

// Mock users database
// Password: "password123" for all users (in production, use bcrypt)
export const users: User[] = [
    {
        id: '1',
        email: 'john.doe@example.com',
        password: '$2b$10$1nXuET/OuJ1KfDpj1EBRx.oLn6hIIO8Lugzx9.4iPejJ1hKMhNok6', // password123
        name: 'John Doe',
        createdAt: '2024-01-01T00:00:00Z',
    },
    {
        id: '2',
        email: 'jane.smith@example.com',
        password: '$2b$10$1nXuET/OuJ1KfDpj1EBRx.oLn6hIIO8Lugzx9.4iPejJ1hKMhNok6', // password123
        name: 'Jane Smith',
        createdAt: '2024-01-01T00:00:00Z',
    },
    {
        id: '3',
        email: 'test@test.com',
        password: '$2b$10$1nXuET/OuJ1KfDpj1EBRx.oLn6hIIO8Lugzx9.4iPejJ1hKMhNok6', // password123
        name: 'Test User',
        createdAt: '2024-01-01T00:00:00Z',
    },
];

export const findUserByEmail = (email: string): User | undefined => {
    return users.find(user => user.email.toLowerCase() === email.toLowerCase());
};

export const findUserById = (id: string): User | undefined => {
    return users.find(user => user.id === id);
};
