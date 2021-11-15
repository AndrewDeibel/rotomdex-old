import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '@app/../environments/environment';
import { APIResponse } from '@app/models';
import { Expansion, Series } from '@app/pages/expansions/expansion/expansion';
import { CacheGlobal } from './cache/globalCache';

export interface GetExpansions {
	query: string;
	sort_by: string;
	sort_direction: string;
}

@Injectable({ providedIn: 'root' })
export class ExpansionsService {
	constructor(private http: HttpClient) {}

	// Get expansions
	private getExpansionsSubject = new BehaviorSubject<Series[]>(null);
	getExpansionsObservable() {
		this.getExpansionsSubject = new BehaviorSubject<Series[]>(null);
		return this.getExpansionsSubject.asObservable();
	}
	getExpansions(params: GetExpansions) {
		if (CacheGlobal.expansions) {
			this.getExpansionsSubject.next(
				this.handleExpansionsParams(params, CacheGlobal.expansions)
			);
		} else {
			this.http
				.get<APIResponse>(`${environment.api}expansions`)
				.subscribe((res) => {
					let series: Series[] = [];
					res.data.forEach((_series) => {
						series.push(new Series(_series));
					});
					CacheGlobal.expansions = series;
					this.getExpansionsSubject.next(
						this.handleExpansionsParams(params, series)
					);
				});
		}
	}
	handleExpansionsParams(
		params: GetExpansions,
		seriesCollection: Series[]
	): Series[] {
		// No data
		if (!seriesCollection.length) {
			return [];
		} else {
			let _seriesCollection: Series[] = [];

			// Query
			if (params.query && params.query.length) {
				// Filter expansions
				seriesCollection.forEach((series) => {
					let expansions = series.expansions.filter((expansion) => {
						return expansion.name
							.toLowerCase()
							.includes(params.query.toLowerCase());
					});
					if (expansions.length) {
						let _series = Object.assign({}, series);
						_series.expansions = expansions;
						_seriesCollection.push(_series);
					}
				});
			} else {
				_seriesCollection = seriesCollection;
			}

			// Sort
			function sortSeriesAsc(a: Series, b: Series) {
				if (a.id < b.id) {
					return -1;
				}
				if (a.id > b.id) {
					return 1;
				}
				return 0;
			}
			function sortSeriesDesc(a: Series, b: Series) {
				if (a.id > b.id) {
					return -1;
				}
				if (a.id < b.id) {
					return 1;
				}
				return 0;
			}
			function sortExpansionAsc(a: Expansion, b: Expansion) {
				if (a.release_date < b.release_date) {
					return -1;
				}
				if (a.release_date > b.release_date) {
					return 1;
				}
				return 0;
			}
			function sortExpansionDesc(a: Expansion, b: Expansion) {
				if (a.release_date > b.release_date) {
					return -1;
				}
				if (a.release_date < b.release_date) {
					return 1;
				}
				return 0;
			}
			switch (params.sort_direction) {
				case 'asc':
					_seriesCollection.sort(sortSeriesAsc);
					_seriesCollection.forEach((_series) => {
						_series.expansions.sort(sortExpansionAsc);
					});
					break;
				case 'desc':
					_seriesCollection.sort(sortSeriesDesc);
					_seriesCollection.forEach((_series) => {
						_series.expansions.sort(sortExpansionDesc);
					});
					break;
			}

			return _seriesCollection;
		}
	}
}
