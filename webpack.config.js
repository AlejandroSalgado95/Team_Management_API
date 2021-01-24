var path = require('path');

module.exports = {
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
	devtool:'eval-cheap-module-source-map'
}