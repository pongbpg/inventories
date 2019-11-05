exports.index = (req, res) => {
    req._sql.query('select * from banks')
        .then(rows => {
            res.json(rows)
        })
}