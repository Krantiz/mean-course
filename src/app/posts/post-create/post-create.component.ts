import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Post } from '../post.model';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  	constructor() { }
  	ngOnInit() {
  	}
	
  	statusOptions = [
  			{'value': 'Present'},
  			{'value': 'Absent'},
  			{'value': 'Sick Leave'},
  			{'value': 'Work From Home'},
  		];
  	enteredUserName = '';
  	enteredStatus = '';
  	enteredRemark = '';
    @Output() logCreated = new EventEmitter<Post>();


    
  	onAddAttendence(form: NgForm){
      if (form.invalid) {
          return;
      }
  		const log: Post = {
  			un: form.value.un,
  			status: form.value.status,
  			remark: form.value.remark,
  		};
  		console.log(log);
      this.logCreated.emit(log);
  	}

}
