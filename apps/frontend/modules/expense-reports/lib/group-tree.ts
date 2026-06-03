import type { ExpenseReportGroup } from '@/modules/__generated__/graphql/switchboard-generated'
import type { GroupTreeNode } from '../types'

export const HEADCOUNT_GROUP_LABEL = 'Headcount Expenses'
export const NON_HEADCOUNT_GROUP_LABEL = 'Non-Headcount Expenses'

export class GroupTree {
  headcount: GroupTreeNode[]
  nonHeadcount: GroupTreeNode[]

  constructor(groups: ExpenseReportGroup[]) {
    this.headcount = []
    this.nonHeadcount = []
    this.initializeGroupTrees(groups)
  }

  private initializeGroupTrees(groups: ExpenseReportGroup[]): void {
    const headcountGroup = groups.find((group) => group.label === HEADCOUNT_GROUP_LABEL)
    const nonHeadcountGroup = groups.find((group) => group.label === NON_HEADCOUNT_GROUP_LABEL)

    // Exclude root groups (headcount / non-headcount) so we only have their descendants
    // other nodes with parentId === '' are orphan groups so we ignore them
    const filteredGroups = groups.filter((group) => group.parentId !== '')

    // Build a map of id -> node so we can attach children to parents at any level
    const nodeById = new Map<string, GroupTreeNode>()
    for (const group of filteredGroups) {
      nodeById.set(group.id, {
        id: group.id,
        label: group.label,
        children: [],
      })
    }

    // Attach each node to its parent: either headcount/nonHeadcount roots or a node in the map
    for (const group of filteredGroups) {
      const node = nodeById.get(group.id)!
      const parentId = group.parentId

      if (parentId === headcountGroup?.id) {
        this.headcount.push(node)
      } else if (parentId === nonHeadcountGroup?.id) {
        this.nonHeadcount.push(node)
      } else {
        const parentNode = nodeById.get(parentId)
        if (parentNode) {
          parentNode.children.push(node)
        }
      }
    }
  }

  private static getGroupById(nodes: GroupTreeNode[], groupId: string): GroupTreeNode | null {
    for (const node of nodes) {
      if (node.id === groupId) {
        return node
      }
      if (node.children.length > 0) {
        return GroupTree.getGroupById(node.children, groupId)
      }
    }
    return null
  }

  public isGroupIdHeadcountExpense(groupId: string): boolean {
    return GroupTree.getGroupById(this.headcount, groupId) !== null
  }

  public isGroupIdNonHeadcountExpense(groupId: string): boolean {
    return GroupTree.getGroupById(this.nonHeadcount, groupId) !== null
  }
}
