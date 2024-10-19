import { Component, OnInit } from '@angular/core';
import { PutIStudent } from 'src/app/Models/put-istudent';
import { StudentService } from 'src/app/Services/student.service';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.scss']
})
export class EditStudentComponent implements OnInit {
  newStdData: PutIStudent = {
    ID: 1397,
    NameArabic: 'منه',
    NameEnglish: "menna mohamed",
    FirstName: 'mennnna',
    LastName: "mo",
    Email: 'menna',
    Mobile: '01015552356',
    NationalID: '45684686',
    Age: 2
  };
  constructor(private studentService: StudentService) { }

  ngOnInit(): void {
  }

  EditStudent() {
    this.studentService.EditStudent(this.newStdData).subscribe({
      next: (response) => {
        console.log('Student Edited successfully: ', response);
      },
      error: (err) => {
        console.error('Error Editing student: ', err);
        if (err.error && err.error.errors) {
          console.error('Validation errors: ', err.error.errors);
        }
      }
    })
  }

  DeleteStudent(id : number) {
    this.studentService.DeleteStudent(id).subscribe({
      next: (response) => {
        console.log(`Student ${id} Deleted successfully: `, response);
      },
      error: (err) => {
        console.error('Error Deleting student: ', err);
        if (err.error && err.error.errors) {
          console.error('Validation errors: ', err.error.errors);
        }
      }
    })
  }

}
