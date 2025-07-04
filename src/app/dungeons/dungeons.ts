import { Component, OnInit } from '@angular/core';
import {DUNGEONS} from '../../../public/dungeons'
import { Entry } from '../models/entry.model';

@Component({
  selector: 'app-dungeons',
  standalone: false,
  templateUrl: './dungeons.html',
  styleUrl: './dungeons.scss'
})
export class Dungeons implements OnInit{
  dungeons : Entry[]=[];
  ngOnInit(): void {
    this.dungeons=DUNGEONS;
  }
}
