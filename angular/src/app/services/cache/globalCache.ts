import { Card, Expansion, Series } from "@app/pages";

export abstract class CacheGlobal {
	static expansions: Series[];
	static expansion: {[key: string]: Expansion} = {};
	static card: {[key: string]: Card} = {};

	static clear(type: string, key: string) {
		this[type][key] = null;
	}
}