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
export class ItemComponent implements OnInit {

  ngOnInit(): void {
    this.loadTable();
  }

  public itemList: any = null;

  public item: any = {
    id: "",
    name: "",
    rentalPerDay: "",
    finePerDay: "",
    available: ""
  }

  loadTable() {
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


  //------------------------------------- Update Item ---------------------------------------

  editItem(id: String) {
    fetch("http://localhost:8080/item/" + id)
      .then(res => res.json())
      .then(data => {
        this.item.id = data.id;
        this.item.name = data.name;
        this.item.rentalPerDay = data.rentalPerDay;
        this.item.finePerDay = data.finePerDay;
        this.item.available = data.available;
      })
  }

  updateItem() {
    if (this.item.name == "" || this.item.rentalPerDay == "" || this.item.finePerDay == "") {
      Swal.fire({
        title: "Please enter all data",
        icon: "warning"
      });
    }
    else {
      fetch("http://localhost:8080/item", {
        method: "PATCH",
        body: JSON.stringify(this.item),
        headers: {
          "content-type": "application/json"
        }
      })
        .then(res => res.json())
        .then(data => {
          this.loadTable();
          Swal.fire({
            title: data.name + " Update Success",
            icon: "success"
          });
        })
    }
  }


  //------------------------------------- Delete Item ---------------------------------------

  deleteItem(id: String) {

    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#5d6369",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {

        fetch("http://localhost:8080/item/" + id, {
          method: "DELETE"
        })
          .then(res => res.json())
          .then(data => {
            this.loadTable();
          })

        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      }
    });
  }













}
