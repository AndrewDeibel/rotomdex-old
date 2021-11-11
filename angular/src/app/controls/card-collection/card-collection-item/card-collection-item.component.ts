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

@Component({
	selector: 'mb-card-collection-item',
	templateUrl: './card-collection-item.component.html',
	styleUrls: ['./card-collection-item.component.scss'],
})
export class CardCollectionItemComponent implements OnInit {
	@Input() item: CardCollectionItem;
	@Output() deleted: EventEmitter<boolean> = new EventEmitter(false);
	selectCondition: Select;
	selectGradingCompany: Select;
	selectPrintVerion: Select;
	selectBinder: Select;
	buttonNotes: Button;
	buttonAdd: Button;
	buttonRemove: Button;
	textboxQuantity: Textbox;

	constructor() {}

	ngOnInit(): void {
		this.buildControls();
	}

	buildControls() {
		// Condition
		this.selectCondition = new Select({
			classes: 'square',
			optionGroups: [
				new SelectOptionGroup({
					label: 'Condition',
				}),
				new SelectOptionGroup({
					label: 'Condition Graded',
				}),
			],
		});
		for (let condition in Condition) {
			this.selectCondition.optionGroups[0].options.push(
				new SelectOption({
					text: Condition[condition],
				})
			);
		}
		for (let conditionGraded in ConditionGraded) {
			this.selectCondition.optionGroups[1].options.push(
				new SelectOption({
					text: ConditionGraded[conditionGraded],
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
		});

		// Binder
		this.selectBinder = new Select({
			classes: 'square',
		});

		// Quantity
		this.textboxQuantity = new Textbox({
			classes: 'square-right',
			type: 'number',
			value: '1',
			min: 0,
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
