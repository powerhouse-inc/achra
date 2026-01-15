'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { CategoriesModal } from '../components/categories-modal'
import { categoriesMock } from '../mocks/categories-mocks'
import type { Category, CategoryTree, ExtendedCategory } from '../types'

interface ModalCategoriesContextValues {
  headcountCategories: CategoryTree[]
  nonHeadcountCategories: CategoryTree[]
  isLoadingCategories: boolean

  areAllExpanded: boolean
  toggleAllCategories: () => void
  setCategoryExpandedValue: (categoryId: string, isCollapsed: boolean) => void

  isModalOpen: boolean
  openModal: () => void
  closeModal: () => void
}

const ModalCategoriesContext = createContext<ModalCategoriesContextValues | undefined>(undefined)

export function ModalCategoriesProvider({ children }: { children: React.ReactNode }) {
  const [categories, setCategories] = useState<Category[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoadingCategories, setIsLoadingCategories] = useState(false)

  // replace with react query once the query is implemented
  useEffect(() => {
    const simulateCategoriesFetch = async () => {
      setIsLoadingCategories(true)
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setCategories(categoriesMock)
      setIsLoadingCategories(false)
    }
    void simulateCategoriesFetch()
  }, [])

  // build the category tree
  const categoryTree: CategoryTree[] = useMemo(() => {
    return categories
      .filter((category) => category.parentId === null)
      .map(
        (category) =>
          ({
            ...category,
            isCollapsed: true,
            children: categories
              .filter((subcategory) => subcategory.parentId === category.id)
              .map(
                (subcategory) =>
                  ({
                    ...subcategory,
                    isCollapsed: true,
                  }) satisfies ExtendedCategory,
              )
              .sort((a, b) => a.order - b.order),
          }) satisfies CategoryTree,
      )
      .sort((a, b) => a.order - b.order)
  }, [categories])

  const [allCategories, setAllCategories] = useState<CategoryTree[]>(categoryTree)
  useEffect(() => {
    setAllCategories(categoryTree)
  }, [categoryTree])

  const headcountCategories = allCategories.filter((category) => category.headcountExpense)
  const nonHeadcountCategories = allCategories.filter((category) => !category.headcountExpense)

  const setCategoryExpandedValue = useCallback((categoryId: string, isCollapsed: boolean) => {
    setAllCategories((prev) =>
      prev.map((category) =>
        category.id === categoryId ? { ...category, isCollapsed } : category,
      ),
    )
  }, [])

  const areAllExpanded = useMemo(() => {
    return allCategories.every((category) => !category.isCollapsed)
  }, [allCategories])

  const toggleAllCategories = useCallback(() => {
    setAllCategories((prev) =>
      prev.map((category) => ({ ...category, isCollapsed: areAllExpanded })),
    )
  }, [areAllExpanded])

  const values = useMemo(
    () => ({
      headcountCategories,
      nonHeadcountCategories,
      isLoadingCategories,

      areAllExpanded,
      toggleAllCategories,
      setCategoryExpandedValue,

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
      isLoadingCategories,
      areAllExpanded,
      toggleAllCategories,
      setCategoryExpandedValue,
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
