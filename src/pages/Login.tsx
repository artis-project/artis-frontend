import { ConnectWallet } from '@thirdweb-dev/react';

export default function Login() {
  return (
    <div className="flex flex-col justify-center items-center space-y-[5rem]">
      <h1 className="text-8xl text-center group">
        Welcome to <div className="tracking-widest p-4 font-bold bg-gradient-to-r from-amber-600 via-rose-600 to-violet-600 bg-clip-text text-transparent group-hover:animate-bounce">artis-project</div>
      </h1>

      <div>
        <ConnectWallet
          dropdownPosition={{
            align: 'center',
            side: 'bottom',
          }}
        />
      </div>
    </div>
  );
}
