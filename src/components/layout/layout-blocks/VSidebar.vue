<template>
  <TransitionRoot as="template" :show="sidebarOpen">
    <Dialog class="relative z-50 lg:hidden" @close="sidebarOpen = false">
      <TransitionChild
        as="template"
        enter="transition-opacity ease-linear duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="transition-opacity ease-linear duration-300"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-gray-900/80" />
      </TransitionChild>

      <div class="fixed inset-0 flex">
        <TransitionChild
          as="template"
          enter="transition ease-in-out duration-300 transform"
          enter-from="-translate-x-full"
          enter-to="translate-x-0"
          leave="transition ease-in-out duration-300 transform"
          leave-from="translate-x-0"
          leave-to="-translate-x-full"
        >
          <DialogPanel class="relative mr-16 flex w-full max-w-xs flex-1">
            <TransitionChild
              as="template"
              enter="ease-in-out duration-300"
              enter-from="opacity-0"
              enter-to="opacity-100"
              leave="ease-in-out duration-300"
              leave-from="opacity-100"
              leave-to="opacity-0"
            >
              <div class="absolute left-full top-0 flex w-16 justify-center pt-5">
                <button type="button" class="-m-2.5 p-2.5" @click="sidebarOpen = false">
                  <span class="sr-only">Close sidebar</span>
                  <XMarkIcon class="h-6 w-6 text-white" aria-hidden="true" />
                </button>
              </div>
            </TransitionChild>
            <div class="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-2">
              <div class="flex h-16 shrink-0 items-center">
                <img class="h-8 w-auto" src="@/assets/images/logo.png" alt="Your Company" />
              </div>
              <nav class="flex flex-1 flex-col">
                <ul role="list" class="flex flex-1 flex-col gap-y-7">
                  <li>
                    <ul role="list" class="-mx-2 space-y-1">
                      <li v-for="item in SIDEBAR_ENUM" :key="item.name">
                        <a
                          class="link hover:bg-indigo-700 hover:text-white', 'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6"
                          :href="item.link"
                        >
                          <component
                            :is="item.icon"
                            class="group-hover:text-white', 'h-6 w-6 shrink-0"
                            aria-hidden="true"
                          />
                          {{ item.name }}
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <div class="text-xs font-semibold leading-6">Your spaces</div>
                    <ul role="list" class="-mx-2 mt-2 space-y-1">
                      <li v-for="team in teams" :key="team.name">
                        <a
                          :href="team.href"
                          :class="[
                            team.current
                              ? 'bg-indigo-700 text-white'
                              : ' hover:bg-indigo-700 hover:text-white',
                            'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6'
                          ]"
                        >
                          <span
                            class="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-indigo-400 bg-indigo-500 text-[0.625rem] font-medium text-white"
                            >{{ team.initial }}</span
                          >
                          <span class="truncate">{{ team.name }}</span>
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </nav>
            </div>
          </DialogPanel>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>

  <!-- Static sidebar for desktop -->
  <div class="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
    <!-- Sidebar component, swap this element with another sidebar if you like -->
    <div
      class="flex grow flex-col gap-y-5 overflow-y-auto px-6 bg-white m-[20px] rounded-[12px] border border-gray-300"
    >
      <router-link to="/" class="flex h-24 shrink-0 items-center mt-[20px]">
        <img
          class="h-24 w-auto"
          src="@/assets/images/logo-text-transparent.png"
          alt="Your Company"
        />
      </router-link>
      <nav class="flex flex-1 flex-col">
        <ul role="list" class="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" class="-mx-2 space-y-1">
              <li v-for="item in SIDEBAR_ENUM" :key="item.name">
                <router-link
                  :to="{ name: item.link }"
                  class="text-[#575959] link hover:bg-indigo-700 hover:text-white', 'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6"
                >
                  <component
                    :is="item.icon"
                    class="text-[#575959] group-hover:text-white h-6 w-6 shrink-0"
                    aria-hidden="true"
                  />
                  {{ item.name }}
                </router-link>
              </li>
            </ul>
          </li>
          <li>
            <div class="text-xs font-semibold leading-6">Your spaces</div>
            <ul role="list" class="-mx-2 mt-2 space-y-1">
              <li v-for="team in teams" :key="team.name">
                <a
                  :href="team.href"
                  class="text-[#575959]"
                  :class="[
                    team.current
                      ? 'bg-indigo-700 text-white'
                      : ' hover:bg-indigo-700 hover:text-white',
                    'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6'
                  ]"
                >
                  <span
                    class="text-indigo-200 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-indigo-400 bg-indigo-500 text-[0.625rem] font-medium"
                    >{{ team.initial }}</span
                  >
                  <span class="truncate">{{ team.name }}</span>
                </a>
              </li>
            </ul>
          </li>
          <li class="-mx-6 mt-auto">
            <a
              href="#"
              class="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 hover:bg-indigo-700 hover:text-white"
            >
              <img
                class="h-8 w-8 rounded-full bg-indigo-700"
                src="@/assets/images/company.webp"
                alt="company logo"
              />
              <span class="sr-only">Your profile</span>
              <span aria-hidden="true">Profile of your company</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </div>

  <div
    class="sticky top-0 z-40 flex items-center gap-x-6 bg-white px-4 py-4 shadow-sm sm:px-6 lg:hidden"
  >
    <button type="button" class="-m-2.5 p-2.5 lg:hidden" @click="sidebarOpen = true">
      <span class="sr-only">Open sidebar</span>
      <Bars3Icon class="h-6 w-6" aria-hidden="true" />
    </button>
    <div class="flex-1 text-sm font-semibold leading-6">Dashboard</div>
    <a href="#">
      <span class="sr-only">Your profile</span>
      <img
        class="h-8 w-8 rounded-full bg-indigo-700"
        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        alt=""
      />
    </a>
  </div>
</template>
<script setup lang="ts">
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'
import { ref } from 'vue'
import { SIDEBAR_ENUM } from '@/enums/SidebarEnum'

const teams = [
  { id: 1, name: 'Healthcare', href: '#', initial: 'H', current: false },
  { id: 2, name: 'Banking', href: '#', initial: 'B', current: false },
  { id: 3, name: 'Insurance', href: '#', initial: 'I', current: false }
]

const sidebarOpen = ref(false)
</script>
<style scoped lang="scss">
.link {
  transition: all 0.2s ease;
}
.link:hover {
  color: white;
  svg {
    color: white;
  }
}
.link.router-link-exact-active {
  color: white;
  background-color: rgb(67, 56, 202);
  svg {
    color: white;
  }
}
</style>
