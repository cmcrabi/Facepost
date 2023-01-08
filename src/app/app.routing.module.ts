import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { PostCreateComponent } from "./posts/post-create/post-create.component";
import { WelcomeComponent } from "./welcome/welcome.component";
import { PostListComponent } from "./posts/post-list/post-list.component";
import { PostEditComponent } from "./posts/post-edit/post-edit.component";
import { LoginComponent } from "./auth/login/login.component";
import { RegisterComponent } from "./auth/register/register.component";

const routes:Routes = [
  { path: '', component: WelcomeComponent},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'create', component: PostCreateComponent},
  { path: 'posts', component: PostListComponent},
  { path: 'edit', component: PostEditComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule{}
