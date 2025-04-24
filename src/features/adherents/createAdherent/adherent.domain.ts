// (Optional: Create a file like src/features/adherents/createAdherent/adherent.schema.ts)
import { z } from 'zod'

//const practiceSchema = z.object({
//  name: z.string().min(1, 'Practice name is required'),
//  frequency: z.string().min(1, 'Frequency is required'),
//  level: z.enum(['Beginner', 'Intermediate', 'Advanced'], { required_error: 'Level is required' })
//})

export const adherentSchema = z.object({
  lastName: z.string().min(1, 'Le nom de famille est requis'),
  firstName: z.string().min(1, 'Le prénom de famille est requis'),
  //bod: z.date({ required_error: 'Birth date is required' }),
  gender: z.enum(['Male', 'Female', 'Other'], { required_error: 'Gender is required' }),
  email: z.string().min(1, 'Email is required').email('Invalid email format'),
  //address: z.string().nullable().optional(),
  ////practices: z.array(practiceSchema).min(0), // Allow zero practices initially
  //registrationDate: z.date({ required_error: 'Registration date is required' }),
  //comments: z.string().nullable().optional(),
})

// Define the TypeScript type based on the Zod schema if needed elsewhere
export type CreateAdherentFormData = z.infer<typeof adherentSchema>

// Ensure this aligns with your original CreateAdherentCommand if necessary,
// especially regarding nullability and optional fields.
// The main difference is Zod defines validation rules.
