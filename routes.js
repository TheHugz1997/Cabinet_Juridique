let express = require('express');
let router = express.Router();

// Import controllers
const domaineController = require('./controllers/domaineController.js');
const avocatController = require('./controllers/avocatController');
const domaineavocatController = require('./controllers/domaineavocatController.js');

router.get('/', (req, res) => res.redirect('/domaines'));

// router.get('/acceuil', acceuilController.acceuil);

router.get('/domaines', domaineController.domainesList);

// TODO: THE FOLLOWING REQUEST MUST BE A POST
router.post('/domaine/creation', domaineController.domaineCreation);

// TODO: THE FOLLOWING REQUEST MUST BE A DELETE
router.delete('/domaine/:id_domaine', domaineController.domaineDelete);

// TODO: THE FOLLOWING REQUEST MUST BE A PUT
router.put('/domaine', domaineController.domaineModification);

// THIS REQUEST ALLOWS TO GET ALL THE LAWYERS THAT BELONG TO A LEGAL FIELD
router.get('/domaine/:id_domaine/avocats', domaineavocatController.domaineLawyers);

// THIS REQUEST ALLOWS TO CREATE A NEW LINK BETWEEN A LAWYER AND A LEGAL FIELD
router.post('/domaine/:id_domaine/avocat/:id_avocat', domaineavocatController.domaineLawyersLink);

// THIS REQUEST ALLOWS TO GET A LIST OF ALL THE LAWYERS
router.get('/avocats', avocatController.avocatsListe);

// THIS REQUEST ALLOWS TO CREATE A NEW LAWYER
router.post('/avocat/creation', avocatController.avocatCreation);

// THIS REQUEST ALLOWS TO GET A LAWYER'S ENTIRE DATA
router.get('/avocat/:id_avocat', avocatController.avocatData);

// THIS REQUEST ALLOWS TO DELETE A LAWYER
router.delete('/avocat/:id_avocat', avocatController.avocatDelete);

// THIS REQUEST ALLOWS TO MODIFY AN EXISTING LAWYER
router.put('/avocat', avocatController.avocatModification);

// router.post('/connection');
// router.post('/inscription');
// router.get('/avocat/:id_avocat/horaire/admin');
// router.put('/avocat/:id_avocat/horaire/admin');
// router.get('/avocat/:id_avocat/horaire');
// router.post('/avocat/:id_avocat/horaire');

module.exports = router;