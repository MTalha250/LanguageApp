const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
    resolver: {
        assetExts: ['db', 'mp3', 'ttf', 'png', 'jpg', 'jpeg', 'gif', 'webp', 'bmp', 'tiff', 'svg'],
    },

};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);