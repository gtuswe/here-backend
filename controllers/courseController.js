const sequelize = require('../db/sequelize');
const jwt = require('jsonwebtoken');

function addCourse(req, res) {
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

            // get course data
            let course = req.body;

            // check if course data is valid
            if (!course.name || !course.start_date || !course.end_date || !course.min_attendance_percentage || !course.code) {
                return res.status(400).send("Invalid course data");
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
                return res.status(200).send(course);
            }).catch(function (err) {
                console.log(err);
                return res.status(500).send({message: err.errors[0].message});
            });
        }
    });
}


function updateCourse(req, res) {
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
                return res.status(403).send("Invalid token");
            }

            // get course from db by id
            sequelize.models.Course.findOne({ 
                id: req.params.id
            }).then(function (course) {
                if (course) {
                    // check if the instructor is the owner of the course
                    if (course.instructor_id !== instructor_id) {
                        return res.status(403).send("Invalid token");
                    }

                    // update course
                    course.update({
                        name: req.body.name || course.name,
                        description: req.body.description || course.description,
                        start_date: req.body.start_date || course.start_date,
                        end_date: req.body.end_date || course.end_date,
                        min_attendance_percentage: req.body.min_attendance_percentage || course.min_attendance_percentage,
                        code: req.body.code || course.code
                    }).then(function (course) {
                        return res.status(200).send(course);
                    }).catch(function (err) {
                        console.log(err);
                        return res.status(500).send({message: err.errors[0].message});
                    });
                } else {
                    return res.status(404).send("Course not found");
                }
            }).catch(function (err) {
                console.log(err);
                return res.status(500).send({message: err.errors[0].message});
            });
        }
    });
}


function deleteCourse(req, res) {
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
                return res.status(403).send("Invalid token");
            }

            // get course from db by id
            sequelize.models.Course.findOne({ 
                id: req.params.id
            }).then(function (course) {
                if (course) {
                    // check if the instructor is the owner of the course
                    if (course.instructor_id !== instructor_id) {
                        return res.status(403).send("Invalid token");
                    }

                    // delete course
                    course.destroy().then(function (course) {
                        return res.status(200).send(course);
                    }).catch(function (err) {
                        console.log(err);
                        return res.status(500).send({message: err.errors[0].message});
                    });
                } else {
                    return res.status(404).send("Course not found");
                }
            }).catch(function (err) {
                console.log(err);
                return res.status(500).send({message: err.errors[0].message});
            });
        }
    });
}


function getCourse(req, res) {
    // check access token
    if (!req.headers.authorization) {
        return res.status(401).send("Unauthorized");
        
    }


    jwt.verify(req.headers['authorization'].split(' ')[1], process.env.ACCESS_TOKEN_SECRET, function (err, decoded) {
        if (err) {
            return res.status(403).send("Invalid token");
        } else {
            // get course from db by id
            sequelize.models.Course.findOne({include: [
                {
                    model: sequelize.models.Instructor,
                    include: [{
                        model: sequelize.models.Person,
                        attributes: ['name', 'surname', 'mail', 'phone_number'],
                    }],
                    attributes: ['id']
                }],
                where: {
                    id: req.params.id
                }
            }).then(function (course) {
                if (course) {
                    return res.status(200).send(course);
                } else {
                    return res.status(404).send("Course not found");
                }
            }).catch(function (err) {
                console.log(err);
                return res.status(500).send({message: err.errors[0].message});
            });
        }
    });
}


function getCourses(req, res) {
    // check access token
    if (!req.headers.authorization) {
        return res.status(401).send("Unauthorized");
        
    }


    jwt.verify(req.headers['authorization'].split(' ')[1], process.env.ACCESS_TOKEN_SECRET, function (err, decoded) {
        if (err) {
            return res.status(403).send("Invalid token");
        } else {
            // get courses from db
            sequelize.models.Course.findAll({include: [
                {
                    model: sequelize.models.Instructor,
                    include: [{
                        model: sequelize.models.Person,
                        attributes: ['name', 'surname', 'mail', 'phone_number'],
                    }],
                    attributes: ['id']
                }
            ]}).then(function (courses) {
                return res.status(200).send(courses);
            }).catch(function (err) {
                console.log(err);
                return res.status(500).send({message: err.errors[0].message});
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


                




