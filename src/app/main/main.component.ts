import { Component, OnInit } from '@angular/core';
import { AccountDto } from './dto/account.dto';
import { MainService } from './main.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  transferAmount : number = 0;
  fromAccount : AccountDto = new AccountDto();
  toAccount : AccountDto = new AccountDto();
  isError : boolean;
  initError : string;
  commitError : string;
  view = 1;

  transactionRef;
  otpReceived;
  constructor(
    private mainService : MainService
  ) { }

  payForm : FormGroup

  ngOnInit() {
    this.payForm = new FormGroup({
      'amount' : new FormControl(0, Validators.required),
      'destination_wallet_id' : new FormControl(null, Validators.required),
      'pin' : new FormControl(null, Validators.required)

    })

    this.getAccounts()

  }

  onSubmit(){
    this.isError = false;
    this.mainService.initializeTransaction({...this.payForm.value, source_wallet_id : this.fromAccount.wallet_id}).subscribe((res : any) => {
      console.log(res)
          this.transactionRef = res.data.transactionReference;
          this.otpReceived = res.data.otp;
          this.view = 2;
    }, err => {
      this.isError = true;
      this.initError = err.error.message
    })
  }

  onFinalize(){
    this.mainService.commitTransaction(this.transactionRef, { otp : this.otpReceived}).subscribe((res : any) => {
          this.view = 3;
          this.isError = false;
          this.getAccounts()
    }, error => {
        this.commitError = error.error.message
        this.isError = true;
    })
  }

  reset(){
    this.view = 1;
    this.isError = false;
    this.otpReceived = null;
    this.transactionRef = null;
    this.payForm.reset()
  }

  getAccounts(){
    this.mainService.getAccounts().subscribe((res : any) => {
      let firstEl = res.data[0]
      let secondEl = res.data[1]
      if(firstEl.accountBalance > secondEl.accountBalance ){
        this.fromAccount = firstEl
        this.toAccount = secondEl
      }else{
        this.fromAccount = secondEl
        this.toAccount = firstEl
      }
    })
  }

}
