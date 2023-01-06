import { Injectable, OnInit } from "@angular/core";
import { map, Subject } from "rxjs";
import { HttpClient } from '@angular/common/http';
import { IPost } from './IPost';

@Injectable({
  providedIn: 'root'
})

export class PostService{
  private posts:IPost[] = [];
  private postsUpdated = new Subject<IPost[]>();
  constructor(private http:HttpClient){}


  getPosts()
  {
    this.http.get<{message: String, posts: any[]}>('http://localhost:3000/api/posts')
    .pipe(map((postData) => {
      return postData.posts.map(post => {
        return {
          title: post.title,
          content: post.content,
          id: post._id
        };
      });
    }))
    .subscribe(mappedPosts => {
      this.posts = mappedPosts;
      this.postsUpdated.next([...this.posts]);
    });
  }

  updatePost(id: string, title: string, content: string)
    {
        const post: IPost = {id: id, title: title, content: content};
        this.http.put('http://localhost:3000/api/posts/' + id, post)
        .subscribe(response => {
            const updatedPosts = [...this.posts];
            const oldPostIndex = updatedPosts.findIndex(x=>x.id === post.id);
            updatedPosts[oldPostIndex] = post;
            this.posts = updatedPosts;
            this.postsUpdated.next([...this.posts]);
        });

    }

  getPostsUpdatedListener()
  {
      return this.postsUpdated.asObservable();
  }

  // getPost(id: string)
  // {
  //     return this.http.get<{_id: string, title: string, content: string}>('http://localhost:3000/api/posts/' + id)
  //     .pipe(map((postData) => {
  //       return
  //     }))
  // }


}
