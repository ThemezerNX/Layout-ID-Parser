class TwoWayMap {
	map: any;
	reverseMap: any;
	constructor(map: object) {
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
	builtin_CarefulLayout: "Themezer:6",
	builtin_FlowLayout: "Themezer:5",
	builtin_JAGLayout: "Themezer:2",
	builtin_DogeLayout: "Themezer:e",
	builtin_DogeLayoutRound: "Themezer:e|7638bb49-7475-4d11-a76a-ec9d63b12b94",
	builtin_DiamondHome: "Themezer:d",
	builtin_SmallCompactHomescreen: "Themezer:f",
	builtin_RoundSmallCompactHome: "Themezer:f|e818c9af-ca39-48cd-8ed1-a979b69ea142",
	builtin_TwoRowHome: "Themezer:2c",

	// Entrance
	builtin_ClearLock: "Themezer:9",
	builtin_SimpleLayoutLockscreen: "Themezer:a",
	builtin_SideLock: "Themezer:1",
	builtin_MiniLock: "Themezer:13",

	// Flaunch
	builtin_AllApps90S: "Themezer:b",
	builtin_AllApps90Round: "Themezer:b|2ee3f0bc-9140-402e-bdfc-d50042c4d45e",

	// Psl
	builtin_TransparentPSL90SC: "Themezer:3|b77b434f-5811-42fc-bd5e-ab44d7f24b61,d22d7557-99da-4710-a2d8-0bb3c7bfac14",
	builtin_TransparentPSL90ST: "Themezer:3|b77b434f-5811-42fc-bd5e-ab44d7f24b61,219eaa0a-9bbd-410c-9806-5bc898ad6849",
	builtin_TransparentPSL90S: "Themezer:3|b77b434f-5811-42fc-bd5e-ab44d7f24b61",
	builtin_TransparentPSLCenter: "Themezer:3|d22d7557-99da-4710-a2d8-0bb3c7bfac14",
	builtin_TransparentPSLTop: "Themezer:3|219eaa0a-9bbd-410c-9806-5bc898ad6849",
	builtin_TransparentPSL: "Themezer:3",
});

interface Option {
	uuid: string;
	variable?: string;
}

const serviceREGEX = /(.+?):(.+?)(?:$|\|)(.+)?/g;
const optionREGEX = /(.+?)(?:\((.*)\))?(?:$|,)/g;

export function parseID(ID: string) {
	const converted = convertID.get(ID);
	if (converted) ID = converted;

	const IDparts = Array.from(ID.matchAll(serviceREGEX))[0];
	if (!IDparts) return;

	const options: Option[] = [];
	if (IDparts[3] != null) {
		// There are options
		for (const option of IDparts[3].matchAll(optionREGEX)) {
			options.push({
				uuid: option[1],
				variable: option.length === 3 ? option[2] : undefined,
			});
		}
	}

	return {
		service: IDparts[1],
		id: IDparts[2],
		options,
	};
}

export const stringifyID = ({ service, id, options = [] }: { service: string; id: string; options?: Option[] }) => {
	const optionStrings = options.map((o) => (o.variable ? `${o.uuid}(${o.variable})` : o.uuid));
	const ID: string = service + ":" + id + (optionStrings.length > 0 ? "|" + optionStrings.join(",") : "");
	const converted: string = convertID.getReverse(ID);
	if (converted) return converted;
	else return ID;
};

const DEFAULT_IDS = {
	home: "Themezer:19",
	lock: "Themezer:14",
	user: "Themezer:16",
	apps: "Themezer:15",
	set: "Themezer:1a",
	news: "Themezer:17",
	psl: "Themezer:18",
};

export const getDefaultID = (target: keyof typeof DEFAULT_IDS): string => {
	return DEFAULT_IDS[target];
};
