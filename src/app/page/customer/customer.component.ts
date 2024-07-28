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

  ngOnInit(): void {
    this.loadTable();
  }

  public customerList: any = null;
  public searchData: String = "";

  public customer = {
    id: "",
    name: "",
    contact: "",
    city: ""
  }

  loadTable() {
    fetch("http://localhost:8080/customer")
      .then(res => res.json())
      .then(data => this.customerList = data)
  }


  //------------------------------------- Add Customer ---------------------------------------

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

  cleanAddCustomerFields() {
    this.customer.id = "";
    this.customer.name = "";
    this.customer.contact = "";
    this.customer.city = "";
  }


  //------------------------------------- Update Customer ---------------------------------------

  editCustomer(id: String) {
    fetch("http://localhost:8080/customer/" + id)
      .then(res => res.json())
      .then(data => {

        data.forEach((element: { id: any; name: any; contact: any; city: any; }) => {
          this.customer.id = element.id;
          this.customer.name = element.name;
          this.customer.contact = element.contact;
          this.customer.city = element.city;
        });
      })
  }

  updateCustomer() {
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


  //------------------------------------- Delete Customer ---------------------------------------

  deleteCustomer(id: String) {

    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#5d6369",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {

        fetch("http://localhost:8080/customer/" + id, {
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

  //------------------------------------- Search Customer ---------------------------------------

  searchCustomer() {

    fetch("http://localhost:8080/customer/" + this.searchData)
      .then(res => res.json())
      .then(data => this.customerList = data)
  }



}
