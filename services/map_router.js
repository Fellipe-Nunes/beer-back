module.exports = function (rota, usuario) {
    if (rota == "/product" && usuario.is_admin == false) {

        return res.status(401).json({ msg: "algum erro", status: 401 })

    }

    return { msg: "", status: 200 }

}



