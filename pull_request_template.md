## Ticket

Service profile backend integration

## Description

- **Service profile backend integration** — The service profile page now loads operator, resource details, FAQ, and purchase section from the backend; the page has a dedicated route with loading state.

- **Shared operator and UI** — Operator data and the scroll-to-section control are shared between the service profile and the purchase flow so both use the same source and behaviour.

- **Service profile structure** — The service profile lives under its own route and module; the purchase flow uses the shared operator data for step two.

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

N/A
