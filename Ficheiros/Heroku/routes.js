// INIT
let router = require('express').Router();
router.get('/', function (req, res) {
	res.status(200).send("API Online.");
});




// NOTAS CONTROLLER
var notasController = require('./controllers/notasController');
router.route('/notas')
.get(notasController.index)
.post(notasController.new);

router.route('/notas/:id_nota')
.get(notasController.view)
.patch(notasController.update)
.put(notasController.update)
.delete(notasController.delete);





// UTILIZADORES CONTROLLER
var utilizadoresController = require('./controllers/utilizadoresController');
router.route('/utilizadores')
.get(utilizadoresController.index)
.post(utilizadoresController.new);

router.route('/utilizadores/:id_utilizador')
.get(utilizadoresController.view)
.patch(utilizadoresController.update)
.put(utilizadoresController.update)
.delete(utilizadoresController.delete);







// EXPORT API ROUTES
module.exports = router;