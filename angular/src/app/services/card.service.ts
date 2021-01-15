import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { APIResponse } from "@app/models";
import { BehaviorSubject } from "rxjs";
import { environment } from "src/environments/environment";
import { CardFactory } from "../pages/cards/cards.factory";
import { Card } from "../pages/cards/card/card";
import { CacheGlobal } from "./cache/globalCache";

@Injectable({ providedIn: 'root' })
export class CardService {

	constructor(private http: HttpClient) {}
	
	// Get id
	private cardSubject = new BehaviorSubject<Card>(null);
	cardObservable() {
		this.cardSubject = new BehaviorSubject<Card>(null);
		return this.cardSubject.asObservable();
	}
	getCard(code: string) {
		if (CacheGlobal.card[code]) {
			this.cardSubject.next(CacheGlobal.card[code]);
		}
		else {
			this.http.get<APIResponse>(environment.api + "card/" + code).subscribe(res => {
				var card = new Card(res.data);
				CacheGlobal.card[code] = card;
				this.cardSubject.next(card);
			});
		}
	}

}