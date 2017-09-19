export default {
  entry : "src/index.js" ,
  disableCSSModules : true ,
  publicPath : "/" ,
  theme : "./theme.config.js" ,
  autoprefixer : {
    browsers : [
      "iOS >= 8" ,
      "Android >= 4"
    ]
  } ,
  proxy : { } ,
  // style 必须是 true
  extraBabelPlugins : [
    "transform-runtime" ,
    [
      "import" ,
      { libraryName : "antd" , "libraryDirectory" : "lib" , "style" : true }
    ]
  ] ,
  env : {
    development : {
      extraBabelPlugins : [
        "dva-hmr"
      ]
    }
  }
};