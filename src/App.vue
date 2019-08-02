<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <button 
      class="offline-btn"
      @click="saveOfflineData"
    >
      Save Offline Data
    </button>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import { mapActions, mapState } from 'vuex'
import idb from './utils/bf-idb.js'

/**
 * Syncs offline data to the server
 * @param {String} connectivity
 */
const syncData = async(connectivity) => {
  // check application connectivity
  if (connectivity === 'offline') {
    return
  }
  // check if offline data exists
  const offlineData = await idb.keys()
  if (!offlineData.length) {
    return
  }
  // if data exists, send it to the database
  offlineData.forEach(key => {
    console.warn('SENDING TO THE DATABASE', key)
  })
  // clean up indexDB
  await idb.clear()
}

export default {
  name: 'app',
  components: {
    HelloWorld
  },
  mounted() {
    window.addEventListener('offline', () => this.handleConnectivity('offline'))
    window.addEventListener('online', () => this.handleConnectivity('online'))
  },
  computed: {
    ...mapState([
      'connectivity'
    ])
  },
  methods: {
    ...mapActions([
      'updateConnectivity',
    ]),
    /**
     * Handles online and offline events
     * @param {String} connectivity
     */
    handleConnectivity: function (connectivity) {
      // update vuex connectivity state
      this.updateConnectivity(connectivity)
      // sync offline data with the database
      syncData(connectivity)
    },
    /**
     * Saves offline data to indexedDB
     */
    saveOfflineData: function() {
      if (this.connectivity === 'online') {
        console.warn('ONLINE, NO NEED TO SAVE TO INDEXEDDB')
        return
      }
      const data = {
        profile: {
          id: 1,
          name: 'Fynn Blackwell'
        },
        form: {
          title: 'UPDRS III',
          motorAssessment: 2,
          cognitiveAssessment: 1
        }
      }
      Object.keys(data).forEach(key => {
        const val = JSON.stringify(data[key])
        idb.set(key, val)
      })
      console.warn('SAVED TO INDEXEDDB', data)
    }
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.offline-btn {
  background: blue;
  border: solid 1px blue;
  border-radius: 3px;
  color: #eee;
  display: block;
  margin: 20px auto;
  outline: none;
  padding: 8px 24px; 
  text-align: center;
}
.offline-btn:hover {
  color: #fff;
  cursor: pointer;
}
</style>
