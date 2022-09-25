<script>
    import { onMount } from "svelte/internal";
    import MenuWrapper from "../../lib/MenuWrapper.svelte";
    import { request, gql } from 'graphql-request'
    import StrategyCard from "../../lib/StrategyCard.svelte";

    var name = ""
    var strategies = []

    onMount(() => 
    {
        request(import.meta.env.VITE_BACKEND_URL, gql`{session(id: "${window.localStorage.getItem("sessionId")}")
        {
            user
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
            }
        }}`)
        .then((data) => 
        {
            console.log(data.session.user.strategies)
            strategies = data.session.user.strategies
            name = data.session.user.username
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
    }
</script>

<MenuWrapper>
    <div class="w-full h-full p-6 md:p-12 flex flex-col md:flex-row gap-6 md:gap-12 bg-stone-100">
        <!--Profile Info View-->
        <div class="flex-shrink-0 md:h-full w-full md:w-72 flex flex-row md:flex-col gap-6 md:gap-12 p-4 md:p-6 rounded-2xl shadow-md bg-white items-center">
            <div class="bg-sky-400 w-24 md:w-1/2 aspect-square rounded-full flex items-center justify-center text-white text-4xl">
                <p>{name.substring(0,1)}</p>
            </div>

            <div class="flex flex-col gap-2 md:gap-4 w-full">
                <button class="w-full md:h-12 flex flex-row justify-between items-center px-4">
                    <p class="text-lg text-stone-700">Followers</p>
                    <p class="text-lg text-stone-300">36</p>
                </button>

                <button class="w-full md:h-12 flex flex-row justify-between items-center px-4">
                    <p class="text-lg text-stone-700">Following</p>
                    <p class="text-lg text-stone-300">24</p>
                </button>
            </div>
        </div>

        <div class="w-full h-full flex overflow-y-auto flex-col gap-4">
            <div class="w-full flex flex-row justify-between items-center">
                <p class="text-2xl text-stone-700">{name}</p>
                <button on:click={() => window.location.href = "/new-strategy"} class="py-2 px-6 bg-sky-400 text-white font-bold rounded-lg hover:bg-sky-600">New Strategy</button>
            </div>
            

            <div class="w-full h-min flex flex-row flex-wrap gap-4 overflow-y-auto">
                {#each strategies as strategy}
                    <StrategyCard deleteStrategy={() => deleteStrategy(strategy.id)} bind:name={strategy.name} bind:transactions={strategy.transactions}/>
                {/each}
            </div>
        </div>
    </div>
</MenuWrapper>