var Sequelize = require('sequelize');
var env = process.env.NODE_ENV || 'development';
var sequelize;

if(env == 'production'){
	sequelize = new Sequelize(process.env.DATABASE_URL,{
		dialect:'postgres'
	})
} else {
	sequelize = new Sequelize(undefined, undefined, undefined, {
		'dialect':'sqlite',
		'storage':__dirname + '/data/dev_blog.sqlite'
	});
}

var db = {};

db.blog = sequelize.import(__dirname + '/models/blog.js');
db.user = sequelize.import(__dirname + '/models/user.js');
db.post = sequelize.import(__dirname + '/models/post.js');
db.comment = sequelize.import(__dirname + '/models/comment.js');
db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.post.belongsTo(db.blog);
db.post.belongsTo(db.user);
db.comment.belongsTo(db.user);
db.comment.belongsTo(db.post);
db.blog.hasMany(db.post);
db.user.hasMany(db.post);
db.user.hasMany(db.comment);
db.post.hasMany(db.comment);

module.exports = db;