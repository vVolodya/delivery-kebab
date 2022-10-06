/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.addIndex('Users', { fields: ['email'], name: 'uniqueEmail', unique: true });
  },

  async down(queryInterface) {
    await queryInterface.removeIndex('Users', 'uniqueEmail', {});
  },
};
