<script>
    import { onMount } from "svelte/internal";
    import { page } from '$app/stores';
    import MenuWrapper from "$lib/MenuWrapper.svelte";
    import { request, gql } from 'graphql-request'
    import StrategyCard from "$lib/StrategyCard.svelte";
    import {message} from "$lib/ErrorMessage.js"
    import Loader from "../../../lib/Loader.svelte";

    var name = ""
    var strategies = []
    var loggedIn = false
    var follows = false
    var loaded = false

    onMount(() => 
    {
        if(window.localStorage.getItem("sessionId"))
        {
            request(import.meta.env.VITE_BACKEND_URL, gql`{session(id: "${window.localStorage.getItem("sessionId")}")
            {
                user
                {
                    email
                    following
                    {
                        following
                        {
                            email
                        }
                    }
                }
            }}`)
            .then((data) => 
            {
                loggedIn = true
                follows = data.session.user.following.map((follow) => follow.following.email).includes($page.params.email)
                loaded = true
            })
            .catch((error) =>
            {
                message.set(error.message)
            })
        }
        request(import.meta.env.VITE_BACKEND_URL, gql`{getUserByEmail(email: "${$page.params.email}")
        {
            username
            strategies
            {
                id
                name
                transactions
                {
                    buyPrice
                    sellPrice
                    buyDateTime
                    sellDateTime
                    percent
                    stock
                    {
                        ticker
                        currentPrice
                    }
                }
            }
        }}`)
        .then((data) => 
        {
            strategies = data.getUserByEmail.strategies
            name = data.getUserByEmail.username
        })
        .catch((error) =>
            {
                message.set(error.message)
            })
    })

    function follow()
    {
        request(import.meta.env.VITE_BACKEND_URL, gql`mutation{follow(sessionId: "${window.localStorage.getItem("sessionId")}", email: "${$page.params.email}")}`)
        .then((response) =>
        {
            follows = true
        })
        .catch((error) =>
        {
            message.set(error.message)
        })
    }

    function unfollow()
    {
        request(import.meta.env.VITE_BACKEND_URL, gql`mutation{unfollow(sessionId: "${window.localStorage.getItem("sessionId")}", email: "${$page.params.email}")}`)
        .then((response) =>
        {
            follows = false
        })
        .catch((error) =>
        {
            message.set(error.message)
        })
    }
</script>

<MenuWrapper>
    <Loader bind:loaded={loaded}>
        <div class="w-full h-full p-6 md:p-12 flex flex-col md:flex-row gap-6 md:gap-12 bg-stone-100">
            <!--Profile Info View-->
            <div class="flex-shrink-0 h-min w-full md:w-72 flex flex-col gap-6 p-4 md:p-6 rounded-2xl shadow-md bg-white items-center">
                <div class="w-16 md:w-1/2 flex-shrink-0 bg-sky-400 aspect-square rounded-full flex items-center justify-center text-white text-4xl">
                    <p>{name.substring(0,1)}</p>
                </div>
    
                <p class="font-bold text-stone-500 text-2xl">{name}</p>
    
    
                <div class="flex flex-col gap-2 md:gap-4 w-full">
                    <button class="gap-4 w-full md:h-12 flex flex-row justify-between items-center px-4">
                        <p class="text-lg text-stone-700">Followers</p>
                        <p class="text-lg text-stone-300">36</p>
                    </button>
    
                    <button class="gap-4 w-full md:h-12 flex flex-row justify-between items-center px-4">
                        <p class="text-lg text-stone-700">Following</p>
                        <p class="text-lg text-stone-300">24</p>
                    </button>
                </div>
    
                {#if loggedIn}
                    <button on:click={follows ? unfollow : follow} class="w-full py-2 bg-sky-400 text-white font-bold rounded-xl hover:bg-sky-500">{follows ? "Unfollow" : "Follow"}</button>
                {/if}
            </div>
    
            <div class="w-full h-full flex overflow-y-auto flex-col gap-4">
                <div class="w-full flex flex-row justify-between items-center">
                    <p class="text-2xl text-stone-700">Strategies</p>
                </div>
                
    
                <div class="w-full h-min flex flex-row flex-wrap gap-4 p-2 overflow-y-auto">
                    {#each strategies as strategy}
                        <div class="w-96">
                            <StrategyCard deleteStrategy={() => deleteStrategy(strategy.id)} bind:name={strategy.name} bind:transactions={strategy.transactions}/>
                        </div>
                    {/each}
                </div>
            </div>
        </div>
    </Loader>
</MenuWrapper>