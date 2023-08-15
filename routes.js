let express = require('express');
let router = express.Router();

// Import controllers
const domaineController = require('./controllers/domaineController.js');
const avocatController = require('./controllers/avocatController');
const domaineavocatController = require('./controllers/domaineavocatController.js');
const utilisateurController = require('./controllers/utilisateurController.js');
const rendezVousController = require('./controllers/rendezvousController.js');

const {validationToken} = require('./jwt');

router.get('/', (req, res) => res.redirect('/domaines'));

// THIS REQUEST ALLOWS TO GET ALL THE LEGAL FIELDS
router.get('/domaines', domaineController.legalFieldList);

// THIS REQUEST ALLOWS TO CREATE A NEW LEGAL FIELD
router.post('/domaine/creation', validationToken, domaineController.legalFieldCreation);

// THIS REQUEST ALLOWS TO DELETE A LEGAL FIELD
router.delete('/domaine/:id_domaine', validationToken, domaineController.legalFieldDelete);

// THIS REQUEST ALLOWS TO MODIFY A LEGAL FIELD
router.put('/domaine', validationToken, domaineController.legalFieldModification);

// THIS REQUEST ALLOWS TO GET ALL THE LAWYERS THAT BELONG TO A LEGAL FIELD
router.get('/domaine/:id_domaine/avocats', validationToken, domaineavocatController.legalFieldLawyers);

// THIS REQUEST ALLOWS TO CREATE A NEW LINK BETWEEN A LAWYER AND A LEGAL FIELD
router.post('/domaine/:id_domaine/avocat/:id_avocat/relation', validationToken, domaineavocatController.legalFieldLawyersLink);

// THIS REQUEST ALLOWS TO DELETE A LINK BETWEEN A LAWYER AND A LEGAL FIELD
router.delete('/domaine/:id_domaine/avocat/:id_avocat/relation', validationToken, domaineavocatController.deleteLawyerLegalFieldLink)

// THIS REQUEST ALLOWS TO GET ALL THE RELATIONS BETWEEN THE LAWYERS AND THE LEGAL FIELDS
router.get('/domaines/avocats/relations', validationToken, domaineavocatController.allLegalFieldsLawyersLinks);

// THIS REQUEST ALLOWS TO GET A LIST OF ALL THE LAWYERS
router.get('/avocats', avocatController.lawyersList);

// THIS REQUEST ALLOWS TO CREATE A NEW LAWYER
router.post('/avocat/creation', validationToken, avocatController.lawyerCreation);

// THIS REQUEST ALLOWS TO GET A LAWYER'S ENTIRE DATA
router.get('/avocat/:id_avocat', validationToken, avocatController.lawyerData);

// THIS REQUEST ALLOWS TO DELETE A LAWYER
router.delete('/avocat/:id_avocat', validationToken, avocatController.lawyerDelete);

// THIS REQUEST ALLOWS TO MODIFY AN EXISTING LAWYER
router.put('/avocat', validationToken, avocatController.lawyerModification);

// THIS REQUEST ALLOWS A USER OR AN ADMIN TO LOG IN
router.post('/connexion', utilisateurController.clientLogin);

// THIS REQUEST ALLOWS A USER OR AN ADMIN TO REGISTER
router.post('/inscription', utilisateurController.clientRegistration);

// THIS REQUEST ALLOWS A USER OR AN ADMIN TO LOGOUT
router.get('/logout', utilisateurController.clientLogout);

/*

    THIS NEXT PART IS DEDICATED TO THE APPOINTMENTS

*/

// THIS REQUEST ALLOWS A USER OR AN ADMIN TO GET THE AVAILABILITIES OF A LAWYER
router.get('/avocat/:id_avocat/horaire', validationToken, rendezVousController.getLawyerAppointments);

// THIS REQUEST ALLOWS A USER OR AN ADMIN TO TAKE AN APPOINTMENT WITH A LAWYER
router.post('/avocat/horaire', validationToken, rendezVousController.newAppointment);

// THIS REQUEST ALLOWS TO DELETE AN APPOINTMENT (ONLY AVAILABLE FOR ADMINS)
router.delete('/avocat/horaire/:id_rendez_vous', validationToken, rendezVousController.deleteLawyerAppointment);

// THIS REQUEST ALLOWS TO MODIFY THE SCHEDULE OF A LAWYER (ONLY AVAILABLE FOR ADMINS)
router.put('/avocat/horaire/modification', validationToken, rendezVousController.modifyLawyerAppointment);

// THIS REQUEST ALLOWS A USER TO GET ALL HIS APPOINTMENTS
router.get('/utilisateur/rendezvous', validationToken, rendezVousController.getUserAppointments);

// THIS REQUEST ALLOWS A USER TO MODIFY HIS APPOINTMENTS
router.delete('/utilisateur/rendezvous/:id_rendez_vous', validationToken, rendezVousController.deleteUserAppointment);

module.exports = router;