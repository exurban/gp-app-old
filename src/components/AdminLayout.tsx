import Link from "next/link";
import Head from "next/head";

import { useSession, signIn, signOut } from "next-auth/client";
import AccessDenied from "./AccessDenied";
import {
  usePage,
  PageWithHeader,
  PageWithSidebar,
  PageContent,
  useBreakpoint,
  useColorMode,
  TopNav,
  SideNav,
  Hide,
  Level,
  Divider,
  Input,
  Button,
  Icon,
  Tooltip
} from "bumbag";

const AdminLayout: React.FC<{ title?: string }> = ({ children, title = "Admin" }) => {
  // * auth
  const [session, loading] = useSession();
  console.log("ADMIN SESSION: ", session);

  const { colorMode, setColorMode } = useColorMode();
  const page = usePage();
  const isDesktopAndUnder = useBreakpoint("max-desktop");
  const isDesktopAndOver = useBreakpoint("max-desktop");

  const menuItems = ["Dashboard", "Photos", "Photographers", "Locations", "Pricing"];

  // When rendering client side don't display anything until loading is complete
  if (typeof window !== "undefined" && loading) return null;

  // If no session exists, display access denied message
  if (!session) {
    return <AccessDenied />;
  }
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <PageWithHeader
        headerHeight="80px"
        header={
          <>
            <TopNav>
              <TopNav.Section>
                <Link href="/">
                  <TopNav.Item navId="home">
                    <Icon icon="gpLogo" fontSize="900" marginLeft="major-2" />
                  </TopNav.Item>
                </Link>
                {isDesktopAndUnder ? null : (
                  <>
                    <Link href={`/admin/dashboard`}>
                      <TopNav.Item variant="navigationText" navId="dashboard">
                        <a>Dashboard</a>
                      </TopNav.Item>
                    </Link>
                    <Link href={`/admin/photos`}>
                      <TopNav.Item variant="navigationText" navId="photos">
                        <a>Photos</a>
                      </TopNav.Item>
                    </Link>
                    <Link href={`/admin/photographers`}>
                      <TopNav.Item variant="navigationText" navId="photographers">
                        <a>Photographers</a>
                      </TopNav.Item>
                    </Link>
                    <Link href={`/admin/locations`}>
                      <TopNav.Item variant="navigationText" navId="locations">
                        <a>Locations</a>
                      </TopNav.Item>
                    </Link>
                    <Link href={`/admin/pricing`}>
                      <TopNav.Item variant="navigationText" navId="pricing">
                        <a>Pricing</a>
                      </TopNav.Item>
                    </Link>
                  </>
                )}
              </TopNav.Section>
              <TopNav.Section marginRight="major-4">
                <TopNav.Item>
                  {!session && (
                    <>
                      <Link href="/api/auth/signin">
                        <Tooltip content="Not signed in">
                          <Button
                            palette="primary"
                            variant="ghost"
                            size="small"
                            onClick={e => {
                              e.preventDefault();
                              signIn();
                            }}
                          >
                            Sign in
                          </Button>
                        </Tooltip>
                      </Link>
                    </>
                  )}
                  {session && (
                    <>
                      <Link href="/api/auth/signout">
                        <Tooltip content={session.user.email || session.user.name}>
                          <Button
                            palette="secondary"
                            variant="ghost"
                            size="small"
                            onClick={e => {
                              e.preventDefault();
                              signOut();
                            }}
                          >
                            Sign out
                          </Button>
                        </Tooltip>
                      </Link>
                    </>
                  )}
                </TopNav.Item>
                <Hide below="desktop">
                  <TopNav.Item>
                    <Button variant="ghost">
                      <Icon aria-label="Search" icon="solid-search" />
                    </Button>
                  </TopNav.Item>
                </Hide>
                <TopNav.Item>
                  <Button
                    variant="ghost"
                    onClick={() => setColorMode(colorMode != "default" ? "default" : "dark")}
                  >
                    {colorMode == "default" ? (
                      <Icon icon="solid-moon" />
                    ) : (
                      <Icon icon="solid-sun" />
                    )}
                  </Button>
                </TopNav.Item>
                <Hide above="desktop">
                  <TopNav.Item>
                    <Button variant="ghost" onClick={page.sidebar.toggle}>
                      <Icon aria-label="Mobile Menu" icon="solid-bars" />
                    </Button>
                  </TopNav.Item>
                </Hide>
              </TopNav.Section>
            </TopNav>
          </>
        }
      >
        {isDesktopAndOver ? page.sidebar.close : null}
        <PageWithSidebar
          defaultIsVisible={false}
          sidebar={
            <SideNav.Level>
              <Level paddingX="major-2">
                <Icon aria-label="logo" icon="gpLogo" fontSize="800" />
                <Button
                  variant="ghost"
                  onClick={() => setColorMode(colorMode != "default" ? "default" : "dark")}
                >
                  {colorMode == "default" ? <Icon icon="solid-moon" /> : <Icon icon="solid-sun" />}
                </Button>
              </Level>
              <Divider />
              <SideNav.Item navId="search" paddingY="major-2">
                <Input placeholder="Search" />
              </SideNav.Item>
              <Divider />
              {menuItems.map(item => (
                <Link href={`/admin/${item.toLowerCase()}`} passHref={true} key={item}>
                  <SideNav.Item
                    variant="navigationText"
                    navId={item.toLowerCase()}
                    onClick={page.sidebar.close}
                  >
                    {item}
                  </SideNav.Item>
                </Link>
              ))}
            </SideNav.Level>
          }
        >
          <PageContent isFluid>{children}</PageContent>
        </PageWithSidebar>
      </PageWithHeader>
    </>
  );
};

export default AdminLayout;
