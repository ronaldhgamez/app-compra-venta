// Para definir las rutas o urls del servidor
const { Router } = require('express');
const router = Router();

const userControlers = require('../controllers/users_controllers')
const prodControlers = require('../controllers/products_controllers')

router.get('/getUsers', userControlers.getUsers);
router.post('/insertarUsuario', userControlers.insertarUsuario);
router.post('/validarUsuario', userControlers.validarUsuario);
router.post('/insertarProducto', prodControlers.insertarProducto);

// Default route.
router.get('/', (req, res) => {
    res.send('server running successfully');
});

// Export routes.
module.exports = router;