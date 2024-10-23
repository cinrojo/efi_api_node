
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up(queryInterface, Sequelize) {
        return Promise.all([
            queryInterface.addColumn(
                'Packages', // table name
                'start_date', // new field name
                {
                    type: Sequelize.DATE,
                    allowNull: false,
                },
            ),
            queryInterface.addColumn(
                'Packages', // table name
                'end_date', // new field name
                {
                    type: Sequelize.DATE,
                    allowNull: false,
                },
            ),
         
        ]);
    },
    down(queryInterface, Sequelize) {
        // logic for reverting the changes
        return Promise.all([
            queryInterface.removeColumn('Packages', 'start_date'), 
            queryInterface.removeColumn('Packages', 'end_date'),
        ]);
    },
};