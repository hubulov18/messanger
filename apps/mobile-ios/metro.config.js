const path = require('path');
const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const { resolve: metroResolve } = require('metro-resolver');

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, '../..');

const config = {
  watchFolders: [workspaceRoot],
  resolver: {
    resolveRequest: (context, moduleName, platform) => {
      if (moduleName === 'event-target-shim/index') {
        return {
          type: 'sourceFile',
          filePath: path.resolve(
            workspaceRoot,
            'node_modules/react-native-webrtc/node_modules/event-target-shim/index.js',
          ),
        };
      }

      return metroResolve(context, moduleName, platform);
    },
    nodeModulesPaths: [
      path.resolve(projectRoot, 'node_modules'),
      path.resolve(workspaceRoot, 'node_modules'),
    ],
    extraNodeModules: {
      '@app': path.resolve(projectRoot, 'src/app'),
      '@features': path.resolve(projectRoot, 'src/features'),
      '@shared': path.resolve(projectRoot, 'src/shared'),
      '@telegram/ui': path.resolve(workspaceRoot, 'packages/ui/src'),
      'event-target-shim/index': path.resolve(
        workspaceRoot,
        'node_modules/react-native-webrtc/node_modules/event-target-shim/index.js',
      ),
    },
  },
};

module.exports = mergeConfig(getDefaultConfig(projectRoot), config);
