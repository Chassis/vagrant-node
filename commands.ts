import { spawn } from 'child_process';

import {
	parseGlobalStatus,
	parseMachineReadable,
} from './parser';

enum Status {
	PowerOff = 'poweroff',
	Running = 'running',
	Loading = 'loading',
	Launching = 'launching',
	Halting = 'halting',
};

export function getStatus( path: string ) : Promise<Status> {
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
			if ( ! stateItem ) {
				reject( {
					error: 'invalid_output',
					stdout,
					stderr,
				} );
				return;
			}

			const state = stateItem.data[0];
			resolve( state as Status );
		} );
	} );
}

export function getAllMachines() : Promise<string[]> {
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
