module.exports = {
    webpack: (config, { isServer }) => {
      // ...
      config.module.rules.push({
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      });
      // ...
      return config;
    }
  };