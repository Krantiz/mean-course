import { Component, OnInit, EventEmitter, Output } from '@angular/core';

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
    @Output() logCreated = new EventEmitter()
  	onAddAttendence(){
  		const log = {
  			un: this.enteredUserName,
  			status: this.enteredStatus,
  			remark: this.enteredRemark,
  		};
  		console.log(log);
      this.logCreated.emit(log);
  	}

}
