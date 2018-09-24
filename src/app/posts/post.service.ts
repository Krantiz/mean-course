import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
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
		this.http.get<{message: string, logs: any}>(
			'http://localhost:3000/api/posts'
		)
		.pipe(map((logData) => {
			return logData.logs.map(log => {
				return {
					id: log._id,
					un: log.un,
					status: log.status,
					remark: log.remark
				};
			});
		}))
		.subscribe((transformedLogData) => {
			// console.log(transformedLogData);
			this.logs = transformedLogData;
			this.logsUpdated.next([...this.logs]);
		});
	}

	getPostUpdateListener(){
		return this.logsUpdated.asObservable();
	}

	addPost(un: string, status: string, remark: string) {
		const log: Post = {id: null, un: un, status: status, remark: remark};

		this.http.post<{message: string, postId: string}>('http://localhost:3000/api/posts', log)
		.subscribe((responseData) => {
			// console.log(responseData.message);
			const id = responseData.postId;
			log.id = id;
			this.logs.push(log);
			this.logsUpdated.next([...this.logs]);
		});
	}

	deletePost(postId: string){
		this.http.delete('http://localhost:3000/api/posts/'+postId)
		.subscribe(() => {
			const updatedLogs = this.logs.filter(log => log.id !== postId);
			this.logs = updatedLogs;
			this.logsUpdated.next([...this.logs]);
		});
	}
}