import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PutIStudent } from 'src/app/Models/put-istudent';
import { StudentService } from 'src/app/Services/student.service';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.scss']
})
export class EditStudentComponent implements OnInit {

  EditUserForm: FormGroup;

  studentData: PutIStudent = {
    ID: 0,
    NameArabic: '',
    NameEnglish: '',
    FirstName: '',
    LastName: '',
    Mobile: '',
    Email: '',
    NationalID: '',
    Age: 0
  };

  constructor(private studentService: StudentService, private formBuilder: FormBuilder) {

    studentService.GetEditableByID(1412).subscribe({
      next: (response) => {
        console.log('Student : ', response);
        this.studentData.ID = response.Data.ID;
        this.studentData.NameArabic = response.Data.NameArabic;
        this.studentData.NameEnglish = response.Data.NameEnglish;
        this.studentData.Age = response.Data.Age;
        this.studentData.FirstName = response.Data.FirstName;
        this.studentData.LastName = response.Data.LastName;
        this.studentData.Mobile = response.Data.Mobile;
        this.studentData.Email = response.Data.Email;
        this.studentData.NationalID = response.Data.NationalID;

        console.log(this.studentData);
      },
      error: (err) => {
        console.error('Error getting student: ', err);
        if (err.error && err.error.errors) {
          console.error('Validation errors: ', err.error.errors);
        }
      }
    })

    this.EditUserForm = this.formBuilder.group({
      nameArabic: ['', [Validators.required]],
      nameEnglish: ['', [Validators.required, Validators.pattern('[A-Za-z]{3,}')]],
      firstName: ['', [Validators.required, Validators.pattern('[A-Za-z]{3,}')]],
      lastName: ['', [Validators.required, Validators.pattern('[A-Za-z]{3,}')]],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.pattern('^01[0-2,5]{1}[0-9]{8}$')]],
      nationalID: ['', [Validators.required]],
      age: ['', [Validators.required, Validators.min(2), Validators.max(14)]],

    });
  }
  get NameArabic() {
    return this.EditUserForm.get('nameArabic');
  }
  get NameEnglish() {
    return this.EditUserForm.get('nameEnglish');
  }
  get FirstName() {
    return this.EditUserForm.get('firstName');
  }
  get LastName() {
    return this.EditUserForm.get('lastName');
  }
  get Mobile() {
    return this.EditUserForm.get('mobile');
  }
  get NationalID() {
    return this.EditUserForm.get('nationalID');
  }
  get Age() {
    return this.EditUserForm.get('age');
  }
  get Email() {
    return this.EditUserForm.get('email');
  }

  ngOnInit(): void {
  }

  EditStudent() {

    let newStdData: PutIStudent = {
      ID: 1,
      NameArabic: this.NameArabic?.value,
      NameEnglish: this.NameEnglish?.value,
      FirstName: this.FirstName?.value,
      LastName: this.LastName?.value,
      Email: this.Email?.value,
      Mobile: this.Mobile?.value,
      NationalID: this.NationalID?.value,
      Age: this.Age?.value
    }

    this.studentService.EditStudent(newStdData).subscribe({
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

  DeleteStudent(id: number) {
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
