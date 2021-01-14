import { Component, OnInit, Input } from '@angular/core';
import { Expansion } from '../../expansion/expansion';

@Component({
	selector: 'mb-expansion-item-grid',
	templateUrl: 'expansion-item-grid.component.html',
	styleUrls: ['./expansion-item-grid.component.scss']
})

export class ExpansionItemGridComponent implements OnInit {

	@Input() expansion: Expansion;
	
	constructor() {}

	ngOnInit() {
	}
}