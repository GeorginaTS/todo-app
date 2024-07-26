<template>
    <div class="w-full h-full flex flex-col gap-4 justify-center items-center">
        <div class="bg-green1 w-[90%] p-4 rounded-lg" >
            <h1> Welcome {{userStore.user.name}}</h1> 
            <h2>{{userStore.user.email}}</h2>
        </div>
        <div class="w-[90%] bg-green2 p-4  rounded-lg">
            <h4>Change Password</h4>
            <div class="flex flex-col gap-2 w-48">
                <div>New Password <br><input type="password" id="psw1"></div>
                <div>Repite New Password <br><input type="password" id="psw2"></div>
                <button>Change Password</button>
            </div>
        </div>
        <div class="w-[90%] bg-green3 p-4  rounded-lg">Created At: <span class="text-xs">{{userStore.user.createdAt}}</span></div>

    </div>  
</template>
<script>
import { useUserStore } from "../stores/user"

export default {
    name: "Profile",
    setup() {
        const userStore = useUserStore()
        return { userStore }
    }
}
</script>
<style>

</style>