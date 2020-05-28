export const parseThemeID = (string) => {
	const split1: String[] = string.split(':');
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

export const stringifyThemeID = (
	service,
	{
		uuid,
		piece_uuids,
	}: {
		uuid: String;
		piece_uuids: String[];
	}
) => {
	return `${service}:${uuid}|${piece_uuids.join()}`;
};
