const controller = require("./.././controllers/controller");

module.exports = ({ router }) => {
    router.post('/newUser', controller.newUser)
        .post('/login', controller.login)

        .post('/addNewVenue', controller.addNewVenue)
        .delete('/deleteVenue', controller.deleteVenue)
        .post('/updateVenue', controller.updateVenue)
        .get('/showVenue', controller.showVenue)

        .post('/addNewCompany', controller.addNewCompany)
        .delete('/deleteCompany', controller.deleteCompany)
        .post('/updateCompany', controller.updateCompany)
        .get('/showCompany', controller.showCompany)
};
