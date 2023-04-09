let express = require('express');
let router = express.Router();

// Import controllers
const domaineController = require('./controllers/domaineController.js');
const avocatController = require('./controllers/avocatController');

router.get('/', (req, res) => res.redirect('/domaines'));


router.get('/domaines', domaineController.domainesList);
router.post('/domaines/creation', domaineController.domaineCreation);
router.delete('/domaines/:id_domaine', domaineController.domaineDelete);
router.put('/domaines/:id_domaine', domaineController.domaineModification);
router.get('/domaines/:id_domaine/avocats', domaineController.domaineLawyers);
// Don't know why but without the front the POST request doesn't work so I had to change the router.post into router.get only for the test perdiod
// router.get('/avocats', avocatController.avocatsListe);
router.get('/avocats/creation', avocatController.avocatCreation);
router.get('/avocats', avocatController.avocatsListe);
// router.get('/avocat/:id_avocat');
// router.delete('/avocat/:id_avocat');
// router.put('/avocat/:id_avocat');
// router.post('/connection');
// router.post('/inscription');
// router.get('/avocat/:id_avocat/horaire/admin');
// router.put('/avocat/:id_avocat/horaire/admin');
// router.get('/avocat/:id_avocat/horaire');
// router.post('/avocat/:id_avocat/horaire');

module.exports = router;