const sequelize = require('../db/sequelize');
const jwt = require('jsonwebtoken');

const _sequelize = require('sequelize');

function addAttendance(req, res) {
    
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


    
                // get attendance data
                let attendance = req.body;
    
                // check if attendance data is valid
                if (!attendance.student_id || !attendance.course_id) {
                    return res.status(400).send("Invalid attendance data");
                }

                // get past course from date
                sequelize.models.past_course.findOne({
                    where: {
                        course_id: attendance.course_id,
                        // get records in last 2 hours
                        time: {
                            [_sequelize.Op.gte]: new Date(new Date().getTime() - 2 * 60 * 60 * 1000),
                            [_sequelize.Op.lte]: new Date()
                        }
                    }
                }).then(function (past_course) {
                    if (!past_course) {
                        return res.status(404).send("Past course not found");
                    }

                    sequelize.models.Attendance.create({
                        student_id: attendance.student_id,
                        past_course_id: past_course.id
                    }).then(function (attendance) {
                        return res.status(200).send({message: "Attendance added successfully"});
                    }
                    ).catch(function (err) {
                        console.log(err);
                        return res.status(500).send({message: err.errors[0].message});
                    }
                    );
                }).catch(function (err) {
                    console.log(err);
                    return res.status(500).send({message: err.errors[0].message});
                }
                );
            }
        });
    }

    
function getAttendanceList(req, res) {

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

            // get attendance data
            let attendance = req.body;



            // get past course from date
            sequelize.models.past_course.findOne({
                where: {
                    course_id: req.params.id,
                }
            }).then(function (past_course) {
                if (!past_course) {
                    return res.status(404).send("Past course not found");
                }

                sequelize.models.Attendance.findAll({
                    where: {
                        past_course_id: past_course.id
                    },
                    include: [{
                        model: sequelize.models.Student,
                    }],
                    attributes: ['id']
                }).then(function (attendance) {
                    return res.status(200).send(attendance);
                }
                ).catch(function (err) {
                    console.log(err);
                    return res.status(500).send({message: err.errors[0].message});
                }
                );
            }).catch(function (err) {
                console.log(err);
                return res.status(500).send({message: err.errors[0].message});
            }
            );
        }
    });
}


function deleteAttendance(req, res) {
    
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
    
                // get attendance id
                let attendance_id = req.params.id;
    
                // delete attendance
                sequelize.models.Attendance.destroy({
                    where: {
                        id: attendance_id
                    }
                }).then(function (attendance) {
                    return res.status(200).send(attendance);
                }).catch(function (err) {
                    console.log(err);
                    return res.status(500).send({message: err.errors[0].message});
                });
            }
        });
    }


function getAttendanceForStudent(req, res) {

    // check access token
    if (!req.headers.authorization) {
        return res.status(401).send("Unauthorized");
        
    }

    jwt.verify(req.headers['authorization'].split(' ')[1], process.env.ACCESS_TOKEN_SECRET, function (err, decoded) {
        if (err) {
            return res.status(403).send("Invalid token");
        } else {
            // get student id
            let student_id = decoded.id;

            // get attendance data
            let attendance = req.body;

            // check if attendance data is valid
            if (!attendance.course_id) {
                return res.status(400).send("Invalid attendance data");
            }

            // get past course from date
            sequelize.models.Attendance.findAll({
                where: {
                    student_id: req.params.id
                },
                include: [{
                    model: sequelize.models.past_course     ,
                    where: {
                        course_id: req.body.course_id
                    },
                    attributes: []
                }],
                attributes: ['id']
            }).then(function (attendance) {
                // get past course count for the course and calculate attendance percentage
                sequelize.models.past_course.count({
                    where: {
                        course_id: req.body.course_id
                    }
                }).then(function (past_course_count) {
                    return res.status(200).send({attendances: attendance, attendance_percentage: attendance.length / past_course_count});
                }).catch(function (err) {
                    console.log(err);
                    return res.status(500).send({message: err.errors[0].message});
                }
                );
            }
            ).catch(function (err) {
                console.log(err);
                return res.status(500).send({message: err.errors[0].message});
            }
            );
        }
    });
}


function getAllAttendances(req, res) {

    // check access token
    if (!req.headers.authorization) {
        return res.status(401).send("Unauthorized");
        
    }

    jwt.verify(req.headers['authorization'].split(' ')[1], process.env.ACCESS_TOKEN_SECRET, function (err, decoded) {
        if (err) {
            return res.status(403).send("Invalid token");
        } else {


            // get past course from date
            sequelize.models.past_course.findAll({
                where: {
                    course_id: req.params.id
                }
            }).then(function (past_courses) {

                let list = {};

                for (let i = 0; i < past_courses.length; i++) {
                    sequelize.models.Attendance.findAll({
                        where: {
                            past_course_id: past_courses[i].id
                        },
                        include: [{
                            model: sequelize.models.Student,
                            include: [{
                                model: sequelize.models.Person,
                                attributes: ['name', 'surname']
                            }],
                        }],
                        attributes: ['id']
                    }).then(function (attendance) {
                        list = {...list, [past_courses[i].time]: attendance};
                        if (i === past_courses.length - 1) {
                            return res.status(200).send(list);
                        }
                    }
                    ).catch(function (err) {
                        console.log(err);
                        return res.status(500).send({message: err.errors[0].message});
                    }
                    ).catch(function (err) {
                        console.log(err);
                        return res.status(500).send({message: err.errors[0].message});
                    }
                    );
                }
            }).catch(function (err) {
                console.log(err);
                return res.status(500).send({message: err.errors[0].message});
            }
            );
        }
    });
}


module.exports = {
    addAttendance,
    deleteAttendance,
    getAttendanceForStudent,
    getAllAttendances,
    getAttendanceList
};










    
