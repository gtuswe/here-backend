const sequelize = require('../db/sequelize');
const jwt = require('jsonwebtoken');

function addCourse(req, res) {
    // check access token
    if (!req.headers.authorization) {
        res.status(401).send("Unauthorized");
        return;
    }


    jwt.verify(req.headers['authorization'].split(' ')[1], process.env.ACCESS_TOKEN_SECRET, function (err, decoded) {
        if (err) {
            res.status(403).send("Invalid token");
        } else {
            // get instructor id
            let instructor_id = decoded.id;

            console.log(decoded);

            // check the role 
            if (decoded.role !== 'instructor') {
                res.status(403).send("You are not instructor");
                return;
            }

            // get course data
            let course = req.body;

            // check if course data is valid
            if (!course.name || !course.start_date || !course.end_date || !course.min_attendance_percentage || !course.code) {
                res.status(400).send("Invalid course data");
                return;
            }

            // add course
            sequelize.models.Course.create({
                name: course.name,
                description: course.description,
                start_date: course.start_date,
                end_date: course.end_date,
                instructor_id: instructor_id,
                min_attendance_percentage: course.min_attendance_percentage,
                code: course.code
            }).then(function (course) {
                res.status(200).send(course);
            }).catch(function (err) {
                console.log(err);
                res.status(500).send({message: err.errors[0].message});
            });
        }
    });
}


function updateCourse(req, res) {
    // check access token
    if (!req.headers.authorization) {
        res.status(401).send("Unauthorized");
        return;
    }


    jwt.verify(req.headers['authorization'].split(' ')[1], process.env.ACCESS_TOKEN_SECRET, function (err, decoded) {
        if (err) {
            res.status(403).send("Invalid token");
            return;
        } else {
            // get instructor id
            let instructor_id = decoded.id;

            // check the role 
            if (decoded.role !== 'instructor') {
                res.status(403).send("Invalid token");
            }

            // get course from db by id
            sequelize.models.Course.findOne({ 
                id: req.params.id
            }).then(function (course) {
                if (course) {
                    // check if the instructor is the owner of the course
                    if (course.instructor_id !== instructor_id) {
                        res.status(403).send("Invalid token");
                    }

                    // update course
                    course.update({
                        name: res.body.name || course.name,
                        description: res.body.description || course.description,
                        start_date: res.body.start_date || course.start_date,
                        end_date: res.body.end_date || course.end_date,
                        min_attendance_percentage: res.body.min_attendance_percentage || course.min_attendance_percentage,
                        code: res.body.code || course.code
                    }).then(function (course) {
                        res.status(200).send(course);
                    }).catch(function (err) {
                        console.log(err);
                        res.status(500).send({message: err.errors[0].message});
                    });
                } else {
                    res.status(404).send("Course not found");
                }
            }).catch(function (err) {
                console.log(err);
                res.status(500).send({message: err.errors[0].message});
            });
        }
    });
}


function deleteCourse(req, res) {
    // check access token
    if (!req.headers.authorization) {
        res.status(401).send("Unauthorized");
        return;
    }


    jwt.verify(req.headers['authorization'].split(' ')[1], process.env.ACCESS_TOKEN_SECRET, function (err, decoded) {
        if (err) {
            res.status(403).send("Invalid token");
            return;
        } else {
            // get instructor id
            let instructor_id = decoded.id;

            // check the role 
            if (decoded.role !== 'instructor') {
                res.status(403).send("Invalid token");
            }

            // get course from db by id
            sequelize.models.Course.findOne({ 
                id: req.params.id
            }).then(function (course) {
                if (course) {
                    // check if the instructor is the owner of the course
                    if (course.instructor_id !== instructor_id) {
                        res.status(403).send("Invalid token");
                    }

                    // delete course
                    course.destroy().then(function (course) {
                        res.status(200).send(course);
                    }).catch(function (err) {
                        console.log(err);
                        res.status(500).send({message: err.errors[0].message});
                    });
                } else {
                    res.status(404).send("Course not found");
                }
            }).catch(function (err) {
                console.log(err);
                res.status(500).send({message: err.errors[0].message});
            });
        }
    });
}


function getCourse(req, res) {
    // check access token
    if (!req.headers.authorization) {
        res.status(401).send("Unauthorized");
        return;
    }


    jwt.verify(req.headers['authorization'].split(' ')[1], process.env.ACCESS_TOKEN_SECRET, function (err, decoded) {
        if (err) {
            res.status(403).send("Invalid token");
        } else {
            // get course from db by id
            sequelize.models.Course.findOne({ 
                id: req.params.id
            }).then(function (course) {
                if (course) {
                    res.status(200).send(course);
                } else {
                    res.status(404).send("Course not found");
                }
            }).catch(function (err) {
                console.log(err);
                res.status(500).send({message: err.errors[0].message});
            });
        }
    });
}


function getCourses(req, res) {
    // check access token
    if (!req.headers.authorization) {
        res.status(401).send("Unauthorized");
        return;
    }


    jwt.verify(req.headers['authorization'].split(' ')[1], process.env.ACCESS_TOKEN_SECRET, function (err, decoded) {
        if (err) {
            res.status(403).send("Invalid token");
        } else {
            // get courses from db
            sequelize.models.Course.findAll().then(function (courses) {
                res.status(200).send(courses);
            }).catch(function (err) {
                console.log(err);
                res.status(500).send({message: err.errors[0].message});
            });
        }
    });
}


module.exports = {
    getCourses,
    addCourse,
    updateCourse,
    deleteCourse,
    getCourse  
}


                




