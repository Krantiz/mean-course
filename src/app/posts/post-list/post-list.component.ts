import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  // posts = [
  // 	{'empName': 'emp1', 'status': 'present', 'remark': 'Remark1'},
  // 	{'empName': 'emp2', 'status': 'present', 'remark': 'Remark2'},
  // 	{'empName': 'emp3', 'status': 'present', 'remark': 'Remark3'}
  // ]
  @Input() logs = [];
}
