'use strict';
const { Users } = require('../models'); // Make sure to import the user model correctly

/**
 * Service for performing CRUD operations on the users table.
 * @class
 */
class UsersService {
  /**
   * Creates a new user.
   * @param {string} username - The username of the new user.
   * @param {string} password - The password of the new user.
   * @returns {Promise<Object>} - The created user.
   */
  static async createUser(username, password) {
    try {
      const newUser = await Users.create({ username, password });
      return newUser;
    } catch (error) {
      throw new Error('Error creating user');
    }
  }


  /**
   * Finds a user by their username.
   * @param {string} username - The username of the user to find.
   * @returns {Promise<Object|null>} - The user object if found, or null if not found.
   */
  static async getUserByUsername(username) {
    try {
      const user = await Users.findOne({ where: { username } });
      return user;
    } catch (error) {
      console.log(error)
      throw new Error('Error getting user by username');
    }
  }

  /**
   * Gets all users.
   * @returns {Promise<Array>} - An array with all users.
   */
  static async getAllUsers() {
    try {
      const allUsers = await Users.findAll();
      return allUsers;
    } catch (error) {
      throw new Error('Error getting users');
    }
  }

  /**
   * Gets a user by their ID.
   * @param {number} userId - The ID of the user to retrieve.
   * @returns {Promise<Object|null>} - The user object, or null if not found.
   */
  static async getUserById(userId) {
    try {
      const user = await Users.findByPk(userId);
      return user;
    } catch (error) {
      throw new Error('Error getting user by ID');
    }
  }

  /**
   * Updates a user's username and/or password.
   * @param {number} userId - The ID of the user to update.
   * @param {string} newUsername - The new username for the user.
   * @param {string} newPassword - The new password for the user.
   * @returns {Promise<boolean>} - True if the user was updated successfully, false otherwise.
   */
  static async updateUser(userId, newUsername, newPassword) {
    try {
      const user = await Users.findByPk(userId);
      if (!user) {
        throw new Error('User not found');
      }
      user.username = newUsername;
      user.password = newPassword;
      await user.save();
      return true;
    } catch (error) {
      throw new Error('Error updating user');
    }
  }

  /**
   * Deletes a user by their ID.
   * @param {number} userId - The ID of the user to delete.
   * @returns {Promise<boolean>} - True if the user was deleted successfully, false otherwise.
   */
  static async deleteUser(userId) {
    try {
      const user = await Users.findByPk(userId);
      if (!user) {
        throw new Error('User not found');
      }
      await user.destroy();
      return true;
    } catch (error) {
      throw new Error('Error deleting user');
    }
  }
}

module.exports = UsersService;
