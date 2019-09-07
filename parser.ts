const COMMA = /%!\(VAGRANT_COMMA\)/g;
const NEWLINE = /\\n/g;
const RETURN = /\\r/g;

interface MachineReadableItem {
	timestamp: string,
	target: string,
	type: string,
	data: string[],
};

export function parseMachineReadable( text: string ) : MachineReadableItem[] {
	const lines = text.trim().split('\n');
	return lines
		.map( ( line: string ) => line.split( ',' ) )
		.filter( pieces => pieces.length >= 3 )
		.map( ( pieces: string[] ) : MachineReadableItem => {
			const [ timestamp, target, type, ...data ] = pieces;

			return {
				timestamp,
				target,
				type,
				data: data.map( item => item.replace(COMMA, ',').replace(NEWLINE, '\n').replace(RETURN, '\r') )
			};
		} );
}

export function parseGlobalStatus( text: string ) {
	const parsed = parseMachineReadable(text);
	const parts = parsed.map(item => item.data[1]);

	// Custom parse.
	let header = true;
	let columns = [];
	let rows = [];
	let currentRow : { [ key: string ]: string } = {};
	let currentColumn = 0;
	for ( var i = 0; i < parts.length; i++ ) {
		let part = parts[ i ].trim();
		if ( header ) {
			if ( part.match( /^-+$/ ) ) {
				header = false;
				continue;
			}

			if ( part !== "" ) {
				columns.push( part );
			}
			continue;
		}

		// End of a row?
		if ( part === "" ) {
			rows.push( currentRow );
			currentRow = {};
			currentColumn = 0;
			continue;
		}

		let column = columns[ currentColumn ];
		currentRow[ column ] = part;
		currentColumn++;
	}

	// Note: intentionally ignores the last "row", as it's useless end-user
	// information.

	return rows;
}
