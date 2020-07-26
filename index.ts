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
	// ResidentMenu
	builtin_CarefulLayout: 'Themezer:00006',
	builtin_FlowLayout: 'Themezer:00005',
	builtin_JAGLayout: 'Themezer:00002',
	builtin_DogeLayout: 'Themezer:0000e',
	builtin_DogeLayoutRound: 'Themezer:0000e|7638bb49-7475-4d11-a76a-ec9d63b12b94',
	builtin_DiamondHome: 'Themezer:0000d',
	builtin_SmallCompactHomescreen: 'Themezer:0000f',
	builtin_RoundSmallCompactHome: 'Themezer:0000f|e818c9af-ca39-48cd-8ed1-a979b69ea142',

	// builtin_TwoRowHome: '', OUTDATED
	// Entrance
	builtin_ClearLock: 'Themezer:00009',
	builtin_SimpleLayoutLockscreen: 'Themezer:0000a',
	builtin_SideLock: 'Themezer:00001',
	builtin_MiniLock: 'Themezer:00013',

	// Flaunch
	builtin_AllApps90S: 'Themezer:0000b',
	builtin_AllApps90Round: 'Themezer:0000b|2ee3f0bc-9140-402e-bdfc-d50042c4d45e',

	// Psl
	builtin_TransparentPSL90SC:
		'Themezer:00003|b77b434f-5811-42fc-bd5e-ab44d7f24b61,d22d7557-99da-4710-a2d8-0bb3c7bfac14',
	builtin_TransparentPSL90ST:
		'Themezer:00003|b77b434f-5811-42fc-bd5e-ab44d7f24b61,219eaa0a-9bbd-410c-9806-5bc898ad6849',
	builtin_TransparentPSL90S: 'Themezer:00003|b77b434f-5811-42fc-bd5e-ab44d7f24b61,',
	builtin_TransparentPSLCentered: 'Themezer:00003|d22d7557-99da-4710-a2d8-0bb3c7bfac14',
	builtin_TransparentPSLTop: 'Themezer:00003|219eaa0a-9bbd-410c-9806-5bc898ad6849',
	builtin_TransparentPSL: 'Themezer:00003',
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
	const id: String = split2[0];
	const piece_uuids: string[] = (split2[1] || '').split(',');

	return {
		service,
		id,
		piece_uuids: piece_uuids.filter((p) => p !== ''),
	};
};

export const stringifyThemeID = ({
	service = '',
	id = '',
	piece_uuids = [],
}: {
	service?: string;
	id: string;
	piece_uuids?: string[];
}) => {
	const ID: string = service + ':' + id + (piece_uuids.length > 0 ? '|' + piece_uuids.join() : '');
	const converted: string = convertID.getReverse(ID);
	if (converted) return converted;
	else return ID;
};
