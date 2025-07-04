import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.scss'
})
export class App {
  selectedComponent:string='home'

  setComponent(name: string){
    this.selectedComponent=name;
  }

  @ViewChild('sidenav') sidenav!: MatSidenav;
}
