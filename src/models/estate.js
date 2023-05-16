import mongoose from 'mongoose';

const { Schema } = mongoose;

const estateSchema = new mongoose.Schema(
    {
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'Users',
            required: [true, 'Owner is required']
        },
        name: {
            type: String,
            required: [true, 'Name is required']
        },
        address: {
            type: String
        },
        area: {
            type: Number,
            require: [true, 'Area is required']
        },
        neighborHood: {
            type: String
        },
        price: {
            type: Number,
            required: [true, 'Price is required']
        },
        type: {
            type: Schema.Types.ObjectId,
            required: [true, 'This estate must have type'],
            ref: 'EstateTypes'
        },
        currentStatus: {
            type: Schema.Types.ObjectId,
            required: [true, 'This esate must have status'],
            ref: 'EstateStatuses'
        },
        coverImg: {
            type: String,
            required: [true, 'Cover image is required']
        },
        thumbnail: {
            type: [String]
        },
        bedRoom: {
            type: Number
        },
        bathRoom: {
            type: Number
        },
        description: {
            type: String
        },
        location: {
            type: {
                type: String,
                enum: ['Point'],
                default: 'Point',
                required: true
            },
            coordinates: {
                type: [Number],
                default: [107.9133182, 16.0720759],
                validate: {
                    validator: function (coordinates) {
                        return (
                            coordinates.length === 2 &&
                            coordinates[0] >= -180 &&
                            coordinates[0] <= 180 &&
                            coordinates[1] >= -90 &&
                            coordinates[1] <= 90
                        );
                    },
                    message: 'Invalid coordinates'
                }
            }
        }
    },
    {
        timestamps: true
    }
);
estateSchema.pre(/^find/, function (next) {
    this.populate({
        path: 'type',
        select: 'name _id'
    })
        .populate({
            path: 'currentStatus',
            select: 'name _id'
        })
        .populate({
            path: 'owner'
        });
    next();
});

estateSchema.index({ location: '2dsphere' });
estateSchema.statics.findNearest = function (coordinates, maxDistance) {
    return this.find({
        location: {
            $near: {
                $geometry: {
                    type: 'Point',
                    coordinates: coordinates
                },
                $maxDistance: maxDistance
            }
        }
    });
};

const EstateModel = mongoose.model('Estates', estateSchema);
export default EstateModel;
