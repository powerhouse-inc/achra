/* eslint-disable no-undef -- CommonJS stub module; `module` is a CJS global. */
// Empty stub for Node built-ins (dns/fs/net/tls/worker_threads) that
// @powerhousedao/reactor statically imports for its SERVER transport
// (pg, worker pools). That code is dead in the browser — reactor-browser
// uses PGlite + a GraphQL client and never instantiates it — so we alias
// these builtins to this empty module for the `browser` condition only
// (see next.config.ts turbopack.resolveAlias). Server bundles keep the
// real modules. CJS so any named/default import resolves without error.
module.exports = {}
