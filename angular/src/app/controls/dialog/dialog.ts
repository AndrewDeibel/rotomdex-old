import { Button } from "../button";

export class Dialog {
	title: string;
	buttons: Button[] = [];
	component: any;
	text: string;
	open: boolean;
	autoOpen: boolean = true;
	close = () => {
		this.open = false;
		if (this.onClose) this.onClose();
	}

	onOpen: () => void;
	onClose: () => void;

    public constructor(init?:Partial<Dialog>) {
		Object.assign(this, init);
		if (this.autoOpen) this.open = true;
	}
};