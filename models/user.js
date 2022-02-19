module.exports = (sequelize, DataTypes) => {
    return sequelize.define("User", {
        id: {
            type: DataTypes.STRING(30),
            allowNull: false,
            unique: true,
            primaryKey: true,
        },
        password: {
            type: DataTypes.STRING(100),
            allowNull: false,
        }
    }, {
        sequelize,
        timestamps:false,
        underscored:false,
        modelName: 'User',
        tableName: 'User',
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
    })
}