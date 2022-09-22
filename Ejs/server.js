const express = require("express");
const Productos = require('./api/productos.js');

const app = express();
const PORT = 8080;
const server = app.listen(PORT, () => {
    console.log("Servidor levantado en el puerto " + server.address().port);
});

server.on("error", (error) => console.log(`Hubo un error ${error}`));

let productos = new Productos();

// configuración engine

app.set("view engine", "ejs");

app.use(express.static("public"));

const router = express.Router();
app.use("/api", router);

router.use(express.urlencoded({ extended: false }))
router.use(express.json());

router.get("/productos/listar", (req, res) => {
    res.json(productos.listarAll())
})

router.get("/productos/listar/:id", (req, res) => {
    let { id } = req.params;
    res.json(productos.listar(id));
})

router.post("/productos/guardar", (req, res) => {
    let producto = req.body;
    productos.guardar(producto);
    res.redirect("/");
})

router.put("/productos/actualizar/:id", (req, res) => {
    let { id } = req.params;
    let producto = req.body;
    productos.actualizar(producto, id);
    res.json(producto)
})

router.delete("/productos/borrar/:id", (req, res) => {
    let { id } = req.params;
    let producto = productos.borrar(id);
    res.json(producto);
})

router.get("/productos/vista", (req, res) => {
    let prods = productos.listarAll();

    res.render("layouts/index", {
        productos: prods,
        hayProductos: prods.length
    })
})