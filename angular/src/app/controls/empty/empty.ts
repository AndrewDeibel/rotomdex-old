import { Icons } from "@app/models";
import { Button } from "../button";

export class Empty {
	text: string;
	icon: string;
	image: string;
	button: Button;

    constructor(init?:Partial<Empty>) {
		Object.assign(this, init);
	}
}