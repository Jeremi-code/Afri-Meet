<template>
  <div class = "text-green">
      <NuxtPage />
  </div>
</template>

<script lang="ts" setup>
const { clients, getToken, onLogin, onLogout } = useApollo()
const query = gql`
query getShips($limit: Int!) {
  ships(limit: $limit) {
    id
  }
}`

const { data } = await useAsyncQuery(query, { limit: 2 })

if (data.value?.ships) {
  // log response
  console.log(data.value.ships)
}


</script>