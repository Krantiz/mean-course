import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';
import { Post } from '../post.model';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
  // posts = [
  //   {'empName': 'emp1', 'status': 'present', 'remark': 'Remark1'},
  //   {'empName': 'emp2', 'status': 'present', 'remark': 'Remark2'},
  //   {'empName': 'emp3', 'status': 'present', 'remark': 'Remark3'}
  // ]
  logs: Post[] = [];
  private logsSub: Subscription;
  
  constructor(public postService: PostService) { }

  ngOnInit() { // Automatically executes whenever this component is created
    this.postService.getPosts();

    //Subscribing.. 
    this.logsSub = this.postService.getPostUpdateListener()
            .subscribe((logs: Post[]) => {
              this.logs = logs;
            });//listener to observe change
  }

  onDeleteLog(logId) {
    this.postService.deletePost(logId);
  }

  ngOnDestroy() {
    this.logsSub.unsubscribe();
  }
}
