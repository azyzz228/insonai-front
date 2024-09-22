<template>
  <div class="bg-white">
    <!--	header section  -->
    <v-header />
    <!--	main section  -->
    <main class="isolate">
      <!-- Hero section -->
      <hero-section />
      <!-- Logo cloud -->
      <companies-section />
      <!-- Feature section -->
      <feature-section />
      <!-- Testimonial section -->
      <testimonial-section />
      <!-- Pricing section -->
      <pricing-section />
      <!-- CTA section -->
      <cta-section />
    </main>
  </div>
</template>

<script setup lang="ts">
import VHeader from '@/components/layout/layout-blocks/VHeader.vue'
import CompaniesSection from '@/components/home-section/companies-section.vue'
import FeatureSection from '@/components/home-section/feature-section.vue'
import TestimonialSection from '@/components/home-section/testimonial-section.vue'
import PricingSection from '@/components/home-section/pricing-section.vue'
import CtaSection from '@/components/home-section/cta-section.vue'
import HeroSection from '@/components/home-section/hero-section.vue'
</script>
