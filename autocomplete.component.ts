import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { debounceTime } from 'rxjs/operators';
import { AutocompleteServiceService } from './autocomplete-service.service';
import { getMatScrollStrategyAlreadyAttachedError } from '@angular/cdk/overlay/scroll/scroll-strategy';
import { UserInput } from '../user-input';
import { type } from 'jquery';
import { AppState } from '../models/appState.model';
import { stringify } from '@angular/compiler/src/util';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatRadioModule} from '@angular/material/radio';
import { trigger, state, style, animate, transition } from '@angular/animations';
import {ViewChild} from '@angular/core';
//import {ModalDirective} from 'angular-bootstrap-md';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.css'],
  animations: [
    trigger('flyIn', [
      // state('flyIn', style({ transform: 'translateX(0)' })),
      transition('void=>*', [
        style({ transform: 'translateX(-100%)' }),
        animate('0.5s 300ms ease-in')
      ]),
      transition('*=>void', [
        animate('0.5s ease-out', style({ transform: 'translateX(100%)' }))
      ])
    ])
 ]
  
})
export class AutocompleteComponent implements OnInit {
  text_inp: string = '';
  show_data: string = '';
  keywordHistory: string[] = [];
  showHistory:any;
  userModel = new UserInput('','default','10','miles','here','','');
  //userModel = new UserInput();
  _url = "https://ipinfo.io/?token=9a9ba7ac631a53";
  data: any;
  loc_here :any;
  loc_stat:any;
  loc_details:any;
  disabled_result = true;
  res_zip: any;
  text='';
  auto_result = [];
  fin_res :string[]=[];
  lat='';
  long='';
  hash:any;
  event_name :string[]=[];
  event_url : string[]=[];
  date :string[]=[];
  category :string[]=[];
  venueinfo :string[]=[];
  disableDetailButton = true;
  haveError = true;
  resultActive = true;
  progressDisp = true;
  progressBarState = 'out';
  event_id :string[]=[];
  event_details : any;
  artDisp=true;
  loading_bar = true;
  main_event = true;
  spot_data:any;
  spotify_check=false;
  twitter_text : any;
  enableDetailsButton : any;
  api_error = false;
  no_records = false;
  loc_bool = true;
  ven_loc_lat : any;
  ven_loc_long : any;
  url_seat="";
  fav_data:any=[];
  fav=false;
  

  constructor(private http: HttpClient, private service: AutocompleteServiceService) { }

  ngOnInit(): void {
    // this.showHistory=['test1','test2','test3']
      //return this.http.get(this._url);
        //console.log("hello")
        this.http.get(this._url).subscribe((res)=>{
        this.data = res
        console.log(this.data['loc'])
        this.loc_here = this.data['loc']
        this.disabled_result = false;
        }, 
        (error)=>{
          console.log('the error is',error)
        })
      
  }
  onKeyUp(x:Event) { // appending the updated value to the variable
    //this.text += x.target.value + ' | ';
    //alert(this.loc_here);
    //alert(x)
    this.res_zip = this.getKeyword(this.userModel.keyword)//this.text_inp)
    //alert(JSON.stringify(this.res_zip))
    //alert(this.show_data)
  }

  update(){
    this.userModel = new UserInput(' ','default','10','miles','here','there','');
    //this.userModel.keyword
    this.artDisp = true;
    this.haveError = true;
    this.main_event = true;
    this.api_error = false;
    this.no_records = false;
    this.loc_bool = true;
  }
  
  async getKeyword(text_inp:any){
    //alert(text_inp)
    let value_key = await fetch('/api/keyword/'+text_inp).then(response => response.json()).then(data => {
      //console.log(data)
      // return data
    // this.service.getData(text_inp).subscribe((response) =>{
    //   this.res_zip = response
    //   console.log("Response from API", response)
    //alert(JSON.stringify(data))
     this.auto_result =  JSON.parse(JSON.stringify(data))._embedded.attractions
     //alert(JSON.stringify(this.auto_result))
     //this.auto_result =  JSON.parse(data)._embedded.attractions[0].name
       for (var i = 0; i < this.auto_result.length; i++) {
         this.fin_res.push(JSON.parse(JSON.stringify(this.auto_result[i])).name)
       } 
      //alert(JSON.stringify(this.fin_res))
      //for (var i = 0; i < this.fin_res.length; i++) {
      //}
      //this.show_data = JSON.stringify(response);
      //console.log(data)
      return this.fin_res
    }).catch(error => console.log(error))//this.api_error=true)
    //return value_key
  }

