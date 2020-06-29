class TwoWayMap {
	map: Object;
	reverseMap: Object;
	constructor(map) {
		this.map = map;
		this.reverseMap = {};
		for (let key in map) {
			const value = map[key];
			this.reverseMap[value] = key;
		}
	}
	get = (key) => this.map[key];
	getReverse = (key) => this.reverseMap[key];
}

const convertID = new TwoWayMap({
	builtin_CarefulLayout: 'e3f741ae-7e7a-4606-bb0b-dfdab715c0cb',
	// builtin_DiamondHome: '',
	// builtin_AllApps90S: '',
	// builtin_DogeLayoutRound: '',
	// builtin_AllApps90Round: '',
	builtin_FlowLayout: '0cbb94e7-df26-469b-86fa-5c788c44a518',
	// builtin_MiniLock: '',
	// builtin_RoundSmallCompactHome: '',
	builtin_SideLock: '1133f17a-9589-49f1-8b82-a1e7908f844f',
	builtin_JAGLayout: '37fa5b25-5e90-4879-a215-81a16080c445',
	// builtin_SimpleLayoutLockscreen: '',
	// builtin_DogeLayout: '',
	// builtin_ClearLock: '',
	builtin_TransparentPSL90SC:
		'c7323872-49f1-4abe-b526-c7650851fd76|b77b434f-5811-42fc-bd5e-ab44d7f24b61,d22d7557-99da-4710-a2d8-0bb3c7bfac14',
	builtin_TransparentPSL90ST:
		'c7323872-49f1-4abe-b526-c7650851fd76|b77b434f-5811-42fc-bd5e-ab44d7f24b61,219eaa0a-9bbd-410c-9806-5bc898ad6849',
	builtin_TransparentPSL90S: 'c7323872-49f1-4abe-b526-c7650851fd76|b77b434f-5811-42fc-bd5e-ab44d7f24b61,',
	builtin_TransparentPSLCentered: 'c7323872-49f1-4abe-b526-c7650851fd76|d22d7557-99da-4710-a2d8-0bb3c7bfac14',
	builtin_TransparentPSLTop: 'c7323872-49f1-4abe-b526-c7650851fd76|219eaa0a-9bbd-410c-9806-5bc898ad6849',
	builtin_TransparentPSL: 'c7323872-49f1-4abe-b526-c7650851fd76',
	// builtin_TwoRowHome: '',
});

export const parseThemeID = (ID: any) => {
	if (typeof ID !== 'string') return;
	const converted = convertID.get(ID);
	if (converted) ID = converted;

	const no_comments = ID.replace(/\(.*?\)/gm, '');

	let service: String | null = null;
	let data: String | null = null;
	const split1: String[] = no_comments.split(':');
	if (no_comments.includes(':')) {
		service = split1[0];
		data = split1[1];
	} else {
		data = split1[0];
	}

	const split2: String[] = data.split('|');
	const uuid: String = split2[0];
	const piece_uuids: String[] = (split2[1] || '').split(',');

	return {
		service,
		uuid,
		piece_uuids: piece_uuids.filter((p) => p !== ''),
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
	const ID: String = service + ':' + uuid + (piece_uuids.length > 0 ? '|' + piece_uuids.join() : '');
	const converted: String = convertID.getReverse(ID);
	if (converted) return converted;
	else return ID;
};
