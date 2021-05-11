// Angular
import { Component, OnInit, Input } from '@angular/core';
import { Textbox } from '@app/controls';
import { Card } from '../../card/card';

@Component({
	selector: 'mb-card-item-grid',
	templateUrl: 'card-item-grid.component.html',
	styleUrls: ['./card-item-grid.component.scss']
})

export class CardItemGridComponent implements OnInit {

	@Input() card: Card;
	imageLoading: boolean = true;
	textbox: Textbox;

	constructor() { }

	ngOnInit() {
		this.textbox = new Textbox({
			type: "number",
			wrapperClasses: "small",
			value: "1"
		});
	}

	onLoad() {
		this.imageLoading = false;
	}
}