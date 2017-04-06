module.exports = function(sequelize, DataTypes) {
	return sequelize.define('todo', {
		username: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [1, 250],
				isString: function (value) {
                    if (typeof value !== 'string') {
                        throw new Error('Username must be a string');
                    }
                }
			}
		}
	});
};