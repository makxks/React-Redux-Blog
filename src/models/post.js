module.exports = function(sequelize, DataTypes) {
	return sequelize.define('post', {
		title: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [1, 250],
				isString: function (value) {
                    if (typeof value !== 'string') {
                        throw new Error('Title must be a string');
                    }
                }
			}
		},
        categories:,
        content:,
        timePosted:,
        id:,
        user:
	});
};