  async onSubmit(testkey:any)
  {
    this.loading_bar = false; 
    
    //console.log(testkey.keyword)//INPUT
    this.lat = (this.loc_here).split(",")[0]
    this.long = (this.loc_here).split(",")[1]
    let value = await fetch('/api/geohash/'+this.lat+'/'+this.long).then(response => response.json()).then(data => {
        
      this.hash = data
      //alert(JSON.stringify(this.hash))
      //this.showHistory =  (data)
      this.loc_details = this.hash.url
      //alert(this.hash)
       console.log(data)//OUTPUT
       return data
     }).catch(error => console.log ("error is", error)
     )
    if (this.loc_stat ==='here'){
      //alert((this.loc_here).split(",")[0]) //latitude
      //alert((this.loc_here).split(",")[1]) //longitude
      this.lat = (this.loc_here).split(",")[0]
      this.long = (this.loc_here).split(",")[1]
      

      let value = await fetch('/api/geohash/'+this.lat+'/'+this.long).then(response => response.json()).then(data => {
        
        this.hash = data
        //alert(JSON.stringify(this.hash))
        //this.showHistory =  (data)
        this.loc_details = this.hash.url
        //alert(this.hash)
         console.log(data)//OUTPUT
         return data
       }).catch(error => console.log ("error is", error)
       )
       //alert(value)
      
    }
    else if (this.loc_stat === 'other'){
      //alert(testkey.location)
      let value1 = await fetch('/api/googleapi/'+testkey.location).then(response => response.json()).then(data => {
        //alert(typeof(data))
        //this.showHistory =  (data)
        this.loc_details = data
        //alert(JSON.stringify(this.loc_details.results[0].geometry.location))
        this.lat = this.loc_details.results[0].geometry.location.lat
        this.long = this.loc_details.results[0].geometry.location.lng
         //console.log(JSON.stringify(this.loc_details))//OUTPUT
         return JSON.stringify(data)
       }).catch(error => console.log ("error is", error));

       let value = await fetch('/api/geohash/'+this.lat+'/'+this.long).then(response => response.json()).then(data => {
        this.hash = data
        //alert(this.hash.data)
        //this.showHistory =  (data)
        this.loc_details = this.hash.url
         console.log(data)//OUTPUT
         return data
       }).catch(error => console.log ("error is", error));
       
    }
    this.sleep(10000)
    this.loading_bar = true; 
    var search_r = await fetch('/api/searchresult/'+testkey.keyword+'/'+testkey.category+'/'+testkey.distancevalue+'/'+testkey.measureType+'/'+this.hash.url).then(response => response.json()).then(data => {
   
     //alert(typeof(data))
     this.showHistory =  data
     if (this.showHistory._embedded == undefined){
       this.no_records = true;
       this.main_event = true; // not of main event hence div main div not displayed
       return
     }
     else{this.main_event = false;} // not of main event hence div main will be displayed

     //alert(JSON.stringify(this.showHistory))
     //for i in range(len(data)):
     //alert(JSON.stringify(this.showHistory._embedded.events[1].name));
     var concat_cat = '';
     this.event_name = [];
     //alert(this.showHistory)
     for (let i = 0; i < this.showHistory._embedded.events.length; i++) {
      concat_cat = ''
       if (this.showHistory._embedded.events[i].name != undefined){
          this.event_name.push(this.showHistory._embedded.events[i].name);
        } //OUTPUT
      else if (this.showHistory._embedded.events[i].name = undefined){
          this.event_name.push("");
        }
      this.event_url.push(this.showHistory._embedded.events[i].url);
      this.event_id.push(this.showHistory._embedded.events[i].id);

      this.date.push(this.showHistory._embedded.events[i].dates.start.localDate.concat(" ".concat(this.showHistory._embedded.events[i].dates.start.localTime)));//']+" "+this.showHistory[i]['dates']['start']['localTime']
      if (this.showHistory._embedded.events[i].classifications[0].subGenre.name != 'undefined'){
        concat_cat += this.showHistory._embedded.events[i].classifications[0].subGenre.name + " | "
      }
      else if (this.showHistory._embedded.events[i].classifications[0].genre.name != 'undefined'){
        concat_cat += this.showHistory._embedded.events[i].classifications[0].genre.name + " | "
      }
      else if (this.showHistory._embedded.events[i].classifications[0].segment.name != 'undefined'){
        concat_cat += this.showHistory._embedded.events[i].classifications[0].segment.name + " | "
      }
      else if (this.showHistory._embedded.events[i].classifications[0].subType.name != 'undefined'){
        concat_cat += this.showHistory._embedded.events[i].classifications[0].subType.name + " | "
      }
      else if (this.showHistory._embedded.events[i].classifications[0].type.name != 'undefined'){
        concat_cat += this.showHistory._embedded.events[i].classifications[0].subType.name
      }
      //alert(concat_cat.length)
      var dummy = ''
      if (concat_cat.slice(-2) == '|')
      { dummy = concat_cat.slice(0,-3)
        concat_cat = dummy}

      this.category.push(concat_cat);//this.showHistory._embedded.events[i].classifications[0].segment.name);
      this.venueinfo.push(this.showHistory._embedded.events[i]._embedded.venues[0].name);
      //alert(typeof(this.event_name))
     
     }
     console.log(this.event_url);
     this.haveError = false;
     //alert(this.date)
     //(document.getElementById('test_p') as HTMLImageElement).innerHTML = JSON.parse(JSON.stringify(this.event_name))[0];
      return JSON.stringify(data)
    }).catch(error => console.log ("error is", error))
    //alert("i'm here")
  
}

prev_def(event:Event,url:string){
  //alert(JSON.stringify(event))
  //event.preventDefault();
  this.url_seat = url;
}
async eventsFetch(event_id_separate:String){
  //console.log(typeof(event_id_separate));
  
  //alert(event_id_separate);
  let ev_det = await fetch('/api/eventdetails/'+event_id_separate).then(response => response.json()).then(data => {
    //alert(JSON.stringify(data))
    this.event_details = data
    this.ven_loc_lat = parseFloat(this.event_details._embedded.venues[0].location.latitude)
    this.ven_loc_long = parseFloat(this.event_details._embedded.venues[0].location.longitude)
  
    
     return this.event_details
   }).catch(error => console.log ("error is", error));
   //alert(ev_det)
   
  //alert(this.event_details._embedded.attractions[0].name)
  let ev_det_1 = await fetch('http://localhost:3080/spotify?Keyword='+this.event_details._embedded.attractions[0].name)
  //  fetch('http://localhost:3080/spotify?Keyword='+this.event_details._embedded.attractions[0].name)
  //  //let ev_det_1 = await fetch('http://localhost:3080/spotify?Keyword=angeles')
  .then(response => response.json()).then(data => {
	//alert(JSON.stringify(data))
  this.spot_data = data.artists.items;
  //alert(JSON.stringify(this.spot_data))
  //alert(this.event_details._embedded.attractions[0].name)
		this.spotify_check=false;
    }).catch(error => console.log ("error is", error));

   
    //alert(ev_det_1)
  //this.haveError = true;
  this.main_event = true;
   this.artDisp = false; 
   this.recent_detail();
   //(document.getElementById(id) as HTMLElement).className = 'container tab-pane active';
  //(document.getElementById('Artist1') as HTMLElement).className = 'container tab-pane';
  //(document.getElementById('Venue') as HTMLElement).className = 'container tab-pane';
   //alert(this.twitter_text)
   //alert("display") 
  //  this.recent_detail()
   
  //  let map: google.maps.Map;

  //  function initMap(): void {
  //    map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
  //      center: { lat: -34.397, lng: 150.644 },
  //      zoom: 8,
  //    });
  //  }
  //alert('display')
}

list_details(lis_d:string){
  if (lis_d == 'list'){
    //alert("list")
    this.main_event = this.main_event?false:true;
    this.artDisp = this.artDisp?false: true;
    
  }
  else if (lis_d == 'details'){

    this.artDisp = false;
    this.main_event = true;
  }
}

sleep(milliseconds:number) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}


