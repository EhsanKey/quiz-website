import Image from 'next/image';
import React from 'react';

const UserInfo = () => {
  return (
    <div className="gap-[11px] md:flex items-center justify-center">
      <Image
        width={38}
        height={38}
        src="/images/user-avatar.png"
        alt="User Avatar"
        className="rounded-full w-9 h-9 object-cover "
      />
      <span className="hidden md:inline-block font-normal text-base leading-6">Username</span>
    </div>
  );
};

export default UserInfo;
