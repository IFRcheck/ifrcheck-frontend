<template>
  <tr>
    <td>{{ country }}</td>
    <td>{{ infections }}</td>
    <td>{{ deaths }}</td>
    <td>{{ population }}</td>
    <td>{{ ifr }}</td>
    <td>{{ aboveIoannidis }}</td>
    <td>{{ cfr }}</td>
    <td>{{ date }}</td>
  </tr>
</template>

<script>
export default {
  props: ['country', 'infections', 'deaths', 'population', 'ifr', 'aboveIoannidis', 'cfr', 'date']
}
</script>