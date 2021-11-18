import { Icons } from '@app/models';
import { Router } from '@angular/router';
import { AuthenticationService } from '@app/services/auth.service';
import {
	Textbox,
	Button,
	Textarea,
	Toggle,
	Select,
	SelectOption,
} from '@app/controls';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'collection-card-group',
	templateUrl: 'collection-card-group.component.html',
	styleUrls: ['./collection-card-group.component.scss'],
})
export class CollectionCardGroupComponent implements OnInit {
	form: FormGroup;
	textboxName: Textbox;
	selectType: Select;
	textareaDescription: Textarea;
	togglePublic: Toggle;
	buttonSubmit: Button;
	constructor(
		private formBuilder: FormBuilder,
		private authenticationService: AuthenticationService,
		private router: Router
	) {
		if (!this.authenticationService.currentUserValue) {
			this.router.navigateByUrl('/');
		}
	}

	ngOnInit() {
		this.form = this.formBuilder.group({
			nameControl: ['', Validators.required],
			typeControl: ['', Validators.required],
			descriptionControl: [''],
			publicControl: [''],
		});
		this.textboxName = new Textbox({
			label: 'Name',
		});
		this.selectType = new Select({
			label: 'Type',
			advancedSelect: true,
			placeholder: 'Select type',
			options: [
				new SelectOption({
					text: 'Binder',
					icon: Icons.binder,
				}),
				new SelectOption({
					text: 'Deck',
					icon: Icons.inbox,
				}),
				new SelectOption({
					text: 'Trades',
					icon: Icons.balanceScale,
				}),
				new SelectOption({
					text: 'Box',
					icon: Icons.archive,
				}),
				new SelectOption({
					text: 'Folder',
					icon: Icons.folder,
				}),
			],
		});
		this.textareaDescription = new Textarea({
			label: 'Description',
		});
		this.togglePublic = new Toggle({
			text: 'Private',
			textChecked: 'Public',
		});
	}

	submit() {
		if (this.form.invalid) {
			return;
		}
	}
}
