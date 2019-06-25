const controller = require("./.././controllers/controller");
const jwtAuth = require("./.././middleware/jwtAuth");
const jwtLocal = require("./.././middleware/jwtLocal");

module.exports = ({router}) => {
    router
        .post('/signIn', controller.signIn)
        .post('/login', jwtLocal, controller.login)

        .get('/venue', jwtAuth, controller.readAllVenues)
        .post('/venue', jwtAuth, controller.addNewVenue)
        .delete('/venue/:_id', jwtAuth, controller.deleteVenue)
        .get('/venue/:_id', jwtAuth, controller.readVenue)
        .put('/venue/:_id', jwtAuth, controller.updateVenue);

    router
        .get('/company', jwtAuth, controller.readAllCompanies)
        .post('/company', jwtAuth, controller.addNewCompany)
        .delete('/company/:_id', jwtAuth, controller.deleteCompany)
        .get('/company/:_id', jwtAuth, controller.readCompany)
        .put('/company/:_id', jwtAuth, controller.updateCompany);
};
