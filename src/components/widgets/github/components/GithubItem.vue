<template>
  <v-list-tile avatar>
    <v-list-tile-avatar>
      <v-avatar size="36px">
        <img :src="item.actor.avatar_url"/>
      </v-avatar>
    </v-list-tile-avatar>
    <v-list-tile-content>
      <v-list-tile-title class="text">
        <div v-if="item.type === 'ForkEvent'">
          <a
            :href="`https://github.com/${item.actor.login}`"
            target="_blank">@{{ item.actor.display_login }}
          </a>
          &nbsp;forked&nbsp;
          <a
            :href="`https://github.com/${item.repo.name}`"
            target="_blank">{{ item.repo.name }}
          </a>
          &nbsp;to&nbsp;
          <a :href="item.payload.forkee.html_url">{{ item.payload.forkee.full_name}}</a>
        </div>
        <div v-else-if="item.type === 'WatchEvent'">
          <a
            :href="`https://github.com/${item.actor.login}`"
            target="_blank">@{{ item.actor.display_login }}
          </a>
          &nbsp;starred&nbsp;
          <a :href="`https://github.com/${item.repo.name}`" target="_blank">{{ item.repo.name }}</a>
        </div>
        <div v-else-if="item.type === 'PushEvent'">
          <a
            :href="`https://github.com/${item.actor.login}`"
            target="_blank">@{{ item.actor.display_login }}
          </a>
          &nbsp;pushed to&nbsp;
          <a
            :href="`https://github.com/${item.repo.name}`"
            target="_blank">{{ item.repo.name }}
          </a>
        </div>
      </v-list-tile-title>
      <v-list-tile-sub-title>
        <span>{{item.created_at | moment("from")}}</span>
      </v-list-tile-sub-title>
    </v-list-tile-content>
  </v-list-tile>
</template>

<script>
export default {
  name: "GithubItem",
  props: {
    item: {
      type: Object,
      required: true
    }
  }
};
</script>

<style scoped>
.text {
  white-space: unset;
}
</style>
