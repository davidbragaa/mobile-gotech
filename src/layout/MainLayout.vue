<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="navbar">
        <q-btn
          flat
          dense
          round
          icon="menu"
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

        <q-btn-dropdown flat color="white" icon="person" >
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
    caption: 'Página Inicial',
    icon: 'home',
    route: 'HomePage'
  },
  {
    title: 'Calendário',
    caption: 'forum.quasar.dev',
    icon: 'calendar_month',
    link: 'https://forum.quasar.dev'
  },
  {
    title: 'QR Code',
    caption: 'Gerar QR Code',
    icon: 'qr_code',
    link: 'https://twitter.quasar.dev'
  },
  {
    title: 'Perfil',
    caption: 'Acessar dados do Perfil',
    icon: 'person',
    link: 'https://facebook.quasar.dev'
  },
  {
    title: 'Frequencia',
    caption: 'Consultar frequencia escolar',
    icon: 'rule',
    link: 'https://awesome.quasar.dev'
  },
  {
    title: 'Contato',
    caption: 'Entre em contato conosco',
    icon: 'call',
    link: 'http://www.etecbauru.com.br/contatos.php'
  },
  {
    title: 'Presença',
    caption: 'Registrar presença do dia',
    icon: 'add_task',
    link: 'https://awesome.quasar.dev'
  },
  {
    title: 'Arquivos',
    caption: 'Arquivos disponibilizados',
    icon: 'backup',
    link: 'https://awesome.quasar.dev'
  },
  {
    title: 'Laboratório',
    caption: 'Reserva de Laboratório',
    icon: 'biotech',
    link: 'https://awesome.quasar.dev'
  },
  {
    title: 'Certificados',
    caption: 'Meus certificados',
    icon: 'school',
    link: 'https://awesome.quasar.dev'
  },
  {
    title: 'Configurações',
    icon: 'settings',
    link: 'https://github.com/quasarframework'
  },
  {
    title: 'Sair',
    caption: 'Sair do usuário',
    icon: 'logout',
    link: 'https://chat.quasar.dev'
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
