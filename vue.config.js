const path = require("path");
const resolve = function(dir) {
  return path.join(__dirname, dir);
};

const webpack=require('webpack')
module.exports={
    publicPath: process.env.NODE_ENV === "production" ? "/main" : "./",
	 outputDir:'main',
	productionSourceMap: false,  //在编译时不生成.map文件
	devServer:{
		proxy:{
			'/Handler':{
				target:'http://192.168.1.5',
				changeOrigin:true,
				pathRewrite:{
					'^/Handler':''
				}
			}
		}
	},
	configureWebpack: (config)=>{
	    if(process.env.NODE_ENV === 'production'){
	      config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
	    }
	  }
}

plugins: [
    new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery"
    })
 ]