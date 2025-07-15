import { Component, OnInit, OnDestroy } from '@angular/core';
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
    body: ''
  };

  private destroy$ = new Subject<void>();

  constructor(private api: ApiLoader) {}

  ngOnInit() {
    this.loadPosts();
  }

  TogglePost() {
    this.isPosting = !this.isPosting;
  }

  addPost() {
    if (!this.newPost.title || !this.newPost.body) return;

    this.api.addPost(this.newPost)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (createdPost) => {
          this.posts.unshift({ ...createdPost, isEditing: false, editedTitle: createdPost.title, editedBody: createdPost.body });
          this.newPost = { userid: 1, id: 1, title: '', body: '' };
        },
        error: () => {
          this.errorMessagePosts = 'Failed to add post';
        },
        complete: () => {
          console.log('Add post request completed');
        }
      });
  }

  enableEdit(post: PostsModel) {
    post.isEditing = true;
  }

  cancelEdit(post: PostsModel) {
    post.isEditing = false;
    post.editedTitle = post.title;
    post.editedBody = post.body;
  }

  saveEdit(post: PostsModel) {
    this.api.editPost(post.id, {
      userid: post.userid,
      title: post.editedTitle || post.title,
      body: post.editedBody || post.body,
    })
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (updatedPost) => {
        post.title = updatedPost.title;
        post.body = updatedPost.body;
        post.isEditing = false;
      },
      error: () => {
        this.errorMessagePosts = 'Failed to edit post';
      },
      complete: () => {
        console.log('Edit post request completed');
      }
    });
  }

  loadPosts() {
    this.api.getPosts()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (posts) => {
          this.posts = posts.map((post) => ({
            ...post,
            isEditing: false,
            editedTitle: post.title,
            editedBody: post.body
          }));
        },
        error: () => {
          this.errorMessagePosts = 'Failed to load posts';
        },
        complete: () => {
          console.log('Load posts request completed');
        }
      });
  }

  deletePost(index: number) {
    const post = this.posts[index];
    this.api.deletePost(post.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          //this.posts.splice(index, 1);
          this.posts=this.posts.filter(p=>post.id!==p.id)
          console.log(post.id)
          console.log(this.posts)
        },
        error: () => {
          this.errorMessagePosts = 'Failed to delete post';
        },
        complete: () => {
          console.log('Delete post request completed');
        }
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
