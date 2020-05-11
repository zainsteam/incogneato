import { Component } from '@angular/core';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner/ngx';
import { ListService } from '../service/list.service'
import { ToastController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { createOfflineCompileUrlResolver } from '@angular/compiler';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';




@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  options :BarcodeScannerOptions;
  scanData:any={};
  code : string;
  listitems: any;
  flag: boolean;


  constructor(private barcodeScanner: BarcodeScanner,
    public apiprovider: ListService,
    public toastController: ToastController,
    private navCtrl: NavController) {
      this.flag = false;
      // this.presentToast('application start');
      // this.fetchData();
    }

    handleFirstNameValue(input){
      this.code = input;
      if(this.code.length == 7)
      {
        this.fetchData();
      }
    }

  barscan(){
    this.options =  {
      prompt : " Scan you QR code"
    };
    this.barcodeScanner.scan(this.options).then(barcodeData => {
      this.scanData = barcodeData;
      this.code = this.scanData.text;
      this.fetchData(); 
     }).catch(err => {
         console.log('Error', err);
     });
  }

   fetchData() {
    // this.code = "39120171";
    //Get saved list of students
     this.apiprovider.getList(this.code).subscribe(response => {
        console.log(response);
        this.listitems = response;
        this.flag = true;
        this.presentToast("code match successfully");
        this.navCtrl.navigateForward(['/tab2', {items: JSON.stringify(this.listitems)}] );      
    })
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 4000
    });
    toast.present();
  }

}
