import{z as t,D as i,$ as d}from"./index.72f44f21.js";class l{get chainId(){return this._chainId}constructor(r,e,c){var o=this;t(this,"contractWrapper",void 0),t(this,"storage",void 0),t(this,"erc1155",void 0),t(this,"_chainId",void 0),t(this,"transfer",i(async function(a,n,s){let p=arguments.length>3&&arguments[3]!==void 0?arguments[3]:[0];return o.erc1155.transfer.prepare(a,n,s,p)})),t(this,"setApprovalForAll",i(async(a,n)=>this.erc1155.setApprovalForAll.prepare(a,n))),t(this,"airdrop",i(async function(a,n){let s=arguments.length>2&&arguments[2]!==void 0?arguments[2]:[0];return o.erc1155.airdrop.prepare(a,n,s)})),this.contractWrapper=r,this.storage=e,this.erc1155=new d(this.contractWrapper,this.storage,c),this._chainId=c}onNetworkUpdated(r){this.contractWrapper.updateSignerOrProvider(r)}getAddress(){return this.contractWrapper.readContract.address}async get(r){return this.erc1155.get(r)}async totalSupply(r){return this.erc1155.totalSupply(r)}async balanceOf(r,e){return this.erc1155.balanceOf(r,e)}async balance(r){return this.erc1155.balance(r)}async isApproved(r,e){return this.erc1155.isApproved(r,e)}}export{l as S};
