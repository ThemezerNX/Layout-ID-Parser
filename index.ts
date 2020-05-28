export const parseThemeID = (ID: any) => {
	if (typeof ID !== 'string') return;

	const split1: String[] = ID.split(':');
	const service: String = split1[0];

	const data: String = split1[1];

	const split2: String[] = data.split('|');
	const uuid: String = split2[0];
	const piece_uuids: String[] = split2[1].split(',');

	return {
		service,
		uuid,
		piece_uuids,
	};
};

export const stringifyThemeID = ({
	service = '',
	uuid = '',
	piece_uuids = [],
}: {
	service?: String;
	uuid: String;
	piece_uuids?: String[];
}) => {
	return `${service}:${uuid}|${piece_uuids.join()}`;
};
