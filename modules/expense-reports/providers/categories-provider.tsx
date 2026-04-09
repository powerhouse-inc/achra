'use client'

import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { CategoriesModal } from '../components/categories-modal'
import { groupTreeNodesToCategoryTrees } from '../lib/group-tree-to-category-tree'
import type { CategoryTree, GroupTreeNode } from '../types'

interface ModalCategoriesContextValues {
  headcountCategories: CategoryTree[]
  nonHeadcountCategories: CategoryTree[]

  hasNoCategories: boolean
  hasNestedCategories: boolean

  areAllExpanded: boolean
  toggleAllCategories: () => void
  handleHeadcountValueChange: (newValue: string[]) => void
  handleNonHeadcountValueChange: (newValue: string[]) => void

  isModalOpen: boolean
  openModal: () => void
  closeModal: () => void
}

const ModalCategoriesContext = createContext<ModalCategoriesContextValues | undefined>(undefined)

export interface CategoriesTreeShape {
  headcount: GroupTreeNode[]
  nonHeadcount: GroupTreeNode[]
}

interface ModalCategoriesProviderProps {
  children: React.ReactNode
  categoriesTree: CategoriesTreeShape
}

export function ModalCategoriesProvider({
  children,
  categoriesTree,
}: ModalCategoriesProviderProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [expandedState, setExpandedState] = useState<Record<string, boolean>>({})

  const expandedStateMap = useMemo(
    () =>
      new Map(Object.entries(expandedState).map(([id, isExpanded]) => [id, !isExpanded] as const)),
    [expandedState],
  )

  const headcountCategories = useMemo(
    () => groupTreeNodesToCategoryTrees(categoriesTree.headcount, true, expandedStateMap),
    [categoriesTree.headcount, expandedStateMap],
  )

  const nonHeadcountCategories = useMemo(
    () => groupTreeNodesToCategoryTrees(categoriesTree.nonHeadcount, false, expandedStateMap),
    [categoriesTree.nonHeadcount, expandedStateMap],
  )

  const hasNoCategories = useMemo(
    () => headcountCategories.length === 0 && nonHeadcountCategories.length === 0,
    [headcountCategories.length, nonHeadcountCategories.length],
  )

  const hasNestedCategories = useMemo(
    () =>
      !hasNoCategories &&
      (headcountCategories.some((category) => category.children.length > 0) ||
        nonHeadcountCategories.some((category) => category.children.length > 0)),
    [hasNoCategories, headcountCategories, nonHeadcountCategories],
  )

  const expandableCategoryIds = useMemo(
    () => [
      ...categoriesTree.headcount.filter((n) => n.children.length > 0).map((n) => n.id),
      ...categoriesTree.nonHeadcount.filter((n) => n.children.length > 0).map((n) => n.id),
    ],
    [categoriesTree.headcount, categoriesTree.nonHeadcount],
  )

  const areAllExpanded = useMemo(
    () =>
      expandableCategoryIds.length > 0 && expandableCategoryIds.every((id) => expandedState[id]),
    [expandableCategoryIds, expandedState],
  )

  const setCategoryExpandedValue = useCallback((categoryId: string, isCollapsed: boolean) => {
    setExpandedState((prev) => ({ ...prev, [categoryId]: !isCollapsed }))
  }, [])

  const toggleAllCategories = useCallback(() => {
    const nextExpanded = !areAllExpanded
    setExpandedState((prev) => {
      const next = { ...prev }
      for (const id of expandableCategoryIds) {
        next[id] = nextExpanded
      }
      return next
    })
  }, [areAllExpanded, expandableCategoryIds])

  const handleHeadcountValueChange = useCallback(
    (newValue: string[]) => {
      headcountCategories.forEach((category) => {
        const isOpen = newValue.includes(category.id)
        setCategoryExpandedValue(category.id, !isOpen)
      })
    },
    [headcountCategories, setCategoryExpandedValue],
  )

  const handleNonHeadcountValueChange = useCallback(
    (newValue: string[]) => {
      nonHeadcountCategories.forEach((category) => {
        const isOpen = newValue.includes(category.id)
        setCategoryExpandedValue(category.id, !isOpen)
      })
    },
    [nonHeadcountCategories, setCategoryExpandedValue],
  )

  const values = useMemo(
    () => ({
      headcountCategories,
      nonHeadcountCategories,

      hasNoCategories,
      hasNestedCategories,

      areAllExpanded,
      toggleAllCategories,
      handleHeadcountValueChange,
      handleNonHeadcountValueChange,

      isModalOpen,
      openModal: () => {
        setIsModalOpen(true)
      },
      closeModal: () => {
        setIsModalOpen(false)
      },
    }),
    [
      headcountCategories,
      nonHeadcountCategories,
      hasNoCategories,
      hasNestedCategories,
      areAllExpanded,
      toggleAllCategories,
      handleHeadcountValueChange,
      handleNonHeadcountValueChange,
      isModalOpen,
    ],
  )

  return (
    <ModalCategoriesContext.Provider value={values}>
      {children}

      <CategoriesModal />
    </ModalCategoriesContext.Provider>
  )
}

export function useModalCategories() {
  const context = useContext(ModalCategoriesContext)
  if (!context) {
    throw new Error('useModalCategories must be used within a ModalCategoriesProvider')
  }
  return context
}
