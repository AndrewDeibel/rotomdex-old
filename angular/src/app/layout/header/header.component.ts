import { Component, HostListener, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { User } from '@app/models/user';
import { Menu, MenuItem } from '@app/controls/menu';
import { AuthenticationService } from '@app/services/auth.service';
import { Icons } from '@app/models/icons';

@Component({
	selector: 'mb-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
	encapsulation: ViewEncapsulation.None
})

export class HeaderComponent implements OnInit {
	
	menu: Menu = new Menu();
	user: User;
	menuLogin: Menu;
	scrolled: boolean;
	@Input() transparent: boolean;

	constructor(private authenticationService: AuthenticationService) { }

	ngOnInit(): void {
		this.menuLogin = new Menu({
			classes: "round",
			horizontal: true,
			items: [
				new MenuItem({
					icon: Icons.signIn,
					route: "signin",
				})
			]
		});

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

	@HostListener('window:scroll', [])
	onWindowScroll() {
		this.scrolled =
			document.body.scrollTop > 20
			|| document.documentElement.scrollTop > 20;
	}

	get signedIn(): boolean {
		return this.authenticationService.currentUserValue != null;
	}
	
}