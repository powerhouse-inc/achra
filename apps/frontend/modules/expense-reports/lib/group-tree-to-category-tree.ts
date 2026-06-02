import type {
  CategoryTree,
  GroupTreeNode,
  GroupTreeNodeToCategoryTreeOptions,
} from '@/modules/expense-reports/types'

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
