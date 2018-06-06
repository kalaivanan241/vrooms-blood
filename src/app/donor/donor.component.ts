import { DonorService, bloodGroup } from './../services/donor.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-donor',
  templateUrl: './donor.component.html',
  styleUrls: ['./donor.component.css']
})
export class DonorComponent implements OnInit {

  donorForm: FormGroup;
  donorList;
  addflag = false;
  bloodGroupList;
  submitted = false;
  showDate = false;
  constructor(private fb: FormBuilder, private donorService: DonorService) {
    this.createForm();
    donorService.getList().subscribe(res => this.donorList = res);
  }

  ngOnInit() {
    this.bloodGroupList = bloodGroup;
  }


  createForm() {
    this.donorForm = this.fb.group({
      name: ['', [Validators.required]],
      address: ['', [Validators.required]],
      mobile: ['', [Validators.required]],
      blood: ['', [Validators.required]],
      acceptBlood: ['', [Validators.required]],
      experience: '',
      lastDonated: '',
    });

  }

  get f() { return this.donorForm.controls; }

  onSubmit() {
    if (!this.donorForm.valid) {
      this.submitted = true;
      return;
    }
    this.donorService.addDonor(this.donorForm.value);
    this.donorForm.reset({});
    this.addflag = false;
    this.submitted = false;
  }

  getBlood(val) {
    console.log(val);
    const blood = this.bloodGroupList.filter(vl => parseInt(val, 10) === parseInt(vl.key, 10));
    return blood[0].name;
  }

  getBloodArr(val) {
    const s = [];
    val.forEach(element => {
      const blood = this.bloodGroupList.filter(vl => parseInt(element, 10) === parseInt(vl.key, 10));
      s.push(blood[0].name);
    });
    return s.join(',');
  }

}