check_artist_team(id:string)
{
  //alert(id)
  if (id == 'Event')
  {(document.getElementById(id) as HTMLElement).className = 'container tab-pane active';
  (document.getElementById('Artist1') as HTMLElement).className = 'container tab-pane';
  (document.getElementById('Venue') as HTMLElement).className = 'container tab-pane';
  ///////////////////////////////
  (document.getElementById('Event_tab') as HTMLElement).className = 'nav-link active';
  (document.getElementById('Artist1_tab') as HTMLElement).className = 'nav-link';
  (document.getElementById('Venue_tab') as HTMLElement).className = 'nav-link';

  }
  else if (id == 'Artist1')
  {(document.getElementById(id) as HTMLElement).className = 'container tab-pane active';
  (document.getElementById('Event') as HTMLElement).className = 'container tab-pane';
  (document.getElementById('Venue') as HTMLElement).className = 'container tab-pane';
  ///////////
  (document.getElementById('Artist1_tab') as HTMLElement).className = 'nav-link active';
  (document.getElementById('Event_tab') as HTMLElement).className = 'nav-link';
  (document.getElementById('Venue_tab') as HTMLElement).className = 'nav-link';
  }
  else if (id == 'Venue')
  {(document.getElementById(id) as HTMLElement).className = 'container tab-pane active';
  (document.getElementById('Artist1') as HTMLElement).className = 'container tab-pane';
  (document.getElementById('Event') as HTMLElement).className = 'container tab-pane';
  /////////
  (document.getElementById('Venue_tab') as HTMLElement).className = 'nav-link active';
  (document.getElementById('Artist1_tab') as HTMLElement).className = 'nav-link';
  (document.getElementById('Event_tab') as HTMLElement).className = 'nav-link';
  }


	//params.Keyword=$scope.detailsEvent._embedded.attractions[0].name;
	//$http.get("http://nodealekhya-env.eejrfgdrsx.us-east-2.elasticbeanstalk.com/spotify?Keyword="+params.Keyword)
	// fetch('/spotify?Keyword=angeles')
  // .then(response => response.json()).then(data => {
	// alert(JSON.stringify(data))
  // this.spot_data = data.items;
	// 	this.spotify_check=false;
  //   }).catch(error => console.log ("error is", error));
}

