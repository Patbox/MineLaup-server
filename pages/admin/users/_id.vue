<template>
  <div>
    <h1 class="font-bold text-3xl text-gray-900 uppercase">
      {{ $t('pages.admin.users.title') }}
    </h1>
    <div class="container flex-col mx-auto px-4 sm:px-8">
      <keep-alive>
        <div class="my-2">
          <div class="flex flex-row mb-1 shadow rounded-full max-w-lg mx-auto">
            <div class="relative">
              <select
                v-model="search.items"
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
                  {{ $t('pages.admin.users.list.filter.all') }}
                </option>
                <option value="2">
                  {{ $t('pages.admin.users.list.filter.admin') }}
                </option>
                <option value="1">
                  {{ $t('pages.admin.users.list.filter.moderator') }}
                </option>
                <option value="0">
                  {{ $t('pages.admin.users.list.filter.user') }}
                </option>
              </select>
              <div
                class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
              >
                <i class="fas fa-caret-down"></i>
              </div>
            </div>
            <div class="block relative flex-1">
              <span
                class="h-full absolute inset-y-0 left-0 flex items-center pl-2"
              >
                <i class="fas fa-search"></i>
              </span>
              <input
                :placeholder="$t('pages.admin.users.list.filter.search')"
                class="appearance-none w-full bg-gray-300 rounded-r-full pl-10 py-2 px-4 placeholder-gray-700 focus:outline-none text-black"
                @input="debounceSearch($event.target.value)"
              />
            </div>
          </div>
        </div>
      </keep-alive>

      <div class="px-4 py-4 overflow-x-auto">
        <div class="inline-block min-w-full shadow rounded-lg overflow-hidden">
          <table class="min-w-full leading-normal">
            <thead>
              <tr>
                <th
                  class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide"
                >
                  {{ $t('pages.admin.users.list.table.username') }}
                </th>
                <th
                  class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide"
                >
                  {{ $t('pages.admin.users.list.table.email') }}
                </th>
                <th
                  class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide"
                >
                  {{ $t('pages.admin.users.list.table.role') }}
                </th>
                <th
                  class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide"
                >
                  {{ $t('pages.admin.users.list.table.createdAt') }}
                </th>
                <th
                  class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide"
                >
                  {{ $t('pages.admin.users.list.table.language') }}
                </th>
                <th
                  class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide"
                >
                  {{ $t('pages.admin.users.list.table.actions') }}
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
                <td>
                  <div class="flex justify-around">
                    <nuxt-link
                      tag="span"
                      :to="'/admin/users/edit/' + user.id"
                      class="cursor-pointer text-gray-600 hover:text-gray-500 transition ease-out duration-200 select-none"
                    >
                      <i class="fas fa-edit"></i>
                    </nuxt-link>
                    <span
                      class="cursor-pointer text-gray-600 hover:text-red-600 transition ease-out duration-200 select-none"
                      @click="openModal(user)"
                    >
                      <i class="fas fa-trash"></i>
                    </span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <t-paginate
        :current="pageId"
        :last="total"
        :change-page="changePage"
      ></t-paginate>
    </div>
    <t-modal v-if="modalOpened">
      <h1 slot="title">
        {{ $t('pages.admin.users.list.modal.title') }}
      </h1>
      <p slot="description">
        {{ $t('pages.admin.users.list.modal.description') }}
      </p>
      <div slot="actions" class="flex flex-col items-center">
        <t-button
          bg-hover-color="red-600"
          class="flex-1 mb-2 md:w-1/2"
          @click="deleteUser"
        >
          {{ $t('pages.admin.users.list.modal.delete-btn') }}
        </t-button>
        <t-button
          class="flex-1 md:w-1/2"
          bg-hover-color="gray-800"
          @click="closeModal"
        >
          {{ $t('pages.admin.users.list.modal.cancel-btn') }}
        </t-button>
      </div>
    </t-modal>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'nuxt-property-decorator'
import { format } from 'date-fns'
import { debounce } from 'lodash'
import { Context } from '@nuxt/types'
import TModal from '~/components/TModal.vue'
import TButton from '~/components/form/TButton.vue'
import TPaginate from '~/components/TPaginate.vue'

@Component({
  components: {
    TModal,
    TButton,
    TPaginate,
  },
})
export default class UsersList extends Vue {
  modalOpened = false
  selectedUser: { id: string } | null = null
  users: any = []
  total: number = 1
  current: number = 1

  search = {
    items: '5',
    type: '-1',
    filter: '',
  }

  middleware({ route, redirect }: Context) {
    if (
      route.params.id === undefined ||
      // @ts-ignore
      isNaN(route.params.id) ||
      parseInt(route.params.id) <= 0
    ) {
      redirect('/admin/users/1')
    }
  }

  async asyncData({ $axios, route }: Context) {
    const { total, current, users } = await $axios.$get('/api/admin/users', {
      params: {
        items: '5',
        type: '-1',
        filter: '',
        page:
          // @ts-ignore
          isNaN(route.params.id) || parseInt(route.params.id) <= 0
            ? 0
            : parseInt(route.params.id) - 1,
      },
    })

    return {
      users,
      total,
      current,
    }
  }

  mounted() {
    Object.assign(this.search, {
      items: this.$route.query.items
        ? (this.$route.query.items as string)
        : '5',
      type: '-1',
      filter: '',
    })
  }

  parsedDate(dateISO: Date): string {
    try {
      const formatedDate = format(new Date(dateISO), 'P')
      return formatedDate
    } catch (error) {
      return ''
    }
  }

  openModal(user: any) {
    this.modalOpened = true
    this.selectedUser = user
  }

  closeModal() {
    this.modalOpened = false
    this.selectedUser = null
  }

  async deleteUser() {
    if (this.selectedUser !== null) {
      try {
        await this.$axios.delete('/api/admin/delete-user', {
          params: {
            id: this.selectedUser.id,
          },
        })

        this.users = this.users.filter((user: { id: string }) => {
          // @ts-ignore
          return user.id !== this.selectedUser.id
        })
        this.closeModal()
      } catch (error) {
        console.error(error.response.message)
      }
    }
  }

  debounceSearch = debounce(function (value: string) {
    // @ts-ignore
    this.search.filter = value
  }, 1000)

  @Watch('search', { deep: true })
  async onSearchChange() {
    const { total, current, users } = await this.$axios.$get(
      '/api/admin/users',
      {
        params: {
          items: this.search.items,
          type: this.search.type,
          filter: this.search.filter,
          page: this.current - 1,
        },
      }
    )
    this.total = total
    this.current = current
    this.users = users
  }

  get pageId() {
    // @ts-ignore
    if (!isNaN(this.$route.params.id) && parseInt(this.$route.params.id) > 0) {
      return parseInt(this.$route.params.id)
    }
    return 1
  }

  changePage(page: string) {
    return {
      path: '/admin/users/' + page,
      query: {
        filter: this.search.filter,
        items: this.search.items,
        type: this.search.type,
      },
    }
  }
}
</script>
