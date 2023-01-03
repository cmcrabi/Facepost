import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { IPost } from "../IPost";
import { PostService } from "../posts.service";

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html'
})

export class PostEditComponent implements OnInit{
  editFormGroup: FormGroup|any;
  public selectedPost: IPost|any;
  constructor(public modal:NgbActiveModal, private formBuilder:FormBuilder, private postService:PostService){}

  ngOnInit(): void {
    this.setForm();
  }

  private setForm()
  {
    this.editFormGroup = this.formBuilder.group({
      title: [this.selectedPost.title],
      content: [this.selectedPost.content]
    });
  }

  close(){
    this.modal.dismiss();
  }

  onSubmit(formGroup: FormGroup)
  {
    console.log(formGroup.value);
    this.postService.updatePost(this.selectedPost.id, formGroup.controls['title'].value, formGroup.controls['content'].value);
    this.modal.close('yes');
  }
}
