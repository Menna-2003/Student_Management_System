import { Component, OnInit } from '@angular/core';
import { IStudent } from 'src/app/Models/istudent';
import { PostIStudent } from 'src/app/Models/post-istudent';
import { StudentService } from 'src/app/Services/student.service';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.scss']
})
export class AddStudentComponent implements OnInit {
  newStudent: PostIStudent = {
    FirstName: 'sama',
    LastName: "mo",
    Email: 'menna',
    Mobile: '01015552356',
    NationalID: '45684686',
    Age: 2
  };
  constructor(private studentService: StudentService) { }

  ngOnInit(): void {
  }

  addStudent(): void {
    console.log('Adding student: ', this.newStudent);
    this.studentService.CreateStudent(this.newStudent).subscribe({
      next: (response) => {
        console.log('Student added successfully: ', response);
      },
      error: (err) => {
        console.error('Error adding student: ', err);
        if (err.error && err.error.errors) {
          console.error('Validation errors: ', err.error.errors);
        }
      }
    });
  }

}
