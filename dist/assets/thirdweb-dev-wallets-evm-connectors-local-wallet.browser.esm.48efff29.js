import{C as u,_ as r,a as c,c as e,d as o,g as d}from"./index.2db048f1.js";import{n as w}from"./normalizeChainId-e4cc0175.browser.esm.042707b7.js";const l="4f20f63d3ce0ec88eca639a291effef1559289d5614d77040d783048a4b3f316";var i=new WeakMap,s=new WeakMap;class C extends u{constructor(t){super(),r(this,"id","local_wallet"),r(this,"name","Local Wallet"),r(this,"options",void 0),c(this,i,{writable:!0,value:void 0}),c(this,s,{writable:!0,value:void 0}),r(this,"shimDisconnectKey","localWallet.shimDisconnect"),r(this,"onChainChanged",n=>{const a=w(n),f=!this.options.chains.find(g=>g.chainId===a);this.emit("change",{chain:{id:a,unsupported:f}})}),this.options=t}async connect(t){return t.chainId&&this.switchChain(t.chainId),await(await this.getSigner()).getAddress()}async disconnect(){e(this,i,void 0),e(this,s,void 0)}async getAddress(){const t=await this.getSigner();if(!t)throw new Error("No signer found");return await t.getAddress()}async isConnected(){try{return!!await this.getAddress()}catch{return!1}}async getProvider(){return o(this,i)||e(this,i,d(this.options.chain,{thirdwebApiKey:this.options.thirdwebApiKey||l})),o(this,i)}async getSigner(){if(!o(this,s)){const t=await this.getProvider();e(this,s,p(this.options.ethersWallet,t))}return o(this,s)}async switchChain(t){const n=this.options.chains.find(a=>a.chainId===t);if(!n)throw new Error(`Chain not found for chainId ${t}, please add it to the chains property when creating this wallet`);e(this,i,d(n,{thirdwebApiKey:this.options.thirdwebApiKey||l})),e(this,s,p(this.options.ethersWallet,o(this,i))),this.onChainChanged(t)}async setupListeners(){}updateChains(t){this.options.chains=t}}function p(h,t){return t?h.connect(t):h}export{C as LocalWalletConnector};
