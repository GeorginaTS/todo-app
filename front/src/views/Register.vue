<template>
    <div class="w-full h-full flex flex-col gap-4 justify-center items-center">
        <h3 class="bg-green1 w-[90%] p-4 rounded-lg">
            Register your account and use Todo app everyday!
        </h3>
        <div class="bg-green2 w-[90%] p-4 rounded-lg flex flex-col gap-2">
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
        <div class="w-[90%] bg-green3 p-4  rounded-lg flex gap-8 items-center justify-between">
            <div class="flex gap-2">
                <div class="inline-flex items-center">
                    <label class="relative flex items-center p-3 rounded-full cursor-pointer" htmlFor="check">
                        <input type="checkbox"
                            class="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border-2 border-red-600 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-red-500 before:opacity-0 before:transition-opacity checked:border-green-900 checked:bg-green-300 checked:before:bg-gray-900 hover:before:opacity-10"
                            id="check" v-model="policy" />
                        <span
                            class="absolute text-black transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 20 20"
                                fill="currentColor" stroke="currentColor" stroke-width="1">
                                <path fill-rule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clip-rule="evenodd"></path>
                            </svg>
                        </span>
                    </label>
                    <label for="policy">* Accept Privacy Policy</label>
                </div>

            </div>
            <button class="button_primary h-fit" v-if="policy" @click="createUser">Register</button>
            <div class="button_primary px-10 py-2 opacity-50 h-fit" v-else>Register</div>
            <div class="bg-slate-200 w-96 p-2" v-if="errors.length>0">
                <div v-for="error in errors">Error: {{ error }}</div>
            </div>
        </div>
    </div>

</template>
<script>

export default {
    name: "Register",
    inject: ["serverUrl"],
    data() {
        return {
            name: "",
            email: "",
            password1: "",
            password2: "",
            profile: "user",
            policy: false,
            errors: []
        }
    },
    methods: {
        verifyPassword() {
            if (this.password1 == this.password2 && this.password1.length > 3) {
                return true
            } else {
                return false
            }

        },
        validEmail(email) {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        },
        verifyForm() {
            this.errors = []
            if (this.name.length < 9) {
                this.errors.push("Write fullname, min length 8")
            }
            if (!this.email) {
                this.errors.push('Email is required.');
            } else if (!this.validEmail(this.email)) {
                this.errors.push('Email is not vàlid');
            }
            if (!this.verifyPassword()) {
                this.errors.push("No Password validation")
            }
            if (!this.policy) {
                this.errors.push("Validate privacy policy")
            }
            if (this.errors.length > 0) {
                return false
            } else {
                return true
            }
        },
        async createUser() {
            this.verifyForm()
            if (this.verifyForm()) {
                const newUser = {
                    name: this.name,
                    email: this.email,
                    password: this.password1,
                    profile: "user", 
                    active: true
                }
                try {
                    const response = await fetch(`${this.serverUrl}/users`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(newUser)
                    })
                    const data = await response.json()

                    console.log("Register. Data fetch", data)

                    this.$router.push('/');

                } catch (error) {
                    response.send({ msg: "Error", error: error.message })
                }
            }


        }
    }
}
</script>
<style></style>