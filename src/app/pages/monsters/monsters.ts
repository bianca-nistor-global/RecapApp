import { Component, OnInit } from '@angular/core';
import {MONSTERS} from '../../../../public/monsters'
import { Entry } from '../../models/entry.model';

@Component({
  selector: 'app-monsters',
  standalone: false,
  templateUrl: './monsters.html',
  styleUrl: './monsters.scss'
})
export class Monsters implements OnInit{
  monsters : Entry[]=[];
  ngOnInit(): void {
    this.monsters=MONSTERS
  }

}
