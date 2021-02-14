import React from "react";
import Link from "next/link";
import Head from "next/head";
import Footer from "./Footer";
import {
  useColorMode,
  usePage,
  PageWithHeader,
  PageWithSidebar,
  useBreakpoint,
  Hide,
  Level,
  TopNav,
  SideNav,
  Icon,
  Divider,
  Button,
  styled,
  palette
} from "bumbag";
import ShoppingBagMenu from "./ShoppingBagMenu";
import ActiveLink from "./ActiveLink";

const Layout: React.FC<{ title?: string }> = ({
  children,
  title = "Gallery - Gibbs Photography"
}) => {
  const { colorMode, setColorMode } = useColorMode();
  const page = usePage();
  const isDesktopAndUnder = useBreakpoint("max-desktop");
  const isDesktopAndOver = useBreakpoint("max-desktop");

  const StyledItem = styled(TopNav.Item)`
    &.active {
      color: ${palette("primary300")};
      box-shadow: inset 0 -2px 0 0;
    }
  `;

  if (typeof window !== "undefined") {
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
          backgroundColor="default"
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
                      <ActiveLink
                        className="link"
                        activeClassName="active"
                        href={`/gallery/featured`}
                        passHref={true}
                      >
                        <StyledItem className="nav-link" variant="navigationText">
                          Featured
                        </StyledItem>
                      </ActiveLink>
                      <ActiveLink activeClassName="active" href={`/gallery/bloom`} passHref={true}>
                        <StyledItem className="nav-link" variant="navigationText">
                          Bloom
                        </StyledItem>
                      </ActiveLink>
                      <ActiveLink activeClassName="active" href={`/gallery/bird`} passHref={true}>
                        <StyledItem className="nav-link" variant="navigationText">
                          Bird
                        </StyledItem>
                      </ActiveLink>
                      <ActiveLink activeClassName="active" href={`/gallery/beast`} passHref={true}>
                        <StyledItem className="nav-link" variant="navigationText">
                          Beast
                        </StyledItem>
                      </ActiveLink>
                      <ActiveLink activeClassName="active" href={`/gallery/land`} passHref={true}>
                        <StyledItem className="nav-link" variant="navigationText">
                          Land
                        </StyledItem>
                      </ActiveLink>
                      <ActiveLink activeClassName="active" href={`/gallery/water`} passHref={true}>
                        <StyledItem className="nav-link" variant="navigationText">
                          Water
                        </StyledItem>
                      </ActiveLink>
                      <ActiveLink activeClassName="active" href={`/gallery/sky`} passHref={true}>
                        <StyledItem className="nav-link" variant="navigationText">
                          Sky
                        </StyledItem>
                      </ActiveLink>
                    </>
                  )}
                </TopNav.Section>
                <TopNav.Section marginRight="major-4">
                  <TopNav.Item>
                    <ShoppingBagMenu />
                  </TopNav.Item>
                  <TopNav.Item>
                    <Button
                      variant="ghost"
                      onClick={() => setColorMode(colorMode != "default" ? "default" : "dark")}
                    >
                      {colorMode == "default" ? (
                        <Icon color="#dbe29c" icon="solid-moon" fontSize="300" />
                      ) : (
                        <Icon color="#fee61e" icon="solid-sun" fontSize="300" />
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
            minHeight="calc(100vh - 180px)"
            sidebar={
              <SideNav.Level>
                <Level paddingX="major-2">
                  <Icon aria-label="logo" icon="gpLogo" fontSize="800" />
                  <Button variant="ghost">
                    <Icon aria-label="light/dark" icon="solid-sun" alignY="center" />
                  </Button>
                </Level>
                <Divider />
                <Link href={`/gallery/featured`} passHref={true}>
                  <SideNav.Item
                    variant="navigationText"
                    navId="featured"
                    onClick={page.sidebar.close}
                  >
                    Featured
                  </SideNav.Item>
                </Link>
                <Link href={`/gallery/bloom`} passHref={true}>
                  <SideNav.Item variant="navigationText" navId="bloom" onClick={page.sidebar.close}>
                    Bloom
                  </SideNav.Item>
                </Link>
                <Link href={`/gallery/bird`} passHref={true}>
                  <SideNav.Item variant="navigationText" navId="bird" onClick={page.sidebar.close}>
                    Bird
                  </SideNav.Item>
                </Link>
                <Link href={`/gallery/beast`} passHref={true}>
                  <SideNav.Item variant="navigationText" navId="beast" onClick={page.sidebar.close}>
                    Beast
                  </SideNav.Item>
                </Link>
                <Link href={`/gallery/land`} passHref={true}>
                  <SideNav.Item variant="navigationText" navId="land" onClick={page.sidebar.close}>
                    Land
                  </SideNav.Item>
                </Link>
                <Link href={`/gallery/water`} passHref={true}>
                  <SideNav.Item variant="navigationText" navId="water" onClick={page.sidebar.close}>
                    Water
                  </SideNav.Item>
                </Link>
                <Link href={`/gallery/sky`} passHref={true}>
                  <SideNav.Item variant="navigationText" navId="sky" onClick={page.sidebar.close}>
                    Sky
                  </SideNav.Item>
                </Link>
              </SideNav.Level>
            }
          >
            {children}
          </PageWithSidebar>
          <Footer />
        </PageWithHeader>
      </>
    );
  }
  return null;
};

export default Layout;
