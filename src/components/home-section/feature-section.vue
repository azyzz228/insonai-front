<template>
  <div class="mx-auto mt-32 max-w-7xl px-6 sm:mt-56 lg:px-8">
    <div class="mx-auto max-w-2xl lg:text-center">
      <h2 class="text-base font-semibold leading-7 text-indigo-600">Automate now</h2>
      <p class="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        What is special about INSON AI
      </p>
      <p class="mt-6 text-lg leading-8 text-gray-600">
        INSON AI is the next-generation call center automation tool that handles customer
        interactions, leads processing, feedback collection, booking confirmations, and more—all in
        real time.
      </p>
    </div>
    <div class="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
      <dl
        class="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16"
      >
        <div v-for="feature in features" :key="feature.name" class="relative pl-16">
          <dt class="text-base font-semibold leading-7 text-gray-900">
            <div
              class="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600"
            >
              <component :is="feature.icon" class="h-6 w-6 text-white" aria-hidden="true" />
            </div>
            {{ feature.name }}
          </dt>
          <dd class="mt-2 text-base leading-7 text-gray-600">{{ feature.description }}</dd>
        </div>
      </dl>
    </div>
  </div>
</template>
<script setup lang="ts">
import {
  ArrowPathIcon,
  BanknotesIcon,
  ClipboardDocumentCheckIcon,
  CodeBracketSquareIcon,
  LanguageIcon,
  PhoneIcon
} from '@heroicons/vue/24/outline'

const features = [
  {
    name: 'Real-Time Call Automation',
    description:
      'INSON AI handles entire customer calls, from greeting to resolution, ensuring consistent and effective interactions.',
    icon: PhoneIcon
  },
  {
    name: 'Lead Processing & Follow-Up',
    description:
      'Capture, process, and nurture leads automatically, allowing your team to focus on closing deals.',
    icon: BanknotesIcon
  },
  {
    name: 'Feedback & Quality Assurance',
    description: 'Collect valuable customer feedback and perform quality assurance seamlessly.',
    icon: ArrowPathIcon
  },
  {
    name: 'Booking & Verification',
    description: 'Confirm appointments and reservations through automated, personalized calls.',
    icon: ClipboardDocumentCheckIcon
  },
  {
    name: 'Integration with Your CRM',
    description: 'Add INSON AI into your existing CRM and boost your customer service.',
    icon: CodeBracketSquareIcon
  },
  {
    name: 'Multi-Language Support',
    description: 'Communicate with your customers in multiple languages for broader outreach.',
    icon: LanguageIcon
  }
]
</script>

<style scoped lang="scss"></style>
