import lodash from 'lodash';
async function seedingValue(model, data) {
    const existance = await model
        .find({
            name: { $in: data.map(element => element.name || element.email) }
        })
        .exec();

    const missingValue = lodash.differenceBy(data, existance, 'name');
    await model.create(missingValue);
}

export default seedingValue;
