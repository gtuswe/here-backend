const { Sequelize } = require('sequelize');

const db_config = require('../config');

const sequelize = new Sequelize('mysql://' + db_config.DB_USER + ':' + db_config.DB_PASSWORD + '@' + db_config.DB_HOST + '/' + db_config.DB_NAME);

// Models
const Person = sequelize.define('Person', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    surname: {
        type: Sequelize.STRING,
        allowNull: false
    },
    mail: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    phone_number: {
        type: Sequelize.STRING,
        allowNull: false
    },
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
        allowNull: false
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
        allowNull: false
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
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false
    },
    instructor_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    code: {
        type: Sequelize.STRING,
        allowNull: false
    },
    min_attendance_percentage: {
        type: Sequelize.FLOAT,
        allowNull: false
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
        allowNull: false
    },
    start_time: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    end_time: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    course_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    location: {
        type: Sequelize.STRING,
        allowNull: false
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
        type: Sequelize.STRING,
        allowNull: false
    },
    course_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    time: {
        type: Sequelize.TIME,
        allowNull: false
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
        allowNull: false
    },
    past_course_id: {
        type: Sequelize.INTEGER,
        allowNull: false
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
        allowNull: false
    },
    period_id: {
        type: Sequelize.INTEGER,
        allowNull: false
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
        allowNull: false
    },
    past_course_id: {
        type: Sequelize.INTEGER,
        allowNull: false
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
        allowNull: false
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

