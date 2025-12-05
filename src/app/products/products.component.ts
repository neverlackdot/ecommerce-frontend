import { Component, ElementRef, inject, ViewChild, viewChild } from '@angular/core';
import { ProductApiService } from '../service/product-api.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  loading = true;
error = false;
editMode=false;
editId:string|null=null;
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
      this.editMode = false;
  this.products.reset();  
}
  closeModal(){
    this.modal!.nativeElement.style.display='none'
}
saveProductDetails(){
  this.getProduct.saveProduct(this.products.value).subscribe((res)=>{
    alert("Product Added Successfully")
   this.getAllProduct()
    this.modal!.nativeElement.style.display='none'
  })
}

onDeleteProduct(product_id:string){
  this.getProduct.deleteProduct(product_id).subscribe({
    next:()=>{
      this.getAllProduct()
    },
    error(err) {
       console.error('Delete failed', err);
    },
  })
}
onEditProduct(product_id:any,products:any){
  this.editMode=true;
  this.editId=product_id;
  this.products.patchValue({
    title:products.title,
    image:products.image,
    description:products.description,
    price:products.price
  })
    this.editMode=true
  this.modal!.nativeElement.style.display='block'
}
onUpdateProduct(){
  
     this.getProduct.EditProduct(this.editId!,this.products.value).subscribe({
      next:()=>{
        this.getAllProduct();
        this.modal!.nativeElement.style.display='none';
        this.editMode=false;
        this.products.reset()
      alert("successful")
      },
      error(err) {
        console.log("not working")
      },
     })
   }
}
