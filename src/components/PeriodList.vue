<script setup lang="ts">
import PeriodButton from "@/components/PeriodButton.vue";

defineProps<{ onClick: any }>()
</script>

<template>
  <div class="period-list">
    <PeriodButton :on-click="onClick" type="1D"/>
    <PeriodButton :on-click="onClick" type="7D"/>
    <PeriodButton :on-click="onClick" type="1M"/>
    <PeriodButton :on-click="onClick" type="6M"/>
    <PeriodButton :on-click="onClick" type="1Y"/>
  </div>
</template>

<style scoped>
.period-list {
  top: 0;
  left: 50px;
  position: absolute;
  margin-top: 20px;
  display: flex;
  justify-content: center;
  gap: 10px;
}
</style>