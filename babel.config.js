module.exports = function(api) {
  api.cache(true);
  
  return {
    presets: ['babel-preset-expo','babel-preset-react-app'],

    plugins: [
      [
        "babel-plugin-root-import",
        {
          "rootPathPrefix": "~",
          "rootPathSuffix": "src"
        }
      ],
      [
        "transform-imports",
        {
          "@material-ui/core": {
            "transform": "@material-ui/core/${member}",
            "preventFullImport": true
          },
          "@material-ui/icons": {
            "transform": "@material-ui/icons/${member}",
            "preventFullImport": true
          },
          "lodash": {
            "transform": "lodash/${member}",
            "preventFullImport": true
          }
        }
      ]
    ]
  };
};
