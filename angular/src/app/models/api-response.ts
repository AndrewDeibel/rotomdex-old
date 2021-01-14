export class APIResponse {
    public success: boolean;
	public data: any;
	public meta: APIReponseMeta;
}

export class APIReponseMeta {
	public current_page: number;
	public from: number;
	public last_page: number;
	public path: string;
	public per_page: number;
	public to: number;
	public total: number;
}