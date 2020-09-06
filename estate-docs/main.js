let uri = window.location.search.substring(1);
let params = new URLSearchParams(uri);

let client_data = {
	client: {
		name: params.get("client_name"),
		address: params.get("client_address"),
	},
	agent: {
		relationship: {
			boolean: params.get("agent_relationship") || "TRUE",
			type: params.get("agent_relationship_type") || "spouse",
		},
		name: params.get("agent_name"),
		location: {
			granularity: params.get("agent_location_granularity") || "address",
			value: params.get("agent_location"),
		},
		phone_number: params.get("agent_phone_number"),
	},
	successor_agents: JSON.parse( params.get("successor_agents") ) || [],
	additional_successor_agent: {
		name: null,
		location: {
			granularity: "address",
			value: null,
		},
		phone_number: null,
	},
	decision_condition: params.get("decision_condition") || "future",
	prolong: params.get("prolong") === "false" ? false : params.get("prolong") === "true" ? true : "omit",
	options: {
		minors: params.get("minors"),
	},
};



Vue.component('successor-agent', {
	props: [ 'agent' ],
	template: `<LI>{{ agent.name }} currently residing <SPAN v-if="agent.location.granularity === 'address'">at</SPAN> <SPAN v-else-if="agent.location.granularity === 'city'">in</SPAN> {{ agent.location.value }} with a last known phone number of {{ agent.phone_number }}.</LI>`
});

const app = new Vue({
	el: '#app',
	data: client_data,
	computed: {
		bookmark: function () {
			const bookmarkLocation = new URL( location.href );

			bookmarkLocation.search = this.documentQueryString;

			return bookmarkLocation;
		},
		// a computed getter
		documentQueryString: function () {
			const params = new URLSearchParams({});

			// `this` points to the vm instance

			this.client.name && params.append( "client_name", this.client.name );
			this.client.address && params.append( "client_address", this.client.address );

			params.append( "agent_relationship", this.agent.relationship.boolean );
			params.append( "agent_relationship_type", this.agent.relationship.type );

			this.agent.name && params.append( "agent_name", this.agent_name.name );

			if ( this.agent.location.value ) {
				params.append( "agent_location_granularity", this.agent.location.granularity );
				params.append( "agent_location", this.agent.location.value );
			}

			this.agent.phone_number && params.append( "agent_phone_number", this.agent.phone_number );

			this.successor_agents.length > 0 && params.append( "successor_agents", JSON.stringify( this.successor_agents) );

			this.decision_condition && params.append( "decision_condition", this.decision_condition );

			this.prolong && params.append( "prolong", this.prolong );

			this.options.minors && params.append( "minors", this.options.minors );

			return params;

		},
	},
	methods: {
		processSuccessorAgent: function () {
			// if (this.additional_successor_agent.name != "agent full name" && this.additional_successor_agent.city != "city, state" && this.additional_successor_agent.phone_number != "phone number") {
			this.successor_agents.push(
				{
					name: this.additional_successor_agent.name,
					location: {
						granularity: this.additional_successor_agent.location.granularity,
						value: this.additional_successor_agent.location.value,
					},
					phone_number: this.additional_successor_agent.phone_number,
				}
			);

			location.search = this.bookmark.search;
		}
	}
});


const inputElements = document.getElementsByTagName( "INPUT" );

for ( var i=0; i < inputElements.length; i++ ) {
	inputElements[i].addEventListener( "click", function () { this.select(); } );
}
