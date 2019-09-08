const chalk = require( 'chalk' );
const columnify = require( 'columnify' );
const logUpdate = require(  'log-update' );
const ora = require( 'ora' );
const { getAllMachines, Machine } = require( 'vagrant-node' );

const { formatPath, formatStatus } = require( '../helpers' );

exports.command = 'global-status';
exports.description = 'outputs status Vagrant environments for this user';

exports.handler = async function handler() {
	const spinner = ora( 'Loading machines…' ).start();
	const paths = await getAllMachines();
	spinner.stop();

	const statuses = paths.map( path => {
		const machine = new Machine( path );
		const statusPromise = machine.getStatus();

		const data = {
			path,
			spinner: new ora( chalk.grey( 'Loading…' ) ),
			status: null,
			statusPromise,
		};

		statusPromise
			.then( status => data.status = status )
			.catch( () => data.status = 'error' );

		return data;
	} );

	const output = () => {
		const formatted = statuses.map( item => ( {
			path: formatPath( item.path ),
			status: item.status ? formatStatus( item.status ) : item.spinner.frame(),
		} ) );
		const output = columnify( formatted );
		logUpdate( output );
	};

	// Render, and refresh every 100ms.
	output();
	const interval = setInterval( output, 100 );

	// Wait for statuses to resolve.
	await Promise.all( statuses.map( data => data.statusPromise ) );

	// Stop the spinner, and end output.
	clearInterval( interval );
	output();
	logUpdate.done();
}
