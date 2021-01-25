var path = require('path');

module.exports = (env) => {
  const isProduction = env? env.production : undefined;


  return {
	entry: './react_src/app.js',
	output:{
		path: path.join(__dirname, 'public'),
		filename:'bundle.js'
	},
	module:{
		rules:[{
			loader: 'babel-loader',
			test:/\.js$/,
			exclude:/node_modules/
		},{
			test:/\.scss$/,
			use: [
			'style-loader',
			'css-loader',
			'sass-loader'
			]
		},{
            test: /\.css$/,
            use: [
            'style-loader',
            'css-loader'
            ]
          }
        ]	
	},
    devtool: isProduction ? 'source-map' : 'inline-source-map',
 };
};