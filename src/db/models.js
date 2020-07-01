import { DataTypes, Model } from 'sequelize';

import sequelize from './connection';

export class Appointment extends Model { }
Appointment.init(
  {
    identifier: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    client: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    carer: {
      allowNull: true,
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
  },
  { sequelize, modelName: 'appointments' }
);
