import { Component, OnInit } from '@angular/core';
import { Entry } from '../../models/entry.model';
import {CHARACTERS} from '../../../../public/characters'

@Component({
  selector: 'app-characters',
  standalone: false,
  templateUrl: './characters.html',
  styleUrl: './characters.scss'
})
export class Characters implements OnInit {
  characters : Entry[]=[];
  ngOnInit(): void {
    this.characters=CHARACTERS;
  }
}
