const STUDENTS = ["sana", "samin", "reza", "Arman", "aryan", "sara", "arash"];

let firstLetter = prompt("Enter your first letter: " );

firstLetter = firstLetter.toLocaleLowerCase()

function filterStudents(studentList) {
    const filteredList = studentList.filter(function(student){
        return student.startsWith(firstLetter)
    })

    return filteredList;
}
