import type { CreateAdherentCommand } from '@/features/adherents/createAdherent/createAdherent.usecase.ts'

export const validateAdherentService = (createAdherent: CreateAdherentCommand): string[] => {
  const MIN_NAME_LENGTH = 2
  const errors: string[] = []

  if (createAdherent.lastName.length < MIN_NAME_LENGTH) {
    errors.push('Last name is too short')
  }

 // if (createAdherent.firstName.length < MIN_NAME_LENGTH) {
 //   errors.push('First name is too short')
 // }
//
//
 // if (!['Male', 'Female', 'Other'].includes(createAdherent.gender)) {
 //   errors.push('Invalid gender')
 // }
//
 // if (!createAdherent.email.includes('@')) {
 //   errors.push('Invalid email format')
 // }


  return errors
}
