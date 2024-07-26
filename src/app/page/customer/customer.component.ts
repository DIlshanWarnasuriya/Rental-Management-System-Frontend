import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [NgFor, FormsModule],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent implements OnInit {

  public customerList: any = null;

  customer = {
    id: "",
    name: "",
    contact: "",
    city: ""
  }

  ngOnInit(): void {
    this.loadTable();
  }

  loadTable() {
    fetch("http://localhost:8080/customer")
      .then(res => res.json())
      .then(data => this.customerList = data)
  }

  addCustomer() {
    if (this.customer.name == "" || this.customer.contact == "" || this.customer.city == "") {
      Swal.fire({
        title: "Please enter all data",
        icon: "warning"
      });
    }
    else {
      fetch("http://localhost:8080/customer", {
        method: "POST",
        body: JSON.stringify(this.customer),
        headers: {
          "content-type" : "application/json"
        }
      })
        .then(res => res.json())
        .then(data => {
          this.loadTable();
          Swal.fire({
            title: data.name +  " Added Success",
            icon: "success"
          });
        })
    }
  }

  editCustomer(id:String){
    fetch("http://localhost:8080/customer/" + id)
    .then(res => res.json())
    .then(data => {
      this.customer.id = data.id;
      this.customer.name = data.name;
      this.customer.contact = data.contact;
      this.customer.city = data.city;
    })
  }

  updateCustomer(){
    if (this.customer.name == "" || this.customer.contact == "" || this.customer.city == "") {
      Swal.fire({
        title: "Please enter all data",
        icon: "warning"
      });
    }
    else {
      fetch("http://localhost:8080/customer", {
        method: "PATCH",
        body: JSON.stringify(this.customer),
        headers: {
          "content-type" : "application/json"
        }
      })
        .then(res => res.json())
        .then(data => {
          this.loadTable();
          Swal.fire({
            title: data.name +  " Update Success",
            icon: "success"
          });
        })
    }
  }

}
