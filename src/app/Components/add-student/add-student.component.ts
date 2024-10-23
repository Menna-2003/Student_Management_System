import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostIStudent } from 'src/app/Models/post-istudent';
import { StudentService } from 'src/app/Services/student.service';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.scss']
})
export class AddStudentComponent implements OnInit {
  AddUserForm: FormGroup;

  constructor(private studentService: StudentService, private formBuilder: FormBuilder) {

    this.AddUserForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.pattern('[A-Za-z]{3,}')]],
      lastName: ['', [Validators.required, Validators.pattern('[A-Za-z]{3,}')]],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.pattern('^01[0-2,5]{1}[0-9]{8}$')]],
      nationalID: ['', [Validators.required]],
      age: ['', [Validators.required, Validators.min(2), Validators.max(14)]],

    });
  }

  get FirstName() {
    return this.AddUserForm.get('firstName');
  }
  get LastName() {
    return this.AddUserForm.get('lastName');
  }
  get Mobile() {
    return this.AddUserForm.get('mobile');
  }
  get NationalID() {
    return this.AddUserForm.get('nationalID');
  }
  get Age() {
    return this.AddUserForm.get('age');
  }
  get Email() {
    return this.AddUserForm.get('email');
  }

  ngOnInit(): void {
  }

  addStudent(): void {

    let newStudent: PostIStudent = {
      FirstName: this.FirstName?.value,
      LastName: this.LastName?.value,
      Email: this.Email?.value,
      Mobile: this.Mobile?.value,
      NationalID: this.NationalID?.value,
      Age: this.Age?.value
    };

    console.log('Adding student: ', newStudent);
    this.studentService.CreateStudent(newStudent).subscribe({
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
