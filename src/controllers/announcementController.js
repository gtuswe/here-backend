const sequelize = require('../db/sequelize');
const jwt = require('jsonwebtoken');

function addAnnouncement(req, res) {

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

            // get announcement data
            let announcement = req.body;

            // check if announcement data is valid
            if (!announcement.text || !announcement.course_id) {
                return res.status(400).send("Invalid announcement data");
            }

            // add announcement
            sequelize.models.Announcement.create({
                text: announcement.text,
                course_id: announcement.course_id,
                // get current time
                time: new Date()
            }).then(function (announcement) {
                return res.status(200).send(announcement);
            }
            ).catch(function (err) {
                console.log(err);
                return res.status(500).send({message: err.errors[0].message});
            }
            );
        }
    });
}

function updateAnnouncement(req, res) {

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

            // get announcement data
            let announcement = req.body;

            // check if announcement data is valid
            if (!announcement.text || !announcement.course_id) {
                return res.status(400).send("Invalid announcement data");
            }

            // update announcement
            sequelize.models.Announcement.update({
                text: announcement.text,
                course_id: announcement.course_id,
                // get current time
                time: new Date()
            }, {
                where: {
                    id: announcement.id
                }
            }).then(function (announcement) {
                return res.status(200).send(announcement);
            }
            ).catch(function (err) {
                console.log(err);
                return res.status(500).send({message: err.errors[0].message});
            }
            );
        }
    });
}

function deleteAnnouncement(req, res) {

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

            // get announcement data
            let announcement = req.body;

            // check if announcement data is valid
            if (!announcement.id) {
                return res.status(400).send("Invalid announcement data");
            }

            // delete announcement
            sequelize.models.Announcement.destroy({
                where: {
                    id: announcement.id
                }
            }).then(function (announcement) {
                return res.status(200).send(announcement);
            }
            ).catch(function (err) {
                console.log(err);
                return res.status(500).send({message: err.errors[0].message});
            }
            );
        }
    });
}

function getAnnouncements(req, res) {
    
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
    
    
                // get announcement data
                let announcement = req.body;
    
                // check if announcement data is valid
                if (!announcement.course_id) {
                    return res.status(400).send("Invalid announcement data");
                }
    
                // get announcements
                sequelize.models.Announcement.findAll({
                    where: {
                        course_id: announcement.course_id
                    }
                }).then(function (announcements) {
                    return res.status(200).send(announcements);
                }
                ).catch(function (err) {
                    console.log(err);
                    return res.status(500).send({message: err.errors[0].message});
                }
                );
            }
        });
    }


function getAnnouncement(req, res) {

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


            // get announcement data
            let announcement = req.body;

            // check if announcement data is valid
            if (!announcement.id) {
                return res.status(400).send("Invalid announcement data");
            }

            // get announcement
            sequelize.models.Announcement.findOne({
                where: {
                    id: announcement.id
                }
            }).then(function (announcement) {
                return res.status(200).send(announcement);
            }
            ).catch(function (err) {
                console.log(err);
                return res.status(500).send({message: err.errors[0].message});
            }
            );
        }
    });
}


module.exports = {
    addAnnouncement,
    updateAnnouncement,
    deleteAnnouncement,
    getAnnouncements
}