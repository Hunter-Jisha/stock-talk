<script>
    import { onMount } from "svelte/internal";
    import MenuWrapper from "../../lib/MenuWrapper.svelte";
    import { request, gql } from 'graphql-request'
    import StrategyCard from "../../lib/StrategyCard.svelte";
    import Loader from "../../lib/Loader.svelte";

    var name = ""
    var strategies = []
    var followerCount = 0
    var followingCount = 0
    var loaded = false

    onMount(() => 
    {
        if(!window.localStorage.getItem("sessionId"))
        {
            window.location.href = "/login"
        }

        request(import.meta.env.VITE_BACKEND_URL, gql`{session(id: "${window.localStorage.getItem("sessionId")}")
        {
            user
            {
                username
                followers
                {
                    follower
                    {
                        username
                    }
                }
                following
                {
                    following
                    {
                        username
                    }
                }
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
            }
        }}`)
        .then((data) => 
        {
            followerCount = data.session.user.followers.length
            followingCount = data.session.user.following.length
            strategies = data.session.user.strategies
            name = data.session.user.username

            loaded = true
        })
        .catch((error) =>
        {
            message.set(error.message)
        })
    })

    function deleteStrategy(id)
    {
        request(import.meta.env.VITE_BACKEND_URL, gql`mutation{deleteStrategy(sessionId: "${window.localStorage.getItem("sessionId")}", id: ${id})}`)
        .then(() =>
        {
            strategies.forEach((strategy, index) => 
            {
                if(strategy.id == id)
                {
                    strategies.splice(index, 1)
                    strategies = strategies
                    return
                }
            })
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
            <div class="flex-shrink-0 h-min w-full md:w-72 flex flex-row md:flex-col gap-6 p-4 md:p-6 rounded-2xl shadow-md bg-white items-center">
                <div class="bg-sky-400 w-24 md:w-1/2 aspect-square rounded-full flex items-center justify-center text-white text-4xl">
                    <p>{name.substring(0,1)}</p>
                </div>
    
                <p class="font-bold text-stone-500 text-2xl">{name}</p>
    
                <div class="flex flex-col gap-2 md:gap-4 w-full">
                    <button class="w-full md:h-12 flex flex-row justify-between items-center px-4">
                        <p class="text-lg text-stone-700">Followers</p>
                        <p class="text-lg text-stone-300">{followerCount}</p>
                    </button>
    
                    <button class="w-full md:h-12 flex flex-row justify-between items-center px-4">
                        <p class="text-lg text-stone-700">Following</p>
                        <p class="text-lg text-stone-300">{followingCount}</p>
                    </button>
                </div>
            </div>
    
            <div class="w-full h-full flex flex-col gap-4">
                <div class="w-full flex flex-row justify-between items-center">
                    <p class="text-2xl text-stone-700">Strategies</p>
                    <button on:click={() => window.location.href = "/new-strategy"} class="py-2 px-6 bg-sky-400 text-white font-bold rounded-lg hover:bg-sky-600">New Strategy</button>
                </div>
                
                <div class="w-full h-min flex flex-row flex-wrap gap-4 p-4 overflow-y-auto">
                    {#each strategies as strategy}
                        <div class="w-96">
                            <StrategyCard deleteStrategy={() => deleteStrategy(strategy.id)} bind:name={strategy.name} ownMode={true} bind:transactions={strategy.transactions}/>
                        </div>
                    {/each}
                </div>
            </div>
        </div>
    </Loader>
</MenuWrapper>