// Not finished, idea from https://stackoverflow.com/questions/41554156/angular-2-cache-observable-http-result-data/

import { Observable, ReplaySubject, Subject } from "rxjs";
import { map } from 'rxjs/operators';

declare type GetDataHandler<T> = () => Observable<T>;

export class Cacheable<T> {
	protected data: T;
    protected subjectData: Subject<T>;
    protected observableData: Observable<T>;
    public getHandler: GetDataHandler<T>;

    constructor() {
		this.subjectData = new ReplaySubject(1);
		this.observableData = this.subjectData.asObservable();
    }

    public getData(): Observable<T> {
		if (!this.getHandler) {
			throw new Error("getHandler is not defined");
		}
		if (!this.data) {
			this.getHandler().pipe(map((r: T) => {
				this.data = r;
				return r;
			})).subscribe(
				result => this.subjectData.next(result),
				err => this.subjectData.error(err)
			);
		}
		return this.observableData;
    }

    public resetCache(): void {
    	this.data = null;
    }

    public refresh(): void {
		this.resetCache();
		this.getData();
    }
}