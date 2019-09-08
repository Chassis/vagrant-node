const chalk = require( 'chalk' );
const os = require( 'os' );

exports.formatPath = path => {
	return path.replace( os.homedir(), '~' );
};

exports.formatStatus = status => {
	switch ( status ) {
		case 'poweroff':
			return chalk.grey( status );

		case 'running':
			return chalk.green( status );

		case 'loading':
		case 'launching':
		case 'halting':
			return chalk.yellow( status );

		case 'aborted':
			return chalk.red( status );

		default:
			return status;
	}
}
