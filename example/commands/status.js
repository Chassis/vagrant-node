const fs = require( 'fs' );
const ora = require( 'ora' );
const path = require( 'path' );
const pify = require( 'pify' );
const { Machine } = require( 'vagrant-node' );

const { formatPath, formatStatus } = require( '../helpers' );

exports.command = 'status [path]';
exports.description = 'outputs status of the vagrant machine';
exports.builder = args => {
	args.positional( 'path', {
		default: process.cwd,
		coerce: val => path.resolve( process.cwd(), val ),
		normalize: true,
		type: 'string',
	} );
}

exports.handler = async function handler( args ) {
	try {
		await pify( fs.stat )( args.path );
	} catch ( err ) {
		throw new Error( `Cannot access ${ formatPath( args.path ) }, are you sure it exists?` );
	}

	const spinner = ora( 'Loading status…' ).start();
	const machine = new Machine( args.path );

	let status;
	try {
		status = await machine.getStatus();
	} catch ( err ) {
		switch ( err.error ) {
			case 'not_created':
				throw new Error( `No Vagrant machine detected in ${ args.path }` );

			case 'invalid_output':
				throw new Error( 'Invalid output from Vagrant; your installation may be broken.' );

			default:
				throw new Error( 'Unknown error.' );
		}
	}
	spinner.stop();

	console.log( formatStatus( status ) );
}
