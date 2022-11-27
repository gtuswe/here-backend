const { Sequelize } = require('sequelize');

const db_config = require('../config');


console.log("socket", db_config.DB_UNIX_SOCKET);

// connect to google cloud sql instance using unix socket
const sequelize = new Sequelize(db_config.DB_NAME, db_config.DB_USER, db_config.DB_PASSWORD, {
    dialect: 'mysql',
    host: db_config.DB_UNIX_SOCKET,
    dialectOptions: {
        socketPath: db_config.DB_UNIX_SOCKET
    },
});


// Models
const Person = sequelize.define('Person', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: 'Name is required' },
        }
    },
    surname: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: 'Surname is required' },
        }
    },
    mail: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: 'Mail is required' },
            isEmail: { msg: 'Mail is not valid' },
            isUnique: function (value) {
                    return Person.findOne({ where: { mail: value } }).then(function (person) {
                        if (person) {
                            throw new Error('Mail already exists');
                        }
                    });
                }
            }
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: 'Password is required' },
        }
    },
    phone_number: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: 'Phone number is required' },
            is: { args: /^\d+$/, msg: 'Phone number is not valid' },
            isUnique: function (value) {
                    return Person.findOne({ where: { phone_number: value } }).then(function (person) {
                        if (person) {
                            throw new Error('Phone number already exists');
                        }
                    });
                }
        }
    }
}, {
    timestamps: false,
    tableName: 'person'
});

const Instructor = sequelize.define('Instructor', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    person_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notNull: true,
            isUnique: function (value) {
                return Instructor.findOne({ where: { person_id: value } }).then(function (instructor) {
                    if (instructor) {
                        throw new Error('Person already exists');
                    }
                });
            }
        }
    },
}, {
    timestamps: false,
    tableName: 'instructor'
});

const Student = sequelize.define('Student', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    person_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notNull: true,
            isUnique: function (value) {
                return Student.findOne({ where: { person_id: value } }).then(function (student) {
                    if (student) {
                        throw new Error('Person already exists');
                    }
                });
            }
        }
    },
    student_no: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: 'Student number is required' },
            isUnique: function (value) {
                return Student.findOne({ where: { student_no: value } }).then(function (student) {
                    if (student) {
                        throw new Error('Student number already exists');
                    }
                });
            }
        }
    },
}, {
    timestamps: false,
    tableName: 'student'
});

const Course = sequelize.define('Course', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notNull: true
        }
    },
    description: {
        type: Sequelize.STRING,
    },
    start_date: {
        type: Sequelize.DATE,
        allowNull: false,
        validate: {
            notNull: { msg: 'Start date is required' },
            isDate: { msg: 'Start date is not valid' }
        }
    },
    end_date: {
        type: Sequelize.DATE,
        allowNull: false,
        validate: {
            notNull: { msg: 'End date is required' },
            isDate: { msg: 'End date is not valid' }
        }
    },
    instructor_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notNull: true
        }
    },
    code: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notNull: true,
            isUnique: function (value) {
                return Course.findOne({ where: { code: value } }).then(function (course) {
                    if (course) {
                        throw new Error('Code already exists');
                    }
                });
            }
        }
    },
    min_attendance_percentage: {
        type: Sequelize.FLOAT,
        allowNull: false,
        validate: {
            notNull: true,
            min: 0,
            max: 100
        }
    },
}, {
    timestamps: false,
    tableName: 'course'
});

const Period = sequelize.define('Period', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    week_day: {
        type: Sequelize.ENUM,
        values: ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'],
        allowNull: false,
        validate: {
            notNull: true,
            isIn: [['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']]
        }
    },
    start_time: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notNull: true,
            min: 0,
            max: 23*60 + 59
        }
    },
    end_time: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notNull: true,
            min: 0,
            max: 23*60 + 59
        }
    },
    course_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notNull: true
        }
    },
    location: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notNull: true
        }
    },

}, {
    timestamps: false,
    tableName: 'period'
});

const Announcement = sequelize.define('Announcement', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    text: { 
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
            notNull: true
        }
    },
    course_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notNull: true
        }
    },
    time: {
        type: Sequelize.TIME,
        allowNull: false,
        validate: {
            notNull: true,
            isDate: true
        }
    }
}, {
    timestamps: false,
    tableName: 'announcement'
});

