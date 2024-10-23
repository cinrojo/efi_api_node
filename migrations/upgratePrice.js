

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up(queryInterface, Sequelize) {
        return Promise.all([
            queryInterface.removeColumn(
                'Packages', // table name
                'precio', // new field name
               
            ),
            
         
        ]);
    },
    
};