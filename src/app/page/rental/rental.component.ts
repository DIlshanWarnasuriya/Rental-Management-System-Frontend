import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rental',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './rental.component.html',
  styleUrl: './rental.component.css'
})
export class RentalComponent implements OnInit{
  
  public rentalList: any = null;

  ngOnInit(): void {
    this.loadTable();
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



}
