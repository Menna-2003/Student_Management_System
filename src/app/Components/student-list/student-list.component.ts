import { Component, OnInit } from '@angular/core';
import { IApiResponse } from 'src/app/Models/iapi-response';
import { IStudent } from 'src/app/Models/istudent';
import { StudentService } from 'src/app/Services/student.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit {
  students: IStudent[] = [];
  message: string = '';

  constructor(private studentService: StudentService) {
    this.getStudents();
  }

  ngOnInit(): void {

  }

  getStudents(): void {
    this.studentService.GetAllStudents().subscribe({
      next: (response: IApiResponse) => {
        if (response.Success) {
          this.students = response.Data;
          this.message = response.Message;
          console.log("Students: ", this.students);
        } else {
          console.error("Failed to fetch students: ", response.Message);
        }
      },
      error: (err) => {
        console.error("Error fetching students: ", err); // Log errors
      }
    });
  }
}
