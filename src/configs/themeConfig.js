const themeConfig = {
  app: {
    appName: "BERENICE",
    appLogoImage: require("../assets/images/bereniceLogo.png").default,

  },
  layout: {
    isRTL: false,
    skin: "light",
    routerTransition: "zoomIn",
    type: "vertical",
    contentWidth: "full",
    menu: {
      isHidden: false,
      isCollapsed: false,
    },
    navbar: {
      type: "floating",
      backgroundColor: "primary",
    },
    footer: {
      type: "static",
    },
    customizer: false,
    scrollTop: true,
  },
}

export default themeConfig
