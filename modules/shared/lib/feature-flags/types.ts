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

  workstreams: {
    /**
     * Whether the workstream pages are enabled or not
     */
    WORKSTREAMS_ENABLED: boolean

    /**
     * Whether the project details page is enabled or not
     */
    PROJECT_DETAILS_ENABLED: boolean
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
  }
}
