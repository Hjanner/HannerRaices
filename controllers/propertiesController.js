
const admin = (req, res) => {
    res.render('properties/admin', {
        pagina: 'Mis propiedades',
        header: true,
    })
}

const crear = (req, res) => {
    res.render('properties/crear', {
        pagina: 'Crear Propiedad',
        header: true,
    })
}

export{
    admin,
    crear
}