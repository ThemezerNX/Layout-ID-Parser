class TwoWayMap {
	map: any;
	reverseMap: any;
	constructor(map: any) {
		this.map = map;
		this.reverseMap = {};
		for (const key in map) {
			if (Array.isArray(map[key])) {
				map[key].forEach((id) => {
					const value = id;
					this.reverseMap[value] = key;
				});
			} else {
				const value = map[key];
				this.reverseMap[value] = key;
			}
		}
	}

	get = (key: string) => {
		if (Array.isArray(this.map[key])) {
			return this.map[key][0];
		} else {
			return this.map[key];
		}
	};
	getReverse = (key: string) => this.reverseMap[key];
}

const convertID = new TwoWayMap({
	builtin_CarefulLayout: 'Themezer:e3f741ae-7e7a-4606-bb0b-dfdab715c0cb',
	builtin_DiamondHome: 'Themezer:2e007a7f-51df-4b9d-a739-6ec5abcbc9a9',
	builtin_AllApps90S: 'Themezer:1eacc544-5b04-44fc-858c-269f8f89367e',
	builtin_DogeLayoutRound: 'Themezer:a323d9a9-7bae-4afd-912a-db9a1e37d279|7638bb49-7475-4d11-a76a-ec9d63b12b94',
	// builtin_AllApps90Round: '',
	builtin_FlowLayout: 'Themezer:0cbb94e7-df26-469b-86fa-5c788c44a518',
	// builtin_MiniLock: '',
	builtin_SmallCompactHomescreen: 'Themezer:152383d4-89ac-4e7c-8689-a7c272927875',
	builtin_RoundSmallCompactHome: 'Themezer:152383d4-89ac-4e7c-8689-a7c272927875|e818c9af-ca39-48cd-8ed1-a979b69ea142',
	builtin_SideLock: 'Themezer:1133f17a-9589-49f1-8b82-a1e7908f844f',
	builtin_JAGLayout: 'Themezer:37fa5b25-5e90-4879-a215-81a16080c445',
	builtin_SimpleLayoutLockscreen: 'Themezer:b388dfc8-4216-42e2-96aa-2121da42b263',
	builtin_DogeLayout: 'Themezer:a323d9a9-7bae-4afd-912a-db9a1e37d279',
	builtin_ClearLock: [
		'Themezer:f8cdb51f-1f78-49f9-9e49-79e77b6ba558',
		'Themezer:f8cdb51f-1f78-49f9-9e49-79e77b6ba558|44c5a3f7-302a-459f-8f32-eb28afcc931f',
	],
	builtin_TransparentPSL90SC:
		'Themezer:c7323872-49f1-4abe-b526-c7650851fd76|b77b434f-5811-42fc-bd5e-ab44d7f24b61,d22d7557-99da-4710-a2d8-0bb3c7bfac14',
	builtin_TransparentPSL90ST:
		'Themezer:c7323872-49f1-4abe-b526-c7650851fd76|b77b434f-5811-42fc-bd5e-ab44d7f24b61,219eaa0a-9bbd-410c-9806-5bc898ad6849',
	builtin_TransparentPSL90S: 'Themezer:c7323872-49f1-4abe-b526-c7650851fd76|b77b434f-5811-42fc-bd5e-ab44d7f24b61,',
	builtin_TransparentPSLCentered:
		'Themezer:c7323872-49f1-4abe-b526-c7650851fd76|d22d7557-99da-4710-a2d8-0bb3c7bfac14',
	builtin_TransparentPSLTop: 'Themezer:c7323872-49f1-4abe-b526-c7650851fd76|219eaa0a-9bbd-410c-9806-5bc898ad6849',
	builtin_TransparentPSL: 'Themezer:c7323872-49f1-4abe-b526-c7650851fd76',
	// builtin_TwoRowHome: '', OUTDATED
});

export const parseThemeID = (ID: any) => {
	if (typeof ID !== 'string') return;
	const converted = convertID.get(ID);
	if (converted) ID = converted;

	const no_comments = ID.replace(/\(.*?\)/gm, '');

	let service: string | null = null;
	let data: string | null = null;
	const split1: string[] = no_comments.split(':');
	if (no_comments.includes(':')) {
		service = split1[0];
		data = split1[1];
	} else {
		data = split1[0];
	}

	const split2: String[] = data.split('|');
	const uuid: String = split2[0];
	const piece_uuids: string[] = (split2[1] || '').split(',');

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
	service?: string;
	uuid: string;
	piece_uuids?: string[];
}) => {
	const ID: string = service + ':' + uuid + (piece_uuids.length > 0 ? '|' + piece_uuids.join() : '');
	const converted: string = convertID.getReverse(ID);
	if (converted) return converted;
	else return ID;
};

console.log(convertID.getReverse('Themezer:f8cdb51f-1f78-49f9-9e49-79e77b6ba558|44c5a3f7-302a-459f-8f32-eb28afcc931f'));
