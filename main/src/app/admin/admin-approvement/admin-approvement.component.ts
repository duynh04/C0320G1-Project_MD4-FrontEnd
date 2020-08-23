import {Component, OnInit} from '@angular/core';
import {Product} from '../../shared/models/product';
import {ActivatedRoute, Router} from '@angular/router';
import {AdminService} from '../../shared/services/admin.service';

@Component({
  selector: 'app-admin-approvement',
  templateUrl: './admin-approvement.component.html',
  styleUrls: ['./admin-approvement.component.css']
})
export class AdminApprovementComponent implements OnInit {

  id: number;
  product: Product;
  text: any;
  banned: string;
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
    this.router.navigate(['admin/product-list']);
  }

  // Thành Long
  unApprovement() {
    this.id = this.route.snapshot.params.id;
    this.text = document.getElementById('banned');
    this.banned = this.text.value;
    if (this.banned) {
    this.adminService.unApprovementProduct(this.banned, this.id)
      .subscribe(data => console.log(data), error => console.log(error));
    }
    this.router.navigate(['admin/product-list']);
  }

  // Thành Long
  list() {
    this.router.navigate(['admin/product-list']);
  }
}
