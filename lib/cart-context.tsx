'use client'

import { createContext, useContext, useState } from 'react'

interface CartCtx {
  items: Record<string, number>
  setQty: (product: string, delta: number) => void
  clearCart: () => void
}

const CartContext = createContext<CartCtx | null>(null)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<Record<string, number>>({})

  const setQty = (product: string, delta: number) => {
    setItems((prev) => {
      const next = Math.max(0, (prev[product] ?? 0) + delta)
      const updated = { ...prev }
      if (next === 0) delete updated[product]
      else updated[product] = next
      return updated
    })
  }

  const clearCart = () => setItems({})

  return (
    <CartContext.Provider value={{ items, setQty, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
