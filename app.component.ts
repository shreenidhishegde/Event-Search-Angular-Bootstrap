import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AppServiceService } from './app-service.service';
import { FormBuilder, FormGroup, FormArray, FormControl, ValidatorFn } from '@angular/forms';
import { UserInput } from './user-input';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'entertainmentsearch';
  data: any;
  disabled_result = true;
  res_zip: any;
  topics = []
  userModel = new UserInput('a','b','c','d','here','other','e');
  
  //private _url: string = "https://ipinfo.io/?token=9a9ba7ac631a53";
  _url = "https://ipinfo.io/?token=9a9ba7ac631a53";
  constructor(private http: HttpClient, private service: AppServiceService ){}

  // getIPInfo(){
  //   //return this.http.get(this._url);
  //     //console.log("hello")
  //     this.http.get(this._url).subscribe((res)=>{
  //     this.data = res
  //     this.disabled_result = false;
  //     }, 
  //     (error)=>{
  //       console.log('the error is',error)
  //     })
  //   }

    update(){}

    // onSubmit()
    // {
    //   console.log(this.userModel);
    // }

    ngOnInit(){
      //this.getIPInfo();
      this.update();
     // this.getResults();
    }
}