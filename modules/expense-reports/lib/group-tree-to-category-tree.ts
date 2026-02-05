import type { CategoryTree, GroupTreeNode } from '../types'

/** Collects all node ids from a tree (for expand-all / collapse-all). */
export function collectGroupTreeNodeIds(nodes: GroupTreeNode[]): string[] {
  const ids: string[] = []
  function walk(nodes: GroupTreeNode[]) {
    for (const node of nodes) {
      ids.push(node.id)
      if (node.children.length > 0) walk(node.children)
    }
  }
  walk(nodes)
  return ids
}

export interface GroupTreeNodeToCategoryTreeOptions {
  headcountExpense: boolean
  order: number
  parentId: string | null
  expandedState: Map<string, boolean>
}

/**
 * Converts a GroupTreeNode (API shape) to CategoryTree (modal shape).
 * Merges expand/collapse state from expandedState map; defaults to collapsed (true) when not set.
 */
export function groupTreeNodeToCategoryTree(
  node: GroupTreeNode,
  options: GroupTreeNodeToCategoryTreeOptions,
): CategoryTree {
  const { headcountExpense, order, parentId, expandedState } = options
  const isCollapsed = expandedState.get(node.id) ?? true

  return {
    id: node.id,
    name: node.label,
    parentId,
    order,
    headcountExpense,
    isCollapsed,
    children: node.children.map((child, index) =>
      groupTreeNodeToCategoryTree(child, {
        headcountExpense,
        order: index,
        parentId: node.id,
        expandedState,
      }),
    ),
  }
}

/**
 * Converts an array of GroupTreeNodes to CategoryTree[] with the given options.
 */
export function groupTreeNodesToCategoryTrees(
  nodes: GroupTreeNode[],
  headcountExpense: boolean,
  expandedState: Map<string, boolean>,
): CategoryTree[] {
  return nodes.map((node, index) =>
    groupTreeNodeToCategoryTree(node, {
      headcountExpense,
      order: index,
      parentId: null,
      expandedState,
    }),
  )
}
