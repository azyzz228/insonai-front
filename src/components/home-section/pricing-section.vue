<template>
  <div class="py-24 sm:pt-48">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div class="mx-auto max-w-4xl text-center">
        <h2 class="text-base font-semibold leading-7 text-indigo-600">Pricing</h2>
        <p class="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Pricing plans for teams of&nbsp;all&nbsp;sizes
        </p>
      </div>
      <p class="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-600">
        To cater to businesses of various sizes and industries, we will offer three main tiers:
      </p>
      <div
        class="isolate mx-auto mt-16 grid max-w-md grid-cols-1 gap-y-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3"
      >
        <div
          v-for="(tier, tierIdx) in tiers"
          :key="tier.id"
          :class="[
            tier.mostPopular ? 'lg:z-10 lg:rounded-b-none' : 'lg:mt-8',
            tierIdx === 0 ? 'lg:rounded-r-none' : '',
            tierIdx === tiers.length - 1 ? 'lg:rounded-l-none' : '',
            'flex flex-col justify-between rounded-3xl bg-white p-8 ring-1 ring-gray-200 xl:p-10'
          ]"
        >
          <div>
            <div class="flex items-center justify-between gap-x-4">
              <h3
                :id="tier.id"
                :class="[
                  tier.mostPopular ? 'text-indigo-600' : 'text-gray-900',
                  'text-lg font-semibold leading-8'
                ]"
              >
                {{ tier.name }}
              </h3>
              <p
                v-if="tier.mostPopular"
                class="rounded-full bg-indigo-600/10 px-2.5 py-1 text-xs font-semibold leading-5 text-indigo-600"
              >
                Most popular
              </p>
            </div>
            <p class="mt-4 text-sm leading-6 text-gray-600">{{ tier.description }}</p>
            <p class="mt-6 flex items-baseline gap-x-1">
              <span class="text-4xl font-bold tracking-tight text-gray-900">{{
                tier.priceMonthly
              }}</span>
              <span class="text-sm font-semibold leading-6 text-gray-600">/month</span>
            </p>
            <ul role="list" class="mt-8 space-y-3 text-sm leading-6 text-gray-600">
              <li v-for="feature in tier.features" :key="feature" class="flex gap-x-3">
                <CheckIcon class="h-6 w-5 flex-none text-indigo-600" aria-hidden="true" />
                {{ feature }}
              </li>
            </ul>
          </div>
          <a
            :href="tier.href"
            :aria-describedby="tier.id"
            :class="[
              tier.mostPopular
                ? 'bg-indigo-600 text-white shadow-sm hover:bg-indigo-500'
                : 'text-indigo-600 ring-1 ring-inset ring-indigo-200 hover:ring-indigo-300',
              'mt-8 block rounded-md px-3 py-2 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
            ]"
            >Buy plan</a
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { CheckIcon } from '@heroicons/vue/20/solid'

const tiers = [
  {
    name: 'Basic Plan',
    id: 'tier-freelancer',
    href: '#',
    priceMonthly: '$30',
    description:
      'Ideal for small businesses or startups with a low volume of customer interactions.',
    features: [
      '1,000 calls per month',
      'Up to 2,000 customers',
      'Basic analytics',
      '24/7 customer support'
    ],
    mostPopular: false
  },
  {
    name: 'Pro Plan',
    id: 'tier-startup',
    href: '#',
    priceMonthly: '$90',
    description: 'Essential for medium-sized enterprises with moderate customer interaction needs.',
    features: [
      '5,000 calls per month',
      'Unlimited number of customers',
      'Sentiment analysis',
      'Integration with CRM'
    ],
    mostPopular: true
  },
  {
    name: 'Enterprise',
    id: 'tier-enterprise',
    href: '#',
    priceMonthly: '$400',
    description: 'Tailored for large corporations with high call volumes and complex needs.',
    features: [
      'Unlimited calls',
      'Customized AI solutions (industry-specific models)',
      'API access for custom integrations',
      'Dedicated 24/7 support team'
    ],
    mostPopular: false
  }
]
</script>
<style scoped lang="scss"></style>
