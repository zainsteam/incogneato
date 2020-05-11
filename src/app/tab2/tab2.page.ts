import { Component, OnInit } from '@angular/core';
import { ListService } from '../service/list.service'
import { HttpClient } from '@angular/common/http';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  code: string;
  listitems: any = [];

  options: InAppBrowserOptions = {
    location: 'yes',//Or 'no' 
    hidden: 'no', //Or  'yes'
    clearcache: 'yes',
    clearsessioncache: 'yes',
    zoom: 'no',//Android only ,shows browser zoom controls 
    hardwareback: 'yes',
    mediaPlaybackRequiresUserAction: 'no',
    shouldPauseOnSuspend: 'no', //Android only 
    closebuttoncaption: 'Close', //iOS only
    disallowoverscroll: 'no', //iOS only 
    toolbar: 'yes', //iOS only 
    enableViewportScale: 'no', //iOS only 
    allowInlineMediaPlayback: 'no',//iOS only 
    presentationstyle: 'pagesheet',//iOS only 
    fullscreen: 'yes',//Windows only    
  };

  constructor(public apiprovider: ListService,
    private http: HttpClient,
    private iab: InAppBrowser,
    private activatedRoute: ActivatedRoute, 
    private router: Router) {
  }

  ngOnInit() {
    // this.fetchData();
    let abc= JSON.parse(this.activatedRoute.snapshot.paramMap.get('items'));
    this.listitems = abc;
    }

  open(item) {
    console.log(item.url);
    let target = "_blank";
    const browser = this.iab.create(item.url, target);

    // browser.executeScript(...);

    // browser.insertCSS(...);
    browser.on('loadstop').subscribe(event => {
      browser.insertCSS({ code: "body{color: red;" });
    });

    // browser.close();

  }

}
