import { Component, OnInit } from '@angular/core';
import {ITEMS} from '../../../public/items'
import { Entry } from '../models/entry.model';

@Component({
  selector: 'app-items',
  standalone: false,
  templateUrl: './items.html',
  styleUrl: './items.scss'
})
export class Items implements OnInit {
  items : Entry[]=[];
  ngOnInit(): void {
    this.items=ITEMS;
  }


}
