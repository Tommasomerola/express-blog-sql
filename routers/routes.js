const express = require('express')
const router = express.Router();

const routesController = require('../controllers/controller_routes')

// index visualizza tutti gli elementi
router.get('/', routesController.index);

// show visualizza un elemento per id
router.get('/:id', routesController.show);

// store crea un elemento
router.post('/', routesController.store);

// update modifica l'elemento
// .put = tutto l'elemento .patch = una parte dell'elemento
router.put('/:id', routesController.update);

// delete cancella un elemento
router.delete('/:id', routesController.destroy);

module.exports = router;