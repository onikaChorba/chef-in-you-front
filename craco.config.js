/* craco.config.js */
const path = require(`path`);

module.exports = {
  style: {
    sass: {
      loaderOptions: {
        implementation: require("sass"),
        sassOptions: {
          api: "modern-compiler",
        },
      },
    },
  },
};
