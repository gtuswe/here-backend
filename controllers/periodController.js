const sequelize = require('../db/sequelize');

const jwt = require('jsonwebtoken');


function addPeriod(req, res) {

    // check access token
    if (!req.headers.authorization) {
        return res.status(401).send("Unauthorized");
        
    }

    jwt.verify(req.headers['authorization'].split(' ')[1], process.env.ACCESS_TOKEN_SECRET, function (err, decoded) {
        if (err) {
            return res.status(403).send("Invalid token");
        } else {
            // get instructor id
            let instructor_id = decoded.id;

            console.log(decoded);

            // check the role 
            if (decoded.role !== 'instructor') {
                return res.status(403).send("You are not instructor");
            }

            // get period data
            let period = req.body;

            // check if period data is valid
            if (!period.start_time || !period.end_time || !period.course_id || !period.location) {
                return res.status(400).send("Invalid period data");
            }

            // add period
            sequelize.models.Period.create({
                start_time: period.start_time,
                end_time: period.end_time,
                course_id: period.course_id,
                location: period.location,
                week_day: period.week_day
            }).then(function (period) {
                return res.status(200).send(period);
            }).catch(function (err) {
                console.log(err);
                return res.status(500).send({message: err.errors[0].message});
            });
        }
    });
}


function updatePeriod(req, res) {

    // check access token
    if (!req.headers.authorization) {
        return res.status(401).send("Unauthorized");
        
    }

    jwt.verify(req.headers['authorization'].split(' ')[1], process.env.ACCESS_TOKEN_SECRET, function (err, decoded) {
        if (err) {
            return res.status(403).send("Invalid token");
        } else {
            // get instructor id
            let instructor_id = decoded.id;

            // check the role 
            if (decoded.role !== 'instructor') {
                return res.status(403).send("You are not instructor");
            }

            // get period data
            let period = req.body;

            // check if period data is valid
            if (!period.start_time || !period.end_time || !period.course_id || !period.location) {
                return res.status(400).send("Invalid period data");
            }

            // update period
            sequelize.models.Period.update({
                start_time: period.start_time,
                end_time: period.end_time,
                course_id: period.course_id,
                location: period.location
            }, {
                where: {
                    id: period.id
                }
            }).then(function (period) {
                return res.status(200).send(period);
            }).catch(function (err) {
                console.log(err);
                return res.status(500).send({message: err.errors[0].message});
            });
        }
    });
}

function deletePeriod(req, res) {

    // check access token
    if (!req.headers.authorization) {
        return res.status(401).send("Unauthorized");
        
    }

    jwt.verify(req.headers['authorization'].split(' ')[1], process.env.ACCESS_TOKEN_SECRET, function (err, decoded) {
        if (err) {
            return res.status(403).send("Invalid token");
        } else {
            // get instructor id
            let instructor_id = decoded.id;

            // check the role 
            if (decoded.role !== 'instructor') {
                return res.status(403).send("You are not instructor");
            }

            // get period data
            let period = req.body;

            // check if period data is valid
            if (!period.id) {
                return res.status(400).send("Invalid period data");
            }

            // delete period
            sequelize.models.Period.destroy({
                where: {
                    id: period.id
                }
            }).then(function (period) {
                return res.status(200).send(period);
            }).catch(function (err) {
                console.log(err);
                return res.status(500).send({message: err.errors[0].message});
            });
        }
    });
}

function getPeriods(req, res) {

    // check access token
    if (!req.headers.authorization) {
        return res.status(401).send("Unauthorized");
        
    }

    jwt.verify(req.headers['authorization'].split(' ')[1], process.env.ACCESS_TOKEN_SECRET, function (err, decoded) {
        if (err) {
            return res.status(403).send("Invalid token");
        } else {
            // get instructor id
            let instructor_id = decoded.id;

            // get period data
            let period = req.body;

            // check if period data is valid
            if (!period.course_id) {
                return res.status(400).send("Invalid period data");
            }

            // get periods
            sequelize.models.Period.findAll({
                where: {
                    course_id: period.course_id
                }
            }).then(function (periods) {
                return res.status(200).send(periods);
            }).catch(function (err) {
                console.log(err);
                return res.status(500).send({message: err.errors[0].message});
            });
        }
    });
}

function getPeriod(req, res) {

    // check access token
    if (!req.headers.authorization) {
        return res.status(401).send("Unauthorized");
        
    }

    jwt.verify(req.headers['authorization'].split(' ')[1], process.env.ACCESS_TOKEN_SECRET, function (err, decoded) {
        if (err) {
            return res.status(403).send("Invalid token");
        } else {
            // get instructor id
            let instructor_id = decoded.id;

            // get period data
            let period = req.body;

            // check if period data is valid
            if (!period.id) {
                return res.status(400).send("Invalid period data");
            }

            // get period
            sequelize.models.Period.findOne({
                where: {
                    id: period.id
                }
            }).then(function (period) {
                return res.status(200).send(period);
            }).catch(function (err) {
                console.log(err);
                return res.status(500).send({message: err.errors[0].message});
            });
        }
    });
}

module.exports = {
    addPeriod,
    updatePeriod,
    deletePeriod,
    getPeriods,
    getPeriod
}