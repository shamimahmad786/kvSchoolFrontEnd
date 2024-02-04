import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-transfer-progresion-bar',
  templateUrl: './transfer-progresion-bar.component.html',
  styleUrls: ['./transfer-progresion-bar.component.css']
})
export class TransferProgresionBarComponent implements OnInit {
  currentUrl: any;
  profileVerifiation: boolean = false;
  miscellaneousPge: boolean = false;
  stationChoicepage: boolean = false;
  displacementCountPage: boolean = false;
  transferCountPage: boolean = false;
  previewAndUndertakingPage: boolean = false;
  constructor(private route: ActivatedRoute ) { }

  ngOnInit(): void {
   
    this.route.url.subscribe(url =>{
     if(url[0].path=='kvsTchMiscellaneous')
     {
       this.miscellaneousPge=true;
       this.stationChoicepage=false;
       this.previewAndUndertakingPage=false;
     }
     if(url[0].path=='kvsTchStationChoice')
     {
       this.miscellaneousPge=true;
       this.stationChoicepage=true;
       this.previewAndUndertakingPage=false;
     }
     
     if(url[0].path=='kvsTchPreviewUndertaking')
     {
       this.miscellaneousPge=true;
       this.stationChoicepage=true;
       this.previewAndUndertakingPage=true;
     }
     });
   }

}
