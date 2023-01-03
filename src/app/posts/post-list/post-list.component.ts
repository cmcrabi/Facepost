import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Subscription } from "rxjs";
import { IPost } from "../IPost";
import { PostEditComponent } from "../post-edit/post-edit.component";
import { PostService } from "../posts.service";

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html'
})

export class PostListComponent implements OnInit, OnDestroy{
  private postsSub : Subscription | undefined;
  constructor(private postService:PostService, private modalService: NgbModal){}


  @Input() posts:IPost[] = [];

  ngOnInit(): void {
    console.log('From Post List component');
    this.postService.getPosts();
    this.postsSub = this.postService.getPostsUpdatedListener()
    .subscribe((posts: IPost[]) =>{
      this.posts = posts;
    });
  }

  editPost(postModal: IPost){
    console.log('from postList component: ' + postModal.title + ', ' + postModal.content);
    const ref = this.modalService.open(PostEditComponent);
    ref.componentInstance.selectedPost = postModal;

    ref.result.then((yes) => {
      console.log('Ok click');
    },
    (cancel) => {
      console.log('cancel click');
    });
  }

  ngOnDestroy(): void {
    this.postsSub?.unsubscribe();
  }
}
