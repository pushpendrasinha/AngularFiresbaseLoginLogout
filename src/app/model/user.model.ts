export class Model {

	constructor (
		public userId  : string,	
		public email : string,		
		private _token : string,
		private _tokenExpirationDate : Date,
		public name ?: string,
		public password ? : string,
		)
	{}

	get token(){
		if(!this._tokenExpirationDate || new Date() > this._tokenExpirationDate){
			return null
		}
		 return this._token;
	}
	
}