import{A as m,z as t,D as n,F as u,G as l,aK as g,J as W,K as C,L as w,M as v,P as y,Q as T,O as f,S as R,T as S,aL as b,U as E,V as A,X as F,Y as B,Z as M}from"./index.66d791d1.js";import{S as O}from"./erc-721-standard-82fdd228.browser.esm.7e4aa75a.js";class o extends O{constructor(r,e,s){let p=arguments.length>3&&arguments[3]!==void 0?arguments[3]:{},c=arguments.length>4?arguments[4]:void 0,h=arguments.length>5?arguments[5]:void 0,d=arguments.length>6&&arguments[6]!==void 0?arguments[6]:new m(r,e,c,p);super(d,s,h),t(this,"abi",void 0),t(this,"metadata",void 0),t(this,"app",void 0),t(this,"roles",void 0),t(this,"encoder",void 0),t(this,"estimator",void 0),t(this,"events",void 0),t(this,"sales",void 0),t(this,"platformFees",void 0),t(this,"royalties",void 0),t(this,"owner",void 0),t(this,"signature",void 0),t(this,"interceptor",void 0),t(this,"mint",n(async a=>this.erc721.mint.prepare(a))),t(this,"mintTo",n(async(a,i)=>this.erc721.mintTo.prepare(a,i))),t(this,"mintBatch",n(async a=>this.erc721.mintBatch.prepare(a))),t(this,"mintBatchTo",n(async(a,i)=>this.erc721.mintBatchTo.prepare(a,i))),t(this,"burn",n(a=>this.erc721.burn.prepare(a))),this.abi=u.parse(c||[]),this.metadata=new l(this.contractWrapper,g,this.storage),this.app=new W(this.contractWrapper,this.metadata,this.storage),this.roles=new C(this.contractWrapper,o.contractRoles),this.royalties=new w(this.contractWrapper,this.metadata),this.sales=new v(this.contractWrapper),this.encoder=new y(this.contractWrapper),this.estimator=new T(this.contractWrapper),this.events=new f(this.contractWrapper),this.platformFees=new R(this.contractWrapper),this.interceptor=new S(this.contractWrapper),this.signature=new b(this.contractWrapper,this.storage),this.owner=new E(this.contractWrapper)}onNetworkUpdated(r){this.contractWrapper.updateSignerOrProvider(r)}getAddress(){return this.contractWrapper.readContract.address}async isTransferRestricted(){return!await this.contractWrapper.readContract.hasRole(A("transfer"),F)}async getMintTransaction(r,e){return this.erc721.getMintTransaction(r,e)}async prepare(r,e,s){return B.fromContractWrapper({contractWrapper:this.contractWrapper,method:r,args:e,overrides:s})}async call(r,e,s){return this.contractWrapper.call(r,e,s)}}t(o,"contractRoles",M);export{o as NFTCollection};