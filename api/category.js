module.exports = app => {
    const { existsOrError, notExistsOrError } = app.api.validation

    const save = (req, res) => {
        const category = { ...req.body }
        if (req.params.id) category.id = req.params.id

        try {
            existsOrError(category.name, 'Nome não informado.')
        } catch(msg) {
            return res.status(400).send(msg)
        }

        if (category.id) {
            app.db('categories')
                .update(category)
                .where({ id: category.id })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('categories')
                .insert(category)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const remove = async (req, res) => {
        try {
            existsOrError(req.params.id, 'Código de Categoria não informado.')

            const products = await app.db('products')
                .where({ id: req.params.id })
            notExistsOrError(products, 'Categoria possui produtos.')

            const rowsDeleted = await app.db('categories')
                .where({ id: req.params.id }).del()
            existsOrError(rowsDeleted, 'Categoria não foi encontrada.')

            res.status(204).send()
        } catch(msg) {
            res.status(400).send(msg)
        }
    }

    const get = (req,res) => {
        app.db('categories')
            .then(categories => res.json(categories))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db('categories')
            .where({ id: req.params.id })
            .first()
            .then(category => res.json(category))
            .catch(err => res.status(500).send(err))
    }

    return { save, remove, get, getById }
}