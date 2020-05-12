<template>
  <div>
    <h1 class="font-bold text-3xl text-gray-900 uppercase">
      {{ $t('pages.admin.users.title') }}
    </h1>
    <div class="container flex-col mx-auto px-4 sm:px-8">
      <div class="my-2">
        <div class="flex flex-row mb-1 shadow rounded-full">
          <div class="relative">
            <select
              v-model="search.itemsNb"
              class="appearance-none w-full bg-gray-300 rounded-l-full py-2 px-5 placeholder-gray-700 focus:outline-none text-black"
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
            </select>
            <div
              class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
            >
              <i class="fas fa-caret-down"></i>
            </div>
          </div>
          <div class="relative">
            <select
              v-model="search.type"
              class="appearance-none w-full bg-gray-300 py-2 px-5 placeholder-gray-700 focus:outline-none text-black"
            >
              <option value="-1">
                {{ $t('pages.admin.users.filter.all') }}
              </option>
              <option value="2">
                {{ $t('pages.admin.users.filter.admin') }}
              </option>
              <option value="1">
                {{ $t('pages.admin.users.filter.moderator') }}
              </option>
              <option value="0">
                {{ $t('pages.admin.users.filter.user') }}
              </option>
            </select>
            <div
              class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
            >
              <i class="fas fa-caret-down"></i>
            </div>
          </div>
          <div class="block relative">
            <span
              class="h-full absolute inset-y-0 left-0 flex items-center pl-2"
            >
              <i class="fas fa-search"></i>
            </span>
            <input
              v-model="search.filterText"
              :placeholder="$t('pages.admin.users.filter.search')"
              class="appearance-none w-full bg-gray-300 rounded-r-full pl-10 py-2 px-4 placeholder-gray-700 focus:outline-none text-black"
            />
          </div>
        </div>
      </div>

      <div class="px-4 py-4 overflow-x-auto">
        <div class="inline-block min-w-full shadow rounded-lg overflow-hidden">
          <table class="min-w-full leading-normal">
            <thead>
              <tr>
                <th
                  class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide"
                >
                  {{ $t('pages.admin.users.list.username') }}
                </th>
                <th
                  class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide"
                >
                  {{ $t('pages.admin.users.list.email') }}
                </th>
                <th
                  class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide"
                >
                  {{ $t('pages.admin.users.list.role') }}
                </th>
                <th
                  class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide"
                >
                  {{ $t('pages.admin.users.list.createdAt') }}
                </th>
                <th
                  class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide"
                >
                  {{ $t('pages.admin.users.list.language') }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(user, index) in users" :key="index">
                <td class="py-4">
                  {{ user.username }}
                </td>
                <td>
                  {{ user.email ? user.email : '-' }}
                </td>
                <td>
                  {{ user.role }}
                </td>
                <td>
                  {{ parsedDate(user.createdAt) }}
                </td>
                <td>
                  {{ user.language }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { format } from 'date-fns'

@Component
export default class UsersList extends Vue {
  users = []

  search = {
    itemsNb: '5',
    type: '-1',
    filterText: '',
  }

  // @ts-ignore
  async asyncData({ $axios }) {
    const users = await $axios.$get('/api/admin/users', {
      query: {
        items: '5',
        type: '-1',
        filter: '',
      },
    })
    return {
      users: [
        ...users,
        {
          id: 'eferfer',
          username: 'test',
          email: null,
          role: 0,
          createdAt: new Date().toISOString(),
          language: 'en',
        },
        {
          id: 'eferfer',
          username: 'test',
          email: null,
          role: 0,
          createdAt: new Date().toISOString(),
          language: 'en',
        },
        {
          id: 'eferfer',
          username: 'test',
          email: null,
          role: 0,
          createdAt: new Date().toISOString(),
          language: 'en',
        },
        {
          id: 'eferfer',
          username: 'test',
          email: null,
          role: 0,
          createdAt: new Date().toISOString(),
          language: 'en',
        },
        {
          id: 'eferfer',
          username: 'test',
          email: null,
          role: 0,
          createdAt: new Date().toISOString(),
          language: 'en',
        },
        {
          id: 'eferfer',
          username: 'test',
          email: null,
          role: 0,
          createdAt: new Date().toISOString(),
          language: 'en',
        },
        {
          id: 'eferfer',
          username: 'test',
          email: null,
          role: 0,
          createdAt: new Date().toISOString(),
          language: 'en',
        },
      ],
    }
  }

  parsedDate(dateISO: Date): string {
    const formatedDate = format(new Date(dateISO), 'P')
    return formatedDate
  }
}
</script>
