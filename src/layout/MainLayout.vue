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
<<<<<<< HEAD
    title: 'Disciplina',
    caption: '',
    icon: 'mdi-book-open-variant',
    routeName: 'disciplina'
  },
  {
    title: 'QR Code',
    caption: '',
=======
    title: 'Frequencia',
    caption: '',
    icon: 'mdi-clipboard',
    routeName: 'frequencia'
  },
  {
    title: 'QR Code',
    caption: 'Gerar QR Code',
>>>>>>> e9895b63645b379cf505b5c53ab2dee70461886e
    icon: 'mdi-qrcode-scan',
    routeName: 'qrcode'
  },
  {
<<<<<<< HEAD
    title: 'Frequencia',
    caption: '',
    icon: 'mdi-clipboard',
    routeName: 'frequencia'
  },
  {
    title: 'Laboratório',
    caption: '',
    icon: 'biotech',
    routeName: 'laboratorio'
=======
    title: 'Perfil',
    caption: 'Acessar dados do Perfil',
    icon: 'person',
    routeName: 'perfil'
>>>>>>> e9895b63645b379cf505b5c53ab2dee70461886e
  },
  {
    title: 'Contato',
    caption: 'Entre em contato conosco',
    icon: 'call',
    routeName: 'contato'
  },
  {
    title: 'Presença',
<<<<<<< HEAD
    caption: '',
    icon: 'mdi-account-check',
    routeName: 'camera'
=======
    caption: 'Registrar presença do dia',
    icon: 'add_task',
    routeName: 'presenca'
>>>>>>> e9895b63645b379cf505b5c53ab2dee70461886e
  },
  {
    title: 'Arquivos',
    caption: 'Arquivos disponibilizados',
    icon: 'backup',
    routeName: 'https://awesome.quasar.dev'
<<<<<<< HEAD
=======
  },
  {
    title: 'Laboratório',
    caption: 'Reserva de Laboratório',
    icon: 'biotech',
    routeName: 'https://awesome.quasar.dev'
>>>>>>> e9895b63645b379cf505b5c53ab2dee70461886e
  },
  {
    title: 'Certificados',
    caption: 'Meus certificados',
    icon: 'school',
    routeName: 'https://awesome.quasar.dev'
  },
  {
    title: 'Configurações',
    icon: 'settings',
    routeName: 'https://github.com/quasarframework'
<<<<<<< HEAD
=======
  },
  {
    title: 'Sair',
    caption: 'Sair do usuário',
    icon: 'logout',
    routeName: 'https://chat.quasar.dev'
>>>>>>> e9895b63645b379cf505b5c53ab2dee70461886e
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
