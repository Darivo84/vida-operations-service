module.exports.up = (queryInterface, DataTypes) =>
  queryInterface.createTable(
    'appointments',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER.UNSIGNED,
      },
      identifier: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      client: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      carer: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      startDate: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      endDate: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      checkInDate: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      checkOutDate: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      notesPublic: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      notesPrivate: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      cancelled: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
      cancellationReason: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      deletedAt: {
        allowNull: true,
        type: DataTypes.DATE,
      },
    },
    {
      charset: 'utf8',
    }
  );

module.exports.down = queryInterface =>
  queryInterface.dropTable('appointments');
