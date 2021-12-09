import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/products/shared/services/auth.service';
import { Router, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

@Component({
  selector: 'ed-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  constructor(private authService:AuthService){}
  ngOnInit(): void {
  }

  logout(){
    this.authService.logout();
  }
}
