import {
	getStatus,
} from './commands';

export default class Machine {
	path: string;

	constructor( path: string ) {
		this.path = path;
	}

	getStatus() {
		return getStatus( this.path );
	}
}
