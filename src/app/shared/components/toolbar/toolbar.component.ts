import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/products/shared/services/auth.service';
import { Router, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { stringify } from 'querystring';


@Component({
  selector: 'ed-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  @Input() user:String;
  

  constructor(private authService:AuthService){}
  ngOnInit(): void {
    let userJ = JSON.parse(localStorage.getItem('currentUser'));
    this.user = userJ.username;
    
  }

  logout(){
    this.authService.logout();
  }

  

}
