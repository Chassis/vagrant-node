const {
	getStatus,
} = require( './commands' );

module.exports = class Machine {
	constructor( path ) {
		this.path = path;
	}

	getStatus() {
		return getStatus( this.path );
	}
}