locationMethodChange(locstat:string){
  if (locstat === 'here')
  {
    this.loc_stat = 'here'
    this.loc_bool = true;
  }
  else if (locstat === 'other')
  {
    this.loc_stat = 'other';
    this.loc_bool = false;
  }
}

toggle(){
  //this.loc_bool = !this.loc_bool;
}

detailButtonClicked(){
  //alert("disabled")
}

changeState(){
  //alert("changstate")
}

recent_detail () 
	{
		this.twitter_text = "https://twitter.com/intent/tweet?text=Check out "+this.event_details.name+" located at "+this.event_details._embedded.venues[0].name+"&hashtags=CSCI571EventSearch";
  }
list_function () 
{
      
  }
  isFav(id:String){
    return Object.keys(JSON.parse(localStorage.getItem(id.toString() )|| '{}')).length !=0;
  }
  setFav(id:string, data:any){
    if(this.isFav(id)!=true){
    console.log("item added");
    //localStorage.setItem(id,JSON.stringify(data));
    localStorage.setItem(id,JSON.stringify(data))

    this.fav_data.push(JSON.parse(JSON.stringify(data)))
  }
  else{
    console.log("Item removed");
    localStorage.removeItem(id);
  }
  }

  toggleDiv()
  {
    this.main_event = this.main_event? true:false;
    this.artDisp = this.artDisp? true:false;
  }

  favorites_change(){
    //alert("fav clicked")
    this.fav = true;
    this.main_event = true;
    (document.getElementById("result_button") as HTMLElement).className = "btn btn-link";
    (document.getElementById("favor_button") as HTMLElement).className = "btn btn-primary";
    //this.main_event = this.main_event?false:true;
    this.artDisp = true;
  }

  results_change(){
    //alert("results clicked")
    this.fav = false;
    this.main_event = false;
    (document.getElementById("result_button") as HTMLElement).className = "btn btn-primary";
    (document.getElementById("favor_button") as HTMLElement).className = "btn btn-link";
  }

  // setFav(event : Event):void{
  //   event.preventDefault()
  //   this.event_details.dates.start.localTime= this.returnedEventData['Date']
  //   this.event_details.id = this.currentEventId
  //   this.event_details.name = this.currentEvent
  //   this.event_details.classifications[0].genre.name = this.returnedEventData['Genres']
  //   event_details._embedded.venues[0].name = this.returnedEventData['Venue']
  //   this.myStorage.setItem(this.currentEventId,JSON.stringify(this.eventDataObject))
  //   console.log('set fav called',this.myStorage.getItem(this.currentEventId))
  //   console.log('ids as of now',this.myStorage.getItem('idString'))
  //   if (this.myStorage.getItem('idString')!=null){
  //     var arr = JSON.parse(this.myStorage.getItem('idString'))
  //     console.log("list has",arr.includes(this.currentEventId))
  //     console.log("not of it",!arr.includes(this.currentEventId))
  //     if (!arr.includes(this.currentEventId)){
  //       arr.push(this.currentEventId)
  //     }
  //     else{
  //       const index = arr.indexOf(this.currentEventId, 0);
  //       if (index > -1) {
  //         arr.splice(index, 1);
  //         this.myStorage.removeItem(this.currentEventId)
  //     }

  //     }

  //     console.log("list now has",arr.includes(this.currentEventId))
  //     this.myStorage.setItem('idString',JSON.stringify(arr))
  //   }
  //   else{
  //     var narr = []
  //     narr.push(this.currentEventId)
  //     this.myStorage.setItem('idString',JSON.stringify(narr))
  //   }
  //   console.log('set fav called',this.myStorage.getItem('idString'))
  // }

  // onFav(){
  //   this.ClickDetail = false;
  //   this.clickFav = true;
  //   this.eventtab = false;
  //   this.toggle(true);
    
  //   }
    
    // this.allfav = [];
    // var keys = object.keys(localStorage);
    
    // for (var temp of keys)
    // {
    //     var xdata = JSON.parse(localStorage.getItem(temp.toString()) || '{}');
    //     this.allfav.push(xdata);
    
    // }


  // enableDetails(event) 
	// {
	// 	enableDetailsButton = true;
	// 	event_details = event;
	// 	current_x=event;
	// 	ven_loc=[$scope.detailsEvent._embedded.venues[0].location.latitude, $scope.detailsEvent._embedded.venues[0].location.longitude];
	// 	if(this.current_x.name in this.favor)
	// 	{
  //           document.getElementById("check_star").classList.remove("fa-star-o");
			
  //           document.getElementById("check_star").classList.add("fa-star");
  //       }
  //       else
	// 	{
  //           document.getElementById("check_star").classList.remove("fa-star");
			
  //           document.getElementById("check_star").classList.add("fa-star-o");
  //       }
	// }
	// recent_detail() 
	// {
  //       this.show_detail = true;
	// 	this.twitter_text = "https://twitter.com/intent/tweet?text=Check out "+this.event_details.name+" locate at "+this.event_details.name+". Website:"+this.event_details.url;
  //   }
}