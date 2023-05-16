import mongoose from 'mongoose';

export const estateStatus = [
    {
        id: mongoose.Types.ObjectId(),
        name: 'Available'
    },
    {
        id: mongoose.Types.ObjectId(),
        name: 'Sold'
    },
    {
        id: mongoose.Types.ObjectId(),
        name: 'Dealing'
    }
];

export const estateTypes = [
    {
        id: mongoose.Types.ObjectId(),
        name: 'House'
    },
    {
        id: mongoose.Types.ObjectId(),
        name: 'Apartment'
    },
    {
        id: mongoose.Types.ObjectId(),
        name: 'Building'
    }
];

export const orderStatus = [
    {
        id: mongoose.Types.ObjectId(),
        name: 'Pending',
        estates: []
    },
    {
        id: mongoose.Types.ObjectId(),
        name: 'Confirmed',
        estates: []
    },
    {
        id: mongoose.Types.ObjectId(),
        name: 'Done',
        estates: []
    }
];

export const roles = [
    {
        id: mongoose.Types.ObjectId(),
        name: 'ADMIN'
    },
    {
        id: mongoose.Types.ObjectId(),
        name: 'SALER & BUYER'
    }
];
