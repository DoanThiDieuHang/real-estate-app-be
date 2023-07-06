import { PythonShell } from 'python-shell';
import { EstateModel } from '../models/index.js';
import wishesListModel from '../models/wishesList.js';
import { execSync } from 'child_process';
import os from 'os';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

const resultCbCache = {};

const generatePayloadFile = payload => {
    const filePath = `/tmp/${uuidv4()}.json`;
    fs.writeFileSync(filePath, JSON.stringify(payload));
    return filePath;
};

const hybrid_estatesRecommendation = async ({
    itemNames = [],
    userId = ''
}) => {
    const cacheKey = JSON.stringify(itemNames);

    if (cacheKey in resultCbCache) {
        const cachedResults = resultCbCache[cacheKey];
        return [cachedResults, cachedResults.length];
    }
    const estate = await EstateModel.find();
    const topRecommendations = estate.length;
    const wishesList = await wishesListModel.find();

    const wishes_user_list =
        wishesList.length > 0
            ? wishesList?.map(item => {
                  if (item.estate != null)
                      return {
                          user_id: item?.user,
                          estateId: item?.estate?._id,
                          like: 'true'
                      };
              })
            : [];

    let pythonPath;

    try {
        const command =
            os.platform() === 'win32' ? 'where python' : 'which python3';
        const result = execSync(command).toString().trim();
        pythonPath = result || command;
    } catch (err) {
        console.error('Error locating Python executable:', err);
        process.exit(1);
    }
    console.log(
        '🚀 ~ file: estate_recommend.services.js:44 ~ pythonPath:',
        pythonPath
    );
    // Set up the PythonShell options
    const env = {
        // Collaborative filter
        WISHES_USER_LIST: JSON.stringify(wishes_user_list),
        USER_ID: userId,
        TOP_RECOMMENDATIONS: topRecommendations,
        // Content-based
        ESTATE_FILE_PATH: generatePayloadFile(estate),
        //ESTATE: JSON.stringify(estate),
        ITEM_NAMES: JSON.stringify(itemNames)
    };
    const options = {
        mode: 'text',
        pythonPath: '/usr/bin/python3',
        pythonOptions: ['-u'],
        scriptPath: 'src/estateRecommend',
        args: [],
        scriptArgs: [],
        env
    };

    // Execute the Python script
    const pythonShell = new PythonShell('content-based-rs.py', options);
    const results = await new Promise((resolve, reject) => {
        pythonShell.on('message', message => {
            resolve(message);
            console.log('message: ', message);
        });

        pythonShell.on('error', err => {
            reject(err);
            console.log('err: ', err);
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
