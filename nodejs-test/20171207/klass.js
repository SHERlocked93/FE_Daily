const student = require('./sutdent')
const teacher = require('./teacher')

function initKlass(teacherName, students) {
  teacher.add(teacherName)
  students.forEach((value, index) => {
    student.add(value)
  })
}

exports.initKlass = initKlass