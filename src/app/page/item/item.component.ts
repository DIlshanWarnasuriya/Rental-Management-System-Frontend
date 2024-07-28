import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [FormsModule, NgFor],
  templateUrl: './item.component.html',
  styleUrl: './item.component.css'
})
export class ItemComponent implements OnInit{
  
  ngOnInit(): void {
    this.loadTable();
  }

  public itemList: any = null;

  public item:any = {
    id: "",
    name: "",
    rentalPerDay: "",
    finePerDay: "",
    available: ","
  }

  loadTable(){
    fetch("http://localhost:8080/item")
      .then(res => res.json())
      .then(data => this.itemList = data)
  }
















}
