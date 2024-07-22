<template>
    <div class="w-full h-full flex flex-col gap-4 justify-center items-center">
        <h3 class="div_green1 w-[90%] p-4 rounded-lg">
            Register your account and use Todo app everyday!
        </h3>
        <div class="div_green2 w-[90%] p-4 rounded-lg flex flex-col gap-2">
            <div>Full name: <br> <input type="text" id="name" v-model="name" class="w-96"></div>
            <div>Email: <br> <input type="email" id="email" v-model="email" class="w-96"></div>
            <hr class="my-2">
            <h4>Password (<span class="text-sm font-mono">Min. length : 4</span>)</h4>
            
            <div class="flex gap-8 items-center">
                <div class="flex gap-4">
                    <div>New Password <br><input type="password" v-model="password1"></div>
                    <div>Repite New Password <br><input type="password" v-model="password2"></div>
                </div>
                <div class="flex gap-2 items-center">
                    <div class="w-4 h-4 rounded-full bg-green-600" v-if="verifyPassword()"></div>
                    <div class="w-4 h-4 rounded-full bg-red-600" v-else></div>
                    verified password
                </div> 
            </div>


        </div>

        <div class="w-[90%] div_green3 p-4  rounded-lg flex gap-8">
            <div>
                <input type="checkbox" name="" id=""> * Accept Privacy Policy
            </div>
            <button class="button_primary">Register</button>
        </div>
    </div>

</template>
<script>

export default {
    name: "Register",
    data() {
        return {
            name: "",
            email: "",
            password1: "",
            password2: "",
            profile: "user"
        }
    },
    methods: {
        verifyPassword() {
            if (this.password1 == this.password2 && this.password1.length > 3) {
                return true
            } else {
                return false
            }

        }
    }
}
</script>
<style></style>