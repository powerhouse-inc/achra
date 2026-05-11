const DRIVE_DOCUMENT_TYPE = 'powerhouse/document-drive'

const LIST_DOCUMENTS_QUERY = /* GraphQL */ `
  query Documents {
    DocumentDrive {
      documents {
        items {
          id
          name
          documentType
        }
      }
    }
  }
`

const DELETE_DOCUMENT_MUTATION = /* GraphQL */ `
  mutation DeleteDocument($identifier: String!) {
    deleteDocument(identifier: $identifier)
  }
`

interface DriveDocument {
  id: string
  name: string
  documentType: string
}

interface ListDocumentsResponse {
  DocumentDrive: {
    documents: {
      items: DriveDocument[]
    }
  }
}

interface GraphQLResponse<T> {
  data?: T
  errors?: Array<{ message: string }>
}

export async function deleteDriveRecord(driveTeamName: string): Promise<void> {
  const endpoint = process.env.NEXT_PUBLIC_SWITCHBOARD_URL
  if (!endpoint) {
    throw new Error(
      '[e2e/support/drive-api] NEXT_PUBLIC_SWITCHBOARD_URL is not set. Configure it in e2e/env.e2e.',
    )
  }

  const list = await graphql<ListDocumentsResponse>(endpoint, LIST_DOCUMENTS_QUERY)
  const match = list.DocumentDrive.documents.items.find(
    (doc) => doc.name === driveTeamName && doc.documentType === DRIVE_DOCUMENT_TYPE,
  )

  if (!match) return

  await graphql<{ deleteDocument: boolean }>(endpoint, DELETE_DOCUMENT_MUTATION, {
    identifier: match.id,
  })
}

async function graphql<T>(
  endpoint: string,
  query: string,
  variables?: Record<string, unknown>,
): Promise<T> {
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables }),
  })

  const json = (await res.json()) as GraphQLResponse<T>

  if (json.errors?.length) {
    throw new Error(`[e2e/support/drive-api] GraphQL error: ${json.errors[0].message}`)
  }
  if (!json.data) {
    throw new Error('[e2e/support/drive-api] GraphQL response missing data')
  }

  return json.data
}
