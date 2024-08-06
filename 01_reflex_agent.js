// MIT License
// Copyright (c) 2020 Luis Espino

const posibleStates = [
	["A", "DIRTY", "DIRTY"],
	["B", "DIRTY", "DIRTY"],
	["A", "DIRTY", "CLEAN"],
	["B", "DIRTY", "CLEAN"],
	["A", "CLEAN", "DIRTY"],
	["B", "CLEAN", "DIRTY"],
	["A", "CLEAN", "CLEAN"],
	["B", "CLEAN", "CLEAN"]
]

let statesDone = [];

function reflex_agent(location, state) {
	if (state == "DIRTY") return "CLEAN";
	else if (location == "A") return "RIGHT";
	else if (location == "B") return "LEFT";
}

function test(states) {
	var location = states[0];
	var state = states[0] == "A" ? states[1] : states[2];
	validateCurrentState(states);
	var action_result = reflex_agent(location, state);
	document.getElementById("log").innerHTML += "<br>Location: ".concat(location).concat(" | Action: ").concat(action_result);
	if (action_result == "CLEAN") {
		if (location == "A") states[1] = "CLEAN";
		else if (location == "B") states[2] = "CLEAN";
	}
	else if (action_result == "RIGHT") states[0] = "B";
	else if (action_result == "LEFT") states[0] = "A";
}

function validateCurrentState(currentState) {
	for(const posibleState of posibleStates){
		if (equalsStates(posibleState, currentState)) { // ¿Es un estado permitido?
			for(const stateDone of statesDone){
				if(equalsStates(stateDone,currentState)){ // ¿Es un estado por el que ya se ha pasado?
					return;
				}
			}
			document.getElementById("log").innerHTML += "<br><b>STATE: [".concat(currentState).concat("] COMPLETE</b>");
			statesDone.push([...currentState]);
			return;
		}
	}
}

function equalsStates(state1, state2) {
	return state1[0] === state2[0] && state1[1] === state2[1] && state1[2] === state2[2]
}

function dirtyRandomly(states) {
	let dirtyFirstRoom = Math.round(Math.random());
	if (dirtyFirstRoom) {
		states[1] = "DIRTY";
		document.getElementById("log").innerHTML += "<br>Location: A | Action: DIRTYING";
	}

	let dirtySecondRoom = Math.round(Math.random());
	if (dirtySecondRoom) {
		states[2] = "DIRTY";
		document.getElementById("log").innerHTML += "<br>Location: B | Action: DIRTYING";
	}

	validateCurrentState(states);
}

function runSimulation(states) {
	const testInterval = setInterval(() => {
		test(states);
	}, 2000)

	const randomInterval = setInterval(() => {
		dirtyRandomly(states);
	}, 5000)

	const verificationInterval = setInterval( () => {
		if (statesDone.length === posibleStates.length){
			clearInterval(testInterval);
			clearInterval(randomInterval);
			clearInterval(verificationInterval);
			document.getElementById("log").innerHTML += "<br>ALL STATES ARE DONE, FINISHING SIMULATION";
		}
	})
}


var states = ["A", "DIRTY", "DIRTY"];
runSimulation(states);
