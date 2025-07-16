import { Component, OnInit } from '@angular/core';
import { ApiLoader } from '../../services/api-loader';

@Component({
  selector: 'app-cat-gallery',
  standalone: false,
  templateUrl: './cat-gallery.html',
  styleUrl: './cat-gallery.scss'
})
export class CatGallery implements OnInit {
  catImages: string[] = [];

  constructor(private catService: ApiLoader) {}

  ngOnInit(): void {
    this.catService.getCatImages().subscribe({
      next: (res) => {
        this.catImages = res.map(img => img.url);
      },
      error: (err) => {
        console.error('Failed to load cat images', err);
      }
    });
  }
}