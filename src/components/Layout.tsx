import React from "react";
import Footer from "./Footer";
import { useRouter } from "next/router";
import { useSession, signOut } from "next-auth/client";
import {
  usePage,
  PageWithHeader,
  PageWithSidebar,
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

const Layout: React.FC = ({ children }) => {
  const page = usePage();
  const isMinDesktopAndOver = useBreakpoint("min-desktop");
  const isMaxDesktopAndUnder = useBreakpoint("max-desktop");
  const isMaxWidescreenAndUnder = useBreakpoint("max-widescreen");
  const isMinFullHDAndOver = useBreakpoint("min-fullHD");
  const [session] = useSession();
  const router = useRouter();

  const StyledItem = styled(TopNav.Item)`
    &.active {
      color: ${palette("primary300")};
      box-shadow: inset 0 -2px 0 0;
    }
  `;

  const StyledSideNavItem = styled(SideNav.Item)`
    &.active {
      color: ${palette("primary")};
      background-color: ${palette("primaryShade")};
      box-shadow: inset 3px 0 0 0 ${palette("primary")};
    }
  `;

  function handleSignIn() {
    localStorage.setItem("redirectUrl", router.asPath);
    router.push("/auth/signin");
  }

  function signOutAndClose() {
    signOut();
    page.sidebar.close;
  }

  return (
    <>
      <PageWithHeader
        sticky
        headerHeight="80px"
        backgroundColor="default"
        header={
          <>
            <TopNav>
              <TopNav.Section>
                <ActiveLink activeClassName="active" aria-label="home" href={`/`} passHref={true}>
                  <StyledItem
                    className="nav-link"
                    fontSize={{ default: "60px", "max-fullHD": "40px" }}
                    fontWeight={{ default: "800", "max-fullHD": "700" }}
                  >
                    <Icon icon="gpLogo" marginLeft="major-2" />
                  </StyledItem>
                </ActiveLink>
                {isMinFullHDAndOver && (
                  <ActiveLink
                    className="link"
                    activeClassName="active"
                    aria-label="Featured gallery"
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
                )}
                {isMaxDesktopAndUnder ? null : (
                  <>
                    <ActiveLink
                      activeClassName="active"
                      aria-label="Land gallery"
                      href={`/gallery/land`}
                      passHref={true}
                    >
                      <StyledItem
                        className="nav-link"
                        variant="navigationText"
                        fontSize={{ default: "32px", "max-fullHD": "26px" }}
                        fontWeight={{ default: "700", "max-fullHD": "600" }}
                      >
                        Land
                      </StyledItem>
                    </ActiveLink>
                    <ActiveLink
                      activeClassName="active"
                      aria-label="Water gallery"
                      href={`/gallery/water`}
                      passHref={true}
                    >
                      <StyledItem
                        className="nav-link"
                        variant="navigationText"
                        fontSize={{ default: "32px", "max-fullHD": "26px" }}
                        fontWeight={{ default: "700", "max-fullHD": "600" }}
                      >
                        Water
                      </StyledItem>
                    </ActiveLink>
                    <ActiveLink
                      activeClassName="active"
                      aria-label="Sky gallery"
                      href={`/gallery/sky`}
                      passHref={true}
                    >
                      <StyledItem
                        className="nav-link"
                        variant="navigationText"
                        fontSize={{ default: "32px", "max-fullHD": "26px" }}
                        fontWeight={{ default: "700", "max-fullHD": "600" }}
                      >
                        Sky
                      </StyledItem>
                    </ActiveLink>
                    <ActiveLink
                      activeClassName="active"
                      aria-label="Bloom gallery"
                      href={`/gallery/bloom`}
                      passHref={true}
                    >
                      <StyledItem
                        className="nav-link"
                        variant="navigationText"
                        fontSize={{ default: "32px", "max-fullHD": "26px" }}
                        fontWeight={{ default: "700", "max-fullHD": "600" }}
                      >
                        Bloom
                      </StyledItem>
                    </ActiveLink>
                    <ActiveLink
                      activeClassName="active"
                      aria-label="Bird gallery"
                      href={`/gallery/bird`}
                      passHref={true}
                    >
                      <StyledItem
                        className="nav-link"
                        variant="navigationText"
                        fontSize={{ default: "32px", "max-fullHD": "26px" }}
                        fontWeight={{ default: "700", "max-fullHD": "600" }}
                      >
                        Bird
                      </StyledItem>
                    </ActiveLink>
                    <ActiveLink
                      activeClassName="active"
                      aria-label="Beast gallery"
                      href={`/gallery/beast`}
                      passHref={true}
                    >
                      <StyledItem
                        className="nav-link"
                        variant="navigationText"
                        fontSize={{ default: "32px", "max-fullHD": "26px" }}
                        fontWeight={{ default: "700", "max-fullHD": "600" }}
                      >
                        Beast
                      </StyledItem>
                    </ActiveLink>
                  </>
                )}
              </TopNav.Section>
              <TopNav.Section marginRight="major-4">
                {session ? (
                  <>
                    {isMinDesktopAndOver && (
                      <ActiveLink
                        activeClassName="active"
                        aria-label="Sign out"
                        href={`/auth/signout`}
                        passHref={true}
                      >
                        <StyledItem className="nav-link" variant="rightNavText">
                          <SignOutItem size={isMaxWidescreenAndUnder ? "small" : "large"} />
                        </StyledItem>
                      </ActiveLink>
                    )}
                    {isMinDesktopAndOver && (
                      <ActiveLink
                        activeClassName="active"
                        aria-label="Favorites Gallery"
                        href={`/gallery/user/favorites`}
                        passHref={true}
                      >
                        <StyledItem className="nav-link" variant="rightNavText">
                          <FavoritesItem size={isMaxWidescreenAndUnder ? "small" : "large"} />
                        </StyledItem>
                      </ActiveLink>
                    )}
                    <ActiveLink
                      activeClassName="active"
                      aria-label="Shopping Bag"
                      href={`/shop/review-order`}
                      passHref={true}
                    >
                      <StyledItem className="nav-link" variant="rightNavText">
                        <ShoppingBagItem size={isMaxWidescreenAndUnder ? "small" : "large"} />
                      </StyledItem>
                    </ActiveLink>
                  </>
                ) : (
                  <>
                    {isMinDesktopAndOver && (
                      <ActiveLink
                        activeClassName="active"
                        aria-label="Sign in"
                        href={`/auth/signin`}
                        passHref={true}
                      >
                        <StyledItem
                          className="nav-link"
                          variant="rightNavText"
                          onClick={() => handleSignIn()}
                        >
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

                {isMaxDesktopAndUnder && (
                  <TopNav.Item>
                    <Button variant="ghost" onClick={page.sidebar.toggle}>
                      <Icon aria-label="Mobile Menu" icon="solid-bars" />
                    </Button>
                  </TopNav.Item>
                )}
              </TopNav.Section>
            </TopNav>
          </>
        }
      >
        <PageWithSidebar
          defaultIsVisible={false}
          minHeight="calc(100vh - 180px)"
          sidebar={
            <SideNav.Level>
              <Level height="80px" alignX="left" alignY="center">
                <Icon aria-label="logo" icon="gpLogo" fontSize="700" margin="major-1" />
              </Level>
              <Divider />
              <ActiveLink
                href={`/gallery/featured`}
                activeClassName="active"
                aria-label="Featured gallery"
                passHref={true}
              >
                <StyledSideNavItem
                  className="nav-link"
                  variant="navigationText"
                  navId="featured"
                  onClick={page.sidebar.close}
                >
                  Featured
                </StyledSideNavItem>
              </ActiveLink>

              <ActiveLink
                href={`/gallery/land`}
                activeClassName="active"
                aria-label="Land gallery"
                passHref={true}
              >
                <StyledSideNavItem
                  className="nav-link"
                  variant="navigationText"
                  navId="land"
                  onClick={page.sidebar.close}
                >
                  Land
                </StyledSideNavItem>
              </ActiveLink>
              <ActiveLink
                href={`/gallery/water`}
                activeClassName="active"
                aria-label="Water gallery"
                passHref={true}
              >
                <StyledSideNavItem
                  className="nav-link"
                  variant="navigationText"
                  navId="water"
                  onClick={page.sidebar.close}
                >
                  Water
                </StyledSideNavItem>
              </ActiveLink>
              <ActiveLink
                href={`/gallery/sky`}
                activeClassName="active"
                aria-label="Sky gallery"
                passHref={true}
              >
                <StyledSideNavItem
                  className="nav-link"
                  variant="navigationText"
                  navId="sky"
                  onClick={page.sidebar.close}
                >
                  Sky
                </StyledSideNavItem>
              </ActiveLink>
              <ActiveLink
                href={`/gallery/bloom`}
                activeClassName="active"
                aria-label="Bloom gallery"
                passHref={true}
              >
                <StyledSideNavItem
                  className="nav-link"
                  variant="navigationText"
                  navId="bloom"
                  onClick={page.sidebar.close}
                >
                  Bloom
                </StyledSideNavItem>
              </ActiveLink>
              <ActiveLink
                href={`/gallery/bird`}
                activeClassName="active"
                aria-label="Bird gallery"
                passHref={true}
              >
                <StyledSideNavItem
                  className="nav-link"
                  variant="navigationText"
                  navId="bird"
                  onClick={page.sidebar.close}
                >
                  Bird
                </StyledSideNavItem>
              </ActiveLink>
              <ActiveLink
                href={`/gallery/beast`}
                activeClassName="active"
                aria-label="Beast gallery"
                passHref={true}
              >
                <StyledSideNavItem
                  className="nav-link"
                  variant="navigationText"
                  navId="beast"
                  onClick={page.sidebar.close}
                >
                  Beast
                </StyledSideNavItem>
              </ActiveLink>
              {isMaxDesktopAndUnder && (
                <>
                  <Divider />
                  {session ? (
                    <>
                      <ActiveLink
                        href={`/auth/signout`}
                        activeClassName="active"
                        aria-label="Sign in"
                        passHref={true}
                      >
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
                        aria-label="Favorites gallery"
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
                        aria-label="Shopping Bag"
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
                    <ActiveLink
                      href={`/auth/signin`}
                      activeClassName="active"
                      aria-label="Sign in"
                      passHref={true}
                    >
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
};

export default Layout;
