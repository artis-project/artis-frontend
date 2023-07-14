import{ax as _,A as T,z as n,D as C,F as $,G as N,aQ as V,J as D,K as z,L as K,P as Q,Q as Y,O as M,T as B,U as j,V as G,X as H,B as f,an as P,ao as b,a7 as X,ah as L,Y as A,ay as Z,aR as J,aS as tt,aT as U,a5 as q,aU as et,aV as at,aH as rt,aW as W,aX as nt,aY as k,aZ as st,a_ as x,a$ as ot}from"./index.2db048f1.js";import{S as ct}from"./erc-1155-standard-0c6010d0.browser.esm.8ac3b7fd.js";import{h as it}from"./hasERC20Allowance-ca5e8560.browser.esm.6a335596.js";const dt=[{inputs:[{internalType:"string",name:"name_",type:"string"},{internalType:"string",name:"symbol_",type:"string"}],stateMutability:"nonpayable",type:"constructor"},{anonymous:!1,inputs:[{indexed:!0,internalType:"address",name:"owner",type:"address"},{indexed:!0,internalType:"address",name:"spender",type:"address"},{indexed:!1,internalType:"uint256",name:"value",type:"uint256"}],name:"Approval",type:"event"},{anonymous:!1,inputs:[{indexed:!0,internalType:"address",name:"from",type:"address"},{indexed:!0,internalType:"address",name:"to",type:"address"},{indexed:!1,internalType:"uint256",name:"value",type:"uint256"}],name:"Transfer",type:"event"},{inputs:[{internalType:"address",name:"owner",type:"address"},{internalType:"address",name:"spender",type:"address"}],name:"allowance",outputs:[{internalType:"uint256",name:"",type:"uint256"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"address",name:"spender",type:"address"},{internalType:"uint256",name:"amount",type:"uint256"}],name:"approve",outputs:[{internalType:"bool",name:"",type:"bool"}],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"address",name:"account",type:"address"}],name:"balanceOf",outputs:[{internalType:"uint256",name:"",type:"uint256"}],stateMutability:"view",type:"function"},{inputs:[],name:"decimals",outputs:[{internalType:"uint8",name:"",type:"uint8"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"address",name:"spender",type:"address"},{internalType:"uint256",name:"subtractedValue",type:"uint256"}],name:"decreaseAllowance",outputs:[{internalType:"bool",name:"",type:"bool"}],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"address",name:"spender",type:"address"},{internalType:"uint256",name:"addedValue",type:"uint256"}],name:"increaseAllowance",outputs:[{internalType:"bool",name:"",type:"bool"}],stateMutability:"nonpayable",type:"function"},{inputs:[],name:"name",outputs:[{internalType:"string",name:"",type:"string"}],stateMutability:"view",type:"function"},{inputs:[],name:"symbol",outputs:[{internalType:"string",name:"",type:"string"}],stateMutability:"view",type:"function"},{inputs:[],name:"totalSupply",outputs:[{internalType:"uint256",name:"",type:"uint256"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"address",name:"to",type:"address"},{internalType:"uint256",name:"amount",type:"uint256"}],name:"transfer",outputs:[{internalType:"bool",name:"",type:"bool"}],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"address",name:"from",type:"address"},{internalType:"address",name:"to",type:"address"},{internalType:"uint256",name:"amount",type:"uint256"}],name:"transferFrom",outputs:[{internalType:"bool",name:"",type:"bool"}],stateMutability:"nonpayable",type:"function"}],S=W.object({contractAddress:ot}),pt=S.extend({quantity:x}),ut=S.extend({tokenId:k}),lt=S.extend({tokenId:k,quantity:k}),ht=pt.omit({quantity:!0}).extend({quantityPerReward:x}),mt=ut,gt=lt.omit({quantity:!0}).extend({quantityPerReward:k}),yt=(()=>ht.extend({totalRewards:k.default("1")}))(),wt=mt,ft=(()=>gt.extend({totalRewards:k.default("1")}))(),F=(()=>W.object({erc20Rewards:W.array(yt).default([]),erc721Rewards:W.array(wt).default([]),erc1155Rewards:W.array(ft).default([])}))(),kt=(()=>F.extend({packMetadata:nt,rewardsPerPack:k.default("1"),openStartTime:st.default(new Date)}))();class Rt{constructor(e,a,o,s,r){var p=this;let h=arguments.length>5&&arguments[5]!==void 0?arguments[5]:new T(e,a,tt,s);n(this,"featureName",U.name),n(this,"contractWrapper",void 0),n(this,"storage",void 0),n(this,"chainId",void 0),n(this,"events",void 0),n(this,"open",C(async function(i){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:1,c=arguments.length>2&&arguments[2]!==void 0?arguments[2]:5e5;return A.fromContractWrapper({contractWrapper:p.contractWrapper,method:"openPack",args:[i,t],overrides:{gasLimit:c},parse:d=>{let u=f.from(0);try{u=p.contractWrapper.parseLogs("PackOpenRequested",d==null?void 0:d.logs)[0].args.requestId}catch{}return{receipt:d,id:u}}})})),n(this,"claimRewards",C(async function(){let i=arguments.length>0&&arguments[0]!==void 0?arguments[0]:5e5;return A.fromContractWrapper({contractWrapper:p.contractWrapper,method:"claimRewards",args:[],overrides:{gasLimit:i},parse:async t=>{const c=p.contractWrapper.parseLogs("PackOpened",t==null?void 0:t.logs);if(c.length===0)throw new Error("PackOpened event not found");const d=c[0].args.rewardUnitsDistributed;return await p.parseRewards(d)}})})),this.contractWrapper=h,this.storage=o,this.chainId=r,this.events=new M(this.contractWrapper)}onNetworkUpdated(e){this.contractWrapper.updateSignerOrProvider(e)}getAddress(){return this.contractWrapper.readContract.address}async parseRewards(e){const a=[],o=[],s=[];for(const r of e)switch(r.tokenType){case 0:{const p=await P(this.contractWrapper.getProvider(),r.assetContract);a.push({contractAddress:r.assetContract,quantityPerReward:b(r.totalAmount,p.decimals).toString()});break}case 1:{o.push({contractAddress:r.assetContract,tokenId:r.tokenId.toString()});break}case 2:{s.push({contractAddress:r.assetContract,tokenId:r.tokenId.toString(),quantityPerReward:r.totalAmount.toString()});break}}return{erc20Rewards:a,erc721Rewards:o,erc1155Rewards:s}}async addPackOpenEventListener(e){return this.events.addEventListener("PackOpened",async a=>{e(a.data.packId.toString(),a.data.opener,await this.parseRewards(a.data.rewardUnitsDistributed))})}async canClaimRewards(e){const a=await q(e||await this.contractWrapper.getSignerAddress());return await this.contractWrapper.readContract.canClaimRewards(a)}async openAndClaim(e){let a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:1,o=arguments.length>2&&arguments[2]!==void 0?arguments[2]:5e5;const s=await this.contractWrapper.sendTransaction("openPackAndClaimRewards",[e,a,o],{gasLimit:f.from(5e5)});let r=f.from(0);try{r=this.contractWrapper.parseLogs("PackOpenRequested",s==null?void 0:s.logs)[0].args.requestId}catch{}return{receipt:s,id:r}}async getLinkBalance(){return this.getLinkContract().balanceOf(this.contractWrapper.readContract.address)}async transferLink(e){await this.getLinkContract().transfer(this.contractWrapper.readContract.address,e)}getLinkContract(){const e=et[this.chainId];if(!e)throw new Error(`No LINK token address found for chainId ${this.chainId}`);const a=new T(this.contractWrapper.getSignerOrProvider(),e,dt,this.contractWrapper.options);return new at(a,this.storage,this.chainId)}}class I extends ct{get vrf(){return _(this._vrf,U)}constructor(e,a,o){var s;let r=arguments.length>3&&arguments[3]!==void 0?arguments[3]:{},p=arguments.length>4?arguments[4]:void 0,h=arguments.length>5?arguments[5]:void 0,i=arguments.length>6&&arguments[6]!==void 0?arguments[6]:new T(e,a,p,r.gasless&&"openzeppelin"in r.gasless?{...r,gasless:{...r.gasless,openzeppelin:{...r.gasless.openzeppelin,useEOAForwarder:!0}}}:r);super(i,o,h),s=this,n(this,"abi",void 0),n(this,"metadata",void 0),n(this,"app",void 0),n(this,"roles",void 0),n(this,"encoder",void 0),n(this,"events",void 0),n(this,"estimator",void 0),n(this,"royalties",void 0),n(this,"interceptor",void 0),n(this,"owner",void 0),n(this,"_vrf",void 0),n(this,"create",C(async t=>{const c=await this.contractWrapper.getSignerAddress();return this.createTo.prepare(c,t)})),n(this,"addPackContents",C(async(t,c)=>{const d=await this.contractWrapper.getSignerAddress(),u=await F.parseAsync(c),{contents:g,numOfRewardUnits:v}=await this.toPackContentArgs(u);return A.fromContractWrapper({contractWrapper:this.contractWrapper,method:"addPackContents",args:[t,g,v,d],parse:m=>{const y=this.contractWrapper.parseLogs("PackUpdated",m==null?void 0:m.logs);if(y.length===0)throw new Error("PackUpdated event not found");const w=y[0].args.packId;return{id:w,receipt:m,data:()=>this.erc1155.get(w)}}})})),n(this,"createTo",C(async(t,c)=>{const d=await rt(c.packMetadata,this.storage),u=await kt.parseAsync(c),{erc20Rewards:g,erc721Rewards:v,erc1155Rewards:m}=u,y={erc20Rewards:g,erc721Rewards:v,erc1155Rewards:m},{contents:w,numOfRewardUnits:l}=await this.toPackContentArgs(y);return A.fromContractWrapper({contractWrapper:this.contractWrapper,method:"createPack",args:[w,l,d,u.openStartTime,u.rewardsPerPack,await q(t)],parse:R=>{const E=this.contractWrapper.parseLogs("PackCreated",R==null?void 0:R.logs);if(E.length===0)throw new Error("PackCreated event not found");const O=E[0].args.packId;return{id:O,receipt:R,data:()=>this.erc1155.get(O)}}})})),n(this,"open",C(async function(t){let c=arguments.length>1&&arguments[1]!==void 0?arguments[1]:1,d=arguments.length>2&&arguments[2]!==void 0?arguments[2]:5e5;if(s._vrf)throw new Error("This contract is using Chainlink VRF, use `contract.vrf.open()` or `contract.vrf.openAndClaim()` instead");return A.fromContractWrapper({contractWrapper:s.contractWrapper,method:"openPack",args:[t,c],overrides:{gasLimit:d},parse:async u=>{const g=s.contractWrapper.parseLogs("PackOpened",u==null?void 0:u.logs);if(g.length===0)throw new Error("PackOpened event not found");const v=g[0].args.rewardUnitsDistributed,m=[],y=[],w=[];for(const l of v)switch(l.tokenType){case 0:{const R=await P(s.contractWrapper.getProvider(),l.assetContract);m.push({contractAddress:l.assetContract,quantityPerReward:b(l.totalAmount,R.decimals).toString()});break}case 1:{y.push({contractAddress:l.assetContract,tokenId:l.tokenId.toString()});break}case 2:{w.push({contractAddress:l.assetContract,tokenId:l.tokenId.toString(),quantityPerReward:l.totalAmount.toString()});break}}return{erc20Rewards:m,erc721Rewards:y,erc1155Rewards:w}}})})),this.abi=$.parse(p||[]),this.metadata=new N(this.contractWrapper,V,this.storage),this.app=new D(this.contractWrapper,this.metadata,this.storage),this.roles=new z(this.contractWrapper,I.contractRoles),this.royalties=new K(this.contractWrapper,this.metadata),this.encoder=new Q(this.contractWrapper),this.estimator=new Y(this.contractWrapper),this.events=new M(this.contractWrapper),this.interceptor=new B(this.contractWrapper),this.owner=new j(this.contractWrapper),this._vrf=this.detectVrf()}onNetworkUpdated(e){var a;this.contractWrapper.updateSignerOrProvider(e),(a=this._vrf)==null||a.onNetworkUpdated(e)}getAddress(){return this.contractWrapper.readContract.address}async get(e){return this.erc1155.get(e)}async getAll(e){return this.erc1155.getAll(e)}async getOwned(e){return this.erc1155.getOwned(e)}async getTotalCount(){return this.erc1155.totalCount()}async isTransferRestricted(){return!await this.contractWrapper.readContract.hasRole(G("transfer"),H)}async getPackContents(e){const{contents:a,perUnitAmounts:o}=await this.contractWrapper.readContract.getPackContents(e),s=[],r=[],p=[];for(let h=0;h<a.length;h++){const i=a[h],t=o[h];switch(i.tokenType){case 0:{const c=await P(this.contractWrapper.getProvider(),i.assetContract),d=b(t,c.decimals),u=b(f.from(i.totalAmount).div(t),c.decimals);s.push({contractAddress:i.assetContract,quantityPerReward:d,totalRewards:u});break}case 1:{r.push({contractAddress:i.assetContract,tokenId:i.tokenId.toString()});break}case 2:{p.push({contractAddress:i.assetContract,tokenId:i.tokenId.toString(),quantityPerReward:t.toString(),totalRewards:f.from(i.totalAmount).div(t).toString()});break}}}return{erc20Rewards:s,erc721Rewards:r,erc1155Rewards:p}}async toPackContentArgs(e){const a=[],o=[],{erc20Rewards:s,erc721Rewards:r,erc1155Rewards:p}=e,h=this.contractWrapper.getProvider(),i=await this.contractWrapper.getSignerAddress();for(const t of s){const d=(await X(h,t.quantityPerReward,t.contractAddress)).mul(t.totalRewards);if(!await it(this.contractWrapper,t.contractAddress,d))throw new Error(`ERC20 token with contract address "${t.contractAddress}" does not have enough allowance to transfer.

You can set allowance to the multiwrap contract to transfer these tokens by running:

await sdk.getToken("${t.contractAddress}").setAllowance("${this.getAddress()}", ${d});

`);o.push(t.totalRewards),a.push({assetContract:t.contractAddress,tokenType:0,totalAmount:d,tokenId:0})}for(const t of r){if(!await L(this.contractWrapper.getProvider(),this.getAddress(),t.contractAddress,t.tokenId,i))throw new Error(`ERC721 token "${t.tokenId}" with contract address "${t.contractAddress}" is not approved for transfer.

You can give approval the multiwrap contract to transfer this token by running:

await sdk.getNFTCollection("${t.contractAddress}").setApprovalForToken("${this.getAddress()}", ${t.tokenId});

`);o.push("1"),a.push({assetContract:t.contractAddress,tokenType:1,totalAmount:1,tokenId:t.tokenId})}for(const t of p){if(!await L(this.contractWrapper.getProvider(),this.getAddress(),t.contractAddress,t.tokenId,i))throw new Error(`ERC1155 token "${t.tokenId}" with contract address "${t.contractAddress}" is not approved for transfer.

You can give approval the multiwrap contract to transfer this token by running:

await sdk.getEdition("${t.contractAddress}").setApprovalForAll("${this.getAddress()}", true);

`);o.push(t.totalRewards),a.push({assetContract:t.contractAddress,tokenType:2,totalAmount:f.from(t.quantityPerReward).mul(f.from(t.totalRewards)),tokenId:t.tokenId})}return{contents:a,numOfRewardUnits:o}}async prepare(e,a,o){return A.fromContractWrapper({contractWrapper:this.contractWrapper,method:e,args:a,overrides:o})}async call(e,a,o){return this.contractWrapper.call(e,a,o)}detectVrf(){if(Z(this.contractWrapper,"PackVRF"))return new Rt(this.contractWrapper.getSignerOrProvider(),this.contractWrapper.readContract.address,this.storage,this.contractWrapper.options,this.chainId)}}n(I,"contractRoles",J);export{I as Pack};
