const { Router } = require('express');
const router =  Router();
const Inventario = require('../models/Inventario');
const  validarInventario  = require('../helpers/validar-inventario');

router.post('/', async function(req, res){   
    try{
       const validaciones = validarInventario(req);
       
       if (validaciones.length > 0){
            return res.status(400).send(validaciones);
       }

        const existeInventarioPorSerial = await Inventario.findOne({ serial: req.body.serial });
        if(existeInventarioPorSerial){
            return res.status(400).send('Serial ya existe');
    }

    let inventario = new Inventario();
    inventario.serial = req.body.serial;
    inventario.modelo = req.body.modelo;
    inventario.descripcion = req.body.descripcion;
    inventario.foto = req.body.foto;
    inventario.color = req.body.color;
    inventario.fechaCompra = req.body.fechaCompra;
    inventario.precio = req.body.precio;
    inventario.usuario = req.body.usuario._id;
    inventario.marca = req.body.marca._id;
    inventario.tipoEquipo = req.body.tipoEquipo._id;
    inventario.estadoEquipo = req.body.estadoEquipo._id;

    inventario = await inventario.save();

    res.send(inventario);

}catch (error){
    console.log(error);
    res.status(500).send('ocurrió un error')
}

});

router.get('/', async function(req, res){
    try {
        const invenatarios = await Inventario.find().populate([
            {
                path: 'usuario', Select: 'nombre'
            },
            {
                path: 'marca', Select: 'nombre'
            },
            {
                path: 'tipoEquipo', Select: 'nombre'
            },
            {
                path: 'estadoEquipo', Select: 'nombre'
            }

        ]);
        res.send(invenatarios);
    } catch(error){
        console.log(error);
        res.status(500).send('Ocurrió un error al consultar inventario');
    }
});

router.put('/:id', async function(req, res) {
    try {
        const { id } = req.params;

        const inventarioExiste = await Inventario.findOne({ _id: id });

        if (!inventarioExiste) {
            return res.send('El inventario no existe');
        } else {

            const validaciones = validarInventario(req);
if(validaciones.length > 0) {
                res.send(validaciones);
            } else {                
                const inventario = await Inventario.findByIdAndUpdate(id, req.body, { new: true });
                res.status(200).json({
                    ok: true,
                    inventario,
                    msg: 'Inventario actualizado correctamente'
                });                
            }           
        }
    } catch (error) {
        console.log(error);
res.send('Ocurrio un error al actualizar inventario: ' + error.message);
    }
});

router.get('/:inventarioId', async function(req, res) {
    try {
        const inventario = await Inventario.findById(req.params.inventarioId);
        if (!inventario) {
            return res.status(404).send('Inventario no existe');
        }
        res.send(inventario);
    }catch (error) {
        console.log(error);
        res.status(500).send('Error al consultar inventario');
    }
});

module.exports = router;