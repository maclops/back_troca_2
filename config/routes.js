module.exports = app => {
    // urls públicas
    app.post('/signup', app.api.user.save)
    app.post('/signin', app.api.auth.signin)
    app.post('/validateToken', app.api.auth.validateToken)

    // urls com acesso após logado no sistema
    app.route('/users')
        // .all(app.config.passport.authenticate())
        .post(app.api.user.save)
        .get(app.api.user.get)

    app.route('/users/:id')
        // .all(app.config.passport.authenticate())
        .put(app.api.user.save)
        .get(app.api.user.getById)

    app.route('/products')
        // .all(app.config.passport.authenticate())
        .get(app.api.products.get)
        .post(app.api.products.save)

    app.route('/products/:id')
        // .all(app.config.passport.authenticate())
        .get(app.api.products.getById)
        .put(app.api.products.save)
        .delete(app.api.products.remove)
}