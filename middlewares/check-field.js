const {validationResult} = require("express-validator");

const checkField = (req, res, next) => {

    const errors = validationResult( req );

    if(!errors.isEmpty()){
        return res.status(400).json({
            ok: false,
            msg: 'Missing fields'
        });
    }

    next();

}

module.exports = {
    checkField
}
