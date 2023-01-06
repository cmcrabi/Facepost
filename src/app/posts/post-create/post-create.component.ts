import { Component, OnInit } from "@angular/core";

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html'
})

export class PostCreateComponent implements OnInit{
  ngOnInit(): void {
    console.log('From Post create component');
  }
}
