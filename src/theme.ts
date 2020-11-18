import {
  faShoppingBag,
  faSearch,
  faMoon,
  faSun,
  faBars,
  faPlus,
  faEllipsisV,
  faInfoCircle,
  faExpand,
  faCompress,
  faAt
} from "@fortawesome/free-solid-svg-icons";

import {
  faStar,
  faUserCircle,
  faEye,
  faEyeSlash,
  faTimesCircle
} from "@fortawesome/free-regular-svg-icons";

import {
  faGoogle,
  faApple,
  faFacebookF,
  faInstagram,
  faTwitter
} from "@fortawesome/free-brands-svg-icons";

const theme = {
  TopNav: {
    Item: {
      variants: {
        navigationText: {
          styles: {
            base: {
              font: "Raleway",
              fontSize: "26px",
              fontVariant: "small-caps",
              fontWeight: 700
            },
            focus: {
              boxShadow: "inset 0 -2px 0 0"
            }
          }
        }
      }
    }
  },
  SideNav: {
    Item: {
      variants: {
        navigationText: {
          styles: {
            base: {
              font: "Raleway",
              fontSize: "18px",
              fontVariant: "small-caps",
              fontWeight: 600
            },
            focus: {
              boxShadow: "none"
            }
          }
        }
      }
    }
  },
  Icon: {
    iconSets: [
      {
        icons: [
          faShoppingBag,
          faSearch,
          faSun,
          faMoon,
          faBars,
          faPlus,
          faEllipsisV,
          faInfoCircle,
          faExpand,
          faCompress,
          faAt
        ],
        prefix: "solid-",
        type: "font-awesome"
      },
      {
        icons: [faStar, faUserCircle, faEye, faEyeSlash, faTimesCircle],
        prefix: "regular-",
        type: "font-awesome"
      },
      {
        icons: [faGoogle, faApple, faFacebookF, faInstagram, faTwitter],
        prefix: "brands-",
        type: "font-awesome"
      }
    ]
  }
};

export default theme;
