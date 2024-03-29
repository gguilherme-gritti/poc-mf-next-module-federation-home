/** @type {import('next').NextConfig} */
const NextFederationPlugin = require("@module-federation/nextjs-mf");

module.exports = {
  webpack(config, options) {
    const { webpack } = options;
    Object.assign(config.experiments, { topLevelAwait: true });
    if (!options.isServer) {
      //config.cache=false
      config.plugins.push(
        new NextFederationPlugin({
          name: "home",
          filename: "static/chunks/remoteEntry.js",
          remotes: {
            cart: `cart@http://localhost:3004/_next/static/chunks/remoteEntry.js`,
          },
          exposes: {
            "./screen/Home": "./src/screen/Home.tsx",
          },
          shared: {},
        })
      );
    }

    return config;
  },
};
