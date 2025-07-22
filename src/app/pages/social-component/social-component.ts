import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ApiLoader } from '../../services/api-loader';
import { PostsModel } from '../../interface/profile.model';

@Component({
  selector: 'app-social-component',
  standalone: false,
  templateUrl: './social-component.html',
  styleUrl: './social-component.scss',
})
export class SocialComponent implements OnInit, OnDestroy {
  posts: PostsModel[] = [];
  errorMessagePosts = '';
  isPosting = false;
  isEditing = false;

  newPost: PostsModel = {
    userid: 1,
    id: 1,
    title: '',
    body: '',
  };

  private destroy$ = new Subject<void>();

  constructor(private api: ApiLoader, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.loadPosts();
  }

  TogglePost() {
    this.isPosting = !this.isPosting;
  }

  addPost() {
    if (!this.newPost.title || !this.newPost.body) return;

    this.api
      .addPost(this.newPost)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (createdPost) => {
          this.posts.unshift({
            ...createdPost,
            isEditing: false,
            editedTitle: createdPost.title,
            editedBody: createdPost.body,
          });

          this.newPost = { userid: 1, id: 1, title: '', body: '' };
          this.cdr.detectChanges();
        },
        complete: () => {
          console.log('Add post request completed');
        },
      });
  }

  enableEdit(post: PostsModel) {
    post.isEditing = true;
  }

  cancelEdit(post: PostsModel) {
    post.isEditing = false;
    post.editedTitle = post.title;
    post.editedBody = post.body;
    this.errorMessagePosts=''
  }

  saveEdit(post: PostsModel) {
  this.api
    .editPost(post.id, {
      userid: post.userid,
      title: post.editedTitle || post.title,
      body: post.editedBody || post.body,
    })
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (updatedPost) => {
        if (!updatedPost || !updatedPost.title || !updatedPost.body) {
          console.error('Edit response is invalid:', updatedPost);
          this.errorMessagePosts = 'Edit failed: invalid response';
          this.newPost.body=''
          this.newPost.title=''
          return;
        }

        post.title = updatedPost.title;
        post.body = updatedPost.body;
        post.isEditing = false;
      },
      complete: () => {
        console.log('Edit post request completed');
      },
    });
}


  loadPosts() {
    this.api
      .getPosts()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (posts) => {
          this.posts = posts.map((post) => ({
            ...post,
            isEditing: false,
            editedTitle: post.title,
            editedBody: post.body,
          }));

          this.posts = this.posts.slice(0, 10);
        },
        error: () => {
          this.errorMessagePosts = 'Failed to load posts';
        },
        complete: () => {
          console.log('Load posts request completed');
        },
      });
  }

  deletePost(index: number) {
    const post = this.posts[index];
    this.api
      .deletePost(post.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.posts = this.posts.filter((p) => post.id !== p.id);
          console.log(post.id);
          console.log(this.posts);
        },
        complete: () => {
          console.log('Delete post request completed');
        },
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
