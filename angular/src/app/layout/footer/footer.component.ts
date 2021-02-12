import { Component, OnInit } from '@angular/core';
import { Menu, MenuItem } from '@app/controls';
import { Icons } from '@app/models';

@Component({
	selector: 'mb-footer',
	templateUrl: './footer.component.html',
	styleUrls: ['./footer.component.scss']
})

export class FooterComponent implements OnInit {

	year: number;
	menuLeft: Menu;
	menuCenter: Menu;

	ngOnInit() {
		this.year = (new Date()).getFullYear();
		this.menuLeft = new Menu({
			items: [
				new MenuItem({
					icon: Icons.house,
					text: "Home",
				}),
				new MenuItem({
					icon: Icons.expandArrows,
					text: "Expansions",
					route: "/expansions"
				}),
				new MenuItem({
					icon: Icons.copy,
					text: "Cards",
					route: "/cards"
				}),
				new MenuItem({
					icon: Icons.dotCircle,
					text: "Pokemon",
					route: "/pokemon"
				})
			]
		});
		this.menuCenter = new Menu({
			items: [
				new MenuItem({
					text: "Patreon",
				}),
				new MenuItem({
					text: "YouTube",
				}),
				new MenuItem({
					text: "Twitter"
				}),
				new MenuItem({
					text: "Facebook"
				})
			]
		});
	}

}