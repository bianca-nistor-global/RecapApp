import { Component, OnInit } from '@angular/core';
import { Entry } from '../../models/entry.model';
import { ITEMS } from '../../../../public/items';

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
