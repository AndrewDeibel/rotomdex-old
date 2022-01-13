import { LoaderService } from './../controls/loader/loader.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIResponse } from '@app/models';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Card } from '../pages/cards/card/card';
import { CacheGlobal } from './cache/globalCache';

@Injectable({ providedIn: 'root' })
export class CardService {
	constructor(
		private http: HttpClient,
		private loaderService: LoaderService
	) {}

	// Get card
	private getCardSubject = new BehaviorSubject<Card>(null);
	getCardObservable() {
		this.getCardSubject = new BehaviorSubject<Card>(null);
		return this.getCardSubject.asObservable();
	}
	getCard(code: string) {
		// Try cache
		if (CacheGlobal.card[code]) {
			this.getCardSubject.next(CacheGlobal.card[code]);
		} else {
			// Show loader
			this.loaderService.addItemLoading('getCard');
			// Request
			this.http
				.get<APIResponse>(environment.api + 'card/' + code)
				.subscribe((res) => {
					var card = new Card(res.data);
					// Add to cache
					CacheGlobal.card[code] = card;
					this.getCardSubject.next(card);
					// Hide loader
					this.loaderService.clearItemLoading('getCard');
				});
		}
	}
}
