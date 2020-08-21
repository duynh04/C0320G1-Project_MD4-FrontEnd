import {Component, OnInit} from '@angular/core';
import {Product} from '../../shared/models/product';
import {ActivatedRoute, Router} from '@angular/router';
import {AdminService} from '../../shared/services/admin.service';
import {ProductService} from '../../shared/services/product.service';

@Component({
  selector: 'app-admin-approvement',
  templateUrl: './admin-approvement.component.html',
  styleUrls: ['./admin-approvement.component.css']
})
export class AdminApprovementComponent implements OnInit {

  id: number;
  product: Product;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private adminService: AdminService) {
  }

// Thành Long
  ngOnInit() {
    this.id = this.route.snapshot.params.id;

    this.adminService.getProductById(this.id)
      .subscribe(data => {
        console.log(data);
        this.product = data;
      }, error => console.log(error));
  }

// Thành Long
  approvement() {
    this.adminService.approvementProduct(this.id)
      .subscribe(data => console.log(data), error => console.log(error));
    this.router.navigate(['product/list']);
  }

  // Thành Long
  unApprovement() {
    this.adminService.unApprovementProduct(this.product)
      .subscribe(data => console.log(data), error => console.log(error));
    this.router.navigate(['product/list']);
  }

  // Thành Long
  list() {
    this.router.navigate(['product/list']);
  }
}
