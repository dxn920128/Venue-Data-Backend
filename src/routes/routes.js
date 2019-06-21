const controller = require("./.././controllers/controller");
const jwAuth = require("./.././middleware/jwtAuth");

module.exports = ({ router }) => {
    router.post('/newUser', controller.newUser)
        .post('/login', controller.login)

        .post('/addNewVenue', jwAuth, controller.addNewVenue)
        .delete('/deleteVenue', jwAuth, controller.deleteVenue)
        .post('/updateVenue', jwAuth, controller.updateVenue)
        .get('/readVenue', jwAuth, controller.readVenue)

        .post('/addNewCompany', jwAuth, controller.addNewCompany)
        .delete('/deleteCompany', jwAuth, controller.deleteCompany)
        .post('/updateCompany', jwAuth, controller.updateCompany)
        .get('/readCompany', jwAuth, controller.readCompany)
};
