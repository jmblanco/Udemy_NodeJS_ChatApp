var env = process.env.NODE_ENV || 'development';

console.log('*** Config for env:', env);

if (env === 'development' || env === 'test'){
    const config = require('./config.json');
    var envConfig = config[env];

    Object.keys(envConfig).forEach((envKey) => {
        process.env[envKey] = envConfig[envKey];
        console.log(`*** ${envKey}: ${envConfig[envKey]}`);
    });
}