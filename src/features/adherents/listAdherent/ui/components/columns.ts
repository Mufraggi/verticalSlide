import { h } from 'vue'
import type { ColumnDef } from '@tanstack/vue-table'
import type { CreateAdherentCommand } from '@/features/adherents/createAdherent/createAdherent.usecase.ts'

// Type pour les adhérents avec ID
type AdherentWithId = CreateAdherentCommand & { id: number }

export const columns: ColumnDef<AdherentWithId>[] = [
  {
    accessorKey: 'id',
    header: () => h('div', {}, 'ID'),
    cell: ({ row }) => h('div', { class: 'font-medium' }, row.getValue('id')),
  },
  {
    accessorKey: 'lastName',
    header: () => h('div', {}, 'Nom'),
    cell: ({ row }) => h('div', { class: 'font-medium' }, row.getValue('lastName')),
  },
  {
    accessorKey: 'firstName',
    header: () => h('div', {}, 'Prénom'),
    cell: ({ row }) => h('div', {}, row.getValue('firstName')),
  },
  {
    accessorKey: 'gender',
    header: () => h('div', {}, 'Genre'),
    cell: ({ row }) => {
      const gender = row.getValue('gender') as string
      let displayText = gender
      let badgeClass = 'px-2 py-1 text-xs rounded '

      switch (gender) {
        case 'Male':
          badgeClass += 'bg-blue-100 text-blue-800'
          displayText = 'Homme'
          break
        case 'Female':
          badgeClass += 'bg-pink-100 text-pink-800'
          displayText = 'Femme'
          break
        case 'Other':
          badgeClass += 'bg-purple-100 text-purple-800'
          displayText = 'Autre'
          break
      }

      return h('div', { class: badgeClass }, displayText)
    },
  },
  {
    accessorKey: 'email',
    header: () => h('div', {}, 'Email'),
    cell: ({ row }) => h('div', { class: 'text-sm' }, row.getValue('email')),
  },
  {
    accessorKey: 'phone',
    header: () => h('div', {}, 'Téléphone'),
    cell: ({ row }) => {
      const phone = row.getValue('phone') as string | null
      return h('div', { class: 'text-sm' }, phone || 'Non renseigné')
    },
  },
  {
    id: 'actions',
    header: () => h('div', { class: 'text-right' }, 'Actions'),
    cell: ({ row }) => {
      const adherent = row.original

      return h('div', { class: 'flex justify-end gap-2' }, [
        h(
          'button',
          {
            class: 'px-2 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600',
            onClick: () => {
              // Implémentez votre logique pour éditer un adhérent
              console.log('Éditer adhérent:', adherent.id)
            },
          },
          'Éditer',
        ),
        h(
          'button',
          {
            class: 'px-2 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600',
            onClick: () => {
              // Implémentez votre logique pour supprimer un adhérent
              console.log('Supprimer adhérent:', adherent.id)
            },
          },
          'Supprimer',
        ),
      ])
    },
  },
]
