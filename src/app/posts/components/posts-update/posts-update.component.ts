import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Post } from '../../model/post';
import { PostsService } from '../../service/posts.service';

@Component({
  selector: 'app-posts-update',
  templateUrl: './posts-update.component.html'
})
export class PostsUpdateComponent implements OnInit {

  post?:Post;

  form = new FormGroup({});

  constructor(private postservice: PostsService, private router:Router) { 
    this.post = postservice.getPost();
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      id:new FormControl(this.post?.id,Validators.required),
      titulo:new FormControl(this.post?.titulo,Validators.required),
      descricao:new FormControl(this.post?.descricao,Validators.required)
    });
  }

  put(){
    this.postservice.put(this.form.value).subscribe((response:any)=>{
      if(response.success){
        this.router.navigateByUrl('/list-posts');
        return;
      }
    }, error => {
      if(error.error.success==false || error.error.status==403){
        localStorage.setItem('accessToken','');
        this.router.navigate(['/']);
      }
    });
  }

}
