import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Post } from './post.model';

@Injectable({providedIn: 'root'})
export class PostService {
	private logs: Post[] = [];
	private logsUpdated = new Subject<Post[]>();

	getPosts() {
		return [...this.logs];
	}

	getPostUpdateListener(){
		return this.logsUpdated.asObservable();
	}

	addPost(un: string, status: string, remark: string) {
		const log: Post = {un: un, status: status, remark: remark};
		this.logs.push(log);
		this.logsUpdated.next([...this.logs]);
	}
}