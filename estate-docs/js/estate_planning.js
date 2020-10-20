// TODO: https://stackoverflow.com/questions/63305785/vuejs-add-thousands-separator-to-input

let client_data = {
	married_input: params.get("married"),
	date_of_marriage: params.get("date_of_marriage"),
	postal_address: params.get("address"),
	county_of_residence: params.get("county_of_residence"),
	client: {
		birth_year: params.get("client_birth_year"),
		name: params.get("client_name"),
		signature_name: params.get("client_signature_name"),
		citizen: params.get("client_citizen"),

		home_phone_number: params.get("client_home_phone_number"),
		mobile_phone_number: params.get("client_mobile_phone_number"),
		email_address: params.get("client_email_address"),

		gift_tax: params.get( "client_gift_tax" ),
		UTMA: params.get( "client_UTMA" ),
		section_529: params.get( "client_section_529" ),

		health: params.get( "client_health" ),
	},
	spouse: {
		birth_year: params.get("spouse_birth_year"),
		name: params.get("spouse_name"),
		signature_name: params.get("spouse_signature_name"),
		citizen: params.get("spouse_citizen"),

		home_phone_number: params.get("spouse_home_phone_number"),
		mobile_phone_number: params.get("spouse_mobile_phone_number"),
		email_address: params.get("spouse_email_address"),

		gift_tax: params.get( "spouse_gift_tax" ),
		UTMA: params.get( "spouse_UTMA" ),
		section_529: params.get( "spouse_section_529" ),

		health: params.get( "spouse_health" ),
	},
	assets: {
		cash: {
			combined: params.get( "cash_combined" ),
			client: params.get( "cash_client" ),
			spouse: params.get( "cash_spouse" ),
		},
		residence: {
			combined: params.get( "residence_combined" ),
			client: params.get( "residence_client" ),
			spouse: params.get( "residence_spouse" ),
		},
		other_real_estate: {
			address: params.get( "other_real_estate_address" ),
			combined: params.get( "other_real_estate_combined" ),
			client: params.get( "other_real_estate_client" ),
			spouse: params.get( "other_real_estate_spouse" ),
		},
		retirement_plans: {
			client: {
				value: params.get( "retirement_plans_client_value" ),
				beneficiaries: params.get( "retirement_plans_client_beneficiaries" ),
			},
			spouse: {
				value: params.get( "retirement_plans_spouse_value" ),
				beneficiaries: params.get( "retirement_plans_spouse_beneficiaries" ),
			},
		},
		taxable_accounts: {
			combined: params.get( "taxable_accounts_combined" ),
			client: params.get( "taxable_accounts_client" ),
			spouse: params.get( "taxable_accounts_spouse" ),
		},
		business_interests: {
			combined: params.get( "business_interests_combined" ),
			client: params.get( "business_interests_client" ),
			spouse: params.get( "business_interests_spouse" ),
		},
		life_insurance: {
			client: {
				coverage: params.get( "life_insurance_client_coverage" ),
				beneficiaries: params.get( "life_insurance_client_beneficiaries" ),
			},
			spouse: {
				coverage: params.get( "life_insurance_spouse_coverage" ),
				beneficiaries: params.get( "life_insurance_spouse_beneficiaries" ),
			},
		},
		anticipated_inheritance: {
			client: params.get( "anticipated_inheritance_client" ),
			spouse: params.get( "anticipated_inheritance_spouse" ),
		},
		collectibles: {
			combined: params.get( "collectibles_combined" ),
			client: params.get( "collectibles_client" ),
			spouse: params.get( "collectibles_spouse" ),
		},
		other: {
			combined: params.get( "assets_other_combined" ),
			client: params.get( "assets_other_client" ),
			spouse: params.get( "assets_other_spouse" ),
		},
	},
	liabilities: {
		accounts_payable: {
			combined: params.get( "accounts_payable_combined" ),
			client: params.get( "accounts_payable_client" ),
			spouse: params.get( "accounts_payable_spouse" ),
		},
		loans_against_life_insurance: {
			client: params.get( "loans_against_life_insurance_client" ),
			spouse: params.get( "loans_against_life_insurance_spouse" ),
		},
		other: {
			combined: params.get( "liabilities_other_combined" ),
			client: params.get( "liabilities_other_client" ),
			spouse: params.get( "liabilities_other_spouse" ),
		},
	},
	agents: {
		client: {
			spouse: params.get( "agents_client_spouse" ),
			agents: JSON.parse( params.get( "agents_client" ) ) || [],
		},
		spouse: {
			spouse: params.get( "agents_spouse_spouse" ),
			agents: JSON.parse( params.get( "agents_spouse" ) ) || [],
		},
	},
	additional_agent: {
		client: {
			name: null,
			location: null,
			relationship: null,			
		},
		spouse: {
			name: null,
			location: null,
			relationship: null,			
		},
	},
	decision_condition: params.get("decision_condition"),
	prolong: params.get("prolong") === "false" ? false : params.get("prolong") === "true" ? true : null,
	options: {
		minors: params.get("minors"),
	},
};


