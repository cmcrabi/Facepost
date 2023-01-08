import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { IPost } from "../IPost";
import { PostService } from "../posts.service";

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html'
})

export class PostCreateComponent implements OnInit{
  createFormGroup: FormGroup|any;

  constructor(private formBuilder:FormBuilder, private postService:PostService){}
  ngOnInit(): void {
    this.setForm();
  }

  private setForm()
  {
    this.createFormGroup = this.formBuilder.group({
      title: new FormControl('',Validators.required),
      content: new FormControl('', Validators.required)
    });
  }

  onSubmit(formGroup: FormGroup)
  {
    if(formGroup.invalid)
            return;
        const post: IPost = {
                id: '',
                title : formGroup.value.title,
                content : formGroup.value.content
        };
        this.postService.addPost(post.title, post.content);
        this.createFormGroup.resetForm();
  }
}
