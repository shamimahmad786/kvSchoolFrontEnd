import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-progresion-bar',
  templateUrl: './progresion-bar.component.html',
  styleUrls: ['./progresion-bar.component.css']
})
export class ProgresionBarComponent implements OnInit {
  currentUrl: any;
  profilePage: boolean = false;
  experiencePage: boolean = false;
  uploadPage: boolean = false;
  leaveManagmentPage: boolean = false;
  constructor(private route: ActivatedRoute ) { }

  ngOnInit(): void {
   
   this.route.url.subscribe(url =>{
    if(url[0].path=='basicProfile')
    {
    this.profilePage=true;
    this.experiencePage=false;
    this.leaveManagmentPage=false;
    this.uploadPage=false;
    }
    if(url[0].path=='workExperience')
    {
    this.profilePage=true;
    this.experiencePage=true;
    this.leaveManagmentPage=false;
    this.uploadPage=false;
    }
    if(url[0].path=='leaveMangement')
    {
    this.profilePage=true;
    this.experiencePage=true;
    this.leaveManagmentPage=true;
    this.uploadPage=false;
    }
    if(url[0].path=='previewConfirm')
    {
    this.profilePage=true;
    this.experiencePage=true;
    this.leaveManagmentPage=true;
    this.uploadPage=true;
    }
   
    });
  }

}
