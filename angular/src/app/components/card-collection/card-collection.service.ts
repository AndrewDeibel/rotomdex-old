import { Card } from './../../pages/cards/card/card';
import { APIResponse } from './../../models/api';
import { CardResults, GetCards } from './../../services/cards.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CardCollectionService {
	constructor(private http: HttpClient) {}

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
}
