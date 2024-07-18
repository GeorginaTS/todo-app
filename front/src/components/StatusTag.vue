<template>
    <div class="p-2 w-fit text-sm" v-if="status" :style="{backgroundColor:status.color}">
     {{ status.name}}
    </div>
</template>
<script>
import { useStatusStore } from "../stores/status"
export default {
    name: "StatusTag",
    data() {
        return{
            status:{}
        }
    },
    props: ["id"],
    setup() {
        const statusStore = useStatusStore()
        return { statusStore }
    },
    created() {   
        this.status = this.statusStore.status.find((item) => item._id == this.id)
    }

}
</script>
<style>
.text{
    color: #c8c8c8;
}

</style>