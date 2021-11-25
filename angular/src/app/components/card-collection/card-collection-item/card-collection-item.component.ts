import { MBForm } from './../../../controls/form/form';
import { DialogService } from './../../../controls/dialog/dialog.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Button } from '@app/controls/button';
import { Select, SelectOption, SelectOptionGroup } from '@app/controls/select';
import { Textbox } from '@app/controls/textbox';
import {
	Condition,
	ConditionGraded,
	GradingCompany,
	Icons,
	PrintVersion,
} from '@app/models';
import { CardCollectionItem } from './card-collection-item';
import {
	Dialog,
	FormComponent,
	MBFormControl,
	MBFormGroup,
	Textarea,
} from '@app/controls';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
	selector: 'mb-card-collection-item',
	templateUrl: './card-collection-item.component.html',
	styleUrls: ['./card-collection-item.component.scss'],
})
export class CardCollectionItemComponent implements OnInit {
	@Input() item: CardCollectionItem;
	@Output() deleted: EventEmitter<boolean> = new EventEmitter();
	@Output() updated: EventEmitter<CardCollectionItem> = new EventEmitter();
	selectCondition: Select;
	selectGradingCompany: Select;
	selectPrintVerion: Select;
	selectBinder: Select;
	buttonNotes: Button;
	buttonAdd: Button;
	buttonRemove: Button;
	formNotes: FormGroup;

	constructor(
		private dialogService: DialogService,
		private formBuilder: FormBuilder
	) {}

	ngOnInit(): void {
		this.buildControls();
	}

	buildControls() {
		this.formNotes = this.formBuilder.group({
			notesControl: [''],
		});
		// Condition
		this.selectCondition = new Select({
			classes: 'square-right',
			optionGroups: [
				new SelectOptionGroup({
					label: 'Condition',
				}),
				new SelectOptionGroup({
					label: 'Condition Graded',
				}),
			],
			change: () => {
				debugger;
				this.updated.emit(
					new CardCollectionItem({
						...this.item,
						condition: Condition[this.selectCondition.value],
					})
				);
			},
		});
		for (let condition in Condition) {
			this.selectCondition.optionGroups[0].options.push(
				new SelectOption({
					text: Condition[condition],
					value: Condition[condition],
				})
			);
		}
		for (let conditionGraded in ConditionGraded) {
			this.selectCondition.optionGroups[1].options.push(
				new SelectOption({
					text: ConditionGraded[conditionGraded],
					value: ConditionGraded[conditionGraded],
				})
			);
		}

		// Grading company
		this.selectGradingCompany = new Select({
			classes: 'square',
			optionGroups: [
				new SelectOptionGroup({
					label: 'Graded By',
				}),
			],
		});
		for (let gradingCompany in GradingCompany) {
			this.selectGradingCompany.optionGroups[0].options.push(
				new SelectOption({
					text: GradingCompany[gradingCompany],
				})
			);
		}

		// Printing
		this.selectPrintVerion = new Select({
			classes: 'square',
			optionGroups: [
				new SelectOptionGroup({
					label: 'Printing',
				}),
			],
		});
		for (let printVersion in PrintVersion) {
			this.selectPrintVerion.optionGroups[0].options.push(
				new SelectOption({
					text: PrintVersion[printVersion],
				})
			);
		}

		// Notes
		this.buttonNotes = new Button({
			text: 'Notes',
			classes: 'square secondary',
			width: '100%',
			click: () => {
				this.dialogService.setDialog(
					new Dialog({
						title: 'Notes',
						form: new MBForm({
							formGroup: this.formNotes,
							groups: [
								new MBFormGroup({
									controls: [
										new MBFormControl({
											formControl:
												this.formNotes.controls
													.notesControl,
											control: new Textarea({}),
										}),
									],
								}),
							],
						}),
					})
				);
			},
		});

		// Binder
		this.selectBinder = new Select({
			classes: 'square',
			multiple: true,
			options: [
				new SelectOption({
					text: 'Binder 1',
					value: 'binder1',
					selected: true,
				}),
			],
		});

		// Button remove
		this.buttonRemove = new Button({
			icon: Icons.trash,
			classes: 'secondary square-left',
			click: () => {
				if (confirm('Are you sure you want to delete this item?')) {
					this.deleted.emit(true);
				}
			},
		});
	}
}
