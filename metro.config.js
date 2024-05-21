const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Puedes personalizar la configuración de Metro aquí. Por ejemplo:
// config.resolver.assetExts.push('svg');
// config.transformer.getTransformOptions = async () => ({
//   transform: {
//     experimentalImportSupport: false,
//     inlineRequires: false,
//   },
// });

module.exports = config;
