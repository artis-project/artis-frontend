import{z as t,X as d,B as u,af as m,A as W,D as i,F as v,G as w,b4 as y,J as C,K as T,M as b,O as E,P as S,Q as A,S as R,T as B,b5 as F,a5 as g,V as O,Y as f,Z as V}from"./index.72f44f21.js";import{S as P}from"./erc-20-standard-c5b1ff3e.browser.esm.d9fa756f.js";class M{constructor(e,s){t(this,"events",void 0),t(this,"contractWrapper",void 0),this.contractWrapper=e,this.events=s}async getAllHolderBalances(){const s=(await this.events.getEvents("Transfer")).map(a=>a.data),r={};return s.forEach(a=>{const o=a==null?void 0:a.from,c=a==null?void 0:a.to,p=a==null?void 0:a.value;o!==d&&(o in r||(r[o]=u.from(0)),r[o]=r[o].sub(p)),c!==d&&(c in r||(r[c]=u.from(0)),r[c]=r[c].add(p))}),Promise.all(Object.keys(r).map(async a=>({holder:a,balance:await m(this.contractWrapper.getProvider(),this.contractWrapper.readContract.address,r[a])})))}}class l extends P{constructor(e,s,r){let a=arguments.length>3&&arguments[3]!==void 0?arguments[3]:{},o=arguments.length>4?arguments[4]:void 0,c=arguments.length>5?arguments[5]:void 0,p=arguments.length>6&&arguments[6]!==void 0?arguments[6]:new W(e,s,o,a);super(p,r,c),t(this,"abi",void 0),t(this,"metadata",void 0),t(this,"app",void 0),t(this,"roles",void 0),t(this,"encoder",void 0),t(this,"estimator",void 0),t(this,"history",void 0),t(this,"events",void 0),t(this,"platformFees",void 0),t(this,"sales",void 0),t(this,"signature",void 0),t(this,"interceptor",void 0),t(this,"mint",i(async n=>this.erc20.mint.prepare(n))),t(this,"mintTo",i(async(n,h)=>this.erc20.mintTo.prepare(n,h))),t(this,"mintBatchTo",i(async n=>this.erc20.mintBatchTo.prepare(n))),t(this,"delegateTo",i(async n=>f.fromContractWrapper({contractWrapper:this.contractWrapper,method:"delegate",args:[await g(n)]}))),t(this,"burn",i(n=>this.erc20.burn.prepare(n))),t(this,"burnFrom",i(async(n,h)=>this.erc20.burnFrom.prepare(n,h))),this.abi=v.parse(o||[]),this.metadata=new w(this.contractWrapper,y,this.storage),this.app=new C(this.contractWrapper,this.metadata,this.storage),this.roles=new T(this.contractWrapper,l.contractRoles),this.sales=new b(this.contractWrapper),this.events=new E(this.contractWrapper),this.history=new M(this.contractWrapper,this.events),this.encoder=new S(this.contractWrapper),this.estimator=new A(this.contractWrapper),this.platformFees=new R(this.contractWrapper),this.interceptor=new B(this.contractWrapper),this.signature=new F(this.contractWrapper,this.roles)}async getVoteBalance(){return await this.getVoteBalanceOf(await this.contractWrapper.getSignerAddress())}async getVoteBalanceOf(e){return await this.erc20.getValue(await this.contractWrapper.readContract.getVotes(e))}async getDelegation(){return await this.getDelegationOf(await this.contractWrapper.getSignerAddress())}async getDelegationOf(e){return await this.contractWrapper.readContract.delegates(await g(e))}async isTransferRestricted(){return!await this.contractWrapper.readContract.hasRole(O("transfer"),d)}async getMintTransaction(e,s){return this.erc20.getMintTransaction(e,s)}async prepare(e,s,r){return f.fromContractWrapper({contractWrapper:this.contractWrapper,method:e,args:s,overrides:r})}async call(e,s,r){return this.contractWrapper.call(e,s,r)}}t(l,"contractRoles",V);export{l as Token};
