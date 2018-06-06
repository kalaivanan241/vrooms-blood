import { bloodGroup } from './../services/donor.service';
import { RecipientService } from './../services/recipient.service';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipient',
  templateUrl: './recipient.component.html',
  styleUrls: ['./recipient.component.css']
})
export class RecipientComponent implements OnInit {
  recipientForm: FormGroup;
  recipientList;
  addflag = false;
  bloodGroupList;
  constructor( private fb: FormBuilder, private recipientService: RecipientService) {
    this.createForm();

    recipientService.getList().subscribe(res => this.recipientList = res);
   }

  ngOnInit() {
    this.bloodGroupList = bloodGroup;
  }

 get f() { return this.recipientForm.controls; }

  createForm() {
    this.recipientForm = this.fb.group( {
      name: ['', [Validators.required, Validators.pattern('[a-z0-9A-Z_]*')]],
      address: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.pattern('[0-9_]*')]],
      recipientName: ['', [Validators.required, Validators.pattern('[a-z0-9A-Z_]*')]],
      recipientBlood: ['', Validators.required],
      donorBlood: ['', Validators.required],
      units: ['', [Validators.required, Validators.pattern('[0-9]*')]],
      urgent: '',
    });
  }

  onSubmit() {
    if (!this.recipientForm.valid) {
      return;
    }
    this.recipientService.addRecipient(this.recipientForm.value);
    this.addflag = false;
    this.recipientForm.reset({});
  }

  getBlood(val) {
    const blood = this.bloodGroupList.filter(vl => val === vl.key);
    return blood[0].name;
  }

  getBloodArr(val) {
    const s = [];
    val.forEach(element => {
      const blood = this.bloodGroupList.filter(vl => element === vl.key);
      s.push(blood[0].name);
    });
    return s.join(',');
  }

}
