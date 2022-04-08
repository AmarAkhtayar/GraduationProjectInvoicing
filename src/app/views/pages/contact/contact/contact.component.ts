import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { EmailService } from 'src/app/core/services/email.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  formGroup: FormGroup;
  isFormSubmitted = false;
  user: any
  userName: any;
  messageSent = false;
  constructor(private formBuilder: FormBuilder,
    private emailService: EmailService,
    private authUserService: AuthService,) { }

  ngOnInit(): void {
    this.user = this.authUserService.getUserInfo()

    this.setupForm();
  }
  setupForm() {
    this.formGroup = this.formBuilder.group({
      name: [this.user.name, { validators: [Validators.required] }],
      email: [this.user.email, { validators: [Validators.required] }],
      phoneNumber: [null, { validators: [Validators.required, Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$')] }],
      message: [null, { validators: [Validators.required] }],


    });
  }

  submitForm() {

    if (!this.formGroup.valid) {
      Object.keys(this.formGroup.controls).forEach(key => {
        this.formGroup.get(key).markAsTouched()
      })
      return
    }
    let formBody = {
      from: {
        name: this.formGroup.get('name').value,
        email: this.formGroup.get('email').value
      },
      to: {
        name: 'contact management',
        email: 'contactmanagement@reijnprofessionals.nl'
      },
      sendgridTemplateId: 'd-2e118b358f85418ba1b280b8c73d20b0',
      subject: "new message",
      templateData: {
        additionalProp1: this.formGroup.get('phoneNumber').value,
        additionalProp2: this.formGroup.get('message').value

      },

    }
    console.log("forms value are", this.formGroup.value)
    // let formBody = null;
    this.emailService.sendEmail(formBody).subscribe((res) => {
      this.isFormSubmitted = false;
      this.messageSent = true;
      setTimeout(() => {
        this.messageSent = false;
      }, 800);
      console.log('nnnnnnnnnnn ==>', res);
    });
    this.formGroup.get('phoneNumber').reset();
    this.formGroup.get('message').reset();
    // }}
  }
}
