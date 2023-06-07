import { PythonShell } from 'python-shell';
import { EstateModel } from '../models/index.js';
import wishesListModel from '../models/wishesList.js';

const resultCbCache = {};

const hybrid_estatesRecommendation = async ({
    itemNames = [],
    userId = '',
    topRecommendations = 0
}) => {
    const cacheKey = JSON.stringify(itemNames);

    if (cacheKey in resultCbCache) {
        const cachedResults = resultCbCache[cacheKey];
        return [cachedResults, cachedResults.length];
    }
    const estate = await EstateModel.find();
    const wishesList = await wishesListModel.find();

    const wishes_user_list =
        wishesList.length > 0
            ? wishesList?.map(item => {
                  return {
                      user_id: item?.user,
                      estateId: item?.estate?._id,
                      like: 'true'
                  };
              })
            : [];

    // Set up the PythonShell options
    const options = {
        mode: 'text',
        pythonOptions: ['-u'],
        scriptPath: 'src/estateRecommend',
        args: [
            //Collaborative filter
            JSON.stringify(wishes_user_list),
            userId,
            topRecommendations,
            //content-based
            JSON.stringify(estate),
            JSON.stringify(itemNames)
        ]
    };

    // Execute the Python script
    const pythonShell = new PythonShell('content-based-rs.py', options);
    const results = await new Promise((resolve, reject) => {
        pythonShell.on('message', message => {
            resolve(message);
        });
        pythonShell.on('error', err => {
            reject(err);
        });
        pythonShell.end(err => {
            if (err) {
                // Handle PythonShell termination error
                console.error('PythonShell terminated with error:', err);
            } else {
                // Script execution completed successfully
                console.log('PythonShell execution completed.');
            }
        });
    });

    const recommendations = JSON.parse(results);
    const recommendations_results =
        recommendations.length > 0 ? recommendations : estate;

    resultCbCache[cacheKey] = recommendations_results;
    return [recommendations_results, recommendations_results.length];
};

export { hybrid_estatesRecommendation };
