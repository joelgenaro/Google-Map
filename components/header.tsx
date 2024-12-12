'use client';

import { Close, Menu } from '@/components/icons';
import { PresignedUrlResponse } from '@/lib/utils/generate-presigned-url';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import useUserProfile from './hooks/useUserProfile';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { isAdmin } from '@/lib/helper';

const Header = () => {
  const { data: session, status } = useSession();
  const {
    userProfile,
    isLoading: userProfileLoading,
    error: userProfileError,
  } = useUserProfile();
  const [showMenu, setShowMenu] = useState(false);
  const [avatarImgUrl, setAvatarImgUrl] = useState<string>(
    '/images/default.png'
  );
  const pathname = usePathname();
  const { push } = useRouter();

  useEffect(() => {
    setShowMenu(false);
  }, [pathname]);

  useEffect(() => {
    // If loading, an error has occurred, or there is no image, skip fetching the URL
    if (
      userProfileLoading ||
      userProfileError ||
      !userProfile?.user ||
      !userProfile.user.image
    ) {
      return;
    }

    const abortController = new AbortController();
    const signal = abortController.signal;
    const fetchPresignedUrl = async () => {
      const imageUrl = userProfile.user.image as string;
      const encodedImageSrcStr = encodeURIComponent(imageUrl);
      const url = `/api/profile/image/get-presigned-url?imageSrcStr=${encodedImageSrcStr}`;
      try {
        const response = await fetch(url, { method: 'GET', signal });
        if (!response.ok) {
          // Log an error if the response is not ok
          console.error('Error fetching presigned URL:', response.statusText);
        }
        const resJson = (await response.json()) as PresignedUrlResponse;
        if (resJson.status === 200 && resJson.url) {
          // Set the avatar image URL if the presigned URL is retrieved successfully
          setAvatarImgUrl(resJson.url);
        } else {
          // Handle cases where the server's response is not as expected
          console.error('Failed to get a valid response:', resJson);
        }
      } catch (error: any) {
        // Only log the error if it's not an abort error
        if (error.name !== 'AbortError') {
          console.error('Error fetching presigned URL:', error);
        }
      }
    };

    fetchPresignedUrl();

    // Cleanup function to abort fetch on unmount
    return () => abortController.abort();
  }, [userProfile, userProfileLoading, userProfileError]);

  const isActive = (path: string) => pathname === path;

  const linkClass =
    'w-full hover:opacity-100 group-[.show-menu]/header:text-white text-center group-[.show-menu]/header:no-underline group-[.show-menu]/header:uppercase group-[.show-menu]/header:text-base group-[.show-menu]/header:leading-2 lg:text-white lg:text-sm lg:no-underline lg:uppercase';

  return (
    <header
      id="header"
      className={`header-container group/header fixed left-0 right-0 top-0 z-50 w-full bg-airseed-dark-blue py-0 pr-4 lg:rounded-b-2lg lg:pl-4 ${
        showMenu ? 'show-menu' : ''
      }`}
    >
      <div className="pl-02 mx-auto w-full xl:max-w-screen-2xl">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            scroll={false}
            className="bg-airseed-blue flex flex-none items-center justify-center"
          >
            <Image
              src="/images/airseed-logo.png"
              alt="Airseed Logo"
              className="h-20 w-auto lg:h-[100px]"
              priority={true}
              width={211}
              height={100}
            ></Image>
          </Link>
          <nav className="flex w-full justify-end self-end">
            {status === 'authenticated' && (
              <ul className="list-inline list-group list-group-horizontal lg:leading-12 group-[.show-menu]/header:bg-airseed-blue group-[.show-menu]/header:roundehidden *:group-[.show-menu]/header:border-white-t-100 mb-0 hidden w-full items-center justify-center self-end bg-airseed-dark-blue *:flex *:items-center group-[.show-menu]/header:absolute group-[.show-menu]/header:left-0 group-[.show-menu]/header:top-20 group-[.show-menu]/header:flex group-[.show-menu]/header:h-screen group-[.show-menu]/header:w-full group-[.show-menu]/header:list-none group-[.show-menu]/header:flex-col group-[.show-menu]/header:items-center group-[.show-menu]/header:justify-start group-[.show-menu]/header:overflow-y-auto group-[.show-menu]/header:overflow-x-hidden group-[.show-menu]/header:px-8 group-[.show-menu]/header:pb-24 *:group-[.show-menu]/header:mb-7 *:group-[.show-menu]/header:w-full *:group-[.show-menu]/header:border-b *:group-[.show-menu]/header:border-solid *:group-[.show-menu]/header:pb-7 *:group-[.show-menu]/header:opacity-100 lg:flex lg:gap-8 lg:*:h-10">
                <li>
                  <Link
                    className={`${linkClass} pt-7 lg:pt-0 ${
                      isActive('/') ? 'opacity-100' : 'opacity-80'
                    }`}
                    href="/"
                    scroll={false}
                  >
                    Hub
                  </Link>
                </li>
                <li>
                  <Link
                    className={`${linkClass} ${
                      isActive('/land-assessment')
                        ? 'opacity-100'
                        : 'opacity-80'
                    }`}
                    href="/land-assessment"
                    scroll={false}
                  >
                    Land Assessment
                  </Link>
                </li>
                <li>
                  <Link
                    className={`${linkClass} ${
                      isActive('/project-management')
                        ? 'opacity-100'
                        : 'opacity-80'
                    }`}
                    href="/project-management"
                    scroll={false}
                  >
                    Project Management
                  </Link>
                </li>
                <li>
                  <Link
                    className={`${linkClass} ${
                      isActive('/seeds-near-me') ? 'opacity-100' : 'opacity-80'
                    }`}
                    href="/seeds-near-me"
                    scroll={false}
                  >
                    Seeds Near Me
                  </Link>
                </li>
                {
                  // Only show the Admin link if the user is an admin
                  isAdmin(session) && (
                    <li>
                      <Link
                        className={`${linkClass} ${
                          isActive('/admin') ? 'opacity-100' : 'opacity-80'
                        }`}
                        href="/admin"
                        scroll={false}
                      >
                        Admin
                      </Link>
                    </li>
                  )
                }
                <li className="lg:hidden">
                  <Link
                    className={`${linkClass} ${
                      isActive('/profile') ? 'opacity-100' : 'opacity-80'
                    }`}
                    href="/profile"
                    scroll={false}
                  >
                    Profile Settings
                  </Link>
                </li>
                <li className="lg:hidden">
                  <button className={`${linkClass}`} onClick={() => signOut()}>
                    Logout
                  </button>
                </li>
              </ul>
            )}
            <ul className="flex items-center space-x-4 self-end">
              {status === 'unauthenticated' && (
                <div className="flex gap-4 p-4 text-white">
                  <li>
                    <Link
                      href="/register"
                      scroll={false}
                      className="text-ct-dark-600"
                    >
                      Register
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/login"
                      scroll={false}
                      className="text-ct-dark-600"
                    >
                      Login
                    </Link>
                  </li>
                </div>
              )}
              {status === 'authenticated' && (
                <>
                  <div className="hidden flex-col justify-between gap-3 lg:flex self-end">
                    <div className="flex gap-2">
                      <DropdownMenu>
                        <DropdownMenuTrigger className="mx-4" asChild>
                          <Button className="profile-menu relative bg-transparent px-0 text-xl hover:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0">
                            {session?.user?.name}
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56 bg-airseed-dark-blue text-white">
                          <DropdownMenuItem>
                            <button
                              className="text-ct-dark-600 w-full text-left"
                              onClick={() => push('/profile')}
                            >
                              Profile Settings
                            </button>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <button
                              className="w-full text-left"
                              onClick={() => signOut()}
                            >
                              Logout
                            </button>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          width={32}
                          height={32}
                          src={avatarImgUrl}
                          alt="user"
                        />
                        <AvatarFallback>User</AvatarFallback>
                      </Avatar>
                    </div>
                  </div>
                  <div className="flex h-20 items-center justify-center">
                    <Button
                      className="h-8 w-8 self-center border-none bg-transparent p-0 text-white hover:bg-transparent lg:hidden"
                      onClick={() => setShowMenu(!showMenu)}
                    >
                      {showMenu ? (
                        <Close className="text-gray-350 h-5" />
                      ) : (
                        <Menu />
                      )}
                    </Button>
                  </div>
                </>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
