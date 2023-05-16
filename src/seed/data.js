import mongoose from 'mongoose';

export const estateStatus = [
    {
        id: mongoose.Types.ObjectId(),
        name: 'Đang mở bán'
    },
    {
        id: mongoose.Types.ObjectId(),
        name: 'Đang trao đổi'
    },
    {
        id: mongoose.Types.ObjectId(),
        name: 'Đã Bán'
    }
];

export const estateTypes = [
    {
        id: mongoose.Types.ObjectId(),
        name: 'Nhà riêng'
    },
    {
        id: mongoose.Types.ObjectId(),
        name: 'Căn hộ'
    },
    {
        id: mongoose.Types.ObjectId(),
        name: 'Tòa nhà'
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
