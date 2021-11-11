import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { APIGetPaged, APIResponse } from '@app/models';
import { Card } from '@app/pages/cards/card/card';

export class GetCards extends APIGetPaged {
	constructor(init?: Partial<GetCards>) {
		super();
		Object.assign(this, init);
	}
}

export class GetCardsFiltered extends APIGetPaged {
	constructor(init?: Partial<GetCards>) {
		super();
		Object.assign(this, init);
	}
}

export interface CardResults {
	total_value?: number;
	total_results: number;
	total_pages: number;
	cards?: Card[];
}

@Injectable({ providedIn: 'root' })
export class CardsService {
	constructor(private http: HttpClient) {}

	// Get cards
	private getCardsSubject = new BehaviorSubject<CardResults>(null);
	getCardsObservable() {
		this.getCardsSubject = new BehaviorSubject<CardResults>(null);
		return this.getCardsSubject.asObservable();
	}
	getCards(params: GetCards) {
		var url = params.buildUrl('cards');
		this.http.get<APIResponse>(url).subscribe((res) => {
			let cards = [];
			res.data.forEach((card) => {
				cards.push(new Card(card));
			});
			this.getCardsSubject.next({
				cards: cards,
				total_pages: res.meta.last_page,
				total_results: res.meta.total,
			});
		});
	}

	// Get cards filtered
	private getCardsFilteredSubject = new BehaviorSubject<CardResults>(null);
	getCardsFilteredObservable() {
		this.getCardsFilteredSubject = new BehaviorSubject<CardResults>(null);
		return this.getCardsFilteredSubject.asObservable();
	}
	getCardsFiltered(params: GetCardsFiltered) {
		var url = params.buildUrl('cards/filter');
		this.http.get<APIResponse>(url).subscribe((res) => {
			let cards = [];
			res.data.forEach((card) => {
				cards.push(new Card(card));
			});
			this.getCardsFilteredSubject.next({
				cards: cards,
				total_pages: res.meta.last_page,
				total_results: res.meta.total,
			});
		});
	}
}
