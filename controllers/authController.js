const sequelize = require('../db/sequelize');

function registerInstructor(req,res) {

    var db_handler = require('../db/sequelize');
    var Instructor = db_handler.models.Instructor;
    var Person = db_handler.models.Person;

    // encrypt password
    var bcrypt = require('bcrypt');
    var saltRounds = 10;
    var salt = bcrypt.genSaltSync(saltRounds);
    var hash = bcrypt.hashSync(req.body.password, salt);


    var person = Person.build({
        name: req.body.name,
        surname: req.body.surname,
        mail: req.body.mail,
        password: hash,
        phone_number: req.body.phone_number
    });

    person.save().then(function (person) {
        var instructor = Instructor.build({
            person_id: person.id
        });

        instructor.save().then(function (instructor) {
            res.status(200).send({ id: instructor.id, ...person.dataValues, password: undefined });
        }).catch(function (err) {
            console.log(err);
            res.status(500).send(err);
        });
    }).catch(function (err) {
        console.log(err);
        res.status(500).send(err);
    });
}

function registerStudent(req,res) {

    var db_handler = require('../db/sequelize');
    var Student = db_handler.models.Student;
    var Person = db_handler.models.Person;

    // encrypt password
    var bcrypt = require('bcrypt');
    var saltRounds = 10;
    var salt = bcrypt.genSaltSync(saltRounds);
    var hash = bcrypt.hashSync(req.body.password, salt);


    var person = Person.build({
        name: req.body.name,
        surname: req.body.surname,
        mail: req.body.mail,
        password: hash,
        phone_number: req.body.phone_number
    });


    person.save().then(function (person) {
        var student = Student.build({
            person_id: person.id
        }).catch(function (err) {
            console.log(err);
            res.status(500).send(err);
        });
        student.save().then(function (student) {
            res.status(200).send({ id: student.id, ...person.dataValues, password: undefined });
        }).catch(function (err) {
            console.log(err);
            res.status(500).send(err);
        });
    }).catch(function (err) {
        console.log(err);
        res.status(500).send(err);
    });
}


function loginInstructor(req,res) {

    var db_handler = require('../db/sequelize');
    var jwt = require('jsonwebtoken');
    var Instructor = db_handler.models.Instructor;
    var Person = db_handler.models.Person;
    var bcrypt = require('bcrypt');

    Person.findOne({
        where: {
            mail: req.body.mail,
        }
    }).then(function (person) {
        if(!bcrypt.compareSync(req.body.password, person.password)) {
            res.status(401).send("Unauthorized");
        } 
        if (person) {
            Instructor.findOne({
                where: {
                    person_id: person.id
                }
            }).then(function (instructor) {
                if (instructor) {
                    // create access and refresh token for instructor
                    var accessToken = jwt.sign({ id: instructor.id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
                    var refreshToken = jwt.sign({ id: instructor.id }, process.env.REFRESH_TOKEN_SECRET);
                    res.status(200).send({ accessToken: accessToken, refreshToken: refreshToken });
                } else {
                    res.status(404).send("Instructor not found");
                }
            }).catch(function (err) {
                console.log(err);
                res.status(500).send(err);
            });
        } else {
            res.status(404).send("Instructor not found");
        }
    }).catch(function (err) {
        console.log(err);
        res.status(500).send(err);
    });
}


function whoami(req,res) {

    var db_handler = require('../db/sequelize');
    var jwt = require('jsonwebtoken');
    var Instructor = db_handler.models.Instructor;
    var Student = db_handler.models.Student;
    var Person = db_handler.models.Person;

    if(!req.headers.authorization) {
        res.status(401).send("Unauthorized");
    }

    var token = req.headers['authorization'].split(' ')[1];

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function (err, decoded) {
        if (err) {
            res.status(403).send("Invalid token");
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
                            res.status(200).send(person);
                        } else {
                            res.status(404).send("Person not found");
                        }
                    }).catch(function (err) {
                        console.log(err);
                        res.status(500).send(err);
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
                                    res.status(200).send(person);
                                } else {
                                    res.status(404).send("Person not found");
                                }
                            }).catch(function (err) {
                                console.log(err);
                                res.status(500).send(err);
                            });
                        } else {
                            res.status(404).send("Student not found");
                        }
                    }).catch(function (err) {
                        console.log(err);
                        res.status(500).send(err);
                    });
                }
            }).catch(function (err) {
                console.log(err);
                res.status(500).send(err);
            });
        }
    });
}


module.exports = {
    registerInstructor,
    registerStudent,
    loginInstructor,
    whoami
};