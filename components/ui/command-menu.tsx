'use client'

import { useState, useEffect } from 'react'
import { Search, Command } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'

interface CommandItem {
  id: string
  label: string
  icon?: React.ReactNode
  href?: string
  action?: () => void
  group?: string
}

interface CommandMenuProps {
  items: CommandItem[]
  trigger?: React.ReactNode
}

export function CommandMenu({ items, trigger }: CommandMenuProps) {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const router = useRouter()

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
      if (e.key === 'Escape') {
        setOpen(false)
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  useEffect(() => {
    if (open) {
      setSearch('')
    }
  }, [open])

  const filteredItems = items.filter((item) =>
    item.label.toLowerCase().includes(search.toLowerCase())
  )

  const handleSelect = (item: CommandItem) => {
    if (item.href) {
      router.push(item.href)
    }
    if (item.action) {
      item.action()
    }
    setOpen(false)
    setSearch('')
  }

  return (
    <>
      {trigger && (
        <div onClick={() => setOpen(true)}>
          {trigger}
        </div>
      )}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh]"
          onClick={() => setOpen(false)}
        >
      <div
        className="relative w-full max-w-lg bg-card border border-border rounded-xl shadow-2xl overflow-hidden animate-in fade-in-0 zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-2 px-4 border-b border-border">
          <Search className="w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar comandos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 py-3 bg-transparent outline-none placeholder:text-muted-foreground"
            autoFocus
          />
          <kbd className="hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
            <Command className="w-3 h-3" />K
          </kbd>
        </div>
        <div className="max-h-[300px] overflow-y-auto p-2">
          {filteredItems.length === 0 ? (
            <div className="py-6 text-center text-sm text-muted-foreground">
              No se encontraron resultados
            </div>
          ) : (
            <div className="space-y-1">
              {filteredItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleSelect(item)}
                  className={cn(
                    'flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm',
                    'hover:bg-muted transition-colors text-left'
                  )}
                >
                  {item.icon && <span className="text-muted-foreground">{item.icon}</span>}
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
          <div
            className="fixed inset-0 bg-background/80 backdrop-blur-sm -z-10"
            onClick={() => setOpen(false)}
          />
        </div>
      )}
    </>
  )
}

