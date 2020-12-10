module.exports = function (rota, usuario) {
    if (rota == "/product" && usuario.is_admin == false) {

        return res.status(401).json({ errors: "Login and password not found" })

    }

    return { msg: "", status: 200 }

}



