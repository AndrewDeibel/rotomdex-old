import { CardCollectionItem } from './card-collection-item/card-collection-item';
import { Condition } from './../../models/condition';
import { environment } from './../../../environments/environment';
import { Card } from './../../pages/cards/card/card';
import { APIResponse } from './../../models/api';
import { CardResults, GetCards } from './../../services/cards.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthenticationService } from '@app/services/auth.service';

export class UpdateUserCard {
	user_card_id: number;
	condition: string;
	graded_by: string;
	printing: string;
	notes: string;
	constructor(init?: Partial<UpdateUserCard>) {
		Object.assign(this, init);
	}
}

export class AddUserCard {
	card_id: number;
	card_group_id?: number;
	condition: string;
	graded_by: string;
	printing: string;
	notes: string;
	date_obtained: Date;
	purchase_price: number;
	constructor(init?: Partial<AddUserCard>) {
		Object.assign(this, init);
	}
}

@Injectable({ providedIn: 'root' })
export class CardCollectionService {
	constructor(
		private http: HttpClient,
		private authenticationService: AuthenticationService
	) {}

	// Get card collection
	private getUserCardsSubject = new BehaviorSubject<CardResults>(null);
	getUserCardsObservable() {
		this.getUserCardsSubject = new BehaviorSubject<CardResults>(null);
		return this.getUserCardsSubject.asObservable();
	}
	getUserCards(params: GetCards) {
		var url = params.buildUrl('user-cards');
		this.http.get<APIResponse>(url).subscribe((res) => {
			let cards = [];
			res.data.forEach((card) => {
				cards.push(new Card(card));
			});
			this.getUserCardsSubject.next({
				cards: cards,
				total_pages: res.meta.last_page,
				total_results: res.meta.total,
			});
		});
	}

	// Add collection card
	private addUserCardSubject = new BehaviorSubject<CardCollectionItem>(null);
	addUserCardObservable() {
		this.addUserCardSubject = new BehaviorSubject<CardCollectionItem>(null);
		return this.addUserCardSubject.asObservable();
	}
	addUserCard(userCard: CardCollectionItem) {
		this.http
			.post<APIResponse>(environment.api + 'user-cards/create', {
				...userCard,
			})
			.subscribe((res) => {
				if (res.success) this.addUserCardSubject.next(userCard);
			});
	}

	// Update collection card
	private updateUserCardSubject = new BehaviorSubject<boolean>(null);
	updateUserCardObservable() {
		this.updateUserCardSubject = new BehaviorSubject<boolean>(null);
		return this.updateUserCardSubject.asObservable();
	}
	// updateUserCard(userCard: CardCollectionItem) {
	// 	this.http
	// }
}
