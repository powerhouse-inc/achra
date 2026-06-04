import { webcrypto } from 'node:crypto'
import type { ISigner } from 'document-model'
import { describe, expect, it } from 'vitest'
import type { ReactorClient } from '../client/reactor-client'
import type { ClientContext } from '../context'
import { createSignedDocument } from './create-document'
import { createDrive } from './drives'
import { bindDocuments } from './registry'

/** Ephemeral P-256 signer — what `createSignedHeader` needs (publicKey + sign). */
async function makeTestSigner(): Promise<ISigner> {
  const { subtle } = webcrypto
  const keyPair = await subtle.generateKey({ name: 'ECDSA', namedCurve: 'P-256' }, true, [
    'sign',
    'verify',
  ])
  const sign = async (data: Uint8Array) =>
    new Uint8Array(await subtle.sign({ name: 'ECDSA', hash: 'SHA-256' }, keyPair.privateKey, data))
  return { publicKey: keyPair.publicKey, sign } as unknown as ISigner
}

interface CreateCall {
  document: {
    header: { id: string; documentType: string; sig?: unknown }
    state: { global: unknown }
  }
}

/** A reactor client that only records `CreateDocument` and echoes the client id. */
function makeFakeContext() {
  const createCalls: CreateCall[] = []
  const reactorClient = {
    CreateDocument: async (vars: { document: unknown }) => {
      const doc = vars.document as CreateCall['document']
      createCalls.push({ document: doc })
      return { createDocument: { id: doc.header.id } }
    },
  } as unknown as ReactorClient

  const ctx: ClientContext = {
    reactorClient,
    graphql: (async () => ({})) as ClientContext['graphql'],
    documents: bindDocuments(reactorClient),
  }
  return { ctx, createCalls }
}

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
const WALLET = '0xabcdef0123456789abcdef0123456789abcdef01'

describe('createSignedDocument (genesis-bake)', () => {
  it('creates in one CreateDocument with a client UUID, baked state, and a signed header', async () => {
    const { ctx, createCalls } = makeFakeContext()
    const signer = await makeTestSigner()

    const id = await createSignedDocument(ctx, {
      definition: ctx.documents.builderProfile,
      signer,
      name: 'Acme Builder Profile',
      init: (profile) => {
        profile.updateProfile({ name: 'Acme', slug: 'acme' })
        profile.setWalletAddress({ walletAddress: WALLET })
      },
    })

    // single create call
    expect(createCalls).toHaveLength(1)
    const doc = createCalls[0].document

    // returned id is a UUID and is RESTORED onto the header (not the base64 sig)
    expect(id).toMatch(UUID_RE)
    expect(doc.header.id).toBe(id)
    expect(doc.header.documentType).toBe('powerhouse/builder-profile')
    // header was signed
    expect(doc.header.sig).toBeTruthy()
    // init state was baked into genesis
    const global = doc.state.global as { name?: string; walletAddress?: string }
    expect(global.name).toBe('Acme')
    expect(global.walletAddress).toBe(WALLET)
  })

  it('bakes a self-referential id passed via initWithId-style init', async () => {
    const { ctx, createCalls } = makeFakeContext()
    const signer = await makeTestSigner()

    const knownId = 'a0000000-0000-4000-8000-000000000abc'
    const id = await createSignedDocument(ctx, {
      definition: ctx.documents.builderProfile,
      signer,
      id: knownId,
      init: (profile) => {
        profile.updateProfile({ id: knownId, name: 'Self' })
      },
    })

    expect(id).toBe(knownId)
    const global = createCalls[0].document.state.global as { id?: string }
    expect(global.id).toBe(knownId)
    expect(createCalls[0].document.header.id).toBe(knownId)
  })
})

describe('createDrive', () => {
  it('signs the genesis header and restores the UUID id', async () => {
    const { ctx, createCalls } = makeFakeContext()
    const signer = await makeTestSigner()

    const { driveId } = await createDrive(ctx, {
      name: 'Acme Team Admin',
      slug: 'acme-team-admin',
      preferredEditor: 'team-admin',
      signer,
    })

    expect(driveId).toMatch(UUID_RE)
    expect(createCalls).toHaveLength(1)
    const header = createCalls[0].document.header as {
      id: string
      sig?: unknown
      slug?: string
      meta?: { preferredEditor?: string }
    }
    expect(header.id).toBe(driveId)
    expect(header.sig).toBeTruthy()
    expect(header.slug).toBe('acme-team-admin')
    expect(header.meta?.preferredEditor).toBe('team-admin')
  })

  it('honors a pre-generated client id', async () => {
    const { ctx } = makeFakeContext()
    const signer = await makeTestSigner()
    const preId = 'b0000000-0000-4000-8000-000000000def'
    const { driveId } = await createDrive(ctx, {
      name: 'D',
      slug: 'd',
      id: preId,
      signer,
    })
    expect(driveId).toBe(preId)
  })
})
