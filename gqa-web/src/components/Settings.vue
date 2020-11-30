<template>
  <q-scroll-area class="fit">
    <q-list padding>
      <q-item-label header>User Controls</q-item-label>

      <q-item
        clickable
        v-ripple
      >
        <q-item-section>
          <q-item-label>Content filtering</q-item-label>
          <q-item-label caption>
            Set the content filtering level to restrict
            apps that can be downloaded
          </q-item-label>
        </q-item-section>
      </q-item>

      <q-item
        clickable
        v-ripple
      >
        <q-item-section>
          <q-item-label>Password</q-item-label>
          <q-item-label caption>
            Require password for purchase or use
            password to restrict purchase
          </q-item-label>
        </q-item-section>
      </q-item>

      <q-separator spaced />
      <q-item-label header>General</q-item-label>

      <q-item
        tag="label"
        v-ripple
      >
        <q-item-section
          side
          top
        >
          <q-checkbox v-model="check1" />
        </q-item-section>

        <q-item-section>
          <q-item-label>Notifications</q-item-label>
          <q-item-label caption>
            Notify me about updates to apps or games that I downloaded
          </q-item-label>
        </q-item-section>
      </q-item>

      <q-item
        tag="label"
        v-ripple
      >
        <q-item-section
          side
          top
        >
          <q-checkbox v-model="check2" />
        </q-item-section>

        <q-item-section>
          <q-item-label>Sound</q-item-label>
          <q-item-label caption>
            Auto-update apps at anytime. Data charges may apply
          </q-item-label>
        </q-item-section>
      </q-item>

      <q-separator spaced />
      <q-item-label header>Other settings</q-item-label>

      <q-item>

        <q-item-section>
          <q-brand-color />
        </q-item-section>

      </q-item>

    </q-list>
  </q-scroll-area>
</template>

<script>
export default {
  name: 'Settings',
  data () {
    return {
      check1: true,
      check2: false,
      check3: false,
      notif1: true,
      notif2: true,
      notif3: false,
      volume: 6,
      brightness: 3,
      mic: 8
    }
  }
}
</script>

<style lang="sass" scoped>
</style>
