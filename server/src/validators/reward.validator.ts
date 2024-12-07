import { z } from 'zod';

export const rewardSchema = z.object({
    title: z.string().min(3, 'Title must be at least 3 characters'),
    description: z.string().min(10, 'Description must be at least 10 characters'),
    category: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid category ID'),
    points: z.number().min(0, 'Points must be positive'),
    code: z.string().min(4, 'Code must be at least 4 characters'),
    expiryDate: z.string().datetime('Invalid date format')
}); 