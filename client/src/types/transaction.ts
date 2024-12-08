export interface Transaction {
    _id: string;
    fromUser: {
        _id: string;
        name: string;
    };
    toUser: {
        _id: string;
        name: string;
    };
    points: number;
    reward: {
        _id: string;
        title: string;
        points: number;
        code: string;
        description?: string;
    };
    type: 'redemption';
    createdAt: string;
} 