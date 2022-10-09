import { Component, OnInit } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  showAddProduct: boolean | undefined;
  subscription: Subscription | undefined;

  constructor(private uiService: UiService) { 
    this.subscription = this.uiService.onToggle().subscribe((value) => this.showAddProduct = value);
  }

  ngOnInit(): void {
  }

  toggleAddProduct() {
    this.uiService.toggleShowAddProduct();
  }

}
