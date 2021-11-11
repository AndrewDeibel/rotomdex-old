import { HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

export class APIResponse {
	success: boolean;
	data: any;
	meta: APIReponseMeta;
}

export class APIReponseMeta {
	current_page: number;
	from: number;
	last_page: number;
	path: string;
	per_page: number;
	to: number;
	total: number;
}

// Extend/inherit this class
// when using paged API endpoint
export class APIGetPaged {
	page: number;
	page_size: number;
	sort_by: string;
	sort_direction: string;
	query: string;

	url: string;

	buildUrl = (folder: string) => {
		let query = new HttpParams();

		// Page
		if (this.page && this.page.toString().length)
			query = query.set('page', this.page.toString());
		else query = query.delete('page');

		// Page size
		if (this.page_size && this.page_size.toString().length)
			query = query.set('page_size', this.page_size.toString());
		else query = query.delete('page_size');

		// Sort by
		if (this.sort_by && this.sort_by.toString().length)
			query = query.set('sort_by', this.sort_by);
		else query = query.delete('sort_by');

		// Sort direction
		if (this.sort_direction && this.sort_direction.toString().length)
			query = query.set('sort_direction', this.sort_direction);
		else query = query.delete('sort_direction');

		// Query
		if (this.query && this.query.length)
			query = query.set('search', this.query);
		else query = query.delete('search');

		// Include ? and query string if provided
		let queryString = query.toString();
		this.url = `${environment.api}${folder}${
			queryString.length ? '?' + queryString : ''
		}`;
		return this.url;
	};
}
