'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    checkPassword = password => bcrypt.compareSync(password, this.password);
    generateToken = () => {
      const payload = {
        id: this.id,
        username: this.username
      }
      const rahasia = 'Ini rahasia ga boleh disebar-sebar';
      return jwt.sign(payload, rahasia);
    };
    static authenticate = async ({ username, password }) => {
      try {
        const user = await this.findOne({ where: { username } });
        if (!user) return Promise.reject("User not found");
        const isPasswordValid = user.checkPassword(password);
        if (!isPasswordValid) return Promise.reject("wrong password");
        return Promise.resolve(user);
      } catch (error) {
        return Promise.reject(error);
      }
    }
  }
  User.init({
    email: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};