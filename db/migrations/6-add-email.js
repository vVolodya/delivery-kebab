/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Users', 'email', Sequelize.TEXT);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Users', 'email');
  },
};
