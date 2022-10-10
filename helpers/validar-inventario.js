const validarInventario = (req) => {
    const validaciones = [];

    if (req.serial ==="") {
        validaciones.push('Serial requerido');
    }

    if (req.modelo ==="") {
        validaciones.push('Modelo requerido');
    }

    if (req.descripcion==="") {
        validaciones.push('Descripción requerido');
    }

    if (req.foto==="") {
        validaciones.push('Foto requerido');
    }

    if (req.color ==="") {
        validaciones.push('Color requerido');
    }

    if (req.fechaCompra ==="") {
        validaciones.push('Fecha de compra requerida');
    }

    if (req.precio ==="") {
        validaciones.push('Precio requerido');
    }

    if (req.usuario ==="") {
        validaciones.push('Usuario requerido');
    }

    if (req.marca ==="") {
        validaciones.push('Marca requerida');
    }

    if (req.tipoEquipo ==="") {
        validaciones.push('Tipo de equipo requerido');
    }

    if (req.estadoEquipo ==="") {
        validaciones.push('Estado de requerido');
    }

    return validaciones;
}

module.exports =  validarInventario;
