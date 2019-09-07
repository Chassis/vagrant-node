const { spawn } = require( 'child_process' );

const {
	parseGlobalStatus,
	parseMachineReadable,
} = require( './parser' );

function getStatus( path ) {
	return new Promise( ( resolve, reject ) => {
		const process = spawn(
			'vagrant',
			['status', '--machine-readable'],
			{
				cwd: path,
			}
		);

		let stdout = '';
		let stderr = '';
		process.stdout.on( 'data', data => { stdout += data } );
		process.stderr.on( 'data', data => { stderr += data } );

		process.on( 'close', code => {
			if ( code !== 0 ) {
				const data = {
					error: 'not_created',
					stdout,
					stderr,
				};
				reject( data );
				return;
			}

			const parsed = parseMachineReadable( stdout );
			const stateItem = parsed.find( item => item.type === 'state' );
			const state = stateItem.data[0];

			resolve( state );
		} );
	} );
}

function getAllMachines() {
	return new Promise( resolve => {
		const process = spawn(
			'vagrant',
			['global-status', '--machine-readable']
		);

		let output = '';
		process.stdout.on( 'data', data => { output += data } );

		process.on( 'close', () => {
			const parsed = parseGlobalStatus( output );
			resolve( parsed.map( machine => machine.directory ) );
		} );
	} );
}

module.exports = {
	getAllMachines,
	getStatus,
};
