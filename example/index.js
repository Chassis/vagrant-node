const chalk = require( 'chalk' );
const yargs = require( 'yargs' );

function setup( root ) {
	root.commandDir( './commands' );
	root.demandCommand( 1 );
	root.strict();

	root.fail( ( msg, err, yargs ) => {
		if ( err ) {
			console.error( chalk.red( err.message ) );
		} else {
			console.error( msg + "\n" );
			console.error( yargs.help() )
		}

		process.exit( 1 );
	} );

	root.help();
	return root;
}

setup( yargs ).parse();
