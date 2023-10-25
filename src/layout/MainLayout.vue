<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="navbar">
        <q-btn
          flat
          dense
          round
          icon="mdi-menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title class="flex flex-center">
          <img
            alt="Go Tech"
            src="~assets/Logo-redondo.png"
            style="width: 200px; height: 200px"
          >
        </q-toolbar-title>

        <q-btn-dropdown
          flat color="white"
          icon="mdi-account-off"
          >
          <q-list>
            <q-item clickable v-close-popup @click="handleLogout">
              <q-item-section>
                <q-item-label>Logout</q-item-label>
              </q-item-section>
            </q-item>
            </q-list>
        </q-btn-dropdown>

      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label
          header
        >
          Menus
        </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
          @click="navigateTo(link)"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'
import { useRouter } from 'vue-router'

const linksList = [
  {
    title: 'Home',
    icon: 'mdi-home',
    routeName: 'me'
  },

  {
    title: 'Aluno',
    caption: '',
    icon: 'mdi-school',
    routeName: 'aluno'
  },
  {
    title: 'Professor',
    caption: '',
    icon: 'mdi-account-tie',
    routeName: 'professor'
  },

  {
    title: 'Disciplina',
    caption: '',
    icon: 'mdi-book-open-variant',
    routeName: 'disciplina'
  },

  {
    title: 'QrCode',
    caption: '',
    icon: 'mdi-qrcode-scan',
    routeName: 'qrcode'
  },

  {
    title: 'Frequencia',
    caption: '',
    icon: 'mdi-draw',
    routeName: 'frequencia'
  },

  {
    title: 'Camera',
    caption: '',
    icon: 'mdi-camera-iris',
    routeName: 'camera'
  },

  {
    title: 'Laboratório',
    caption: '',
    icon: 'biotech',
    routeName: 'laboratorio'
  },

  {
    title: 'Presença',
    caption: '',
    icon: 'mdi-account-check ',
    routeName: 'presenca'
  },
  {
    title: 'Arquivos',
    caption: 'Arquivos disponibilizados',
    icon: 'backup',
    routeName: ''
  },
  {
    title: 'Certificados',
    caption: 'Meus certificados',
    icon: 'school',
    routeName: ''
  },
  {
    title: 'Configurações',
    icon: 'settings',
    routeName: ''
  }
]

import useAuthUser from 'src/composables/UseAuthUser'
// import { defineComponent, ref } from 'vue'
// import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  setup () {
    const leftDrawerOpen = ref(false)

    const $q = useQuasar()

    const router = useRouter()

    const { logout } = useAuthUser()

    const handleLogout = async () => {
      $q.dialog({
        title: 'Logout',
        message: 'Voce realmente quer sai?',
        cancel: true,
        persistent: true
      }).onOk(async () => {
        await logout()
        router.replace({ name: 'login' })
      })
    }

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
      handleLogout
    }
  }
})
</script>
