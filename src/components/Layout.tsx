import React from "react";
import Head from "next/head";
import Footer from "./Footer";
import { useSession, signOut } from "next-auth/client";
import {
  usePage,
  PageWithHeader,
  PageWithSidebar,
  Hide,
  Level,
  TopNav,
  SideNav,
  Icon,
  Flex,
  Divider,
  Button,
  styled,
  palette,
  useBreakpoint
} from "bumbag";
import ShoppingBagItem from "./ShoppingBagItem";
import FavoritesItem from "./FavoritesItem";
import FavoritesSideNavItem from "./FavoritesSideNavItem";
import SignInItem from "./SignInItem";
import SignOutItem from "./SignOutItem";
import ColorModeItem from "./ColorModeItem";
import ActiveLink from "./ActiveLink";
import ShoppingBagSideNavItem from "./ShoppingBagSideNavItem";

const Layout: React.FC<{ title?: string }> = ({
  children,
  title = "Gallery - Gibbs Photography"
}) => {
  const page = usePage();
  const isMinDesktopAndOver = useBreakpoint("min-desktop");
  const isMaxTabletAndUnder = useBreakpoint("max-tablet");
  const isMaxWidescreenAndUnder = useBreakpoint("max-widescreen");
  const [session] = useSession();

  const StyledItem = styled(TopNav.Item)`
    &.active {
      color: ${palette("primary300")};
      box-shadow: inset 0 -2px 0 0;
    }
  `;

  const StyledSideNavItem = styled(SideNav.Item)`
    &.active {
      color: ${palette("primary300")};
      background-color: ${palette("primaryShade")};
      box-shadow: inset 3px 0 0 0 ${palette("primary")};
    }
  `;

  function signOutAndClose() {
    signOut();
    page.sidebar.close;
  }

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
                  <ActiveLink activeClassName="active" href={`/`} passHref={true}>
                    <StyledItem
                      className="nav-link"
                      fontSize={{ default: "60px", "max-fullHD": "40px" }}
                      fontWeight={{ default: "800", "max-fullHD": "700" }}
                    >
                      <Icon icon="gpLogo" marginLeft="major-2" />
                    </StyledItem>
                  </ActiveLink>
                  {isMaxWidescreenAndUnder ? null : (
                    <>
                      <ActiveLink
                        className="link"
                        activeClassName="active"
                        href={`/gallery/featured`}
                        passHref={true}
                      >
                        <StyledItem
                          className="nav-link"
                          variant="navigationText"
                          fontSize={{ default: "32px", "max-fullHD": "26px" }}
                          fontWeight={{ default: "700", "max-fullHD": "600" }}
                        >
                          Featured
                        </StyledItem>
                      </ActiveLink>
                      <ActiveLink activeClassName="active" href={`/gallery/bloom`} passHref={true}>
                        <StyledItem
                          className="nav-link"
                          variant="navigationText"
                          fontSize={{ default: "32px", "max-fullHD": "26px" }}
                          fontWeight={{ default: "700", "max-fullHD": "600" }}
                        >
                          Bloom
                        </StyledItem>
                      </ActiveLink>
                      <ActiveLink activeClassName="active" href={`/gallery/bird`} passHref={true}>
                        <StyledItem
                          className="nav-link"
                          variant="navigationText"
                          fontSize={{ default: "32px", "max-fullHD": "26px" }}
                          fontWeight={{ default: "700", "max-fullHD": "600" }}
                        >
                          Bird
                        </StyledItem>
                      </ActiveLink>
                      <ActiveLink activeClassName="active" href={`/gallery/beast`} passHref={true}>
                        <StyledItem
                          className="nav-link"
                          variant="navigationText"
                          fontSize={{ default: "32px", "max-fullHD": "26px" }}
                          fontWeight={{ default: "700", "max-fullHD": "600" }}
                        >
                          Beast
                        </StyledItem>
                      </ActiveLink>
                      <ActiveLink activeClassName="active" href={`/gallery/land`} passHref={true}>
                        <StyledItem
                          className="nav-link"
                          variant="navigationText"
                          fontSize={{ default: "32px", "max-fullHD": "26px" }}
                          fontWeight={{ default: "700", "max-fullHD": "600" }}
                        >
                          Land
                        </StyledItem>
                      </ActiveLink>
                      <ActiveLink activeClassName="active" href={`/gallery/water`} passHref={true}>
                        <StyledItem
                          className="nav-link"
                          variant="navigationText"
                          fontSize={{ default: "32px", "max-fullHD": "26px" }}
                          fontWeight={{ default: "700", "max-fullHD": "600" }}
                        >
                          Water
                        </StyledItem>
                      </ActiveLink>
                      <ActiveLink activeClassName="active" href={`/gallery/sky`} passHref={true}>
                        <StyledItem
                          className="nav-link"
                          variant="navigationText"
                          fontSize={{ default: "32px", "max-fullHD": "26px" }}
                          fontWeight={{ default: "700", "max-fullHD": "600" }}
                        >
                          Sky
                        </StyledItem>
                      </ActiveLink>
                    </>
                  )}
                </TopNav.Section>
                <TopNav.Section marginRight="major-4">
                  {session ? (
                    <>
                      {isMinDesktopAndOver && (
                        <ActiveLink activeClassName="active" href={`/auth/signout`} passHref={true}>
                          <StyledItem className="nav-link" variant="rightNavText">
                            <SignOutItem size={isMaxWidescreenAndUnder ? "small" : "large"} />
                          </StyledItem>
                        </ActiveLink>
                      )}
                      {isMinDesktopAndOver && (
                        <ActiveLink
                          activeClassName="active"
                          href={`/gallery/user/favorites`}
                          passHref={true}
                        >
                          <StyledItem className="nav-link" variant="rightNavText">
                            <FavoritesItem size={isMaxWidescreenAndUnder ? "small" : "large"} />
                          </StyledItem>
                        </ActiveLink>
                      )}
                      {isMinDesktopAndOver && (
                        <ActiveLink
                          activeClassName="active"
                          href={`/gallery/user/shopping-bag`}
                          passHref={true}
                        >
                          <StyledItem className="nav-link" variant="rightNavText">
                            <ShoppingBagItem size={isMaxWidescreenAndUnder ? "small" : "large"} />
                          </StyledItem>
                        </ActiveLink>
                      )}
                    </>
                  ) : (
                    <>
                      {isMinDesktopAndOver && (
                        <ActiveLink activeClassName="active" href={`/auth/signin`} passHref={true}>
                          <StyledItem className="nav-link" variant="rightNavText">
                            <SignInItem size={isMaxWidescreenAndUnder ? "small" : "large"} />
                          </StyledItem>
                        </ActiveLink>
                      )}
                    </>
                  )}
                  <StyledItem className="nav-link" variant="rightNavText">
                    <Flex height="100%" paddingX="0.8rem">
                      <ColorModeItem size={isMaxWidescreenAndUnder ? "small" : "large"} />
                    </Flex>
                  </StyledItem>
                  <Hide above="widescreen">
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
          {isMaxWidescreenAndUnder ? page.sidebar.close : null}
          <PageWithSidebar
            defaultIsVisible={false}
            minHeight="calc(100vh - 180px)"
            sidebar={
              <SideNav.Level>
                <Level height="80px" alignX="left" alignY="center">
                  <Icon aria-label="logo" icon="gpLogo" fontSize="700" margin="major-1" />
                </Level>
                <Divider />
                <ActiveLink href={`/gallery/featured`} activeClassName="active" passHref={true}>
                  <StyledSideNavItem
                    className="nav-link"
                    variant="navigationText"
                    navId="featured"
                    onClick={page.sidebar.close}
                  >
                    Featured
                  </StyledSideNavItem>
                </ActiveLink>
                <ActiveLink href={`/gallery/bloom`} activeClassName="active" passHref={true}>
                  <StyledSideNavItem
                    className="nav-link"
                    variant="navigationText"
                    navId="bloom"
                    onClick={page.sidebar.close}
                  >
                    Bloom
                  </StyledSideNavItem>
                </ActiveLink>
                <ActiveLink href={`/gallery/bird`} activeClassName="active" passHref={true}>
                  <StyledSideNavItem
                    className="nav-link"
                    variant="navigationText"
                    navId="bird"
                    onClick={page.sidebar.close}
                  >
                    Bird
                  </StyledSideNavItem>
                </ActiveLink>
                <ActiveLink href={`/gallery/beast`} activeClassName="active" passHref={true}>
                  <StyledSideNavItem
                    className="nav-link"
                    variant="navigationText"
                    navId="beast"
                    onClick={page.sidebar.close}
                  >
                    Beast
                  </StyledSideNavItem>
                </ActiveLink>
                <ActiveLink href={`/gallery/land`} activeClassName="active" passHref={true}>
                  <StyledSideNavItem
                    className="nav-link"
                    variant="navigationText"
                    navId="land"
                    onClick={page.sidebar.close}
                  >
                    Land
                  </StyledSideNavItem>
                </ActiveLink>
                <ActiveLink href={`/gallery/water`} activeClassName="active" passHref={true}>
                  <StyledSideNavItem
                    className="nav-link"
                    variant="navigationText"
                    navId="water"
                    onClick={page.sidebar.close}
                  >
                    Water
                  </StyledSideNavItem>
                </ActiveLink>
                <ActiveLink href={`/gallery/sky`} activeClassName="active" passHref={true}>
                  <StyledSideNavItem
                    className="nav-link"
                    variant="navigationText"
                    navId="sky"
                    onClick={page.sidebar.close}
                  >
                    Sky
                  </StyledSideNavItem>
                </ActiveLink>
                {isMaxTabletAndUnder && (
                  <>
                    <Divider />
                    {session ? (
                      <>
                        <ActiveLink href={`/auth/signout`} activeClassName="active" passHref={true}>
                          <StyledSideNavItem
                            className="nav-link"
                            variant="navigationText"
                            navId="signin"
                            onClick={() => signOutAndClose()}
                          >
                            Sign Out
                          </StyledSideNavItem>
                        </ActiveLink>
                        <ActiveLink
                          href={`/gallery/user/favorites`}
                          activeClassName="active"
                          passHref={true}
                        >
                          <SideNav.Item
                            variant="navigationText"
                            navId="favorites"
                            onClick={page.sidebar.close}
                          >
                            <FavoritesSideNavItem />
                          </SideNav.Item>
                        </ActiveLink>
                        <ActiveLink
                          href={`/gallery/user/shopping-bag`}
                          activeClassName="active"
                          passHref={true}
                        >
                          <SideNav.Item
                            variant="navigationText"
                            navId="shopping-bag"
                            onClick={page.sidebar.close}
                          >
                            <ShoppingBagSideNavItem />
                          </SideNav.Item>
                        </ActiveLink>
                      </>
                    ) : (
                      <ActiveLink href={`/auth/signin`} activeClassName="active" passHref={true}>
                        <StyledSideNavItem
                          className="nav-link"
                          variant="navigationText"
                          navId="signin"
                          onClick={page.sidebar.close}
                        >
                          Sign In
                        </StyledSideNavItem>
                      </ActiveLink>
                    )}
                  </>
                )}
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
