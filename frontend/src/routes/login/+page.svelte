<script>
    import Form from "$lib/Form.svelte"
    import {onMount} from "svelte"
    import { request, gql } from 'graphql-request'
    import {message} from "$lib/ErrorMessage.js"

    var registerMode = false

    onMount(() =>
    {
        if(window.location.hash === "#register")
        {
            registerMode = true
        }
    })

    async function register(data)
    {
        request(import.meta.env.VITE_BACKEND_URL, gql`mutation{register(username: "${data.username}", email: "${data.email}", password: "${data.password}")
            {
                id
            }
        }`)
        .then((data) => 
        {
            window.localStorage.setItem("sessionId", data.register.id)
            window.location.href = "/profile"
        })
        .catch((error) =>
        {
            message.set(error.message)
        })
    }

    async function login(data)
    {
        request(import.meta.env.VITE_BACKEND_URL, gql`mutation{login(email: "${data.email}", password: "${data.password}")
            {
                id
            }
        }`)
        .then((data) => 
        {
            window.localStorage.setItem("sessionId", data.login.id)
            window.location.href = "/profile"
        })
        .catch((error) =>
        {
            message.set(error.message)
        })
    }
</script>

<svelte:head>
    <meta name="theme-color" content="#38BDF8">
</svelte:head>

<div class="w-screen h-screen overflow-hidden bg-sky-400 flex items-center justify-center">
    <div class="w-full h-full fixed top-0 left-0 bg-white" style="-webkit-mask-image: url('/glamorous.svg'); mask-image: url('glamorous.svg');"></div>
    
    <div class="z-10 w-96 p-6 bg-white rounded-2xl flex flex-col items-center gap-4">
        <div class="flex flex-col">
            <img class="w-24 aspect-square" src="/logo-blue.png" alt="icon">
            <p class="text-sky-400 font-bold text-xl">Stock Talk</p>
        </div>
        
        {#if registerMode}
            <Form handle={register} class="w-full flex flex-col gap-2">
                <input class="w-full h-14 md:h-12 bg-stone-100 rounded-xl text-lg px-4 text-stone-700" type="text" name="username" placeholder="Username">
                <input class="w-full h-14 md:h-12 bg-stone-100 rounded-xl text-lg px-4 text-stone-700" type="email" name="email" placeholder="Email">
                <input class="w-full h-14 md:h-12 bg-stone-100 rounded-xl text-lg px-4 text-stone-700" type="password" name="password" placeholder="Password">
                <input class="w-full h-14 md:h-12 rounded-xl bg-sky-400 text-white font-bold text-xl" type="submit" value="Register">
            </Form>

            <p class="text-stone-500">Don't have an account? <a href="/login" on:click={() => registerMode = false} class="text-sky-400 font-bold">Sign In</a></p>
        {:else}
            <Form handle={login} class="w-full flex flex-col gap-2">
                <input class="w-full h-14 md:h-12 bg-stone-100 rounded-xl text-lg px-4 text-stone-700" type="email" name="email" placeholder="Email">
                <input class="w-full h-14 md:h-12 bg-stone-100 rounded-xl text-lg px-4 text-stone-700" type="password" name="password" placeholder="Password">
                <input class="w-full h-14 md:h-12 rounded-xl bg-sky-400 text-white font-bold text-xl" type="submit" value="Login">
            </Form>

            <p class="text-stone-500">Already have an account? <a href="#register" on:click={() => registerMode = true} class="text-sky-400 font-bold">Sign Up</a></p>
        {/if}
    </div>
</div>
