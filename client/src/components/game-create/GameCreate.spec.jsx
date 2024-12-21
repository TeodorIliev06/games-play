import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useNavigate } from 'react-router-dom';
import GameCreate from './GameCreate';

vi.mock('react-router-dom', () => ({
    useNavigate: vi.fn()
}));

vi.mock('../contexts/FormValidationContext', () => ({
    useFormValidationContext: vi.fn(() => ({
        title: { required: true, minLength: 3 },
        category: { required: true },
        maxLevel: { required: true, minLength: 1 },
        imageUrl: { required: false },
        summary: { required: true, minLength: 5 },
    })),
}));


vi.mock('../../hooks/useGames', () => ({
    useCreateGame: vi.fn(() => vi.fn().mockResolvedValue({ _id: 'game123' }))
}));

vi.mock('../../hooks/useForm', () => ({
    useForm: vi.fn(() => ({
        values: {
            title: '',
            category: '',
            maxLevel: '',
            imageUrl: '',
            summary: ''
        },
        changeHandler: vi.fn(),
        submitHandler: vi.fn(),
        errors: {}
    }))
}));

describe('GameCreate', () => {
    const mockNavigate = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
        useNavigate.mockReturnValue(mockNavigate);
    });

    describe('Component rendering', () => {
        it('Should render GameCreate form with all required fields', () => {
            render(<GameCreate />);

            expect(screen.getByRole('heading', { name: /create game/i })).toBeInTheDocument();

            expect(screen.getByLabelText(/legendary title/i)).toBeInTheDocument();
            expect(screen.getByLabelText(/category/i)).toBeInTheDocument();
            expect(screen.getByLabelText(/max level/i)).toBeInTheDocument();
            expect(screen.getByLabelText(/image/i)).toBeInTheDocument();
            expect(screen.getByLabelText(/summary/i)).toBeInTheDocument();

            expect(screen.getByRole('button', { name: /create game/i })).toBeInTheDocument();
        });

        it('Should render input fields with correct attributes', () => {
            render(<GameCreate />);

            expect(screen.getByPlaceholderText('Enter game title...')).toHaveAttribute('type', 'text');
            expect(screen.getByPlaceholderText('Enter game category...')).toHaveAttribute('type', 'text');
            expect(screen.getByPlaceholderText('1')).toHaveAttribute('type', 'number');
            expect(screen.getByPlaceholderText('Upload a photo...')).toHaveAttribute('type', 'text');
        });
    });
});
