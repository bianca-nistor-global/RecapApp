import { Component, OnInit } from '@angular/core';
import {BOSSES} from '../../../public/bosses'
import { Entry } from '../models/entry.model';


@Component({
  selector: 'app-bosses',
  standalone: false,
  templateUrl: './bosses.html',
  styleUrl: './bosses.scss'
})
export class Bosses implements OnInit {
  bosses: Entry[]=[];

  ngOnInit(): void {
    this.bosses=BOSSES;
  }
}
