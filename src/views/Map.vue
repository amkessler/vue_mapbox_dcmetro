<template>
  <div id="Map">
    <div class="left-ui text-left frosted-glass p-2">
      <div class="title">
        <h2>Mapbox within Vue App Test (AK)</h2>
        <h4>Metro Subway Entrances in Washington, DC Area</h4>
      </div>
      <div class="">
        <p>
          This app maps out points from the lat-lon locations of Metro subway entrances in DC, MD and VA. 
          It's using Mapbox and pulling the points from a geojson file.          
        </p>
        <p>
          Cumque tenetur distinctio at porro voluptas, accusantium tempore animi odit fugit 
          totam eligendi, earum cum delectus ut assumenda rerum quaerat. Quo aliquam, cumque 
          tenetur distinctio at porro voluptas, accusantium tempore animi
          odit fugit totam eligendi, earum cum delectus ut assumenda rerum
          quaerat.
        </p>
      </div>
    </div>
    <div id="map-container">
      <MglMap
        :accessToken="accessToken"
        :mapStyle.sync="mapStyle"
        container="map-parent"
        @load="onMapLoaded"
        :zoom="zoom"
        :center="center"
      >
        <MglNavigationControl position="top-right" />
        <MglGeolocateControl position="top-right" />
      </MglMap>
    </div>
  </div>
</template>

<script>
// import mapbox components
import Mapbox from 'mapbox-gl'
import { MglMap, MglNavigationControl, MglGeolocateControl } from 'vue-mapbox'

// import vue store
import { mapGetters } from 'vuex'

// init map placeholder
let map = null

export default {
  name: 'Map',
  data () {
    return {
      accessToken: 'pk.eyJ1IjoiYW1rZXNzbGVyMDEiLCJhIjoiY2plcWcyajZ5MDR5djJ5bXliYXBjNjljdyJ9.uofosYm0-qVtM-_wxWbkDQ',
      mapStyle: 'mapbox://styles/mapbox/dark-v10',
      zoom: 11,
      center: [-77.036873, 38.907192]
    }
  },
  components: { MglMap, MglNavigationControl, MglGeolocateControl },
  created () {
    // ATTACHES MAP TO INSTANCE
    this.mapbox = Mapbox
  },
  mounted () {
    // setup mutation subscribers
    this.subscribeToStore()
  },
  computed: {
    // bind store mutations to the vue instance
    ...mapGetters({
      subwayData: 'getData'
    })
  },
  methods: {
    onMapLoaded (event) {
      // bind map to vue instance
      map = event.map
      // request subway data
      this.$store.dispatch('readData', {})
    },
    subscribeToStore () {
      this.dataUnsubscribe = this.$store.subscribe(mutation => {
        switch (mutation.type) {
          case 'setData':
            this.createDataSource()
            this.addData()
            break
        }
      })
    },
    createDataSource () {
      map.addSource('subway-data-source', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: this.subwayData.features
        }
      })
    },
    addData () {
      map.addLayer({
        id: 'subway-points',
        type: 'circle',
        source: 'subway-data-source',
        paint: {
          'circle-stroke-color': '#333333',
          'circle-stroke-width': 1,
          'circle-radius': 5,
          'circle-color': '#d36e3c',
          'circle-opacity': 0.75
          // for testing polygons w/ fill...
          // 'fill-color': '#d36e3c',
          // 'fill-outline-color': '#0a0a0a',
          // 'fill-opacity': 0.5
        }
      })
    }
  }
}
</script>

<style lang="scss">
#Map {
  width: 100vw;
  height: 100vh;
}
.mapboxgl-canvas {
  left: 0;
}
#map-container {
  position: absolute;
  height: 100vh;
  width: 100vw;
  left: 0;
  top: 0;

  overflow: hidden;
}

.left-ui {
  position: absolute;
  left: 15px;
  top: 15px;

  width: 600px;
  height: 300px;

  z-index: 10;
}

.frosted-glass {
  // frosted glass effect
  -webkit-backdrop-filter: blur(6px);
  backdrop-filter: blur(6px);
  background-color: rgba(91, 91, 91, 0.45);

  background-color: transparent;
}
</style>



