<template>
  <form @submit.prevent="onSubmitForm" class="space-y-6 p-4 border rounded-md shadow-sm">
    <Card>
      <CardHeader>
        <CardTitle>Adherent Information</CardTitle>
        <CardDescription>Fill in the details for the new member.</CardDescription>
      </CardHeader>
      <CardContent class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField v-slot="{ componentField }" name="lastName">
            <FormItem>
              <FormLabel>Last Name *</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Doe" v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <!--<FormField name="firstName">
            <FormItem>
              <FormLabel>First Name *</FormLabel>
              <FormControl>
                <Input type="text" placeholder="John" v-model="form.firstName" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField name="gender">
            <FormItem>
              <FormLabel>Gender *</FormLabel>
              <Select v-model="form.gender">
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField name="email">
            <FormItem>
              <FormLabel>Email *</FormLabel>
              <FormControl>
                <Input type="email" placeholder="john.doe@example.com" v-model="form.email" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField name="phone">
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input type="tel" placeholder="+33 6 12 34 56 78" v-model="form.phone" />
              </FormControl>
              <FormDescription>Optional</FormDescription>
              <FormMessage />
            </FormItem>
          </FormField>-->
        </div>

        <!--<FormField name="address">
          <FormItem>
            <FormLabel>Address</FormLabel>
            <FormControl>
              <Textarea
                placeholder="123 Main St, Anytown..."
                class="resize-none"
                v-model="form.address"
              />
            </FormControl>
            <FormDescription>Optional</FormDescription>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField name="comments">
          <FormItem>
            <FormLabel>Comments</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Any additional notes..."
                class="resize-none"
                v-model="form.comments"
              />
            </FormControl>
            <FormDescription>Optional</FormDescription>
            <FormMessage />
          </FormItem>
        </FormField>-->
      </CardContent>
      <CardFooter>
        <Button type="submit">Create Adherent</Button>
      </CardFooter>
    </Card>
  </form>
</template>

<script setup lang="ts">

import { reactive } from 'vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import type { CreateAdherentCommand } from '@/features/adherents/createAdherent/createAdherent.usecase.ts'
import { adherentSchema } from '@/features/adherents/createAdherent/adherent.domain.ts'
import { Textarea } from '@/components/ui/textarea'

const emit = defineEmits<{
  (e: 'submit', values: CreateAdherentCommand): void
}>()

// Créer un état réactif pour le formulaire


// Configurer vee-validate
const { handleSubmit } = useForm({
  validationSchema: toTypedSchema(adherentSchema),
})
const onSubmitForm = handleSubmit((values) => {
  console.log('Form is valid, submitting:', values);
  emit('submit', values as CreateAdherentCommand);
}, (errors) => {
  console.log('Validation errors:', errors);
});

</script>
