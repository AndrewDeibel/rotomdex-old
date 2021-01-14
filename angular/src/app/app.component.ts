import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Menu, MenuItem } from '@app/controls/menu';
import { Icons } from './models/icons';
import { AuthenticationService } from './pages/auth/auth.service';
import { LoaderService } from './controls';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
	title = 'mana-binder';
	menu: Menu = new Menu();
	theme: string = "dark";
	showMenu: boolean = true;
	loading: boolean = false;
	menuItemTools: MenuItem;

	constructor(
		private cdRef: ChangeDetectorRef,
		private authenticationService: AuthenticationService,
		private loaderService: LoaderService) { }

	ngOnInit() {

		// Loader 
		this.loaderService.loading.asObservable().subscribe((loading: boolean) => {
			if (this.loading != loading) {
				this.loading = loading;
				this.cdRef.detectChanges();
			}
		});

		// Theme
		let body = document.getElementsByTagName('body')[0];
		body.classList.add('theme');
		body.classList.add('dark');

		this.menu.clearActiveClickOutside = true;
		this.menu.horizontal = true;
		this.menu.items.push(
			new MenuItem({
				text: "Expansions",
				route: "expansions",
				click: () => {
					this.menu.clearActive();
				},
			}),
			new MenuItem({
				text: "Cards",
				route: "cards",
				click: () => {
					this.menu.clearActive();
				},
			}),
			new MenuItem({
				text: "Pokémon",
				route: "pokemon",
				click: () => {
					this.menu.clearActive();
				}
			}),
			// new MenuItem({
			// 	text: "Collection",
			// 	route: "collection",
			// 	click: () => {
			// 		this.menu.clearActive();
			// 	}
			// }),
			// new MenuItem({
			// 	text: "Scanner",
			// 	route: "scanner",
			// 	click: () => {
			// 		this.menu.clearActive();
			// 	}
			// }),
		);
	}
}