import { HttpParams } from "@angular/common/http";
import { environment } from "src/environments/environment";

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
		query = query.set('page', this.page.toString());
		query = query.set('page_size', this.page_size.toString());
		query = query.set('sort_by', this.sort_by);
		query = query.set('sort_direction', this.sort_direction);
		let queryString = query.toString();
		// Include ? and query string if provided
		this.url = `${environment.api}${folder}${queryString.length ? ('?' + queryString) : ''}`;
		return this.url;
	}
}