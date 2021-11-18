import { Textbox, Toggle } from '@app/controls';
import { Router } from '@angular/router';
import { AuthenticationService } from '@app/services/auth.service';
import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'edit-profile',
	templateUrl: './edit-profile.component.html',
	styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit {
	form: FormGroup;
	textboxUsername: Textbox;
	textboxEmail: Textbox;
	togglePublic: Toggle;

	constructor(
		private formBuilder: FormGroup,
		private router: Router,
		private authenticationService: AuthenticationService
	) {
		if (!this.authenticationService.currentUserValue) {
			this.router.navigateByUrl('/');
		}
	}

	ngOnInit(): void {
		//this.form = this.formBuilder.group({});
	}
}
