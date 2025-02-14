const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let usuarios = [
    { id: 1, nombre: 'Ryu', edad: 32, lugarProcedencia: 'Japón' },
    { id: 2, nombre: 'Chun-Li', edad: 29, lugarProcedencia: 'China' },
    { id: 3, nombre: 'Guile', edad: 35, lugarProcedencia: 'Estados Unidos' },
    { id: 4, nombre: 'Dhalsim', edad: 45, lugarProcedencia: 'India' },
    { id: 5, nombre: 'Blanka', edad: 32, lugarProcedencia: 'Brasil' },
];

app.get('/', (req, res) => {
    res.send('<h1>Bienvenido a la API de usuarios de Street Fighter!</h1><p><a href="/usuarios">Ver usuarios</a></p>');
});

app.get('/usuarios', (req, res) => {
    res.json(usuarios);
});

app.get('/usuarios/:nombre', (req, res) => {
    const usuario = usuarios.find(u => u.nombre.toLowerCase() === req.params.nombre.toLowerCase());
    if (usuario) {
        res.json(usuario);
    } else {
        res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }
});

app.post('/usuarios', (req, res) => {
    const { nombre, edad, lugarProcedencia } = req.body;
    if (!nombre || !edad || !lugarProcedencia) {
        return res.status(400).json({ mensaje: 'Falta completar campos' });
    }
    const nuevoUsuario = { id: usuarios.length + 1, nombre, edad, lugarProcedencia };
    usuarios.push(nuevoUsuario);
    res.status(201).json(nuevoUsuario);
});

app.post('/usuarios/:nombre', (req, res) => {
    const index = usuarios.findIndex(u => u.nombre.toLowerCase() === req.params.nombre.toLowerCase());
    if (index !== -1) {
        usuarios[index] = { ...usuarios[index], ...req.body };
        res.json(usuarios[index]);
    } else {
        res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }
});

app.delete('/usuarios/:nombre', (req, res) => {
    const usuarioFiltrado = usuarios.filter(u => u.nombre.toLowerCase() !== req.params.nombre.toLowerCase());
    if (usuarioFiltrado.length !== usuarios.length) {
        usuarios = usuarioFiltrado;
        res.json({ mensaje: 'Usuario Eliminado' });
    } else {
        res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
