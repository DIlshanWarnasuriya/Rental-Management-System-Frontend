import { Routes } from '@angular/router';
import { RentalComponent } from './page/rental/rental.component';
import { CustomerComponent } from './page/customer/customer.component';
import { ItemComponent } from './page/item/item.component';

export const routes: Routes = [
    {
        path: "",
        component: RentalComponent
    },
    {
        path: "rental",
        component: RentalComponent
    },
    {
        path: "customer",
        component: CustomerComponent
    },
    {
        path: "item",
        component: ItemComponent
    }
];
