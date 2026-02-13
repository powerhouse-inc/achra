export interface FeatureFlags {
  /**
   * Whether to show the whitelist overlay
   */
  WHITELIST_OVERLAY_ENABLED: boolean

  /**
   * Whether to show the governance link in the network navigation
   */
  GOVERNANCE_LINK_ENABLED: boolean

  /**
   * Whether to enable the roadmap pages
   */
  ROADMAPS_ENABLED: boolean

  /**
   * Whether to use builders as the network homepage
   */
  USE_BUILDERS_AS_NETWORK_HOMEPAGE: boolean

  builders: {
    /**
     * Whether to show the finances link in the builders section
     */
    FINANCES_LINK_ENABLED: boolean

    /**
     * Whether to show the connect link in the builders section
     */
    CONNECT_LINK_ENABLED: boolean

    /**
     * Whether to show the projects section in the builders section
     */
    PROJECTS_SECTION_ENABLED: boolean
  }

  workstreams: {
    /**
     * Whether the workstream pages are enabled or not
     */
    WORKSTREAMS_ENABLED: boolean

    /**
     * Whether the project details page is enabled or not
     */
    PROJECT_DETAILS_ENABLED: boolean

    /**
     * Whether the initial proposal page is enabled or not
     */
    INITIAL_PROPOSAL_ENABLED: boolean

    /**
     * Whether the RFP page is enabled or not
     */
    RFP_ENABLED: boolean
  }

  finances: {
    /**
     * Whether to show the wallets section
     */
    WALLETS_ENABLED: boolean

    /**
     * Whether to show the summary section
     */
    SUMMARY_SECTION_ENABLED: boolean

    /**
     * Whether to show the navigation section
     */
    NAVIGATION_SECTION_ENABLED: boolean

    /**
     * Whether to show the breakdown chart section
     */
    BREAKDOWN_CHART_SECTION_ENABLED: boolean
    /**
     * Whether to show the year selector in the finances section
     */
    YEAR_SELECTOR_ENABLED?: boolean
  }
  /**
   * Whether to enable the login button in the nav bar
   */
  NAV_BAR_LOGIN_BUTTON_ENABLED: boolean
}
