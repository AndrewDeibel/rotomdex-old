import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '@app/../environments/environment';
import { APIResponse } from '@app/models';
import { Expansion, Series } from '@app/pages/expansions/expansion/expansion';
import { Card } from '@app/pages/cards/card/card';
import { CardResults } from './cards.service';
import { ExpansionFactory, SeriesFactory } from '../pages/expansions/expansions.factory';
import { CardFactory } from '../pages/cards/cards.factory';


export interface SearchExpansionsParams {
	//expansion_id: number;
    //page: number;
    //age_size: number;
    //sort_by: string;
    sort_direction: string;
    //query: string;
}

export interface ExpansionsResults {
	total_results: number;
	total_pages: number;
	series?: Series[];
}

@Injectable({
    providedIn: 'root'
})

export class ExpansionsService {

    constructor(private http: HttpClient) {}

	// Get all expansions
	private allExpansionsSubject = new BehaviorSubject<ExpansionsResults>(null);
	allExpansionsObservable() {
		this.allExpansionsSubject = new BehaviorSubject<ExpansionsResults>(null);
		return this.allExpansionsSubject.asObservable();
	}
	getExpansions(params: SearchExpansionsParams) {
		this.http.get<APIResponse>(environment.api + `expansions`).subscribe(res => {
			let series: Series[] = [];
			res.data.forEach(_series => {
				series.push(new Series(_series));
			});
			this.allExpansionsSubject.next({
				total_pages: res.data.total_pages,
				total_results: res.data.total_results,
				series: series,
			});
		});
	}
	
}