function documentIfExists( params, key, value ) {
	if (value) {
		params.append( key, value );
		return 1;
	} else
		return 0;
}


Vue.component('successor-agent', {
	props: [ 'agent', 'order', 'spouse_primary' ],
	template: `<TR>
			<TD>
				{{ spouse_primary ? order + 2 : order + 1 }}
			</TD>
			<TD>
				{{ agent.name }}
			</TD>
			<TD>
				{{ agent.location }}
			</TD>
			<TD>
				{{ agent.relationship }}
			</TD>
		</TR>`
});


const app = new Vue({
	el: '#app',
	data: client_data,
	computed: {
		married: function () {
				return this.married_input == "true" ? true : this.married_input == "false" ? false : null;
		},
		total_assets_combined: function () {
			return +this.assets.cash.combined + +this.assets.residence.combined + +this.assets.other_real_estate.combined + +this.assets.taxable_accounts.combined 
				+ +this.assets.business_interests.combined + +this.assets.collectibles.combined + +this.assets.other.combined
		},
		total_assets_client: function () {
			return +this.assets.cash.client + +this.assets.residence.client + +this.assets.other_real_estate.client + +this.assets.retirement_plans.client.value
				+ +this.assets.taxable_accounts.client + +this.assets.business_interests.client + +this.assets.life_insurance.client.coverage
				+ +this.assets.anticipated_inheritance.client + +this.assets.collectibles.client + +this.assets.other.client
		},
		total_assets_spouse: function () {
			return +this.assets.cash.spouse + +this.assets.residence.spouse + +this.assets.other_real_estate.spouse + +this.assets.retirement_plans.spouse.value
				+ +this.assets.taxable_accounts.spouse + +this.assets.business_interests.spouse + +this.assets.life_insurance.spouse.coverage
				+ +this.assets.anticipated_inheritance.spouse + +this.assets.collectibles.spouse + +this.assets.other.spouse
		},
		total_liabilities_combined: function () {
			return +this.liabilities.accounts_payable.combined + +this.liabilities.other.combined
		},
		total_liabilities_client: function () {
			return +this.liabilities.accounts_payable.client + +this.liabilities.loans_against_life_insurance.client + +this.liabilities.other.client
		},
		total_liabilities_spouse: function () {
			return +this.liabilities.accounts_payable.spouse + +this.liabilities.loans_against_life_insurance.spouse + +this.liabilities.other.spouse
		},
		bookmark: function () {
			const bookmarkLocation = new URL( location.href );

			bookmarkLocation.search = this.documentQueryString;

			return bookmarkLocation;
		},
		// a computed getter
		documentQueryString: function () {
			const params = new URLSearchParams({});

			// `this` points to the vm instance

			this.married && params.append( "married", this.married );
			this.date_of_marriage && params.append( "date_of_marriage", this.date_of_marriage );
			this.postal_address && params.append( "address", this.postal_address );
			this.county_of_residence && params.append( "county_of_residence", this.county_of_residence );

			this.client.birth_year && params.append( "client_birth_year", this.client.birth_year );
			this.client.name && params.append( "client_name", this.client.name );
			this.client.signature_name && params.append( "client_signature_name", this.client.signature_name );
			this.client.citizen && params.append( "client_citizen", this.client.citizen );

			this.client.home_phone_number && params.append( "client_home_phone_number", this.client.home_phone_number );
			this.client.mobile_phone_number && params.append( "client_mobile_phone_number", this.client.mobile_phone_number );
			this.client.email_address && params.append( "client_email_address", this.client.email_address );

			this.client.gift_tax && params.append( "client_gift_tax", this.client.gift_tax );
			this.client.UTMA && params.append( "client_UTMA", this.client.UTMA );
			this.client.section_529 && params.append( "client_section_529", this.client.section_529 );

			this.client.health && params.append( "client_health", this.client.health );

			this.spouse.birth_year && params.append( "spouse_birth_year", this.spouse.birth_year );
			this.spouse.name && params.append( "spouse_name", this.spouse.name );
			this.spouse.signature_name && params.append( "spouse_signature_name", this.spouse.signature_name );
			this.spouse.citizen && params.append( "spouse_citizen", this.spouse.citizen );

			this.spouse.home_phone_number && params.append( "spouse_home_phone_number", this.spouse.home_phone_number );
			this.spouse.mobile_phone_number && params.append( "spouse_mobile_phone_number", this.spouse.mobile_phone_number );
			this.spouse.email_address && params.append( "spouse_email_address", this.spouse.email_address );

			this.spouse.gift_tax && params.append( "spouse_gift_tax", this.spouse.gift_tax );
			this.spouse.UTMA && params.append( "spouse_UTMA", this.spouse.UTMA );
			this.spouse.section_529 && params.append( "spouse_section_529", this.spouse.section_529 );

			this.spouse.health && params.append( "spouse_health", this.spouse.health );

			// assets

			documentIfExists( params, "cash_combined", this.assets.cash.combined );
			documentIfExists( params, "cash_client", this.assets.cash.client );
			documentIfExists( params, "cash_spouse", this.assets.cash.spouse );

			this.assets.residence.combined && params.append( "equity_in_residence_combined", this.assets.residence.combined );
			this.assets.residence.client && params.append( "equity_in_residence_client", this.assets.residence.client );
			this.assets.residence.spouse && params.append( "equity_in_residence_spouse", this.assets.residence.spouse );

			this.assets.other_real_estate.address && params.append( "other_real_estate_address", this.assets.other_real_estate.address );
			this.assets.other_real_estate.combined && params.append( "other_real_estate_combined", this.assets.other_real_estate.combined );
			this.assets.other_real_estate.client && params.append( "other_real_estate_client", this.assets.other_real_estate.client );
			this.assets.other_real_estate.spouse && params.append( "other_real_estate_spouse", this.assets.other_real_estate.spouse );

			documentIfExists( params, "retirement_plans_client_value", this.assets.retirement_plans.client.value );
			documentIfExists( params, "retirement_plans_client_beneficiaries", this.assets.retirement_plans.client.beneficiaries );
			documentIfExists( params, "retirement_plans_spouse_value", this.assets.retirement_plans.spouse.value );
			documentIfExists( params, "retirement_plans_spouse_beneficiaries", this.assets.retirement_plans.spouse.beneficiaries );

			documentIfExists( params, "taxable_accounts_combined", this.assets.taxable_accounts.combined );
			documentIfExists( params, "taxable_accounts_client", this.assets.taxable_accounts.client );
			documentIfExists( params, "taxable_accounts_spouse", this.assets.taxable_accounts.spouse );

			documentIfExists( params, "business_interests_combined", this.assets.business_interests.combined );
			documentIfExists( params, "business_interests_client", this.assets.business_interests.client );
			documentIfExists( params, "business_interests_spouse", this.assets.business_interests.spouse );

			documentIfExists( params, "life_insurance_client_coverage", this.assets.life_insurance.client.coverage );
			documentIfExists( params, "life_insurance_client_beneficiaries", this.assets.life_insurance.client.beneficiaries );
			documentIfExists( params, "life_insurance_spouse_coverage", this.assets.life_insurance.spouse.coverage );
			documentIfExists( params, "life_insurance_spouse_beneficiaries", this.assets.life_insurance.spouse.beneficiaries );

			documentIfExists( params, "anticipated_inheritance_client", this.assets.anticipated_inheritance.client );
			documentIfExists( params, "anticipated_inheritance_spouse", this.assets.anticipated_inheritance.spouse );

			documentIfExists( params, "collectibles_combined", this.assets.collectibles.combined );
			documentIfExists( params, "collectibles_client", this.assets.collectibles.client );
			documentIfExists( params, "collectibles_spouse", this.assets.collectibles.spouse );

			documentIfExists( params, "assets_other_combined", this.assets.other.combined );
			documentIfExists( params, "assets_other_client", this.assets.other.client );
			documentIfExists( params, "assets_other_spouse", this.assets.other.spouse );


			// liabilities

			documentIfExists( params, "accounts_payable_combined", this.liabilities.accounts_payable.combined );
			documentIfExists( params, "accounts_payable_client", this.liabilities.accounts_payable.client );
			documentIfExists( params, "accounts_payable_spouse", this.liabilities.accounts_payable.spouse );

			documentIfExists( params, "loans_against_life_insurance_client", this.liabilities.loans_against_life_insurance.client );
			documentIfExists( params, "loans_against_life_insurance_spouse", this.liabilities.loans_against_life_insurance.spouse );

			documentIfExists( params, "liabilities_other_combined", this.liabilities.other.combined );
			documentIfExists( params, "liabilities_other_client", this.liabilities.other.client );
			documentIfExists( params, "liabilities_other_spouse", this.liabilities.other.spouse );


			documentIfExists( params, "agents_client_spouse", this.agents.client.spouse );
			documentIfExists( params, "agents_spouse_spouse", this.agents.spouse.spouse );

			this.agents.client.agents.length > 0 && params.append( "agents_client", JSON.stringify( this.agents.client.agents ) );
			this.married && this.agents.spouse.agents.length > 0 && params.append( "agents_spouse", JSON.stringify( this.agents.spouse.agents ) );

			this.decision_condition && params.append( "decision_condition", this.decision_condition );

			this.prolong && params.append( "prolong", this.prolong );

			this.options.minors && params.append( "minors", this.options.minors );

			return params;
		},
	},
	methods: {
		processAdditionalAgent: function ( individual ) {
			this.agents[individual].agents.push(
				{
					name: this.additional_agent[individual].name,
					location: this.additional_agent[individual].location,
					relationship: this.additional_agent[individual].relationship,
				}
			);

			location.search = this.bookmark.search;
		}
	}
});


