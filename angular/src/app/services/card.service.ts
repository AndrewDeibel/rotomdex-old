import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { APIResponse } from "@app/models";
import { BehaviorSubject } from "rxjs";
import { environment } from "src/environments/environment";
import { Card } from "../pages/cards/card/card";
import { CacheGlobal } from "./cache/globalCache";

@Injectable({ providedIn: 'root' })
export class CardService {

	constructor(private http: HttpClient) {}
	
	// Get card
	private getCardSubject = new BehaviorSubject<Card>(null);
	getCardObservable() {
		this.getCardSubject = new BehaviorSubject<Card>(null);
		return this.getCardSubject.asObservable();
	}
	getCard(code: string) {
		if (CacheGlobal.card[code]) {
			this.getCardSubject.next(CacheGlobal.card[code]);
		}
		else {
			this.http.get<APIResponse>(environment.api + "card/" + code).subscribe(res => {
				var card = new Card(res.data);
				CacheGlobal.card[code] = card;
				this.getCardSubject.next(card);
			});
		}
	}

}