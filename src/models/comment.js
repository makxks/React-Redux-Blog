module.exports = function(sequelize, DataTypes) {
	return sequelize.define('comment', {
		content: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [1, 250],
				isString: function (value) {
                    if (typeof value !== 'string') {
                        throw new Error('Description must be a string');
                    }
                }
			}
		},
        user:
	});
};