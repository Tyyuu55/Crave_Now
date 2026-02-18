import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: {},
      addItem: (item, restaurant) => {
        const current = get().items
        const existing = current[item.id]
        const quantity = existing ? existing.quantity + 1 : 1
        set({
          items: {
            ...current,
            [item.id]: {
              ...item,
              restaurantId: restaurant?.id,
              restaurantName: restaurant?.name,
              quantity,
            },
          },
        })
      },
      increment: (id) => {
        const current = get().items
        const existing = current[id]
        if (!existing) return
        set({
          items: {
            ...current,
            [id]: { ...existing, quantity: existing.quantity + 1 },
          },
        })
      },
      decrement: (id) => {
        const current = get().items
        const existing = current[id]
        if (!existing) return
        if (existing.quantity <= 1) {
          const { [id]: _removed, ...rest } = current
          set({ items: rest })
        } else {
          set({
            items: {
              ...current,
              [id]: { ...existing, quantity: existing.quantity - 1 },
            },
          })
        }
      },
      clearCart: () => set({ items: {} }),
      removeItem: (id) => {
        const current = get().items
        const { [id]: _removed, ...rest } = current
        set({ items: rest })
      },
    }),
    {
      name: 'foody-cart',
      storage: createJSONStorage(() => window.localStorage),
    },
  ),
)

export const selectCartItemsArray = (state) => Object.values(state.items)

export const selectCartTotals = (state) => {
  const items = Object.values(state.items)
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const subtotal = items.reduce(
    (sum, item) => sum + item.quantity * (item.price || 0),
    0,
  )
  return { totalItems, subtotal }
}

