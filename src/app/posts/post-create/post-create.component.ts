import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';


import { Post } from '../post.model';
import { PostService } from '../post.service';


@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent {
  	constructor(public postService: PostService) { }
  	statusOptions = [
  			{'value': 'Present'},
  			{'value': 'Absent'},
  			{'value': 'Sick Leave'},
  			{'value': 'Work From Home'},
  		];
  	enteredUserName = '';
  	enteredStatus = '';
  	enteredRemark = '';
    
  	onAddAttendence(form: NgForm){
      if (form.invalid) {
          return;
      }
      this.postService.addPost(form.value.un, form.value.status, form.value.remark);

      form.resetForm();
  	}

}
