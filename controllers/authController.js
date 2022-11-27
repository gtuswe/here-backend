const sequelize = require('../db/sequelize');

function registerInstructor(req,res) {

    let db_handler = require('../db/sequelize');
    let Instructor = db_handler.models.Instructor;
    let Person = db_handler.models.Person;

    // encrypt password
    let bcrypt = require('bcrypt');
    let saltRounds = 10;
    let salt = bcrypt.genSaltSync(saltRounds);
    let hash = bcrypt.hashSync(req.body.password, salt);


    if(!req.body.name || !req.body.surname || !req.body.mail || !req.body.password || !req.body.phone_number) {
        return res.status(400).send("Missing parameters");
    }


    let person = Person.build({
        name: req.body.name,
        surname: req.body.surname,
        mail: req.body.mail,
        password: hash,
        phone_number: req.body.phone_number
    });

    person.save().then(function (person) {
        let instructor = Instructor.build({
            person_id: person.id
        });

        instructor.save().then(function (instructor) {
            return res.status(200).send({ id: instructor.id, ...person.dataValues, password: undefined });
        }).catch(function (err) {
            console.log(err);
            return res.status(500).send({message: err.errors[0].message});
        });
    }).catch(function (err) {
        console.log(err);
        return res.status(500).send({message: err.errors[0].message});
    });
}

function registerStudent(req,res) {

    let db_handler = require('../db/sequelize');
    let Student = db_handler.models.Student;
    let Person = db_handler.models.Person;

    if(!req.body.name || !req.body.surname || !req.body.mail || !req.body.password || !req.body.phone_number) {
        return res.status(400).send("Missing parameters");
        
    }

    // encrypt password
    let bcrypt = require('bcrypt');
    let saltRounds = 10;
    let salt = bcrypt.genSaltSync(saltRounds);
    let hash = bcrypt.hashSync(req.body.password, salt);


    let person = Person.build({
        name: req.body.name,
        surname: req.body.surname,
        mail: req.body.mail,
        password: hash,
        phone_number: req.body.phone_number
    });


    person.save().then(function (person) {
        let student = Student.build({
            person_id: person.id,
            student_no:  req.body.student_no
        });
        student.save().then(function (student) {
            return res.status(200).send({ id: student.id, ...person.dataValues, password: undefined });
        }).catch(function (err) {
            return res.status(500).send({message: err});
        });
    }).catch(function (err) {
        console.log(err);
        return res.status(500).send({message: err.errors[0].message});
    });
}


function login(req,res) {

    let db_handler = require('../db/sequelize');
    let jwt = require('jsonwebtoken');
    let Instructor = db_handler.models.Instructor;
    let Student = db_handler.models.Student;
    let Person = db_handler.models.Person;
    let bcrypt = require('bcrypt');


    if(!req.body.mail || !req.body.password) {
        return res.status(400).send({message: 'Mail and password are required!'});
    }

    Person.findOne({
        where: {
            mail: req.body.mail,
        }
    }).then(function (person) {
        if(!person) {
            return res.status(404).send({message: 'User not found!'});
        }

        if(!bcrypt.compareSync(req.body.password, person.password)) {
            return res.status(401).send("Unauthorized");
        } 
        if (person) {
            Instructor.findOne({
                where: {
                    person_id: person.id
                }
            }).then(function (instructor) {
                if (instructor) {
                    // create access and refresh token for instructor
                    let accessToken = jwt.sign({ id: instructor.id, role: "instructor" }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
                    let refreshToken = jwt.sign({ id: instructor.id, role: "instructor" }, process.env.REFRESH_TOKEN_SECRET);
                    return res.status(200).send({ accessToken: accessToken, refreshToken: refreshToken, ...person.dataValues, password: undefined, id: instructor.id });
                }
            })

            Student.findOne({
                where: {
                    person_id: person.id
                }
            }).then(function (student) {
                if (student) {
                    // create access and refresh token for student
                    let accessToken = jwt.sign({ id: student.id, role: "instructor" }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
                    let refreshToken = jwt.sign({ id: student.id, role: "instructor" }, process.env.REFRESH_TOKEN_SECRET);
                    return res.status(200).send({ accessToken: accessToken, refreshToken: refreshToken, ...person.dataValues, password: undefined, id: student.id });
                } else {
                    return res.status(404).send("User not found");
                }
            })
        } else {
            return res.status(404).send("User not found");
        }
    }).catch(function (err) {
        console.log(err);
        return res.status(500).send({message: err.errors[0].message});
    });
}




function whoami(req,res) {

    let db_handler = require('../db/sequelize');
    let jwt = require('jsonwebtoken');
    let Instructor = db_handler.models.Instructor;
    let Student = db_handler.models.Student;
    let Person = db_handler.models.Person;

    if(!req.headers.authorization) {
        return res.status(401).send("Unauthorized");
        
    }

    let token = req.headers['authorization'].split(' ')[1];

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function (err, decoded) {
        if (err) {
            return res.status(403).send("Invalid token");
        } else {
            Instructor.findOne({
                where: {
                    id: decoded.id
                }
            }).then(function (instructor) {
                if (instructor) {
                    Person.findOne({
                        where: {
                            id: instructor.person_id
                        }
                    }).then(function (person) {
                        if (person) {
                            return res.status(200).send({...person.dataValues, password: undefined, id: instructor.id });
                        } else {
                            return res.status(404).send("Person not found");
                        }
                    }).catch(function (err) {
                        console.log(err);
                        return res.status(500).send({message: err.errors[0].message});
                    });
                } else {
                    Student.findOne({
                        where: {
                            id: decoded.id
                        }
                    }).then(function (student) {
                        if (student) {
                            Person.findOne({
                                where: {
                                    id: student.person_id
                                }
                            }).then(function (person) {
                                if (person) {
                                    return res.status(200).send({...person.dataValues, password: undefined, id: student.id });
                                } else {
                                    return res.status(404).send("Person not found");
                                }
                            }).catch(function (err) {
                                console.log(err);
                                return res.status(500).send({message: err.errors[0].message});
                            });
                        } else {
                            return res.status(404).send("Student not found");
                        }
                    }).catch(function (err) {
                        console.log(err);
                        return res.status(500).send({message: err.errors[0].message});
                    });
                }
            }).catch(function (err) {
                console.log(err);
                return res.status(500).send({message: err.errors[0].message});
            });
        }
    });
}


module.exports = {
    registerInstructor,
    registerStudent,
    login,
    whoami
};