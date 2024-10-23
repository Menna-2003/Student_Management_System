import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { IApiResponse } from 'src/app/Models/iapi-response';
import { IStudent } from 'src/app/Models/istudent';
import { StudentService } from 'src/app/Services/student.service';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['ID', 'name', 'Age', 'Email', 'Mobile', 'NationalID'];
  dataSource = new MatTableDataSource<IStudent>([]); // Initialize as empty
  message: string = '';

  constructor(private studentService: StudentService, private _liveAnnouncer: LiveAnnouncer) { }

  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.getStudents(); // Fetch students on init
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort; // Assign sorter after view init
  }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    const direction = sortState.direction ? `${sortState.direction}ending` : 'Sorting cleared';
    this._liveAnnouncer.announce(`Sorted ${direction}`);
  }

  /** Fetch students from the service and update the dataSource */
  getStudents(): void {
    this.studentService.GetAllStudents().subscribe({
      next: (response: IApiResponse) => {
        if (response.Success) {
          this.dataSource.data = response.Data; // Set the data source
          this.message = response.Message;
          console.log('Students:', response.Data);
        } else {
          console.error('Failed to fetch students:', response.Message);
        }
      },
      error: (err) => {
        console.error('Error fetching students:', err);
      }
    });
  }

  /** Filter function to apply search on the table */
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