const Student_has_class = sequelize.define('Student_has_class', {
    id : {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    student_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    course_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
}, {
    timestamps: false,
    tableName: 'student_has_class'
});

const Instructor_has_class = sequelize.define('Instructor_has_class', {
    id : {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    instructor_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    course_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
}, {
    timestamps: false,
    tableName: 'instructor_has_class'
});

const Attendance = sequelize.define('Attendance', {
    id : {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    student_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notNull: { msg: 'Student id is required' },
            isInt: true,
            min: 0,
            isStudent: function (value) {
                return Student.findOne({ where: { id: value } }).then(function (student) {
                    if (!student) {
                        throw new Error('Student does not exist');
                    }
                });
            }
        }
    },
    past_course_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notNull: { msg: 'Past Course id is required' },
            isInt: true,
            min: 0
        }
    }
}, {
    timestamps: false,
    tableName: 'attendance'
});

const Past_course = sequelize.define('past_course', {
    id : {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    course_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notNull: { msg: 'Course id cannot be null' },
            isInt: true,
            min: 0,
            isCourse: function (value) {
                return Course.findOne({ where: { id: value } }).then(function (course) {
                    if (!course) {
                        throw new Error('Course does not exist');
                    }
                });
            }
        }
    },
    period_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    time: {
        type: Sequelize.TIME,
        allowNull: false
    }   
}, {
    timestamps: false,
    tableName: 'past_course'
});

const Absence_reason = sequelize.define('Absence_reason', {
    id : {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    student_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notNull: {  msg: 'Student ID is required' },
            isInt: true,
            min: 0,
            isStudent: function (value) {
                return Student.findOne({ where: { id: value } }).then(function (student) {
                    if (!student) {
                        throw new Error('Student does not exist');
                    }
                });
            }
        }
    },
    past_course_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notNull: { msg: 'Past_course id cannot be null' },
            isInt: true
        }
    },
    description: {
        type: Sequelize.STRING,
    },
    doc_id: {
        type: Sequelize.INTEGER,
    },
    confirmed: {
        type: Sequelize.ENUM,
        values: ['t', 'f','w'],
        allowNull: false,
        defaultValue: 'w',
        validate: {
            notNull: { msg: 'Confirmed cannot be null' },
            isIn: { args: [['t', 'f','w']], msg: "Must be 't', 'f', or 'w'" }
        }
    }
}, {
    timestamps: false,
    tableName: 'absence_reason'
});




Student.belongsTo(Person, {foreignKey: 'person_id'});
Instructor.belongsTo(Person, {foreignKey: 'person_id'});
Course.belongsTo(Instructor, {foreignKey: 'instructor_id'});
Period.belongsTo(Course, {foreignKey: 'course_id'});
Announcement.belongsTo(Course, {foreignKey: 'course_id'});
Student_has_class.belongsTo(Student, {foreignKey: 'student_id'});
Student_has_class.belongsTo(Course, {foreignKey: 'course_id'});
Instructor_has_class.belongsTo(Instructor, {foreignKey: 'instructor_id'});
Instructor_has_class.belongsTo(Course, {foreignKey: 'course_id'});
Attendance.belongsTo(Student, {foreignKey: 'student_id'});
Attendance.belongsTo(Past_course, {foreignKey: 'past_course_id'});
Past_course.belongsTo(Course, {foreignKey: 'course_id'});
Past_course.belongsTo(Period, {foreignKey: 'period_id'});
Absence_reason.belongsTo(Student, {foreignKey: 'student_id'});
Absence_reason.belongsTo(Past_course, {foreignKey: 'past_course_id'});




Person.hasMany(Student, {foreignKey: 'person_id'});
Person.hasMany(Instructor, {foreignKey: 'person_id'});
Instructor.hasMany(Course, {foreignKey: 'instructor_id'});
Course.hasMany(Period, {foreignKey: 'course_id'});
Course.hasMany(Announcement, {foreignKey: 'course_id'});
Student.hasMany(Student_has_class, {foreignKey: 'student_id'});
Course.hasMany(Student_has_class, {foreignKey: 'course_id'});
Instructor.hasMany(Instructor_has_class, {foreignKey: 'instructor_id'});
Course.hasMany(Instructor_has_class, {foreignKey: 'course_id'});
Student.hasMany(Attendance, {foreignKey: 'student_id'});
Past_course.hasMany(Attendance, {foreignKey: 'past_course_id'});
Course.hasMany(Past_course, {foreignKey: 'course_id'});
Period.hasMany(Past_course, {foreignKey: 'period_id'});
Student.hasMany(Absence_reason, {foreignKey: 'student_id'});
Past_course.hasMany(Absence_reason, {foreignKey: 'past_course_id'});





module.exports = sequelize;

