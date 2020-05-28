export const parseThemeID = (string) => {
	const split1 = string.split(':');
	const service = split1[0];

	const data = split1[1];

	const split2 = data.split('|');
	const uuid = split2[0];
	const piece_uuids = split2[1].split(',');

	return {
		service,
		uuid,
		piece_uuids,
	};
};

export const stringifyThemeID = (service, { uuid, piece_uuids }) => {
	return `${service}:${uuid}|${piece_uuids.join()}`;
};
