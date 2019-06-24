const controller = require("./.././controllers/controller");
const jwAuth = require("./.././middleware/jwtAuth");

module.exports = ({ router }) => {
    router
        .post('/newUser', controller.newUser)
        .post('/login', controller.login)

        .get('/venue', jwAuth, controller.readAllVenues)
        .post('/venue', controller.addNewVenue)
        .delete('/venue/:_id', jwAuth, controller.deleteVenue)
        .get('/venue/:_id', jwAuth, controller.readVenue)
        .put('/venue/:_id', jwAuth, controller.updateVenue)

        .get('/company', jwAuth, controller.readAllCompanies)
        .post('/company', jwAuth, controller.addNewCompany)
        .delete('/company/:_id', jwAuth, controller.deleteCompany)
        .get('/company/:_id', jwAuth, controller.readCompany)
        .put('/company/:_id', jwAuth, controller.updateCompany);
};
