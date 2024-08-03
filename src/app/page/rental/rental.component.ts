import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-rental',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule],
  templateUrl: './rental.component.html',
  styleUrl: './rental.component.css'
})
export class RentalComponent implements OnInit{
  
  public rentalList: any = null;
  public itemList: any = null;
  public customerList: any = null;

  daysDifference: number;

  constructor() {
    this.daysDifference = this.numberOfDays('2024-07-21', new Date().toISOString().split('T')[0]);
  }

  numberOfDays(startDate: string, endDate: string): number {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const differenceInMs = end.getTime() - start.getTime();
    const differenceInDays = Math.floor(differenceInMs / (1000 * 60 * 60 * 24));
    return differenceInDays;
  }

  ngOnInit(): void {
    this.loadTable();
    this.allItems();
    this.allCustomers();
  }

  public rental = {
    itemId: "",
    customerId: "",
    rentalDate: "",
    expectedDate: ""
  }

  loadTable(){
    fetch("http://localhost:8080/rental")
    .then(res => res.json())
    .then(data => {this.rentalList=data
      this.datesFix();
    }
    )
  }

  datesFix(){
    this.rentalList.forEach((element: any) => {
      if(element.rentalDate != null){
        element.rentalDate = new Date(element.rentalDate).toISOString().split('T')[0];
      }

      if(element.expectedDate != null){
        element.expectedDate = new Date(element.expectedDate).toISOString().split('T')[0];
      }

      if(element.returnDate != null){
        element.returnDate = new Date(element.returnDate).toISOString().split('T')[0];
      }
    });
  }

  allItems(){
    fetch("http://localhost:8080/item/available")
    .then(res => res.json())
    .then(data => this.itemList=data)
  }

  allCustomers(){
    fetch("http://localhost:8080/customer")
    .then(res => res.json())
    .then(data => this.customerList=data)
  }
 

  addRental(){

    
    if(this.rental.customerId=="" || this.rental.itemId=="" ||  this.rental.rentalDate=="" ||  this.rental.expectedDate==""){
      Swal.fire({
        title: "Please enter all data",
        icon: "warning"
      });
    }
    else if(this.numberOfDays(this.rental.rentalDate, this.rental.expectedDate) <= 0){
      Swal.fire({
        title: "Please enter walid rental and expected dates",
        icon: "warning"
      });
    }
    else{

      fetch("http://localhost:8080/rental", {
        method: "POST",
        body: JSON.stringify(this.rental),
        headers: {
          "content-type": "application/json"
        }
      })
      .then(res => res.json())
      .then(data => {
        if(data.id!=null){
          this.loadTable();
          Swal.fire({
            title: "Rental Added Success",
            icon: "success"
          });
        }
      })
      

      

      

    }
    
  }


  

  
}
