const path = require('path');
module.exports = {
  // Metro Bundler can't find the peerDependencies of react-native-svg from it's files
  // when it's symlinked.
  extraNodeModules: {
    react: path.resolve(__dirname, 'node_modules/react'),
    "react-native": path.resolve(__dirname, 'node_modules/react-native'),
    "prop-types": path.resolve(__dirname, 'node_modules/prop-types'),
  },
};
