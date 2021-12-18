import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ProductsService } from '../shared/services/products.service';
import { Categories } from '../shared/models/categories';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'ed-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {
  user = JSON.parse(localStorage.getItem('currentUser'));
  iduser = this.user.user_id;
  fileName = '';
  
  form: FormGroup = new FormGroup({
    titulo:new FormControl(''),
    marca:new FormControl(''),
    descripcion:new FormControl(''),
    estado:new FormControl(''),
    imagen:new FormControl(''),
    vigente:new FormControl(true),
    idcategoria:new FormControl(''),
    iduser:new FormControl(this.iduser),
    identrega: new FormControl(1)
  });

  categories: Categories[];
  
  
  constructor(private service:ProductsService,
              private route:Router,
              private snackBar: MatSnackBar,
              private sanitizer: DomSanitizer,
              private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.loadCategories();
  }

  isDisabled = false;
  submit(){
    if (this.form.valid){
      this.isDisabled = true;
      const PRODUCT = this.form.value;
      console.log(this.form.value)
      this.service.add(PRODUCT)
        .subscribe(result =>{
          this.route.navigate(['']);
          this.snackBar.open('Artículo Añadido', 'Cerrar',{
            duration: 3000 //milisegundos
          })
      });
          
    }
    else{
      console.log('form invalido');
    }
  }

  onFileSelected(event) {
    
    let reader = new FileReader()
    if (event.target.files && event.target.files.length) {

      const [file] = event.target.files;
      reader.readAsDataURL(file);
      
      reader.onload = () => {
        this.form.patchValue({
          imagen: reader.result
        });

        console.log(this.form.value.imagen)
        this.cd.markForCheck();
      };
      this.fileName = event.target.files[0].name;
      //this.img = file;
      console.log(this.form.value)
    }
}

  private loadCategories(){
    this.service.getCat()
    .subscribe(data => {
      this.categories = data;
      //console.log(data)
    });
  }

  cancel(){
    this.route.navigate(['']);
  }
}
