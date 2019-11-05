exports.index = (req, res) => {
    req._sql.query('select * from accounts')
        .then(rows => {
            res.json(rows)
        })
}