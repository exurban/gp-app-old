import Link from "next/link";
import Head from "next/head";
import Footer from "./Footer";
// import { useSession } from "next-auth/client";
import {
  useColorMode,
  usePage,
  PageWithHeader,
  PageWithSidebar,
  PageContent,
  useBreakpoint,
  Hide,
  Level,
  TopNav,
  SideNav,
  Icon,
  Divider,
  Button,
  Input
} from "bumbag";
import ShoppingBagMenu from "./ShoppingBagMenu";

const Layout: React.FC<{ title?: string }> = ({
  children,
  title = "Gallery - Gibbs Photography"
}) => {
  // * auth
  // const [session] = useSession();

  const { colorMode, setColorMode } = useColorMode();
  const page = usePage();
  const isDesktopAndUnder = useBreakpoint("max-desktop");
  const isDesktopAndOver = useBreakpoint("max-desktop");

  const menuItems = ["Featured", "Bloom", "Bird", "Beast", "Land", "Water", "Sky"];

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <PageWithHeader
        sticky
        headerHeight="80px"
        header={
          <>
            <TopNav backgroundColor="rgba(0, 0, 0, 0)">
              <TopNav.Section>
                <Link href="/">
                  <TopNav.Item navId="home">
                    <Icon icon="gpLogo" fontSize="900" marginLeft="major-2" />
                  </TopNav.Item>
                </Link>
                {isDesktopAndUnder
                  ? null
                  : menuItems.map(item => (
                      <Link href={`/gallery/${item.toLowerCase()}`} passHref={true} key={item}>
                        <TopNav.Item variant="navigationText" navId={item.toLowerCase()}>
                          {item}
                        </TopNav.Item>
                      </Link>
                    ))}
              </TopNav.Section>
              <TopNav.Section marginRight="major-4">
                <Hide below="desktop">
                  <TopNav.Item>
                    <Button variant="ghost">
                      <Icon aria-label="Search" icon="solid-search" />
                    </Button>
                  </TopNav.Item>
                </Hide>
                <TopNav.Item>
                  <ShoppingBagMenu />
                </TopNav.Item>
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
          minHeight="calc(100vh - 152px)"
          defaultIsVisible={false}
          sidebar={
            <SideNav.Level>
              <Level paddingX="major-2">
                <Icon aria-label="logo" icon="gpLogo" fontSize="800" />
                <Button variant="ghost">
                  <Icon aria-label="light/dark" icon="solid-sun" alignY="center" />
                </Button>
              </Level>
              <Divider />
              <SideNav.Item navId="search" paddingY="major-2">
                <Input placeholder="Search" />
              </SideNav.Item>
              <Divider />
              {menuItems.map(item => (
                <Link href={`/gallery/${item.toLowerCase()}`} passHref={true} key={item}>
                  <SideNav.Item
                    key={item}
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
          <PageContent isFluid padding="0px">
            {children}
          </PageContent>
        </PageWithSidebar>
        <Footer />
      </PageWithHeader>
    </>
  );
};

export default Layout;
