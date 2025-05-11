# Layout ID Parser

A small library that parses the ID string in a Nintendo Switch layout `json` file.

# Examples

```js
import { parseID, stringifyID, getDefaultID } from "@themezernx/layout-id-parser";

console.log(parseID("Themezer:3"));
// --> {
// 	    service: "Themezer",
//  	id: "3",
//  	options: []
// }
console.log(parseID("Themezer:3|b77b434f-5811-42fc-bd5e-ab44d7f24b61,adfasdff-5811-42fc-bd5e-ab44d7f24b61"));
// --> {
// 	    service: "Themezer",
//  	id: "3",
//  	options: [
//  		{uuid: "b77b434f-5811-42fc-bd5e-ab44d7f24b61", variable: undefined},
//  		{uuid: "adfasdff-5811-42fc-bd5e-ab44d7f24b61", variable: undefined}
// 	    ]
// }
console.log(parseID("Themezer:3|b77b434f-5811-42fc-bd5e-ab44d7f24b61(HELLO),adfasdff-5811-42fc-bd5e-ab44d7f24b61(25)"));
// --> {
// 	    service: "Themezer",
//  	id: "3",
//  	options: [
//  		{uuid: "b77b434f-5811-42fc-bd5e-ab44d7f24b61", variable: "HELLO"},
//  		{uuid: "adfasdff-5811-42fc-bd5e-ab44d7f24b61", variable: "25"}
// 	    ]
// }

// Parse an Object to a layout ID string
console.log(
	stringifyID({
		service: "Themezer",
		id: "3",
		options: [{ uuid: "b77b434f-5811-42fc-bd5e-ab44d7f24b61", variable: "100" }],
	})
);
// --> "Themezer:3|b77b434f-5811-42fc-bd5e-ab44d7f24b61(100)"

// Get the layout ID associated with the default layout
console.log(getDefaultID("home"));
// --> "Themezer:19"
```

# Build

```bash
# install dependencies
yarn

# compile the script
yarn run build
```
