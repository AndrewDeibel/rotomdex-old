import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Menu, MenuItem } from '@app/controls/menu';
import { Icons } from './models/icons';
import { AuthenticationService } from './services/auth.service';
import { LoaderService } from './controls';
import { ActivatedRoute, NavigationEnd, Router, RoutesRecognized } from '@angular/router';
import { Dialog } from './controls/dialog/dialog';
import { DialogService } from './controls/dialog/dialog.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
	theme: string = "dark";
	showMenu: boolean = true;
	loading: boolean;
	dialog: Dialog;
	menuItemTools: MenuItem;
	transparentHeader: boolean;

	constructor(
		private cdRef: ChangeDetectorRef,
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private authenticationService: AuthenticationService,
		private loaderService: LoaderService,
		private dialogService: DialogService) { }

	ngOnInit() {

		// Loader 
		this.loaderService.loading.asObservable().subscribe((loading: boolean) => {
			if (this.loading != loading) {
				this.loading = loading;
				this.cdRef.detectChanges();
			}
		});

		// Dialog
		this.dialogService.dialog.asObservable().subscribe((dialog: Dialog) => {
			if (dialog) {
				this.dialog = dialog;
			}
		});

		// Scroll to top
		this.router.events.subscribe(event => {
			if (!(event instanceof NavigationEnd)) {
				return;
			}
			this.scrollToTop();
		});

		// Transparent header
		this.router.events.subscribe((data) => {
			if (data instanceof RoutesRecognized) {
				this.transparentHeader = data.state.root.firstChild.data['transparentHeader'] as boolean;
			}
		})

		// Theme
		let body = document.getElementsByTagName('body')[0];
		body.classList.add('theme');
		body.classList.add('dark');
	}

	scrollToTop() {
		window.scrollTo(0, 0);
	}
}