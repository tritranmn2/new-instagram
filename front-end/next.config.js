/** @type {import('next').NextConfig} */
module.exports = {
    webpack: (config, { isServer }) => {
        if (!isServer) {
            config.resolve.modules.push(__dirname);
        }
        return config;
    },
};
