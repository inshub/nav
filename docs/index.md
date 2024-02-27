---
layoutClass: m-nav-layout
head: [
	['link', { rel: 'stylesheet', href: '/css/nav.css' }],
]
---
<script setup>
import MNavLinks from './nav/components/MNavLinks.vue'
import { NAV_DATA } from './nav/data'
</script>
<img src="https://source.unsplash.com/random/1440x240" alt="head_image"/>
<MNavLinks v-for="{title, items} in NAV_DATA" :title="title" :items="items"/>