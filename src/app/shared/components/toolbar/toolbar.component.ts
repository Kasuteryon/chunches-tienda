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
  @Input() id;

  constructor(private authService:AuthService,
              private router:Router){}

  ngOnInit(): void {
    if (localStorage.getItem('currentUser') === null){
      //this.router.navigate(['login']);
      console.log("Entro aqui krnkl");
      window.location.replace("/login");
    }else{
      let userJ = JSON.parse(localStorage.getItem('currentUser'));
      this.user = userJ.username;
      this.id = userJ.user_id;
    }
  }

  logout(){
    this.authService.logout();
  }

}
