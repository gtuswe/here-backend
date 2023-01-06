const sequelize = require('../db/sequelize');
const jwt = require('jsonwebtoken');


function createPastCourse(req, res) {

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

            // get past course data
            let pastCourse = req.body;

            // check if past course data is valid
            if (!pastCourse.course_id || !pastCourse.period_id) {
                return res.status(400).send("Invalid past course data");
            }

            // add past course
            sequelize.models.past_course.create({
                course_id: pastCourse.course_id,
                period_id: pastCourse.period_id,
                time: new Date()
            }).then(function (pastCourse) {
                return res.status(200).send(pastCourse);
            }).catch(function (err) {
                console.log(err);
                return res.status(500).send({message: err.errors[0].message});
            });
        }
    });
}

function deletePastCourse(req, res) {

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

            // get past course id
            let pastCourseId = req.params.id;

            // check if past course id is valid
            if (!pastCourseId) {
                return res.status(400).send("Invalid past course id");
            }

            // delete past course
            sequelize.models.past_course.destroy({
                where: {
                    id: pastCourseId
                }
            }).then(function (pastCourse) {
                return res.status(200).send(pastCourse);
            }).catch(function (err) {
                console.log(err);
                return res.status(500).send({message: err.errors[0].message});
            });
        }
    });
}

function getPastCourses(req, res) {
    
        // check access token
        if (!req.headers.authorization) {
            return res.status(401).send("Unauthorized");
            
        }
    
        jwt.verify(req.headers['authorization'].split(' ')[1], process.env.ACCESS_TOKEN_SECRET, function (err, decoded) {
            if (err) {
                return res.status(403).send("Invalid token");
            } else {
    
                // get past course id
                let pastCourseId = req.query.course_id
    
                // check if past course id is valid
                if (!pastCourseId) {
                    return res.status(400).send("Invalid past course id");
                }
    
                // get past course
                sequelize.models.past_course.findAll({
                    where: {
                        course_id: pastCourseId
                    }
                }).then(function (pastCourse) {
                    return res.status(200).send(pastCourse);
                }).catch(function (err) {
                    console.log(err);
                    return res.status(500).send({message: err.errors[0].message});
                });
            }
        });
    }

module.exports = {
    createPastCourse,
    deletePastCourse,
    getPastCourses
}