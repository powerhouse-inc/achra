## Ticket

https://trello.com/c/hcWzoX1d/1348-create-the-content-of-the-summary-step-for-the-service-purchase-page-in-the-achra-project

## Description

This PR implements the Summary step for the service purchase flow, allowing users to review their selected configuration and services before proceeding to the next step.

**Key Changes:**

- **Summary Component**: Created the main Summary component that displays:
  - Selected service resource with pricing information (monthly recurring + one-time setup fee)
  - Configuration options (Legal Entity, Team Structure, Anonymity Level) with interactive dropdowns
  - Service breakdown showing selected tier, formation & setup fees, recurring base costs, and optional add-ons (Finance Pack, Hosting Suite)
  - Dynamic price calculation based on selected plan and enabled sections
  - Back navigation to return to the Select Services step

- **ServiceBreakdownItem Component**: Added a reusable component for displaying individual service line items with title, optional subtitle, and value

- **Integration**: Integrated the Summary component into the service purchase form navigation flow with proper step routing

- **Type Definitions**: Added `ConfigurationData` interface to support configuration state management

- **Module Structure**: Added barrel export for the Summary module to maintain consistent import patterns

The Summary component receives the selected pricing plan and enabled sections as props, calculates the total costs dynamically, and presents a comprehensive review of the user's selections.

## PR Author Checklist:

- [ ] I have performed a self-review of my own code
- [ ] I have performed a self-review of my own chromatic changes and everything is expected
- [ ] I have removed any unnecessary console messages and alerts
- [ ] I have removed any commented code
- [ ] I have checked that there are no dummy or unnecessary comments
- [ ] I have added new test cases (if it applies)
- [ ] I have not introduced any linting issues or warnings

## Reviewer Checklist:

- [ ] I have reviewed the code
- [ ] I have reviewed the preview environment
- [ ] I have reviewed Chromatic (if there are changes)

## Screenshots (if apply)
