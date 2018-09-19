import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Post } from './post.model';

@Injectable({providedIn: 'root'})
export class PostService {
	private logs: Post[] = [];
	private logsUpdated = new Subject<Post[]>();

	constructor(private http: HttpClient) {

	}

	getPosts() {
		// return [...this.logs];
		this.http.get<{message: string, logs: Post[]}>('http://localhost:3000/api/posts')
		.subscribe((logData) => {
			this.logs = logData.logs;
			this.logsUpdated.next([...this.logs]);
		});
	}

	getPostUpdateListener(){
		return this.logsUpdated.asObservable();
	}

	addPost(un: string, status: string, remark: string) {
		const log: Post = {id: null, un: un, status: status, remark: remark};
		this.logs.push(log);
		this.logsUpdated.next([...this.logs]);
	}
}