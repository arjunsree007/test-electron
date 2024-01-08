module.exports = {
  publishers: [
    {
      name: '@electron-forge/publisher-github',
      config: {
        authToken: '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',
        repository: {
          owner: 'arjunsree007',
          name: 'test-electron'
        },
        prerelease: false,
        draft: false
      }
    }
  ],
  packagerConfig: {
    asar: true,
  },
  rebuildConfig: {},
  makers: [
    {
      name: "@electron-forge/maker-squirrel",
      config: {
        authors: "Arjun",
        description: "An example github build Electron app",
      }
    },
    {
      name: "@electron-forge/maker-zip",
      platforms: ["darwin"],
    },
    {
      name: "@electron-forge/maker-deb",
      config: {},
    },
    {
      name: "@electron-forge/maker-rpm",
      config: {},
    },
  ],
  plugins: [
    {
      name: "@electron-forge/plugin-auto-unpack-natives",
      config: {},
    },
  ],
};
