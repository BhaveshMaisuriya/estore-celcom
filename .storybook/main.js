const path = require('path');
module.exports = {
  stories: ['../src/**/*.stories.ts'],
  addons: [
    '@storybook/addon-actions', 
    '@storybook/addon-links', 
    '@storybook/addon-knobs',
    '@storybook/addon-docs/angular',
    '@storybook/addon-essentials'
  ],
  webpackFinal: async (config, { configType }) => {
    // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
    // You can change the configuration based on that.
    // 'PRODUCTION' is used when building the static version of storybook.

    // Make whatever fine-grained changes you need
    config.module.rules.push(
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
        include: path.resolve(__dirname, '../src/assets/'),
      },
      {
        test: /styles\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
        include: path.resolve(__dirname, '../app/'),
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader',
        ],
        include: path.resolve(__dirname, '../src/assets/'),
      },
    );

    // Return the altered config
    return config;
  },
};
