
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up(queryInterface, Sequelize) {
        return Promise.all([
             queryInterface.removeColumn('Packages', 'fecha_inicio') ,
             queryInterface.removeColumn('Packages', 'fecha_fin') ,
        ]);
    },
};