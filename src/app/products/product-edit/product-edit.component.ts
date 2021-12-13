import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../shared/services/products.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Categories } from '../shared/models/categories';
import { Estados } from '../shared/models/estados';

@Component({
  selector: 'ed-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  
  fileName = '';
  categories:Categories[];
  estados:Estados[];
  user = JSON.parse(localStorage.getItem('currentUser'));
  @Input() iduser:string = this.user.user_id;
  @Input() img;
  
  form: FormGroup = new FormGroup({
    titulo:new FormControl(''),
    marca:new FormControl(''),
    descripcion:new FormControl(''),
    estado:new FormControl(''),
    //imagen:new FormControl(''),
    vigente:new FormControl(true),
    idcategoria:new FormControl(''),
    identrega: new FormControl('')
  });
  

  id: string;
  constructor(private route:ActivatedRoute,
              private service:ProductsService,
              private router:Router,
              private snackBar: MatSnackBar,
              private cd:ChangeDetectorRef) { }

  ngOnInit(): void {
    this.loadCategories();
    this.loadEstado();
    this.id = this.route.snapshot.paramMap.get('id');
    this.service.get(this.id)
      .subscribe(product =>{
        // Con el patch value el encuentra solo las propiedades que hagan match

        this.form.patchValue(product)
        this.img = product.imagen
      });
    
  }

  submit(){
    if (this.form.valid){
      const product = this.form.value;
      product.id = parseInt(this.id);
      this.service.update(product)
        .subscribe();
        this.router.navigate(['list', this.iduser]);
        this.snackBar.open('Artículo Actualizado', 'Cerrar',{duration: 3000});
      
        console.log("_------")
      console.log(product)
    }
    
  }

  cancel(){
    this.router.navigate(['']);
  }

  private loadCategories(){
    this.service.getCat()
    .subscribe(data => {
      this.categories = data;
      //console.log(data)
    });
  }

  private loadEstado(){
    this.service.getStatus()
      .subscribe(data => {
        this.estados = data;
      });
  }
}
