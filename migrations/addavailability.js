
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up(queryInterface, Sequelize) {
        return Promise.all([
            queryInterface.addColumn(
                'Packages', // table name
                'availability', // new field name
                {
                    type: Sequelize.BOOLEAN,
                    allowNull: false,
                },
            ),
            
         
        ]);
    },
    down(queryInterface, Sequelize) {
        // logic for reverting the changes
        return Promise.all([
            queryInterface.removeColumn('Packages', 'availability'), 
            
        ]);
    },
};