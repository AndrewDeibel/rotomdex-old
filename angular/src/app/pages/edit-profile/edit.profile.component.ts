import { LoaderService } from './../../controls/loader/loader.service';
import { Button, ButtonType } from '@app/controls/button';
import { Textbox, Toggle } from '@app/controls';
import { Router } from '@angular/router';
import { AuthenticationService } from '@app/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

@Component({
	selector: 'edit-profile',
	templateUrl: './edit-profile.component.html',
	styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit {
	form: FormGroup;
	textboxUsername: Textbox;
	textboxEmail: Textbox;
	textboxPassword: Textbox;
	togglePublic: Toggle;
	buttonSubmit: Button;
	buttonCancel: Button;

	constructor(
		private formBuilder: FormBuilder,
		private router: Router,
		private authenticationService: AuthenticationService,
		private loaderService: LoaderService
	) {
		if (!this.authenticationService.currentUserValue) {
			this.router.navigateByUrl('/');
		}
	}

	ngOnInit(): void {
		this.form = this.formBuilder.group({
			emailControl: ['', Validators.required],
			usernameControl: ['', Validators.required],
			passwordControl: ['', Validators.required],
		});
		this.textboxEmail = new Textbox({
			label: 'Email',
			type: 'email',
		});
		this.textboxUsername = new Textbox({
			label: 'Username',
		});
		this.textboxPassword = new Textbox({
			label: 'Password',
			type: 'password',
		});
		this.buttonSubmit = new Button({
			text: 'Save Profile',
			type: ButtonType.submit,
		});
		this.buttonCancel = new Button({
			text: 'Cancel',
			classes: 'secondary',
		});
	}

	submit() {
		if (this.form.invalid) {
			return;
		}

		this.loaderService.addItemLoading('register');
		this.authenticationService
			.register(
				this.form.controls.emailControl.value,
				this.form.controls.usernameControl.value,
				this.form.controls.passwordControl.value,
				this.form.controls.passwordConfirmControl.value
			)
			.pipe(first())
			.subscribe(
				(data) => {
					this.loaderService.clearItemLoading('register');
				},
				(error) => {
					this.loaderService.clearItemLoading('register');
				}
			);
	}
}
