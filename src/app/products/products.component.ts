import { Component, ElementRef, inject, ViewChild, viewChild } from '@angular/core';
import { ProductApiService } from '../service/product-api.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-products',
  imports: [ReactiveFormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  loading = true;
error = false;
Products:any[]=[]
products:FormGroup = new FormGroup({})
initializeForm(){

  this.products = new FormGroup({
    //  id: new FormControl("",Validators.required),
     title: new FormControl("",Validators.required),
     price: new FormControl("",Validators.required),
     description: new FormControl("",Validators.required),
    //  category: new FormControl("",Validators.required),
     image: new FormControl("",Validators.required),
  }) 
}
  // getProduct = inject(ProductApiService)
  constructor(private getProduct : ProductApiService){
this.initializeForm()
  }

ngOnInit():void{
  this.getAllProduct()
}

@ViewChild('newModal') modal:ElementRef | undefined
  getAllProduct(){
    this.getProduct.getProduct().subscribe({
  next:(data)=>{
     this.Products=data;
     this.loading=false;
  },
  error:(err)=>{
    this.error=true
    this.loading=false;
  }
    })
  }

  openModal(){
    this.modal!.nativeElement.style.display='block'
}
  closeModal(){
    this.modal!.nativeElement.style.display='none'
}
saveProductDetails(){
  this.getProduct.saveProduct(this.products.value).subscribe((res)=>{
    alert("Product Added Successfully")
   this.getAllProduct()
  })
}
}