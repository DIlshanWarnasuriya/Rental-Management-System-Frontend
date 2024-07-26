import { NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-navigation-bar',
  standalone: true,
  imports: [NgClass, RouterLink],
  templateUrl: './navigation-bar.component.html',
  styleUrl: './navigation-bar.component.css'
})
export class NavigationBarComponent implements OnInit{
    
  public selectPage: String = ""

  constructor(private location: Location){}
  
  ngOnInit(): void {
    this.selectPage = this.location.path();
  }

  clickButton(page: String){
    this.selectPage = page;
  }
}
