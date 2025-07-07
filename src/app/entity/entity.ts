import { Component, Input } from '@angular/core';
import { Entry } from '../models/entry.model';

@Component({
  selector: 'app-entity',
  standalone: false,
  templateUrl: './entity.html',
  styleUrl: './entity.scss'
})
export class Entity {
  @Input() entity: Entry[]=[];
  @Input() title: string = '';
}
