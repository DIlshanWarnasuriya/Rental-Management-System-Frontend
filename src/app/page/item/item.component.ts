import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2'

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
    available: ""
  }

  loadTable(){
    fetch("http://localhost:8080/item")
      .then(res => res.json())
      .then(data => this.itemList = data)
  }

  //------------------------------------- Add Item ---------------------------------------

  addItem() {
    if (this.item.name == "" || this.item.rentalPerDay == "" || this.item.finePerDay == "") {
      Swal.fire({
        title: "Please enter all data",
        icon: "warning"
      });
    }
    else {
      this.item.available = true;
      fetch("http://localhost:8080/item", {
        method: "POST",
        body: JSON.stringify(this.item),
        headers: {
          "content-type": "application/json"
        }
      })
        .then(res => res.json())
        .then(data => {
          this.loadTable();
          Swal.fire({
            title: data.name + " Added Success",
            icon: "success"
          });
        })
    }
  }

  cleanAddItemFields() {
    this.item.id = "";
    this.item.name = "";
    this.item.rentalPerDay = "";
    this.item.finePerDay = "";
    this.item.available = "";
  }















}
