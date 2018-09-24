import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';


import { Post } from '../post.model';
import { PostService } from '../post.service';


@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit{
  	constructor(public postService: PostService, public route: ActivatedRoute) { }
    private mode = 'create';
    private postId: string;
    post: Post;

    ngOnInit() {
      this.route.paramMap.subscribe((paramMap: ParamMap) => {
        if (paramMap.has('postId')) {
          console.log(paramMap);
          this.mode = 'edit';
          this.postId = paramMap.get('postId');
          this.postService.getPost(this.postId).subscribe(postData => {
            this.post = { id: postData._id, un: postData.un, status: postData.status, remark: postData.remark};
          });   
        } else {
          this.mode = 'create';
          this.postId = null;
        }
      });
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
    
  	onSaveAttendence(form: NgForm){
      if (form.invalid) {
          return;
      }
      console.log(this.mode);
      console.log(this.postId);
      if (this.mode === 'create') {
        this.postService.addPost(form.value.un, form.value.status, form.value.remark);
      } else {
        this.postService.updatePost(this.postId, form.value.un, form.value.status, form.value.remark);
      }

      form.resetForm();
  	}

}
